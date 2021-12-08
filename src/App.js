import React from 'react';
import StarwarsProvider from './context/StarwarsProvider';
import Header from './components/Header';
import Filters from './components/Filters';
import Table from './components/Table';
import './App.css';

function App() {
  return (
    <StarwarsProvider>
      <Header />
      <Filters />
      <Table />
    </StarwarsProvider>
  );
}

export default App;
