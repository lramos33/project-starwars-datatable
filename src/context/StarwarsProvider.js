import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import starwarsContext from './StarwarsContext';

function StarwarsProvider({ children }) {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  const [columnFilter, setColumnFilter] = useState('population');
  const [operator, setOperator] = useState('maior que');
  const [number, setNumber] = useState(0);

  const [filterByNumericValue, setFilterByNumericValue] = useState([]);

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

  const contextValue = {
    data,
    filteredData,
    columnFilter,
    operator,
    number,
    filterByNumericValue,
    setFilterByNumericValue,
    setFilteredData,
    setColumnFilter,
    setOperator,
    setNumber,
  };

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
