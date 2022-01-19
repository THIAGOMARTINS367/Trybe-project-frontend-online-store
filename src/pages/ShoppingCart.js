import React, { Component } from 'react';

class ShoppingCart extends Component {
  render() {
    return (
      <span data-testid="shopping-cart-empty-message">Seu carrinho está vazio</span>
    );
  }
}

export default ShoppingCart;
