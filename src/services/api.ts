export async function fetchPlanets() {
  try {
    const response = await fetch('https://swapi.dev/api/planets');
    const data = await response.json();
    return data.results;
  } catch (error: any) {
    throw new Error(`Failed to fetch: ${error.message}`);
  }
}
