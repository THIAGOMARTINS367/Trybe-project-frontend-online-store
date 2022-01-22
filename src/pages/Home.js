import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import AsideCategoriesMenu from '../components/AsideCategoriesMenu';
import Card from '../components/Card';
import LabelAndInput from '../components/LabelAndInput';

import { getProductsFromCategoryAndQuery } from '../services/api';

import iconShoppingCart from '../icons/carrinho-de-compras.png';

class Home extends Component {
  constructor() {
    super();
    this.state = {
      productsList: [],
      inputValue: '',
      showProducts: false,
      // shoppingCart: [],
    };
  }

  handleInputChange = ({ target }) => {
    this.setState({ inputValue: target.value });
  }

  // Pode apagar, né? A props onAddBtn foi adicionada ao botão.

  // addShoppingCart = ({ target }) => {
  //   const { shoppingCart } = this.state;
  //   const { name } = target;
  //   shoppingCart.push(name);
  //   this.setState((prevState) => (
  //     { inputValue: prevState.inputValue }
  //   ));
  // }

  handleInputButton = async () => {
    const { inputValue } = this.state;
    const productsObj = await getProductsFromCategoryAndQuery('', inputValue);
    this.setState({
      productsList: productsObj.results,
      showProducts: true,
      inputValue: '',
    });
  };

  getCategory = async ({ target }) => {
    const { id } = target;
    const productsObj = await getProductsFromCategoryAndQuery(id, '');
    this.setState({
      productsList: productsObj.results,
      showProducts: true,
      inputValue: '',
    });
  }

  renderProductsList = () => {
    const { productsList } = this.state;
    const { onAddToCart } = this.props;

    if (productsList.length === 0) {
      return 'Nenhum produto foi encontrado';
    }
    const products = productsList.map((product) => {
      const { title, thumbnail, price, id } = product;
      return (
        <Card
          key={ id }
          title={ title }
          thumbnail={ thumbnail }
          price={ price }
          // linkForId={ id }
          id={ id }
          // onClickEvent={ this.addShoppingCart }
          dataTestid="product"
          onAddToCart={ onAddToCart }
        />
      );
    });
    return products;
  }

  render() {
    const { inputValue,
      showProducts,
      // shoppingCart
    } = this.state;
    // const object = JSON.stringify(shoppingCart);
    return (
      <main>
        <section className="section1">
          <LabelAndInput
            labelContent="Procurar"
            inputID="input-search-product"
            inputType="text"
            inputValue={ inputValue }
            onInputChange={ this.handleInputChange }
            dataTestid="query-input"
          />
          <Link to="/shoppingcart/" data-testid="shopping-cart-button">
            <img
              src={ iconShoppingCart }
              alt="Icone Carrinho de Compras"
              className="icon-shopping-cart"
            />
          </Link>
          <br />
          <p data-testid="home-initial-message">
            Digite algum termo de pesquisa ou escolha uma categoria.
          </p>
          <button
            type="button"
            data-testid="query-button"
            onClick={ this.handleInputButton }
          >
            Buscar
          </button>
          <section className="section-products">
            { showProducts && this.renderProductsList() }
          </section>
        </section>
        <AsideCategoriesMenu onChangeEvent={ this.getCategory } />
      </main>
    );
  }
}

export default Home;

Home.propTypes = {
  onAddToCart: PropTypes.func.isRequired,
};
