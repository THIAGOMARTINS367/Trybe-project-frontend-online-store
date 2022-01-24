import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Home from './pages/Home';
import ProductDisplayCard from './pages/ProductDisplayCard';
import ShoppingCart from './pages/ShoppingCart';

import { getProductDetails } from './services/api';

import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      itemsInCart: [],
    };
  }

  addToCart = async (itemID) => {
    const productObj = await getProductDetails(itemID);

    const { id, title, price, thumbnail } = productObj;
    const item = {
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
      itemsInCart: [...prevState.itemsInCart, item],
    }));
  }

  // removeItemFromCart = (itemID) => {
  //   const { itemsInCart } = this.state;

  //   const productObj = itemsInCart.find((product) => {
  //     const { id } = product;
  //     return id === itemID;
  //   });

  //   const productIndex = itemsInCart.indexOf(productObj);
  //   // Ref? https://www.mundojs.com.br/2018/09/06/removendo-elementos-de-uma-lista-array-javascript/
  //   const newList = itemsInCart.splice(productIndex, 1);

  //   this.setState({ itemsInCart: newList });
  // }

  render() {
    const { itemsInCart } = this.state;

    return (
      <BrowserRouter>
        <Switch>
          <Route
            path="/shoppingcart/"
            render={ (props) => (
              <ShoppingCart
                { ...props }
                itemsInCart={ itemsInCart }
              />) }
          />
          <Route
            path="/product/:id"
            render={ (props) => (
              <ProductDisplayCard
                { ...props }
                onAddToCart={ this.addToCart }
              />) }
          />
          <Route
            exact
            path="/"
            render={ (props) => (
              <Home
                { ...props }
                onAddToCart={ this.addToCart }
              />) }
          />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
