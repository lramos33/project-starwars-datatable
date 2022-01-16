import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import context from './Context';
import fetchPlanets from '../services/api';

function Provider({ children }) {
  const [planets, setPlanets] = useState([]);
  const [filteredPlanets, setFilteredPlanets] = useState([]);

  useEffect(() => {
    fetchPlanets()
      .then((data) => { setPlanets(data); return data; })
      .then((data) => { setFilteredPlanets(data); return data; });
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
