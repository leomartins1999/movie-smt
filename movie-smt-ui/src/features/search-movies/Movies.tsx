import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { fetchMoviesAsync, selectMovies } from "./movieSlice";

export function Movies() {
    const movies = useAppSelector(selectMovies)
    const dispatch = useAppDispatch();

    dispatch(fetchMoviesAsync())

    return (
        <div>
            Hello world!
            {movies.map(m => <p>Title: {m.title}, Overview: {m.overview}</p>)}
        </div>
    )
}
