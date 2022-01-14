/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
import React, { useState, useContext, useEffect } from 'react';
import context from '../context/Context';

function Filters() {
  const { planets, filteredPlanets, setFilteredPlanets } = useContext(context);
  const [columnFilterData, setColumnFilterData] = useState(['population', 'orbital_period', 'diameter', 'rotation_period', 'surface_water']);
  const [filtersByNumericValues, setFiltersByNumericValues] = useState([]);
  const [currentFilter, setCurrentFilter] = useState({
    column: 'population',
    comparison: 'maior que',
    value: '0',
  });

  const handleChange = ({ target: { name, value } }) => {
    setCurrentFilter({ ...currentFilter, [name]: value });
  };

  // Remove a option selecionada do input e depois add o filtro atual no array de filtros
  const handleFilterClick = () => {
    const columnValue = document.getElementById('column').value;
    setColumnFilterData(columnFilterData.filter((option) => option !== columnValue));
    setFiltersByNumericValues([...filtersByNumericValues, currentFilter]);
  };

  const handleDeleteFilterClick = ({ target: { value } }) => {
    setFilteredPlanets(planets);
    setFiltersByNumericValues(filtersByNumericValues.filter((filter) => filter.column !== value));
    setColumnFilterData([...columnFilterData, value]);
  };

  // Atualiza o estado do filtro atual quando a option é removida
  useEffect(() => {
    const columnValue = document.getElementById('column').value;
    setCurrentFilter({ ...currentFilter, column: columnValue });
  }, [columnFilterData]);

  // Aplica todos os filtros
  useEffect(() => {
    filtersByNumericValues.forEach((filter) => {
      if (filter.comparison === 'maior que') {
        setFilteredPlanets(filteredPlanets.filter((planet) => planet[filter.column] > +filter.value));
      } else if (filter.comparison === 'menor que') {
        setFilteredPlanets(filteredPlanets.filter((planet) => planet[filter.column] < +filter.value));
      } else {
        setFilteredPlanets(filteredPlanets.filter((planet) => planet[filter.column] === filter.value));
      }
    });
  }, [filtersByNumericValues]);

  return (
    <div>
      <div>
        <label htmlFor="column-filter">
          Column
          <select
            data-testid="column-filter"
            id="column"
            name="column"
            onChange={ handleChange }
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
          Operator
          <select
            data-testid="comparison-filter"
            id="comparison"
            name="comparison"
            onChange={ handleChange }
            value={ currentFilter.comparison }
          >
            <option value="maior que">maior que</option>
            <option value="menor que">menor que</option>
            <option value="igual a">igual a</option>
          </select>
        </label>
        <label htmlFor="value">
          Number
          <input
            type="number"
            data-testid="value-filter"
            id="value"
            name="value"
            onChange={ handleChange }
            value={ currentFilter.value }
          />
        </label>
        <button
          type="button"
          data-testid="button-filter"
          onClick={ handleFilterClick }
          disabled={ columnFilterData.length === 0 }
        >
          Filtrar
        </button>
      </div>
      <div>
        {
          filtersByNumericValues.map((filter, index) => (
            <div key={ index } data-testid="filter">
              <p>{`${filter.column} ${filter.comparison} ${filter.value}`}</p>
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
    </div>
  );
}

export default Filters;
