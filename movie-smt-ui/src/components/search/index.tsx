import { Autocomplete, TextField } from "@mui/material";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { fetchMoviesAsync, getMovies, getMoviesStatus, MovieStatus } from "../../reducers/movies";

export function Search() {
    const dispatch = useAppDispatch()

    const status = useAppSelector(getMoviesStatus)
    const movies = useAppSelector(getMovies)

    useEffect(() => { dispatch(fetchMoviesAsync()) }, [dispatch])

    return (
        <Autocomplete
            loading={status === MovieStatus.Loading}
            options={movies.map(m => m.title)}
            sx={{ backgroundColor: "lightblue" }}
            renderInput={(params) => <TextField {...params} label="Search for your favorite show/movie" />}
            onInputChange={(_, value) => dispatch(fetchMoviesAsync(value))}
        />
    );
}
