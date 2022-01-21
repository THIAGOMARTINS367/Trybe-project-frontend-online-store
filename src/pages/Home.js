import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import LabelAndInput from '../components/LabelAndInput';
import { getProductsFromCategoryAndQuery } from '../services/api';
import Card from '../components/Card';
import AsideCategoriesMenu from '../components/AsideCategoriesMenu';
import iconShoppingCart from '../icons/carrinho-de-compras.png';

class Home extends Component {
  constructor() {
    super();
    this.state = {
      productsList: [],
      inputValue: '',
      showProducts: false,
    };
  }

  handleInputChange = ({ target }) => {
    this.setState({ inputValue: target.value });
    // console.log(this.state.inputValue)
  }

  handleInputButton = async () => {
    const { inputValue } = this.state;
    const productsObj = await getProductsFromCategoryAndQuery('', inputValue);
    this.setState({
      productsList: productsObj.results,
      showProducts: true,
      inputValue: '',
    });
    // console.log(productsObj);
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
          linkForId={ id }
          dataTestid="product"
        />
      );
    });
    return products;
  }

  render() {
    const { inputValue, showProducts } = this.state;
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
