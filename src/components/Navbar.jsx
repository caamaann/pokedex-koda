import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <header>
      <nav className="navbar">
        <Link to={"/"}>
          <h2>Pokédex</h2>
        </Link>
      </nav>
    </header>
  );
}
