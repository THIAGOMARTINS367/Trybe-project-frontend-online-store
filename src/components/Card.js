import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class Card extends React.Component {
  render() {
    const { thumbnail, title, price, linkForId, dataTestid } = this.props;
    return (
      <Link to={ `/product/${linkForId}` } data-testid="product-detail-link">
        <div data-testid={ dataTestid }>
          <hr />
          <img src={ thumbnail } alt={ title } />
          <h3>{ title }</h3>
          <h2>{ price }</h2>
        </div>
      </Link>
    );
  }
}

Card.propTypes = {
  thumbnail: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  linkForId: PropTypes.string.isRequired,
  dataTestid: PropTypes.string.isRequired,
};

export default Card;
