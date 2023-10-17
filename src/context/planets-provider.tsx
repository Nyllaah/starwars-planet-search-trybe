import { useEffect, useState } from 'react';
import { fetchPlanets } from '../services/api';
import { PlanetsContext } from './planets-context';
import { PlanetType, PlanetsContextProps } from '../types';

function PlanetsProvider({ children }: PlanetsContextProps) {
  const [planets, setPlanets] = useState<PlanetType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [nameFilter, setNameFilter] = useState<string>('');

  const filteredPlanets = planets.filter(
    ({ name }) => name.match(new RegExp(nameFilter, 'i')),
  );

  const handleNameFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setNameFilter(value);
  };

  useEffect(() => {
    async function fetchData() {
      try {
        let data = await fetchPlanets();
        data = data.map((planet: any) => {
          delete planet.residents;
          return planet;
        });
        setPlanets(data);
        setIsLoading(false);
      } catch (error: any) {
        throw new Error(`Failed to load table: ${error.message}`);
      }
    }

    fetchData();
  }, []);

  return (
    <PlanetsContext.Provider
      value={
      { planets: filteredPlanets, isLoading, nameFilter, handleNameFilter }
}
    >
      {children}
    </PlanetsContext.Provider>
  );
}

export default PlanetsProvider;
