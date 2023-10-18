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
    comparisonFilter: '>',
    valueFilter: 0,
  });
  const [savedFilters, setSavedFilters] = useState<FiltersType[]>([]);

  // const { columnFilter, comparisonFilter, valueFilter } = filters;

  // const filteredPlanets = planets.filter(
  //   ({ name }) => name.match(new RegExp(filters.nameFilter, 'i')),
  // );

  // if (comparisonFilter === '>') {
  //   filteredPlanets = planets.filter((planet) => +planet[columnFilter] > +valueFilter);
  //   console.log(filteredPlanets);
  // } else if (comparisonFilter === '<') {
  //   filteredPlanets = planets.filter((planet) => +planet[columnFilter] < +valueFilter);
  // } else if (comparisonFilter === '=') {
  //   filteredPlanets = planets.filter((planet) => (
  //     +planet[columnFilter] === +valueFilter
  //   ));
  // }

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

  const filterPlanets = (filterList) => {
    filterList.forEach(({ columnFilter, comparisonFilter, valueFilter }) => {
      // let filtered: PlanetType[] = [];
      if (comparisonFilter === '>') {
        const filtered = filteredPlanets.filter((planet) => (
          +planet[columnFilter] > +valueFilter
        ));
        setFilteredPlanets(filtered);
        console.log(filtered);
      } else if (comparisonFilter === '<') {
        const filtered = filteredPlanets.filter((planet) => (
          +planet[columnFilter] < +valueFilter
        ));
        setFilteredPlanets(filtered);
      } else if (comparisonFilter === '=') {
        const filtered = filteredPlanets.filter((planet) => (
          +planet[columnFilter] === +valueFilter
        ));
        setFilteredPlanets(filtered);
      }

      setSavedFilters(filterList);
      // if (filtered.length === 0) {
      //   setNoResults(true);
      // } else {
      //   setFilteredPlanets(filtered);
      //   setNoResults(false);
      // }
    });
  };

  const handleFilterBtn = () => {
    const filtersList = [...savedFilters, filters];
    let filtered: PlanetType[] = [];
    filtersList.forEach(({ columnFilter, comparisonFilter, valueFilter }) => {
      if (comparisonFilter === '>') {
        filtered = filteredPlanets.filter((planet) => (
          +planet[columnFilter] > +valueFilter
        ));
      } else if (comparisonFilter === '<') {
        filtered = filteredPlanets.filter((planet) => (
          +planet[columnFilter] < +valueFilter
        ));
      } else if (comparisonFilter === '=') {
        filtered = filteredPlanets.filter((planet) => (
          +planet[columnFilter] === +valueFilter
        ));
      }

      setFilteredPlanets(filtered);
      setSavedFilters(filtersList);
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
