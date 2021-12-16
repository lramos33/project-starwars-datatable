/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useContext, useEffect } from 'react';
import StarwarsContext from '../context/StarwarsContext';

function Filters() {
  const {
    data,
    filteredData,
    setFilteredData,
    columnFilter,
    setColumnFilter,
    operator,
    setOperator,
    number,
    setNumber,
    filterByNumericValue,
    setFilterByNumericValue,
  } = useContext(StarwarsContext);

  const [filterButtonsData, setFilterButtonsData] = useState([]);
  const [optionsColumnFilter, setOptionsColumnFilter] = useState([
    'population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water',
  ]);

  useEffect(() => {
    filterByNumericValue.forEach((filter) => {
      if (filter.operator === 'maior que') {
        setFilteredData(filteredData.filter(
          (planet) => planet[filter.columnFilter] > +filter.number,
        ));
      } else if (filter.operator === 'menor que') {
        setFilteredData(filteredData.filter(
          (planet) => planet[filter.columnFilter] < +filter.number,
        ));
      } else {
        setFilteredData(filteredData.filter(
          (planet) => planet[filter.columnFilter] === filter.number,
        ));
      }
    });
  }, [filterByNumericValue]);

  const handleFilterClick = () => {
    setOptionsColumnFilter(optionsColumnFilter.filter(
      (option) => option !== columnFilter,
    ));
    setColumnFilter(optionsColumnFilter[1]);
    setFilterByNumericValue([...filterByNumericValue, {
      columnFilter,
      operator,
      number,
    }]);
    setFilterButtonsData([...filterButtonsData, {
      columnFilter,
      operator,
      number,
    }]);
  };

  const deleteFilterButton = ({ target: { value } }) => {
    setFilteredData(data);
    setFilterByNumericValue(filterByNumericValue.filter(
      (filter) => filter.columnFilter !== value,
    ));
    setFilterButtonsData(filterButtonsData.filter(
      (filter) => filter.columnFilter !== value,
    ));
    optionsColumnFilter.push(value);
    setColumnFilter(optionsColumnFilter[0]);
  };

  return (
    <div>
      <div className="filters-container">
        <label htmlFor="column-filter">
          Column
          <select
            data-testid="column-filter"
            id="column-filter"
            name="column-filter"
            onChange={ ({ target: { value } }) => setColumnFilter(value) }
          >
            {
              optionsColumnFilter.map((option, index) => (
                <option key={ index } value={ option }>{ option }</option>
              ))
            }
          </select>
        </label>

        <label htmlFor="operator">
          Operator
          <select
            data-testid="comparison-filter"
            id="operator"
            name="operator"
            onChange={ ({ target: { value } }) => setOperator(value) }
          >
            <option value="maior que">maior que</option>
            <option value="menor que">menor que</option>
            <option value="igual a">igual a</option>
          </select>
        </label>

        <label htmlFor="number">
          Number
          <input
            data-testid="value-filter"
            id="number"
            name="number"
            onChange={ ({ target: { value } }) => setNumber(value) }
            type="number"
            value={ number }
          />
        </label>

        <button
          type="button"
          data-testid="button-filter"
          onClick={ handleFilterClick }
          disabled={ optionsColumnFilter.length === 0 }
        >
          Filtrar
        </button>

        <label htmlFor="column-sort">
          Ordenar
          <select
            data-testid="column-sort"
            id="colum-sort"
            name="column-sort"
            // onChange={ onColumnSortInputChange }
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
            data-testid="column-sort-input-asc"
            id="asc"
            name="type-sort"
            // onChange={ onSortFilterInputChange }
            type="radio"
            value="ASC"
          />
          Ascendente
        </label>

        <label htmlFor="desc">
          <input
            data-testid="column-sort-input-desc"
            id="desc"
            name="type-sort"
            // onChange={ onSortFilterInputChange }
            type="radio"
            value="DESC"
          />
          Descendente
        </label>

        <button type="button" data-testid="column-sort-button">
          Ordenar
        </button>
      </div>
      <div className="filters-buttons-container">
        {
          filterButtonsData.map((button, index) => (
            <div key={ index }>
              <span>{`${button.columnFilter} ${button.operator} ${button.number}`}</span>
              <button
                data-testid="filter"
                type="button"
                value={ button.columnFilter }
                onClick={ deleteFilterButton }
              >
                X
              </button>
            </div>
          ))
        }
      </div>
    </div>
  );
}

export default Filters;
