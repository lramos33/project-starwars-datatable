import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import context from './Context';

function Provider({ children }) {
  const [planets, setPlanets] = useState([]);
  const [filteredPlanets, setFilteredPlanets] = useState([]);

  useEffect(() => {
    async function fetchPlanets() {
      await fetch('https://swapi-trybe.herokuapp.com/api/planets/')
        .then((response) => response.json())
        .then((response) => {
          setPlanets(response.results);
          setFilteredPlanets(response.results);
        });
    }
    fetchPlanets();
  }, []);

  const contextValue = {
    planets,
    filteredPlanets,
    setFilteredPlanets,
  };

  return (
    <context.Provider value={ contextValue }>
      { children }
    </context.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
