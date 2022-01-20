import React, { Component } from 'react';
import PropTypes from 'prop-types';
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
    const { onChangeEvent } = this.props;
    return (
      <aside>
        {
          dataCategories.map((element) => (
            <label
              key={ element.id }
              htmlFor={ element.id }
              name="radioButton-for-category"
              data-testid="category"
            >
              <input
                type="radio"
                id={ element.id }
                name="radioButton-for-category"
                onChange={ onChangeEvent }
              />
              { element.name }
            </label>
          ))
        }
      </aside>
    );
  }
}

AsideCategoriesMenu.propTypes = {
  onChangeEvent: PropTypes.func,
};

AsideCategoriesMenu.defaultProps = {
  onChangeEvent: () => '',
};

export default AsideCategoriesMenu;
