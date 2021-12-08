import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import starwarsContext from './StarwarsContext';

function StarwarsProvider({ children }) {
  const [data, setData] = useState([]);
  const [filterByName, setFilterByName] = useState({ name: '' });
  const [filteredData, setFilteredData] = useState(data);
  const contextValue = {
    data,
    filterByName,
    setFilterByName,
    filteredData,
    setFilteredData,
  };

  // Faz o fetch assim que o componente é montado
  useEffect(() => {
    async function fetchPlanets() {
      await fetch('https://swapi-trybe.herokuapp.com/api/planets/')
        .then((response) => response.json())
        .then((response) => {
          setData(response.results);
          setFilteredData(response.results);
        });
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
