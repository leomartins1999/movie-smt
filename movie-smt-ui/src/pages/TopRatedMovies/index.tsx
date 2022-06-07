import { useEffect, useState } from "react";
import { getTopRated } from "../../api/gateway";
import { MovieCard } from "../../components";
import { Movie } from "../../utils/types";
import styles from "./TopRatedMovies.module.scss";

export function TopRatedMovies() {
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    getTopRated().then((res) => {
      setMovies(res);
    });
  }, []);

  return (
  <div className={styles.TopRated}>
    <h1>Top Rated Movies</h1>
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
