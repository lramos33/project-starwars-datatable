import React from 'react';
import Provider from './context/Provider';
import './App.css';
import Table from './components/Table';
import Header from './components/Header';
import NumericFilters from './components/NumericFilters';
import SortFilters from './components/SortFilters';

function App() {
  return (
    <Provider>
      <Header />
      <SortFilters />
      <NumericFilters />
      <Table />
    </Provider>
  );
}

export default App;
