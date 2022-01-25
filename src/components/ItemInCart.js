import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class ItemInCart extends Component {
  render() {
    const {
      thumbnail,
      title,
      quantity,
      price,
      id,
      onRemoveBtn,
      onDecreaseBtn,
      onIncreaseBtn,
    } = this.props;

    const priceFormatted = `R$ ${(price.toFixed(2)).replace('.', ',')}`;

    return (
      <div>
        <button
          type="button"
          name="removeBtn"
          onClick={ () => onRemoveBtn(id) }
        >
          X
        </button>
        <img src={ thumbnail } alt={ title } />
        <h4 data-testid="shopping-cart-product-name">{ title }</h4>
        <button
          type="button"
          data-testid="product-decrease-quantity"
          name="decreaseBtn"
          onClick={ () => onDecreaseBtn(id) }
        >
          -
        </button>
        <div data-testid="shopping-cart-product-quantity">{ quantity }</div>
        <button
          type="button"
          data-testid="product-increase-quantity"
          name="IncreaseBtn"
          onClick={ () => onIncreaseBtn(id) }
        >
          +
        </button>
        <h3>{ priceFormatted }</h3>
      </div>
    );
  }
}

ItemInCart.propTypes = {
  id: PropTypes.string.isRequired,
  thumbnail: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  quantity: PropTypes.number.isRequired,
  price: PropTypes.number.isRequired,
  onRemoveBtn: PropTypes.func.isRequired,
  onDecreaseBtn: PropTypes.func.isRequired,
  onIncreaseBtn: PropTypes.func.isRequired,
};
