import React, { Component } from 'react';
import { getCategories } from '../services/api';

class AsideCategoriesMenu extends Component {
  constructor() {
    super();

    this.state = {
      dataCategories: [],
    };
  }

  componentDidMount() {
    getCategories().then((data) => this.setState({ dataCategories: data }));
  }

  render() {
    const { dataCategories } = this.state;
    return (
      <aside>
        {dataCategories.map((element) => (
          <label key={ element.id } htmlFor={ element.id } data-testid="category">
            <input type="radio" id={ element.id } />
            { element.name }
          </label>
        ))}
      </aside>
    );
  }
}

export default AsideCategoriesMenu;
