import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import starwarsContext from './StarwarsContext';

function StarwarsProvider({ children }) {
  const [data, setData] = useState([]);
  const contextValue = {
    data,
  };

  useEffect(() => {
    async function fetchPlanets() {
      await fetch('https://swapi-trybe.herokuapp.com/api/planets/')
        .then((response) => response.json())
        .then((response) => setData(response.results));
    }
    fetchPlanets();
  }, []);

  return (
    <starwarsContext.Provider value={ contextValue }>
      { children }
    </starwarsContext.Provider>
  );
}

StarwarsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default StarwarsProvider;
