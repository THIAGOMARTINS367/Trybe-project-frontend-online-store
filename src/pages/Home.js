import React, { Component } from 'react';
import LabelAndInput from '../components/LabelAndInput';
import { getProductsFromCategoryAndQuery } from '../services/api';
import Card from '../components/Card';

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
    // console.log(this.state.productsList);
  };

  renderProductsList = () => {
    const { productsList } = this.state;
    if (productsList.length === 0) {
      return 'Nenhum produto foi encontrado';
    }
    const products = productsList.map((product) => {
      const { title, thumbnail, price, id } = product;
      // eslint-disable-next-line react/jsx-wrap-multilines
      return <Card
        title={ title }
        thumbnail={ thumbnail }
        price={ price }
        key={ id }
        dataTestid="product"
      />;
    });
    return products;
  }

  render() {
    const { inputValue, showProducts } = this.state;
    return (
      <main>
        <LabelAndInput
          labelContent="Procurar"
          inputID="query-input"
          dataTestid="query-input"
          inputType="text"
          inputValue={ inputValue }
          onInputChange={ this.handleInputChange }
        />
        <span data-testid="home-initial-message">
          Digite algum termo de pesquisa ou escolha uma categoria.
        </span>
        <button
          type="button"
          data-testid="query-button"
          onClick={ this.handleInputButton }
        >
          Buscar
        </button>
        { showProducts && this.renderProductsList() }
      </main>
    );
  }
}

export default Home;
