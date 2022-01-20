import React from 'react';
import PropTypes from 'prop-types';

class Card extends React.Component {
  render() {
    const { thumbnail, title, price, dataTestid } = this.props;
    return (
      <div data-testid={ dataTestid }>
        <img src={ thumbnail } alt={ title } />
        <h3>{ title }</h3>
        <h2>{ price }</h2>
      </div>
    );
  }
}

Card.propTypes = {
  thumbnail: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  dataTestid: PropTypes.string.isRequired,
};

export default Card;
