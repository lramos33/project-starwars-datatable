import React, { useState, useContext, useEffect } from 'react';
import context from '../context/Context';

function Header() {
  const { planets, setFilteredPlanets } = useContext(context);
  const [planetName, setPlanetName] = useState('');

  // Toda vez que o planet name for alterado, o filtro é aplicado no array de planetas
  useEffect(() => {
    setFilteredPlanets(planets.filter((planet) => planet.name.includes(planetName)));
  }, [planetName]);

  return (
    <div>
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
