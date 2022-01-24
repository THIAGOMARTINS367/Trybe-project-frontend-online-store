import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class ItemInCart extends Component {
  render() {
    const {
      // thumbnail,
      title,
      quantity,
      // price,
      // id,
    } = this.props;

    return (
      <div>
        {/* <button
          type="button"
          name={ id }
          onClick={ this.handleRemoveBtn }
        >
          X
        </button> */}
        {/* <img src={ thumbnail } alt={ title } /> */}
        <h4 data-testid="shopping-cart-product-name">{ title }</h4>
        {/* <button
          type="button"
          data-testid="product-decrease-quantity"
          name={ id }
          onClick={ this.handleDecreaseBtn }
        >
          -
        </button> */}
        <div data-testid="shopping-cart-product-quantity">{ quantity }</div>
        {/* <button
          type="button"
          data-testid="product-increase-quantity"
          name={ id }
          onClick={ this.handleIncreaseBtn }
        >
          +
        </button>
        <h3>{ price }</h3> */}
      </div>
    );
  }
}

ItemInCart.propTypes = {
  // thumbnail: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  quantity: PropTypes.number.isRequired,
  // price: PropTypes.number.isRequired,
};
