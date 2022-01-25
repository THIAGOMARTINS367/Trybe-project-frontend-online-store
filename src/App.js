import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Home from './pages/Home';
import ProductDisplayCard from './pages/ProductDisplayCard';
import ShoppingCart from './pages/ShoppingCart';

import { getProductsFromCategoryAndQuery } from './services/api';

import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      itemsInCart: [],
      productsList: [],
      showProducts: false,
    };
  }

  searchProductsByQuery = async (query) => {
    const productsObj = await getProductsFromCategoryAndQuery('', query);
    this.setState({
      productsList: productsObj.results,
      showProducts: true,
    });
  };

  searchProductsByCategory = async (categoryID) => {
    const productsObj = await getProductsFromCategoryAndQuery(categoryID, '');
    this.setState({
      productsList: productsObj.results,
      showProducts: true,
    });
  }

  saveItemsInCart = async (itemID) => {
    const { productsList } = this.state;
    const productObj = productsList.find((product) => {
      const { id } = product;
      return id === itemID;
    });

    const { id, title, price, thumbnail } = productObj;
    const newItem = {
      id,
      title,
      price,
      thumbnail,
      quantity: 1,
    };
    // A forma mais indicada para atualizar o state com array é
    // utilizando o setState com callback e spread operator em vez de push.
    // Fonte: Aulas do bloco 11 do Course.
    this.setState((prevState) => ({
      itemsInCart: [...prevState.itemsInCart, newItem],
    }));
  }

  addToCart = async (itemID) => {
    const { itemsInCart } = this.state;
    const ITEM_NOT_FOUND = -1;

    const indexOfItem = itemsInCart.findIndex((item) => {
      const { id } = item;
      return id === itemID;
    });

    if (indexOfItem === ITEM_NOT_FOUND) {
      this.saveItemsInCart(itemID);
    } else {
      this.increaseQuantity(itemID);
    }
  }

  removeItemFromCart = (itemID) => {
    const { itemsInCart } = this.state;

    const indexOfItem = itemsInCart.findIndex((item) => {
      const { id } = item;
      return id === itemID;
    });

    // Ref? https://www.mundojs.com.br/2018/09/06/removendo-elementos-de-uma-lista-array-javascript/
    const newList = [
      ...itemsInCart.slice(0, indexOfItem),
      ...itemsInCart.slice((indexOfItem + 1), (itemsInCart.length)),
    ];

    this.setState({ itemsInCart: newList });
  }

  decreaseQuantity = (itemID) => {
    const { itemsInCart } = this.state;

    const indexOfItem = itemsInCart.findIndex((item) => {
      const { id } = item;
      return id === itemID;
    });

    const { id, title, price, thumbnail, quantity } = itemsInCart[indexOfItem];

    if (quantity === 1) {
      this.removeItemFromCart(itemID);
    } else {
      const updatedItem = {
        id,
        title,
        price,
        thumbnail,
        quantity: (quantity - 1),
      };

      // Ref: https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Array/slice
      const newList = [
        ...itemsInCart.slice(0, indexOfItem),
        updatedItem,
        ...itemsInCart.slice((indexOfItem + 1), (itemsInCart.length)),
      ];

      this.setState({ itemsInCart: newList });
    }
  }

  increaseQuantity = (itemID) => {
    const { itemsInCart } = this.state;

    const indexOfItem = itemsInCart.findIndex((item) => {
      const { id } = item;
      return id === itemID;
    });

    const { id, title, price, thumbnail, quantity } = itemsInCart[indexOfItem];
    const updatedItem = {
      id,
      title,
      price,
      thumbnail,
      quantity: (quantity + 1),
    };

    // Ref: https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Array/slice
    const newList = [
      ...itemsInCart.slice(0, indexOfItem),
      updatedItem,
      ...itemsInCart.slice((indexOfItem + 1), (itemsInCart.length)),
    ];

    this.setState({ itemsInCart: newList });
  }

  sumItemsPrice = () => {
    const { itemsInCart } = this.state;

    const totalPrice = itemsInCart.reduce((acc, curr) => {
      const { quantity, price } = curr;
      return (quantity * price) + acc;
    }, 0);

    return totalPrice;
  }

  render() {
    const { itemsInCart, showProducts, productsList } = this.state;

    return (
      <BrowserRouter>
        <Switch>
          <Route
            path="/shoppingcart/"
            render={ (props) => (
              <ShoppingCart
                { ...props }
                itemsInCart={ itemsInCart }
                onRemoveBtn={ this.removeItemFromCart }
                onIncreaseBtn={ this.increaseQuantity }
                onDecreaseBtn={ this.decreaseQuantity }
                onSumItemsPrice={ this.sumItemsPrice }
                // totalPrice={ totalPrice }
              />) }
          />
          <Route
            path="/product/:id"
            render={ (props) => (
              <ProductDisplayCard
                { ...props }
                onAddToCart={ this.addToCart }
                productsList={ productsList }
              />) }
          />
          <Route
            exact
            path="/"
            render={ (props) => (
              <Home
                { ...props }
                onAddToCart={ this.addToCart }
                onInputBtn={ this.searchProductsByQuery }
                onEventChange={ this.searchProductsByCategory }
                showProducts={ showProducts }
                productsList={ productsList }
              />) }
          />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
