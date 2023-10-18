import { useEffect, useState } from 'react';
import { fetchPlanets } from '../services/api';
import { PlanetsContext } from './planets-context';
import { FiltersType, PlanetType, PlanetsContextProps } from '../types';

function PlanetsProvider({ children }: PlanetsContextProps) {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [noResults, setNoResults] = useState<boolean>(false);
  const [planets, setPlanets] = useState<PlanetType[]>([]);
  const [filteredPlanets, setFilteredPlanets] = useState<PlanetType[]>([]);
  const [filters, setFilters] = useState<FiltersType>({
    nameFilter: '',
    columnFilter: 'population',
    comparisonFilter: 'maior que',
    valueFilter: 0,
  });
  const [savedFilters, setSavedFilters] = useState<FiltersType[]>([]);

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

  const handleFilters = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const filterByName = (value: string) => {
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

  const handleNameFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setFilters({ ...filters, nameFilter: value });

    filterByName(value);
  };

  const handleFilterBtn = () => {
    const filtersList = [...savedFilters, filters];
    let filtered: PlanetType[] = [];
    filtersList.forEach(({ columnFilter, comparisonFilter, valueFilter }) => {
      if (comparisonFilter === 'maior que') {
        filtered = filteredPlanets.filter((planet) => (
          +planet[columnFilter] > +valueFilter
        ));
      } else if (comparisonFilter === 'menor que') {
        filtered = filteredPlanets.filter((planet) => (
          +planet[columnFilter] < +valueFilter
        ));
      } else if (comparisonFilter === 'igual a') {
        filtered = filteredPlanets.filter((planet) => (
          +planet[columnFilter] === +valueFilter
        ));
      }

      if (filtered.length === 0) {
        setNoResults(true);
      } else {
        setFilteredPlanets(filtered);
        setSavedFilters(filtersList);
        setNoResults(false);
      }
    });
  };

  return (
    <PlanetsContext.Provider
      value={
      { filteredPlanets,
        isLoading,
        handleNameFilter,
        noResults,
        filters,
        setFilters,
        handleFilters,
        handleFilterBtn,
        savedFilters,
        planets }
}
    >
      {children}
    </PlanetsContext.Provider>
  );
}

export default PlanetsProvider;
