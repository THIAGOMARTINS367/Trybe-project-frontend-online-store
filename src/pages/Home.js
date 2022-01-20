import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import AsideCategoriesMenu from '../components/AsideCategoriesMenu';
import LabelAndInput from '../components/LabelAndInput';
import iconShoppingCart from '../icons/carrinho-de-compras.png';

class Home extends Component {
  render() {
    return (
      <main>
        <section className="section1">
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
          <p data-testid="home-initial-message">
            Digite algum termo de pesquisa ou escolha uma categoria.
          </p>
        </section>
        <AsideCategoriesMenu />
      </main>
    );
  }
}

export default Home;
