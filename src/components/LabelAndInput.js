import React, { Component } from 'react';
import PropTypes from 'prop-types';

class LabelAndInput extends Component {
  render() {
    const { labelContent,
      inputID,
      inputType,
      dataTestid,
      inputValue,
      onInputChange } = this.props;

    return (
      <section>
        <label htmlFor={ inputID }>{ labelContent }</label>
        <br />
        <input
          type={ inputType }
          id={ inputID }
          data-testid={ dataTestid }
          value={ inputValue }
          onChange={ onInputChange }
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
  inputValue: PropTypes.string.isRequired,
  onInputChange: PropTypes.func.isRequired,
};

LabelAndInput.defaultProps = {
  dataTestid: '',
};

export default LabelAndInput;
