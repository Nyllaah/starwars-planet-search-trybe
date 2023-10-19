import { useContext, useEffect } from 'react';
import './App.css';
import Table from './components/Table';
import { PlanetsContext } from './context/planets-context';
import { ColumnFilterValue } from './types';

function App() {
  const {
    handleNameFilter,
    nameFilter,
    filters,
    setFilters,
    savedFilters,
    setSavedFilters,
    filterPlanets,
  } = useContext(PlanetsContext);

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

  const handleFilters = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const handleFilterBtn = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const filtersList = [...savedFilters, filters];
    filterPlanets(filtersList);
  };

  const clearAllFilters = () => {
    setSavedFilters([]);
    filterPlanets([]);
  };

  const deleteFilter = (e: React.MouseEvent<HTMLButtonElement>) => {
    const { id } = e.target;
    const filtersList = savedFilters.filter(({ columnFilter }) => {
      return columnFilter !== id;
    });

    if (filtersList.length === 0) {
      clearAllFilters();
    } else {
      filterPlanets(filtersList);
    }
  };

  return (
    <>
      <header>
        <input
          type="text"
          data-testid="name-filter"
          value={ nameFilter }
          onChange={ handleNameFilter }
        />
        <form onSubmit={ handleFilterBtn }>
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
            data-testid="button-filter"
          >
            Filtrar

          </button>
        </form>
      </header>

      <main>
        {savedFilters.length === 0 ? <span>Sem filtros aplicados</span>
          : (
            <>
              {savedFilters.map(({ columnFilter, comparisonFilter, valueFilter }) => {
                return (
                  <div
                    data-testid="filter"
                    key={ `${columnFilter}-${comparisonFilter}-${valueFilter}` }
                  >
                    <span>
                      {`${columnFilter} ${comparisonFilter} ${valueFilter}`}
                    </span>
                    <button id={ columnFilter } onClick={ deleteFilter }>X</button>
                  </div>
                );
              })}
              <button
                data-testid="button-remove-filters"
                onClick={ clearAllFilters }
              >
                Remover todas as filtragens

              </button>
            </>
          )}
        <Table />
      </main>
    </>
  );
}

export default App;
