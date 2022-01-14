import React from 'react';
import Provider from './context/Provider';
import './App.css';
import Table from './components/Table';
import Header from './components/Header';
import Filters from './components/Filters';

function App() {
  return (
    <Provider>
      <Header />
      <Filters />
      <Table />
    </Provider>
  );
}

export default App;
