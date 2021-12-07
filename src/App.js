import React from 'react';
import StarwarsProvider from './context/StarwarsProvider';
import Table from './components/Table';
import './App.css';
import Header from './components/Header';

function App() {
  return (
    <StarwarsProvider>
      <Header />
      <Table />
    </StarwarsProvider>
  );
}

export default App;
