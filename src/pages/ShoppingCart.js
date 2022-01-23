import React, { Component } from 'react';
import PropTypes from 'prop-types';

import ItemInCart from '../components/ItemInCart';

export default class ShoppingCart extends Component {
  renderItemsInCart = () => {
    const { itemsInCart } = this.props;

    if (itemsInCart.length === 0) {
      return (
        <span data-testid="shopping-cart-empty-message">
          Seu carrinho está vazio.
        </span>
      );
    }

    const itemsList = itemsInCart.map((item) => {
      const { id, title, quantity } = item;
      return (
        <ItemInCart
          key={ id }
          title={ title }
          quantity={ quantity }
        />
      );
    });

    return itemsList;
  };

  render() {
    return (
      <section>
        { this.renderItemsInCart() }
      </section>
    );
  }
}

// Ref: https://stackoverflow.com/questions/41761135/passing-proptypes-shape-to-proptypes-arrayof-in-react

const item = PropTypes.shape({
  // id: PropTypes.string,
  title: PropTypes.string,
  // price: PropTypes.number,
  // thumbnail: PropTypes.string,
  quantity: PropTypes.number,
});

ShoppingCart.propTypes = {
  itemsInCart: PropTypes.arrayOf(item),
};

ShoppingCart.defaultProps = {
  itemsInCart: [],
};
