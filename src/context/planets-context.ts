import { createContext } from 'react';

type PlanetsContextValue = {
  planets: any[],
  isLoading: boolean,
};

export const PlanetsContext = createContext({} as PlanetsContextValue);
