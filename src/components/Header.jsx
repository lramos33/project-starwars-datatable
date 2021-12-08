import React, { useContext } from 'react';
import StarwarsContext from '../context/StarwarsContext';

function Header() {
  const { filterByName, setFilterByName } = useContext(StarwarsContext);

  function handleChange({ target }) {
    const { value } = target;
    setFilterByName({ name: value });
  }

  return (
    <div>
      <h1 className="title">Projeto Starwars</h1>
      <label htmlFor="text">
        <input
          className="input-text"
          data-testid="name-filter"
          type="text"
          value={ filterByName.name }
          name="text"
          placeholder="Planet Name"
          onChange={ handleChange }
        />
      </label>
    </div>
  );
}

export default Header;
