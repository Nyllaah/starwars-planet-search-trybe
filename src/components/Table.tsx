import { useContext } from 'react';
import { PlanetsContext } from '../context/planets-context';

export default function Table() {
  const { planets, isLoading } = useContext(PlanetsContext);

  if (isLoading) {
    return <span>Loading...</span>;
  }

  // const formatHeader = (header: string) => {
  //   const words = header.split('_');
  //   const capWords = words.map((word) => word.charAt(0).toUpperCase() + word.slice(1));
  //   return capWords.join(' ');
  // };

  // const headers = Object.keys(planets[0]).map((header) => formatHeader(header));

  return (
    planets.length === 0 ? <span>Nothing found...</span>
      : (
        <table>
          {/* <thead>
        <tr>
          {headers.map((header) => {
            return <th key={ header }>{ header }</th>;
          })}
        </tr>
      </thead> */}
          <thead>
            <tr>
              <th>Name</th>
              <th>Rotation Period</th>
              <th>Orbital Period</th>
              <th>Diameter</th>
              <th>Climate</th>
              <th>Gravity</th>
              <th>Terrain</th>
              <th>Surface Water</th>
              <th>Population</th>
              <th>Films</th>
              <th>Created</th>
              <th>Edited</th>
              <th>Url</th>
            </tr>
          </thead>
          {/* <tbody>
        {planets.length === 0 ? <span>Nothing found...</span>
          : planets.map((planet) => {
            return (
              <tr key={ `${planet.name}-tr` }>
                {Object.keys(planets[0]).map((header) => {
                  return <td key={ planet[header] }>{planet[header]}</td>;
                })}
              </tr>
            );
          })}
      </tbody> */}
          <tbody>
            {planets.map((planet) => {
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
