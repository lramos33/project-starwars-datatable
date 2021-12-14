import React, { useState, useContext, useEffect } from 'react';
import StarwarsContext from '../context/StarwarsContext';

function Filters() {
  const { filteredData, setFilteredData } = useContext(StarwarsContext);
  const [optionsColumnFilter, setOptionsColumnFilter] = useState([
    'population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water',
  ]);
  const [columnFilter, setColumnFilter] = useState('population');
  const [operator, setOperator] = useState('maior que');
  const [number, setNumber] = useState(0);
  const [columnSort, setColumnSort] = useState('population');
  console.log(columnSort);
  const [sortFilter, setSortFilter] = useState('ASC');
  console.log(sortFilter);
  const [filterByNumericValues, setFilterByNumericValues] = useState({
    column: columnFilter,
    comparison: operator,
    value: number,
  });

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

  useEffect(() => {
    setFilterByNumericValues({
      column: columnFilter,
      comparison: operator,
      value: number,
    });
  }, [columnFilter, operator, number]);

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
    setColumnFilter(optionsColumnFilter[0]);
  };

  return (
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
  );
}

export default Filters;
