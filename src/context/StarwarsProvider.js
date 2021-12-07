import React, { Component } from 'react';
import PropTypes from 'prop-types';
import starwarsContext from './StarwarsContext';

class StarwarsProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      planets: [],
    };

    this.fetchPlanets = this.fetchPlanets.bind(this);
  }

  async fetchPlanets() {
    await fetch('https://swapi-trybe.herokuapp.com/api/planets/')
      .then((response) => response.json())
      .then((response) => this.setState({
        planets: response.results,
      }));
  }

  render() {
    this.fetchPlanets();
    const { children } = this.props;
    const { planets } = this.state;
    const contextValue = {
      planets,
    };
    return (
      <starwarsContext.Provider value={ contextValue }>
        { children }
      </starwarsContext.Provider>
    );
  }
}

StarwarsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default StarwarsProvider;
