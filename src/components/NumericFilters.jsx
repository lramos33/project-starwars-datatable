import React, { useState, useContext, useEffect } from 'react';
import context from '../context/Context';
import {
  INITIAL_FILTER_STATE, OPERATOR_OPTIONS, COLUMN_OPTIONS } from '../services/constants';

function NumericFilters() {
  const { planets, filteredPlanets, setFilteredPlanets } = useContext(context);
  const [filtersByNumericValues, setFiltersByNumericValues] = useState([]);
  const [currentFilter, setCurrentFilter] = useState(INITIAL_FILTER_STATE);
  const [columnFilterData, setColumnFilterData] = useState(COLUMN_OPTIONS);

  const handleNumericFilterChange = ({ target: { name, value } }) => {
    setCurrentFilter({ ...currentFilter, [name]: value });
  };

  const handleFilterClick = () => {
    const columnValue = document.getElementById('column').value;
    setColumnFilterData(columnFilterData.filter((option) => option !== columnValue));
    setFiltersByNumericValues([...filtersByNumericValues, currentFilter]);
  };

  const handleDeleteFilterClick = ({ target: { value } }) => {
    setFilteredPlanets(planets);
    setFiltersByNumericValues(filtersByNumericValues.filter(
      (filter) => filter.column !== value,
    ));
    setColumnFilterData([...columnFilterData, value]);
  };

  useEffect(() => {
    const columnValue = document.getElementById('column').value;
    setCurrentFilter({ ...currentFilter, column: columnValue });
  }, [columnFilterData]);

  useEffect(() => {
    filtersByNumericValues.forEach((filter) => {
      if (filter.comparison === 'maior que') {
        setFilteredPlanets(filteredPlanets.filter(
          (planet) => planet[filter.column] > +filter.value,
        ));
      } else if (filter.comparison === 'menor que') {
        setFilteredPlanets(filteredPlanets.filter(
          (planet) => planet[filter.column] < +filter.value,
        ));
      } else {
        setFilteredPlanets(filteredPlanets.filter(
          (planet) => planet[filter.column] === filter.value,
        ));
      }
    });
  }, [filtersByNumericValues]);

  return (
    <>
      <div className="numeric-filters-container">
        <label htmlFor="column-filter">
          Column:
          <select
            className="column-input"
            data-testid="column-filter"
            id="column"
            name="column"
            onChange={ handleNumericFilterChange }
            value={ currentFilter.column }
          >
            {
              columnFilterData.map((option) => (
                <option key={ option } value={ option }>{ option }</option>
              ))
            }
          </select>
        </label>
        <label htmlFor="comparison">
          Operator:
          <select
            className="operator-input"
            data-testid="comparison-filter"
            id="comparison"
            name="comparison"
            onChange={ handleNumericFilterChange }
            value={ currentFilter.comparison }
          >
            {
              OPERATOR_OPTIONS.map((option, index) => (
                <option key={ index } value={ option }>{ option }</option>
              ))
            }
          </select>
        </label>
        <label htmlFor="value">
          Number:
          <input
            className="number-input"
            type="number"
            data-testid="value-filter"
            id="value"
            name="value"
            onChange={ handleNumericFilterChange }
            value={ currentFilter.value }
          />
        </label>
        <button
          className="filter-button"
          type="button"
          data-testid="button-filter"
          onClick={ handleFilterClick }
          disabled={ columnFilterData.length === 0 }
        >
          Filtrar
        </button>
      </div>
      <div className="applied-filters-container">
        {
          filtersByNumericValues.map((filter, index) => (
            <div key={ index } data-testid="filter">
              <span className="applied-filter">
                {`${filter.column} ${filter.comparison} ${filter.value}`}
              </span>
              <button
                type="button"
                onClick={ handleDeleteFilterClick }
                value={ filter.column }
              >
                X
              </button>
            </div>
          ))
        }
      </div>
    </>
  );
}

export default NumericFilters;
