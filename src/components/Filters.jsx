import React, { useContext } from 'react';
import StarwarsContext from '../context/StarwarsContext';

function Filters() {
  const {
    number,
    onColumnInputChange,
    onOperatorInputChange,
    onNumberInputChange,
  } = useContext(StarwarsContext);

  return (
    <>
      <label htmlFor="column">
        <p>Column</p>
        <select
          name="column"
          onChange={ onColumnInputChange }
          data-testid="column-filter"
        >
          <option value="population">population</option>
          <option value="orbital_period">orbital_period</option>
          <option value="diameter">diameter</option>
          <option value="rotation_period">rotation_period</option>
          <option value="surface_water">surface_water</option>
        </select>
      </label>

      <label htmlFor="column">
        <p>Operator</p>
        <select
          name="column"
          onChange={ onOperatorInputChange }
          data-testid="comparison-filter"
        >
          <option value="greater_than">maior que</option>
          <option value="less_than">menor que</option>
          <option value="equal_to">igual a</option>
        </select>
      </label>

      <label htmlFor="number">
        <p>Number</p>
        <input
          type="number"
          name="number"
          value={ number }
          onChange={ onNumberInputChange }
          data-testid="value-filter"
        />
      </label>

      <button type="button" data-testid="button-filter">
        Filtrar
      </button>
    </>
  );
}

export default Filters;
