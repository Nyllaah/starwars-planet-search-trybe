import { useContext, useEffect } from 'react';
import './App.css';
import Table from './components/Table';
import { PlanetsContext } from './context/planets-context';
import { ColumnFilterValue } from './types';

function App() {
  const { handleNameFilter, filters, setFilters,
    handleFilters, handleFilterBtn, savedFilters } = useContext(PlanetsContext);

  const filtersToCheck: ColumnFilterValue[] = ['population', 'orbital_period',
    'diameter', 'rotation_period', 'surface_water'];

  const filtersNotToDuplicate = savedFilters.map(({ columnFilter }) => columnFilter);

  const filtersToRender: ColumnFilterValue[] = [];

  filtersToCheck.forEach((filter: ColumnFilterValue) => {
    if (!filtersNotToDuplicate.includes(filter)) {
      filtersToRender.push(filter);
    }
  });

  useEffect(() => {
    setFilters({ ...filters, columnFilter: filtersToRender[0] });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [savedFilters.length]);

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
            {filtersToRender.map((filter: string) => {
              return <option key={ filter } value={ filter }>{filter}</option>;
            })}
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
