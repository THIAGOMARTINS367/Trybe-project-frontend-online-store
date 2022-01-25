import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { getProductDetails } from '../services/api';

import iconShoppingCart from '../icons/carrinho-de-compras.png';

class ProductDisplayCard extends Component {
  constructor() {
    super();

    this.state = {
      productData: {},
    };
  }

  componentDidMount() {
    const { match } = this.props;
    const { id } = match.params;
    getProductDetails(id).then((data) => this.setState({ productData: data }));
  }

  render() {
    const { onAddToCart } = this.props;
    const { productData } = this.state;
    // const { title, thumbnail, price = '0,00', attributes = [] } = productData;
    // let priceFormatted = String(price);
    // priceFormatted = `R$ ${String(price).replace('.', ',')}`;
    const { id, title, thumbnail, price = 0.00, attributes = [] } = productData;
    // const priceFormatted = `R$ ${(price.toFixed(2)).replace('.', ',')}`;
    const priceFormatted = price
      .toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });

    return (
      <>
        <header>
          <Link to="/shoppingcart/" data-testid="shopping-cart-button">
            <img
              src={ iconShoppingCart }
              alt="Icone Carrinho de Compras"
              className="icon-shopping-cart"
            />
          </Link>
        </header>
        <section>
          <h2 data-testid="product-detail-name">{ title }</h2>
          <br />
          <h3>{ priceFormatted }</h3>
          <br />
          <div>
            <img src={ thumbnail } alt={ title } />
          </div>
          <section>
            <h3>Descrição</h3>
            <ul className="product-description">
              {attributes.map((element) => (
                <li key={ element.id }>
                  <strong>
                    { element.name }
                  </strong>
                  :
                  { ` ${element.value_name}` }
                </li>
              ))}
            </ul>
          </section>
          <button
            type="button"
            data-testid="product-detail-add-to-cart"
            onClick={ () => onAddToCart(id) }
          >
            Adicionar ao Carrinho
          </button>
        </section>
      </>
    );
  }
}

ProductDisplayCard.propTypes = {
  match: PropTypes.shape({
    isExact: PropTypes.bool,
    params: PropTypes.objectOf(PropTypes.string),
  }),
  onAddToCart: PropTypes.func.isRequired,
};

ProductDisplayCard.defaultProps = {
  match: {},
};

export default ProductDisplayCard;
