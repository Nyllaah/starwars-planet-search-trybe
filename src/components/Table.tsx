import { useContext } from 'react';
import { PlanetsContext } from '../context/planets-context';
import { PlanetType } from '../types';

export default function Table() {
  const { filteredPlanets, isLoading, noResults, planets } = useContext(PlanetsContext);

  if (isLoading) {
    return <span>Loading...</span>;
  }

  const headers = Object.keys(planets[0]).map((header) => {
    const words = header.split('_');
    const capWords = words.map((word) => word.charAt(0).toUpperCase() + word.slice(1));
    return capWords.join(' ');
  });

  return (
    noResults ? <span>Nenhum resultado foi encontrado...</span>
      : (
        <table>
          <thead>
            <tr>
              {headers.map((header) => {
                return <th key={ header }>{ header }</th>;
              })}
            </tr>
          </thead>

          <tbody>
            {filteredPlanets.map((planet: PlanetType) => {
              return (
                <tr key={ `${planet.name}-tr` }>
                  {Object.keys(planets[0]).map((header) => {
                    return <td key={ planet[header] }>{planet[header]}</td>;
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      )
  );
}
