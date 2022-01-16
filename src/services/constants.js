export const COLUMN_OPTIONS = [
  'population',
  'orbital_period',
  'diameter',
  'rotation_period',
  'surface_water',
];

export const OPERATOR_OPTIONS = [
  'maior que',
  'menor que',
  'igual a',
];

export const ORDER_OPTIONS = [
  'population',
  'orbital_period',
  'diameter',
  'rotation_period',
  'surface_water',
];

export const INITIAL_SORT_STATE = {
  column: 'population',
  sort: 'ASC',
};

export const INITIAL_FILTER_STATE = {
  column: 'population',
  comparison: 'maior que',
  value: '0',
};
