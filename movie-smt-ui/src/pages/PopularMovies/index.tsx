import { useEffect, useState } from "react";
import { getPopularMovies } from "../../api/gateway";
import { MovieCard } from "../../components";
import { Movie } from "../../utils/types";
import styles from "./PopularMovies.module.scss";

export function PopularMovies() {
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    getPopularMovies().then((res) => {
      setMovies(res);
    });
  }, []);

  return (
    <div className={styles.Popular}>
      <h1>Popular Movies</h1>
      <ul>
        {movies.map((movie) => (
          <li key={movie.id}>
            <MovieCard
              id={movie.id}
              title={movie.title}
              overview={movie.overview}
              poster_path={movie.poster_path}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
