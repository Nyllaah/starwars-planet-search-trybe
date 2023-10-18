import { useContext } from 'react';
import './App.css';
import Table from './components/Table';
import { PlanetsContext } from './context/planets-context';

function App() {
  const { handleNameFilter, filters,
    handleFilters, handleFilterBtn, savedFilters } = useContext(PlanetsContext);

  return (
    <>
      <header>
        <input
          type="text"
          data-testid="name-filter"
          value={ filters.nameFilter }
          onChange={ handleNameFilter }
        />
        <form>
          <select
            name="columnFilter"
            data-testid="column-filter"
            onChange={ handleFilters }
            value={ filters.columnFilter }
          >
            <option value="population">Population</option>
            <option value="orbital_period">Orbital Period</option>
            <option value="diameter">Diameter</option>
            <option value="rotation_period">Rotation Period</option>
            <option value="surface_water">Surface Water</option>
          </select>
          <select
            name="comparisonFilter"
            data-testid="comparison-filter"
            onChange={ handleFilters }
            value={ filters.comparisonFilter }
          >
            <option value="maior que">maior que</option>
            <option value="menor que">menor que</option>
            <option value="igual a">igual a</option>
          </select>
          <input
            type="number"
            name="valueFilter"
            data-testid="value-filter"
            onChange={ handleFilters }
            value={ filters.valueFilter }
          />
          <button
            onClick={ handleFilterBtn }
            type="button"
            data-testid="button-filter"
          >
            Filter

          </button>
        </form>
      </header>

      <main>
        {savedFilters.map(({ columnFilter, comparisonFilter, valueFilter }) => {
          return (
            <div key={ `${columnFilter}-${comparisonFilter}-${valueFilter}` }>
              <span>
                {`${columnFilter} ${comparisonFilter} ${valueFilter}`}
              </span>
              <button>Delete</button>
            </div>
          );
        })}
        <Table />
      </main>
    </>
  );
}

export default App;
