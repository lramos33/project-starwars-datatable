import React from 'react';

function Header() {
  return (
    <div>
      <h1 className="title">Projeto Starwars</h1>
      <label htmlFor="name">
        <input
          type="text"
          id="name"
          placeholder="Planet Name"
          className="input-text"
          data-testid="name-filter"
        />
      </label>
    </div>
  );
}

export default Header;
