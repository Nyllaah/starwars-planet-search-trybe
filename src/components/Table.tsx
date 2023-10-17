import { useContext } from 'react';
import { PlanetsContext } from '../context/planets-context';

export default function Table() {
  const { planets, isLoading } = useContext(PlanetsContext);

  if (isLoading) {
    return <span>Loading...</span>;
  }

  const formatHeader = (header: string) => {
    const words = header.split('_');
    const capWords = words.map((word) => word.charAt(0).toUpperCase() + word.slice(1));
    return capWords.join(' ');
  };

  const headers = Object.keys(planets[0]).map((header) => formatHeader(header));

  return (
    <table>
      <thead>
        <tr>
          {headers.map((header) => {
            return <th key={ header }>{ header }</th>;
          })}
        </tr>
      </thead>
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
  );
}
