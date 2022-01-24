import React, { Component } from 'react';
import PropTypes from 'prop-types';

import ItemInCart from '../components/ItemInCart';

export default class ShoppingCart extends Component {
  renderItemsInCart = () => {
    const {
      itemsInCart,
      onDecreaseBtn,
      onIncreaseBtn,
      onRemoveBtn,
      onSumItemsPrice,
    } = this.props;

    const itemsList = itemsInCart.map((item) => {
      const { id, title, quantity, price, thumbnail } = item;
      return (
        <ItemInCart
          key={ id }
          title={ title }
          quantity={ quantity }
          price={ price }
          thumbnail={ thumbnail }
          id={ id }
          onRemoveBtn={ onRemoveBtn }
          onDecreaseBtn={ onDecreaseBtn }
          onIncreaseBtn={ onIncreaseBtn }
        />
      );
    });

    // const totalPrice = `Total: R$ ${(onSumItemsPrice().toFixed(2)).replace('.', ',')}`;
    const totalPrice = `Total: ${onSumItemsPrice()
      .toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}`;

    return (
      <>
        <section>{itemsList}</section>
        <span>
          <strong>{totalPrice}</strong>
        </span>
      </>);
  };

  render() {
    const { itemsInCart } = this.props;

    return (
      <section>
        { (itemsInCart.length === 0)
          ? (
            <span data-testid="shopping-cart-empty-message">
              Seu carrinho está vazio.
            </span>
          )
          : this.renderItemsInCart() }
      </section>
    );
  }
}

// Ref: https://stackoverflow.com/questions/41761135/passing-proptypes-shape-to-proptypes-arrayof-in-react

const item = PropTypes.shape({
  id: PropTypes.string,
  title: PropTypes.string,
  price: PropTypes.number,
  thumbnail: PropTypes.string,
  quantity: PropTypes.number,
});

ShoppingCart.propTypes = {
  itemsInCart: PropTypes.arrayOf(item),
  onRemoveBtn: PropTypes.func.isRequired,
  onDecreaseBtn: PropTypes.func.isRequired,
  onIncreaseBtn: PropTypes.func.isRequired,
  onSumItemsPrice: PropTypes.func.isRequired,
};

ShoppingCart.defaultProps = {
  itemsInCart: [],
};
