import React, { useState, useContext } from 'react';
import StarwarsContext from '../context/StarwarsContext';

function Filters() {
  const [columnFilter, setColumnFilter] = useState('population');
  const [operator, setOperator] = useState('greater_than');
  const [number, setNumber] = useState(0);
  const [columnSort, setColumnSort] = useState('population');
  const [sortFilter, setSortFilter] = useState('ASC');

  // Start of Handle change functions
  const onColumnFilterInputChange = ({ target }) => {
    const { value } = target;
    setColumnFilter(value);
  };

  const onOperatorInputChange = ({ target }) => {
    const { value } = target;
    setOperator(value);
  };

  const onNumberInputChange = ({ target }) => {
    const { value } = target;
    setNumber(value);
  };

  const onColumnSortInputChange = ({ target }) => {
    const { value } = target;
    setColumnSort(value);
  };

  const onSortFilterInputChange = ({ target }) => {
    const { value } = target;
    setSortFilter(value);
  };
  // End of Handle change functions

  return (
    <div className="filters-container">

      <label htmlFor="column-filter">
        Column
        <select
          id="column-filter"
          name="column-filter"
          data-testid="column-filter"
          onChange={ onColumnFilterInputChange }
        >
          <option value="population">population</option>
          <option value="orbital_period">orbital_period</option>
          <option value="diameter">diameter</option>
          <option value="rotation_period">rotation_period</option>
          <option value="surface_water">surface_water</option>
        </select>
      </label>

      <label htmlFor="operator">
        Operator
        <select
          id="operator"
          name="operator"
          data-testid="comparison-filter"
          onChange={ onOperatorInputChange }
        >
          <option value="greater_than">maior que</option>
          <option value="less_than">menor que</option>
          <option value="equal_to">igual a</option>
        </select>
      </label>

      <label htmlFor="number">
        Number
        <input
          id="number"
          type="number"
          name="number"
          value={ number }
          data-testid="value-filter"
          onChange={ onNumberInputChange }
        />
      </label>

      <button type="button" data-testid="button-filter">
        Filtrar
      </button>

      <label htmlFor="column-sort">
        Ordenar
        <select
          id="colum-sort"
          name="column-sort"
          data-testid="column-sort"
          onChange={ onColumnSortInputChange }
        >
          <option value="population">population</option>
          <option value="orbital_period">orbital_period</option>
          <option value="diameter">diameter</option>
          <option value="rotation_period">rotation_period</option>
          <option value="surface_water">surface_water</option>
        </select>
      </label>

      <label htmlFor="asc">
        <input
          type="radio"
          id="asc"
          value="ASC"
          name="type-sort"
          data-testid="column-sort-input-asc"
          onChange={ onSortFilterInputChange }
        />
        Ascendente
      </label>

      <label htmlFor="desc">
        <input
          type="radio"
          id="desc"
          value="DESC"
          name="type-sort"
          data-testid="column-sort-input-desc"
          onChange={ onSortFilterInputChange }
        />
        Descendente
      </label>

      <button type="button" data-testid="column-sort-button">
        Ordenar
      </button>
    </div>
  );
}

export default Filters;
