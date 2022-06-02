import { useEffect, useState } from "react";
import { getPopularMovies } from "../../api/gateway";
import styles from "./PopularMovies.module.scss";

export function PopularMovies() {
  const [movies, setMovies] = useState<{ title: string; overview: string }[]>([]);
  
  useEffect(() => {
    getPopularMovies().then((res) => {
      console.log(res);
      
      setMovies(res);
    });
  }, []);

  return (
    <div className={styles.Popular}>
      <h1>Popular Movies</h1>
      <ul>
        {movies.map((movie) => (
          <li key={movie.title}>
            <h2>{movie.title}</h2>
            <p>
              {movie.overview.length > 250
                ? `${movie.overview.substring(0, 100)}...`
                : movie.overview}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
