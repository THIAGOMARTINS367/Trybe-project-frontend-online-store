import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getProductDetails } from '../services/api';

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
    const { productData } = this.state;
    const { title, thumbnail, price = '0,00', attributes = [] } = productData;
    let priceFormatted = String(price);
    priceFormatted = `R$ ${String(price).replace('.', ',')}`;
    return (
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
      </section>
    );
  }
}

ProductDisplayCard.propTypes = {
  match: PropTypes.shape({
    isExact: PropTypes.bool,
    params: PropTypes.objectOf(PropTypes.string),
  }),
};

ProductDisplayCard.defaultProps = {
  match: {},
};

export default ProductDisplayCard;
