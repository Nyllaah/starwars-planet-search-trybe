import { useEffect, useState } from 'react';
import { fetchPlanets } from '../services/api';
import { PlanetsContext } from './planets-context';
import { FiltersType, PlanetType, PlanetsContextProps } from '../types';

function PlanetsProvider({ children }: PlanetsContextProps) {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [noResults, setNoResults] = useState<boolean>(false);
  const [planets, setPlanets] = useState<PlanetType[]>([]);
  const [filteredPlanets, setFilteredPlanets] = useState<PlanetType[]>([]);
  const [nameFilter, setNameFilter] = useState<string>('');
  const [savedFilters, setSavedFilters] = useState<FiltersType[]>([]);
  const [filters, setFilters] = useState<FiltersType>({
    columnFilter: 'population',
    comparisonFilter: 'maior que',
    valueFilter: 0,
  });

  useEffect(() => {
    async function fetchData() {
      try {
        let data = await fetchPlanets();
        data = data.map((planet: PlanetType) => {
          delete planet.residents;
          return planet;
        });
        setPlanets(data);
        setFilteredPlanets(data);
        setIsLoading(false);
      } catch (error: any) {
        throw new Error(`Failed to load table: ${error.message}`);
      }
    }

    fetchData();
  }, []);

  const handleNameFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setNameFilter(value);

    const filtered = planets.filter(
      ({ name }) => name.match(new RegExp(value, 'i')),
    );

    if (filtered.length === 0) {
      setNoResults(true);
    } else {
      setFilteredPlanets(filtered);
      setNoResults(false);
    }
  };

  const filterPlanets = (filtersList: FiltersType[]) => {
    let filtered = [...planets];

    if (filtersList.length === 0) {
      setFilteredPlanets(filtered);
      setFilters({
        columnFilter: 'population',
        comparisonFilter: 'maior que',
        valueFilter: 0,
      });
    } else {
      filtersList.forEach(({ columnFilter, comparisonFilter, valueFilter }) => {
        if (comparisonFilter === 'maior que') {
          filtered = filtered.filter((planet) => (
            +planet[columnFilter] > +valueFilter
          ));
        } else if (comparisonFilter === 'menor que') {
          filtered = filtered.filter((planet) => (
            +planet[columnFilter] < +valueFilter
          ));
        } else if (comparisonFilter === 'igual a') {
          filtered = filtered.filter((planet) => (
            +planet[columnFilter] === +valueFilter
          ));
        }
      });
      setSavedFilters(filtersList);
      setFilters({
        columnFilter: filtersList[0].columnFilter,
        comparisonFilter: 'maior que',
        valueFilter: 0,
      });

      if (filtered.length === 0) {
        setNoResults(true);
      } else {
        setFilteredPlanets(filtered);
        setNoResults(false);
      }
    }
  };

  return (
    <PlanetsContext.Provider
      value={
      { filteredPlanets,
        isLoading,
        handleNameFilter,
        noResults,
        nameFilter,
        filters,
        setFilters,
        savedFilters,
        setSavedFilters,
        filterPlanets,
        planets }
}
    >
      {children}
    </PlanetsContext.Provider>
  );
}

export default PlanetsProvider;
