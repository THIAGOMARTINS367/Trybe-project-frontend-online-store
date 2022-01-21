import React, { Component } from 'react';
import { getProductDetails } from '../services/api';

class ShoppingCart extends Component {
  constructor() {
    super();

    this.state = {
      shoppingCartData: [],
      temporaryShoppingCartData: [],
      searchedProducts: [],
      searching: false,
    };
  }

  componentDidMount() {
    const { productsId } = this.props.match.params;
    const { shoppingCartData, temporaryShoppingCartData } = this.state;
    const productsIdFormatted = productsId.replace('[', '').replace(']', ',').split(',');
    // console.log(productsIdFormatted1);
    productsIdFormatted.map(async (elementId) => {
      // console.log('elementId: ', elementId);
      const elementIdFormatted = elementId.replace('"', '').replace('"', '');
      if (elementIdFormatted.length > 0) {
        const productsObj = await getProductDetails(elementIdFormatted);
        productsObj.productQuantity = 1;
        temporaryShoppingCartData.push(productsObj);
        this.setState({ searching: false });
      }
      temporaryShoppingCartData.map((element) => {
        shoppingCartData.map((element2) => {
          if (element.id === element2.id) {
            element2.productQuantity += 1;
            this.setState({ searching: false });
          }
        });
        console.log('shoppingCartData.includes(element.id)', shoppingCartData.includes(element.id));
        if (shoppingCartData.includes(element.id) === false) {
          const a = element;
          a.productQuantity = 1;
          shoppingCartData.push(a);
          this.setState({ searching: false });
        }
      });
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
                      {element.productQuantity}
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

export default ShoppingCart;
