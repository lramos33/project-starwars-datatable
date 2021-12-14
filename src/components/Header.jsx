/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useContext, useEffect } from 'react';
import StarwarsContext from '../context/StarwarsContext';

function Header() {
  const { data, setFilteredData } = useContext(StarwarsContext);
  const [name, setName] = useState('');

  const onPlanetNameInputChange = ({ target }) => {
    const { value } = target;
    setName(value);
  };

  useEffect(() => {
    setFilteredData(data.filter((planet) => planet.name.includes(name)));
  }, [name]);

  return (
    <div className="header">
      <h1>Projeto Starwars</h1>
      <label htmlFor="text">
        <input
          className="input-text"
          data-testid="name-filter"
          type="text"
          value={ name }
          name="text"
          placeholder="Planet Name"
          onChange={ onPlanetNameInputChange }
        />
      </label>
    </div>
  );
}

export default Header;
