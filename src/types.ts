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

export type SortingType = {
  columnSort: ColumnFilterValue,
  sortingMethod: string,
};

export type FiltersType = {
  columnFilter: ColumnFilterValue,
  comparisonFilter: string,
  valueFilter: number,
};

export type PlanetsContextValue = {
  filteredPlanets: PlanetType[],
  planets: PlanetType[],
  isLoading: boolean,
  handleNameFilter: (e: React.ChangeEvent<HTMLInputElement>) => void,
  nameFilter: string,
  noResults: boolean,
  filterPlanets: (filterList: FiltersType[]) => void
  setFilteredPlanets: Dispatch<SetStateAction<PlanetType[]>>,
  filters: FiltersType,
  setFilters: Dispatch<SetStateAction<FiltersType>>,
  savedFilters: FiltersType[],
  setSavedFilters: Dispatch<SetStateAction<FiltersType[]>>,
};

export type PlanetsContextProps = {
  children: React.ReactNode,
};
