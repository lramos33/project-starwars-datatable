import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import starwarsContext from './StarwarsContext';

function StarwarsProvider({ children }) {
  // Data states
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState(data);
  // Filter states
  const [name, setName] = useState('');
  const [column, setColumn] = useState('population');
  const [operator, setOperator] = useState('greater_than');
  const [number, setNumber] = useState(0);

  // handleChange functions
  const onPlanetNameInputChange = ({ target }) => {
    const { value } = target;
    setName(value);
  };

  const onColumnInputChange = ({ target }) => {
    const { value } = target;
    setColumn(value);
  };

  const onOperatorInputChange = ({ target }) => {
    const { value } = target;
    setOperator(value);
  };

  const onNumberInputChange = ({ target }) => {
    const { value } = target;
    setNumber(value);
  };

  // Fetch data on componentDidMount
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

  // Filter planets by name
  useEffect(() => {
    setFilteredData(data.filter((planet) => planet.name.includes(name)));
  }, [data, name, setFilteredData]);

  const contextValue = {
    data,
    filteredData,
    name,
    column,
    operator,
    number,
    // setData,
    // setName,
    // setColumn,
    // setOperator,
    // setNumber,
    setFilteredData,
    onPlanetNameInputChange,
    onColumnInputChange,
    onOperatorInputChange,
    onNumberInputChange,
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
