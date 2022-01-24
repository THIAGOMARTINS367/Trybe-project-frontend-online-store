import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class Card extends React.Component {
  // handleAddBtn = ({ target }) => {
  //   const { name } = target;
  //   const { onAddToCart } = this.props;
  //   onAddToCart(name);
  // }

  render() {
    const {
      id,
      thumbnail,
      title,
      price,
      dataTestid,
      onAddToCart,
    } = this.props;

    // const priceFormatted = `R$ ${(price.toFixed(2)).replace('.', ',')}`;
    const priceFormatted = price
      .toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });

    return (
      <section>
        <Link to={ `/product/${id}` } data-testid="product-detail-link">
          <div data-testid={ dataTestid }>
            <hr />
            <img src={ thumbnail } alt={ title } />
            <h2>{ title }</h2>
            <h3>{ priceFormatted }</h3>
          </div>
        </Link>
        <button
          type="button"
          onClick={ () => onAddToCart(id) }
          // onClick={ this.handleAddBtn }
          data-testid="product-add-to-cart"
          name={ id }
        >
          Adicionar ao Carrinho
        </button>
      </section>
    );
  }
}

Card.propTypes = {
  id: PropTypes.string.isRequired,
  thumbnail: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  onAddToCart: PropTypes.func.isRequired,
  dataTestid: PropTypes.string.isRequired,
};

// Card.defaultProps = {
//   onAddToCart: () => '',
// };

export default Card;
