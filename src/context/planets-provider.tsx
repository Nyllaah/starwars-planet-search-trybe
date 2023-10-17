import { useEffect, useState } from 'react';
import { fetchPlanets } from '../services/api';
import { PlanetsContext } from './planets-context';

type PlanetsContextProps = {
  children: React.ReactNode,
};

function PlanetsProvider({ children }: PlanetsContextProps) {
  const [planets, setPlanets] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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
    <PlanetsContext.Provider value={ { planets, isLoading } }>
      {children}
    </PlanetsContext.Provider>
  );
}

export default PlanetsProvider;
