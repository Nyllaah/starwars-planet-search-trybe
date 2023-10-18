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

export type FiltersType = {
  nameFilter: string,
  columnFilter: string,
  comparisonFilter: string,
  valueFilter: number,
};

export type PlanetsContextValue = {
  planets: PlanetType[],
  isLoading: boolean,
  handleNameFilter: (e: React.ChangeEvent<HTMLInputElement>) => void,
  noResults: boolean,
  filters: FiltersType,
  handleFilters:(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void,
  handleFilterBtn: () => void,
  savedFilters: FiltersType[],
};

export type PlanetsContextProps = {
  children: React.ReactNode,
};
