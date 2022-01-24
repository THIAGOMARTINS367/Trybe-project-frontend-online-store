import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import AsideCategoriesMenu from '../components/AsideCategoriesMenu';
import Card from '../components/Card';
import LabelAndInput from '../components/LabelAndInput';

import iconShoppingCart from '../icons/carrinho-de-compras.png';

class Home extends Component {
  constructor() {
    super();
    this.state = {
      inputValue: '',
    };
  }

  handleInputChange = ({ target }) => {
    this.setState({ inputValue: target.value });
  }

  handleInputButton = async () => {
    const { inputValue } = this.state;
    const { onInputBtn } = this.props;

    onInputBtn(inputValue);
    this.setState({
      inputValue: '',
    });
  };

  renderProductsList = () => {
    const { onAddToCart, productsList } = this.props;

    if (productsList.length === 0) {
      return 'Nenhum produto foi encontrado';
    }
    const products = productsList.map((product) => {
      const { title, thumbnail, id } = product;
      const { price = 0 } = product;
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
    } = this.state;

    const { showProducts, onEventChange } = this.props;
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
            {/* <Link
            to={ {
              pathname: '/shoppingcart/',
              productsList,
            } }
            data-testid="shopping-cart-button"
          > */}
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
        <AsideCategoriesMenu onEventChange={ onEventChange } />
      </main>
    );
  }
}

export default Home;

Home.propTypes = {
  onAddToCart: PropTypes.func.isRequired,
  onInputBtn: PropTypes.func.isRequired,
  productsList: PropTypes.arrayOf(PropTypes.shape()),
  showProducts: PropTypes.bool.isRequired,
  onEventChange: PropTypes.func.isRequired,
};

Home.defaultProps = {
  productsList: [],
};
