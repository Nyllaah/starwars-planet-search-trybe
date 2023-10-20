import { useContext, useEffect, useState } from 'react';
import './App.css';
import Table from './components/Table';
import { PlanetsContext } from './context/planets-context';
import { ColumnFilterValue, SortingType } from './types';

function App() {
  const {
    handleNameFilter,
    nameFilter,
    filters,
    setFilters,
    savedFilters,
    setSavedFilters,
    filterPlanets,
    filteredPlanets,
    setFilteredPlanets,
  } = useContext(PlanetsContext);

  const [sorting, setSorting] = useState<SortingType>({
    columnSort: 'population',
    sortingMethod: '',
  });

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
    setFilters({
      columnFilter: filtersToRender[0],
      comparisonFilter: 'maior que',
      valueFilter: 0,
    });
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
    const { id } = e.target as HTMLButtonElement;
    const filtersList = savedFilters.filter(({ columnFilter }) => {
      return columnFilter !== id;
    });

    filterPlanets(filtersList);
  };

  const handleSortingIpts = (
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>,
  ) => {
    const { name, value } = e.target;
    setSorting({ ...sorting, [name]: value });
  };

  const sortPlanets = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { columnSort, sortingMethod } = sorting;
    let sortedList = [...filteredPlanets];

    const unknownValues = sortedList.filter((planet) => planet[columnSort] === 'unknown');
    sortedList = sortedList.filter((planet) => planet[columnSort] !== 'unknown');

    if (sortingMethod === 'ASC') {
      sortedList = sortedList.sort((a, b) => +a[columnSort] - +b[columnSort]);
    } else if (sortingMethod === 'DESC') {
      sortedList = sortedList.sort((a, b) => +b[columnSort] - +a[columnSort]);
    }

    setFilteredPlanets([...sortedList, ...unknownValues]);
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
              return (
                <option
                  data-testid="column-filter-opt"
                  key={ filter }
                  value={ filter }
                >
                  {filter}
                </option>
              );
            })}
          </select>
          <select
            name="comparisonFilter"
            data-testid="comparison-filter"
            onChange={ handleFilters }
            value={ filters.comparisonFilter }
          >
            <option
              data-testid="comparison-filter-opt"
              value="maior que"
            >
              maior que

            </option>
            <option
              data-testid="comparison-filter-opt"
              value="menor que"
            >
              menor que

            </option>
            <option
              data-testid="comparison-filter-opt"
              value="igual a"
            >
              igual a

            </option>
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
        <form onSubmit={ sortPlanets }>
          <label htmlFor="column-sort">
            Ordenar:
            <select
              name="columnSort"
              id="column-sort"
              data-testid="column-sort"
              onChange={ handleSortingIpts }
            >
              {filtersToRender.map((filter: string) => {
                return (
                  <option
                    data-testid="column-filter-opt"
                    key={ filter }
                    value={ filter }
                  >
                    {filter}
                  </option>
                );
              })}
            </select>
          </label>
          <label htmlFor="column-sort-input-asc">
            <input
              type="radio"
              name="sortingMethod"
              id="column-sort-input-asc"
              data-testid="column-sort-input-asc"
              value="ASC"
              onChange={ handleSortingIpts }
            />
            Ascendente
          </label>
          <label htmlFor="column-sort-input-desc">
            <input
              type="radio"
              name="sortingMethod"
              id="column-sort-input-desc"
              data-testid="column-sort-input-desc"
              value="DESC"
              onChange={ handleSortingIpts }
            />
            Descendente
          </label>
          <button data-testid="column-sort-button">Ordernar</button>
        </form>
      </header>

      <main>
        {savedFilters.length === 0 ? (
          <span data-testid="no-filters">Sem filtros aplicados</span>
        )
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
