export async function fetchPlanets() {
  try {
    const response = await fetch('https://swapi.dev/api/planets');
    const data = response.json();
    return await data;
  } catch (error: any) {
    throw new Error(error.message);
  }
}
