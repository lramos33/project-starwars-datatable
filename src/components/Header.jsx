import React, { useState, useContext, useEffect } from 'react';
import context from '../context/Context';

function Header() {
  const { planets, setFilteredPlanets } = useContext(context);
  const [planetName, setPlanetName] = useState('');

  useEffect(() => {
    setFilteredPlanets(planets.filter((planet) => planet.name.includes(planetName)));
  }, [planetName]);

  return (
    <div className="header">
      <h1>Projeto Starwars</h1>
      <label htmlFor="text">
        <input
          data-testid="name-filter"
          name="text"
          onChange={ ({ target: { value } }) => setPlanetName(value) }
          placeholder="Planet Name"
          type="text"
        />
      </label>
    </div>
  );
}

export default Header;
