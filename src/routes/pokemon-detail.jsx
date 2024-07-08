import { useLoaderData } from "react-router-dom";
import Accordion from "../components/Accordion";
import ErrorPage from "../error-page";

export default function PokemonDetail() {
  const data = useLoaderData();

  if (!data) {
    return <ErrorPage message={"Your Pokemon is Not Found"} />;
  }
  return (
    <div className="container" id="pokemon-detail">
      <p className="label">#{("000" + data.id.toString()).slice(-4)}</p>
      <h1 className="title">
        {data.name.charAt(0).toUpperCase() + data.name.slice(1)}
      </h1>
      <div className={`wrapper-img ${data.types[0].type.name}`}>
        <img
          width="250px"
          height="250px"
          src={data.sprites.front_default || "/background-white.png"}
          alt={data.name}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "/background-white.png";
            e.target.style = `object-fit: contain;`;
          }}
        />
      </div>
      <div className="wrapper-weight">
        <div className="weight-value">
          <span>Height</span>
          <p>{data.height / 10} m</p>
        </div>
        <div className="weight-value">
          <span>Weight</span>
          <p>{data.weight / 10} kg</p>
        </div>
        <div className="weight-value">
          <span>Base Exp</span>
          <p>{data.base_experience}</p>
        </div>
      </div>
      <div className="wrapper-type">
        <div className="type-value">
          <span>Type</span>
          <div className="list-type">
            {data.types.map((item, idx) => (
              <div className={`type-item ${item.type.name}`} key={idx}>
                {item.type.name.charAt(0).toUpperCase() +
                  item.type.name.slice(1)}
              </div>
            ))}
          </div>
        </div>
        <div className="ability-value">
          <span>Ability</span>
          <div className="list-ability">
            {data.abilities.map((item, idx) => (
              <div className="ability-item" key={idx}>
                {item.ability.name.charAt(0).toUpperCase() +
                  item.ability.name.slice(1)}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="wrapper-accordion">
        <div className="wrapper-move">
          <span>Stat</span>
          <Accordion title={"Show Stat"}>
            {data.stats.map((item) => (
              <p key={item.stat.name} className="move-item">
                {item.stat.name}: {item.base_stat}
              </p>
            ))}
          </Accordion>
        </div>
        <div className="wrapper-move">
          <span>Moves</span>
          <Accordion title={"Show Moves"}>
            {data.moves.map((item) => (
              <p key={item.move.name} className="move-item">
                {item.move.name}
              </p>
            ))}
          </Accordion>
        </div>
      </div>
    </div>
  );
}
