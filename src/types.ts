export type PlanetsContextValue = {
  planets: any[],
  isLoading: boolean,
  nameFilter: string,
  handleNameFilter: (e: React.ChangeEvent<HTMLInputElement>) => void,
};

export type PlanetsContextProps = {
  children: React.ReactNode,
};

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
  films: string[],
  created: string,
  edited: string,
  url: string,
};
