import { Link } from "react-router-dom";
import styles from "./Navbar.module.scss";

export function Navbar() {
  return (
    <nav>
      <div className={styles.navbar}>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/Profile">Profile</Link>
          </li>
          <li>
            <Link to="/PopularMovies">Popular Movies</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
