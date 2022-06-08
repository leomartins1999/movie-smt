import { Autocomplete, TextField } from "@mui/material";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { useNavigate} from "react-router-dom";
import {
  fetchMoviesAsync,
  getMovies,
  getMoviesStatus,
  MovieStatus,
} from "../../reducers/movies";

export function Search() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const status = useAppSelector(getMoviesStatus);
  const movies = useAppSelector(getMovies);

  useEffect(() => {
    dispatch(fetchMoviesAsync());
  }, [dispatch]);

  function getMovieID(name: string | null) {
    const movie = movies.find((movie) => movie.title === name);
    return movie?.id
  }

  return (
    <Autocomplete
      loading={status === MovieStatus.Loading}
      options={movies.map((m) => m.title)}
      sx={[{ backgroundColor: "white" }, { width: 400, height: 55 }]}
      renderInput={(params) => (
        <TextField {...params} label="Search for your favorite show/movie" />
      )}
      onInputChange={(_, value) => dispatch(fetchMoviesAsync(value))}
      onChange={(_, value) => navigate(`/movie/${getMovieID(value)}`)}
    />
  );
}
