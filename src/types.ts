import { Dispatch, SetStateAction } from 'react';

export type PlanetType = {
  name: string,
  rotation_period: string,
  orbital_period: string,
  diameter: string,
  climate: string,
  gravity: string,
  terrain: string,
  surface_water: string,
  population: string,
  residents?: string[],
  films: string[],
  created: string,
  edited: string,
  url: string,
};

export type ColumnFilterValue = 'population' | 'orbital_period'
| 'diameter' | 'rotation_period' | 'surface_water';

export type FiltersType = {
  nameFilter: string,
  columnFilter: ColumnFilterValue,
  comparisonFilter: string,
  valueFilter: number,
};

export type PlanetsContextValue = {
  filteredPlanets: PlanetType[],
  planets: PlanetType[],
  isLoading: boolean,
  handleNameFilter: (e: React.ChangeEvent<HTMLInputElement>) => void,
  noResults: boolean,
  filters: FiltersType,
  setFilters: Dispatch<SetStateAction<FiltersType>>,
  handleFilters:(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void,
  handleFilterBtn: () => void,
  savedFilters: FiltersType[],
};

export type PlanetsContextProps = {
  children: React.ReactNode,
};
