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
    const { onEventChange } = this.props;

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
                onChange={ () => onEventChange(element.id) }
                // name={ element.id }
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
  onEventChange: PropTypes.func,
};

AsideCategoriesMenu.defaultProps = {
  onEventChange: () => '',
};

export default AsideCategoriesMenu;
