import PropTypes from "prop-types";
import { Link } from "react-router-dom";

export default function CardPokemon({ name, image, types, id }) {
  return (
    <Link to={`/pokemon/${name}`} className="card-pokemon">
      <img
        src={image || "/background.png"}
        alt={name}
        className="img-fluid"
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = "/background.png";
          e.target.style = `object-fit: contain;`;
        }}
      />
      <p className="label">#{("000" + id.toString()).slice(-4)}</p>
      <h6>{name.charAt(0).toUpperCase() + name.slice(1)}</h6>
      <div className="wrapper-type">
        {types.map((type, i) => (
          <p key={i} className={type}>
            {type}
          </p>
        ))}
      </div>
    </Link>
  );
}

CardPokemon.propTypes = {
  id: PropTypes.number,
  name: PropTypes.string,
  image: PropTypes.string,
  types: PropTypes.arrayOf(PropTypes.string),
};
