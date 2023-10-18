import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';
import PlanetsProvider from '../context/planets-provider';

describe('Verifica se o componente App.tsx renderiza corretamente', () => {
  test('Existe o input de busca por nome', () => {
    render(<PlanetsProvider children={<App />} />);

    const nameIpt = screen.getByTestId('name-filter');
    expect(nameIpt).toBeVisible();
  });

  test('Existe os inputs de busca numérica', () => {
    render(<PlanetsProvider children={<App />} />);

    const columnFilter = screen.getByTestId('column-filter');
    const comparisonFilter = screen.getByTestId('comparison-filter');
    const valueFilter = screen.getByTestId('value-filter');
    const allOpts = screen.getAllByRole('option');

    expect(columnFilter).toBeVisible();
    expect(comparisonFilter).toBeVisible();
    expect(valueFilter).toBeVisible();
    expect(allOpts).toHaveLength(8);
  });

  test('Existe o botão de filtar a busca', () => {
    render(<PlanetsProvider children={<App />} />);

    const btn = screen.getByTestId('button-filter');
    expect(btn).toBeVisible();
    expect(btn).toHaveTextContent('Filter');
  })
})
