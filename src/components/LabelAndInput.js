import React, { Component } from 'react';
import PropTypes from 'prop-types';

class LabelAndInput extends Component {
  render() {
    const {
      labelContent,
      inputID,
      inputType,
      inputValue,
      onInputChange,
      dataTestid,
    } = this.props;
    return (
      <section>
        <label htmlFor={ inputID }>{ labelContent }</label>
        <br />
        <input
          type={ inputType }
          id={ inputID }
          value={ inputValue }
          onChange={ onInputChange }
          data-testid={ dataTestid }
        />
      </section>
    );
  }
}

LabelAndInput.propTypes = {
  labelContent: PropTypes.string.isRequired,
  inputID: PropTypes.string.isRequired,
  inputType: PropTypes.string.isRequired,
  dataTestid: PropTypes.string,
};

LabelAndInput.defaultProps = {
  dataTestid: '',
};

export default LabelAndInput;
