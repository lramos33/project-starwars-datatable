import React, { useState, useContext } from 'react';
import context from '../context/Context';
import { INITIAL_SORT_STATE, ORDER_OPTIONS } from '../services/constants';

function SortFilters() {
  const { filteredPlanets, setFilteredPlanets } = useContext(context);
  const [orderFilter, setOrderFilter] = useState(INITIAL_SORT_STATE);

  const handleSortInputChange = ({ target: { name, value } }) => {
    setOrderFilter({ ...orderFilter, [name]: value });
  };

  const handleOrderClick = () => {
    switch (orderFilter.sort) {
    case 'ASC':
      setFilteredPlanets([...filteredPlanets].sort(
        (a, b) => Number(a[orderFilter.column]) - Number(b[orderFilter.column]),
      ));
      break;
    case 'DESC':
      setFilteredPlanets([...filteredPlanets].sort(
        (a, b) => Number(b[orderFilter.column]) - Number(a[orderFilter.column]),
      ));
      break;
    default:
      break;
    }
  };

  return (
    <div className="sort-filters-container">
      <label htmlFor="column-sort">
        Ordenar:
        <select
          className="order-input"
          data-testid="column-sort"
          id="colum-sort"
          name="column"
          onChange={ handleSortInputChange }
        >
          {
            ORDER_OPTIONS.map((option, index) => (
              <option key={ index } value={ option }>{ option }</option>
            ))
          }
        </select>
      </label>
      <label htmlFor="asc">
        <input
          data-testid="column-sort-input-asc"
          id="asc"
          name="sort"
          type="radio"
          onChange={ handleSortInputChange }
          value="ASC"
        />
        Ascendente
      </label>
      <label htmlFor="desc">
        <input
          data-testid="column-sort-input-desc"
          id="desc"
          name="sort"
          type="radio"
          onChange={ handleSortInputChange }
          value="DESC"
        />
        Descendente
      </label>
      <button
        className="order-button"
        type="button"
        data-testid="column-sort-button"
        onClick={ handleOrderClick }
      >
        Ordenar
      </button>
    </div>
  );
}

export default SortFilters;
