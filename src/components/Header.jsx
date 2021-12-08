import React, { useContext } from 'react';
import StarwarsContext from '../context/StarwarsContext';

function Header() {
  const { name, onPlanetNameInputChange } = useContext(StarwarsContext);

  return (
    <div>
      <h1 className="title">Projeto Starwars</h1>
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
