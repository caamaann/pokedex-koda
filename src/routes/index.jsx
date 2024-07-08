import { useCallback, useEffect, useState } from "react";
import { fetchAPI } from "../lib/api";
import Loader from "../components/Loader";
import CardPokemon from "../components/CardPokemon";
import Pagination from "../components/Pagination";
import { limitOpt } from "../utils/constant";

export default function Index() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [state, setState] = useState({
    page: 1,
    totalItems: 0,
    limit: 10,
  });

  const getData = useCallback(async (page, limit) => {
    setLoading(true);
    try {
      const offset = (page - 1) * limit;
      const response = await fetchAPI(
        `/pokemon?offset=${offset}&limit=${limit}`
      );
      const results = await Promise.all(
        response.results.map(async (pokemon) => {
          const pokemonDetails = await fetchAPI(pokemon.url);
          return {
            id: pokemonDetails.id,
            name: pokemon.name,
            image: pokemonDetails.sprites.front_default,
            types: pokemonDetails.types.map((typeInfo) => typeInfo.type.name),
          };
        })
      );

      setData(results);
      setState((prev) => ({
        ...prev,
        totalItems: response.count,
      }));
    } catch (error) {
      console.error("Error fetching the pokemons:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getData(state.page, state.limit);
  }, [state.page, state.limit]);

  return (
    <div className="container" id="list-pokemon">
      <label htmlFor="limit">Show:</label>
      <select
        id="limit"
        name="limit"
        onChange={(e) =>
          setState((prev) => ({ ...prev, limit: e.target.value }))
        }
        value={state.limit}
      >
        {limitOpt.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>
      {loading ? (
        <Loader />
      ) : (
        <div className="list-pokemon">
          {data.map((pokemon) => (
            <CardPokemon {...pokemon} key={pokemon.id} />
          ))}
        </div>
      )}
      {state.totalItems > 0 && (
        <Pagination
          currentPage={state.page}
          itemsPerPage={state.limit}
          totalItems={state.totalItems}
          onPageChange={(page) => setState((prev) => ({ ...prev, page }))}
        />
      )}
    </div>
  );
}
