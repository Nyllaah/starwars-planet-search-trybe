import React, { useContext } from 'react';
import './App.css';
import Table from './components/Table';
import { PlanetsContext } from './context/planets-context';

function App() {
  const { nameFilter, handleNameFilter } = useContext(PlanetsContext);

  return (
    <>
      <header>
        <input
          type="text"
          data-testid="name-filter"
          value={ nameFilter }
          onChange={ handleNameFilter }
        />
      </header>

      <main>
        <Table />
      </main>
    </>
  );
}

export default App;
