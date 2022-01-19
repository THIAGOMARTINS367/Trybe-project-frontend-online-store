import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import LabelAndInput from '../components/LabelAndInput';
import iconShoppingCart from '../icons/carrinho-de-compras.png';

class Home extends Component {
  render() {
    return (
      <main>
        <LabelAndInput
          labelContent="Procurar"
          inputID="input-search-product"
          inputType="text"
        />
        <Link to="/shoppingcart" data-testid="shopping-cart-button">
          <img
            src={ iconShoppingCart }
            alt="Icone Carrinho de Compras"
            className="icon-shopping-cart"
          />
        </Link>
        <br />
        <span data-testid="home-initial-message">
          Digite algum termo de pesquisa ou escolha uma categoria.
        </span>
      </main>
    );
  }
}

export default Home;
