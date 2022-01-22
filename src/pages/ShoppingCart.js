import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getProductDetails } from '../services/api';

class ShoppingCart extends Component {
  constructor() {
    super();

    this.state = {
      shoppingCartData: [],
    };
  }

  componentDidMount() {
    const { match } = this.props;
    const { productsId } = match.params;
    const { shoppingCartData } = this.state;
    const productsIds = productsId.replace('[', '').replace(']', ',').split(',');
    let productsIdsFormatted = [];
    productsIds.map((elementId) => {
      if (elementId.length > 0) {
        productsIdsFormatted.push(elementId.replace('"', '').replace('"', ''));
      }
      return '';
    });
    const productQuantity = {};
    productsIdsFormatted.map((elementId) => {
      if (productQuantity[elementId]) {
        productQuantity[elementId] += 1;
      } else {
        productQuantity[elementId] = 1;
      }
      return '';
    });
    productsIdsFormatted = Object.keys(productQuantity);
    productsIdsFormatted.map(async (element) => {
      const productObj = await getProductDetails(element);
      productObj.product_Quantity = productQuantity[element];
      shoppingCartData.push(productObj);
      this.setState((prevState) => (
        { shoppingCartData: prevState.shoppingCartData }
      ));
    });
  }

  render() {
    const { shoppingCartData } = this.state;
    return (
      <section>
        {
          shoppingCartData.length === 0 ? (
            <span data-testid="shopping-cart-empty-message">
              Seu carrinho está vazio.
            </span>
          ) : (
            <section>
              {
                shoppingCartData.map((element) => (
                  <div key={ element.id }>
                    <hr />
                    <div>
                      <img src={ element.thumbnail } alt={ element.title } />
                    </div>
                    <h2 data-testid="shopping-cart-product-name">{ element.title }</h2>
                    <br />
                    <h3>{ element.price }</h3>
                    <br />
                    <h3>
                      Quantidade:
                      <span data-testid="shopping-cart-product-quantity">
                        {` ${element.product_Quantity}`}
                      </span>
                    </h3>
                  </div>
                ))
              }
            </section>
          )
        }
      </section>
    );
  }
}

ShoppingCart.propTypes = {
  match: PropTypes.shape({
    isExact: PropTypes.bool,
    params: PropTypes.objectOf(PropTypes.string),
  }),
};

ShoppingCart.defaultProps = {
  match: {},
};

export default ShoppingCart;
