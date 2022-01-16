const fetchPlanets = () => fetch('https://swapi-trybe.herokuapp.com/api/planets/')
  .then((response) => response.json())
  .then((response) => response.results)
  .then((data) => data.sort((a, b) => {
    const NEGATIVE_ONE = -1;
    if (a.name < b.name) return NEGATIVE_ONE;
    if (a.name > b.name) return 1;
    return 0;
  }));

export default fetchPlanets;
