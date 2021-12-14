/* eslint-disable no-unused-vars */
import React, { useState, useContext, useEffect } from 'react';
import StarwarsContext from '../context/StarwarsContext';

function Filters() {
  const { data, filteredData, setFilteredData } = useContext(StarwarsContext);

  // Start of render states
  const [filterButtonsData, setFilterButtonsData] = useState([]);
  const [optionsColumnFilter, setOptionsColumnFilter] = useState([
    'population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water',
  ]);
  // End of render states

  // Start of filter states
  const [columnFilter, setColumnFilter] = useState('population');
  const [operator, setOperator] = useState('maior que');
  const [number, setNumber] = useState(0);
  const [columnSort, setColumnSort] = useState('population');
  const [sortFilter, setSortFilter] = useState('ASC');
  const [filterByNumericValues, setFilterByNumericValues] = useState([{
    column: columnFilter,
    comparison: operator,
    value: number,
  }]);
  // End of filter states

  // Start of Handle change functions
  const onColumnFilterInputChange = ({ target: { value } }) => {
    setColumnFilter(value);
  };

  const onOperatorInputChange = ({ target: { value } }) => {
    setOperator(value);
  };

  const onNumberInputChange = ({ target: { value } }) => {
    setNumber(value);
  };

  const onColumnSortInputChange = ({ target: { value } }) => {
    setColumnSort(value);
  };

  const onSortFilterInputChange = ({ target: { value } }) => {
    setSortFilter(value);
  };
  // End of Handle change functions

  useEffect(() => {
    setFilterByNumericValues({
      column: columnFilter,
      comparison: operator,
      value: number,
    });
  }, [columnFilter, operator, number, optionsColumnFilter]);

  const applyFilter = () => {
    const { column, comparison, value } = filterByNumericValues;
    if (comparison === 'maior que') {
      setFilteredData(filteredData.filter((planet) => planet[column] > +value));
    } else if (comparison === 'menor que') {
      setFilteredData(filteredData.filter((planet) => planet[column] < +value));
    } else {
      setFilteredData(filteredData.filter((planet) => planet[column] === value));
    }
    setOptionsColumnFilter(optionsColumnFilter.filter((option) => option !== column));
    setColumnFilter(optionsColumnFilter[1]);
    setFilterButtonsData([...filterButtonsData, {
      column,
      comparison,
      value,
    }]);
  };

  const deleteFilter = ({ target: { value } }) => {
    setFilterButtonsData(filterButtonsData.filter((filter) => filter.column !== value));
    optionsColumnFilter.push(value);
    setColumnFilter(optionsColumnFilter[0]);
    setFilteredData(data);
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
            onChange={ onColumnFilterInputChange }
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
            onChange={ onOperatorInputChange }
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
            onChange={ onNumberInputChange }
            type="number"
            value={ number }
          />
        </label>

        <button type="button" data-testid="button-filter" onClick={ applyFilter }>
          Filtrar
        </button>

        <label htmlFor="column-sort">
          Ordenar
          <select
            data-testid="column-sort"
            id="colum-sort"
            name="column-sort"
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
            data-testid="column-sort-input-asc"
            id="asc"
            name="type-sort"
            onChange={ onSortFilterInputChange }
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
            onChange={ onSortFilterInputChange }
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
          filterButtonsData.map((data, index) => (
            <div key={ index }>
              <span>{`${data.column} ${data.comparison} ${data.value}`}</span>
              <button data-testid="filter" onClick={ deleteFilter } type="button" value={ data.column }>X</button>
            </div>
          ))
        }
      </div>
    </div>
  );
}

export default Filters;
