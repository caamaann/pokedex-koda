export async function fetchAPI(url) {
  try {
    const BASE_URL = "https://pokeapi.co/api/v2";

    const res = await fetch(url.startsWith("/") ? `${BASE_URL}${url}` : url);

    const json = await res.json();
    if (json.errors) {
      throw new Error("Failed to fetch API");
    }
    return json;
  } catch (error) {
    return null;
  }
}

export async function loaderPokemonDetail({ params }) {
  const data = await fetchAPI(`/pokemon/${params.pokemonId}`);
  return data;
}
