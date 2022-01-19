import React, { Component } from 'react';
import LabelAndInput from '../components/LabelAndInput';

class Home extends Component {
  render() {
    return (
      <main>
        <LabelAndInput
          labelContent="Procurar"
          inputID="input-search-product"
          inputType="text"
        />
        <span data-testid="home-initial-message">
          Digite algum termo de pesquisa ou escolha uma categoria.
        </span>
      </main>
    );
  }
}

export default Home;
