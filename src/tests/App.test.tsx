import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';
import PlanetsProvider from '../context/planets-provider';
import userEvent from '@testing-library/user-event'

describe('Verifica se os elementos do componente App.tsx renderizam corretamente', () => {
  test('Existe um input de busca por nome', () => {
    render(<PlanetsProvider children={<App />} />);

    const nameIpt = screen.getByTestId('name-filter');
    expect(nameIpt).toBeVisible();
  });

  test('Existem inputs de busca numérica', () => {
    render(<PlanetsProvider children={<App />} />);

    const columnFilter = screen.getByTestId('column-filter');
    const comparisonFilter = screen.getByTestId('comparison-filter');
    const valueFilter = screen.getByTestId('value-filter');
    const columnFilterOpts = screen.getAllByTestId('column-filter-opt')
    const comparisonFilterOpts = screen.getAllByTestId('comparison-filter-opt');

    expect(columnFilter).toBeVisible();
    expect(comparisonFilter).toBeVisible();
    expect(valueFilter).toBeVisible();
    expect(columnFilter).toContain(columnFilterOpts);
    expect(comparisonFilter).toContain(comparisonFilterOpts);
    expect(columnFilterOpts).toHaveLength(5);
    expect(comparisonFilterOpts).toHaveLength(3);
  });

  test('Existe um botão para filtrar a busca', () => {
    render(<PlanetsProvider children={<App />} />);

    const btn = screen.getByTestId('button-filter');
    expect(btn).toBeVisible();
    expect(btn).toHaveTextContent('Filtrar');
  })

  test('"Sem filtros aplicados" é exibido quando não há filtros salvos', () => {
    render(<PlanetsProvider children={<App />} />);

    const filter = screen.queryByTestId('filter');
    expect(filter).toBe(null);
    const noFilters = screen.getByTestId('no-filters');
    expect(noFilters).toBeVisible();
    expect(noFilters).toHaveTextContent('Sem filtros aplicados');
  })

  test('Os filtros salvos são exibidos', async () => {
    render(<PlanetsProvider children={<App />} />);

    const table = await screen.findByTestId('table');
    expect(table).toBeVisible();

    const btn = screen.getByTestId('button-filter');
    userEvent.click(btn);

    const filter = await screen.findByTestId('filter');
    expect(filter).toBeVisible();
  })
})
