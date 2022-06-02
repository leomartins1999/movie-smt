import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getPopularMovies, searchMovies } from "../api/gateway";
import { RootState } from "../app/store";
import { Movie } from "../utils/types";

// ########## State ##########

export enum MovieStatus { Error, Loading, Success }

interface MovieState {
    movies: Movie[]
    status: MovieStatus
}

export const initialState: MovieState = {
    movies: [],
    status: MovieStatus.Success
}

// ########## Selectors ##########

export const getMovies = (state: RootState) => state.movies.movies

export const getMoviesStatus = (state: RootState) => state.movies.status

// ########## Actions ##########

export const fetchMoviesAsync = createAsyncThunk(
    "movies/fetchMovies",
    async (name: string | null = null) =>
        (!name || name === '')
            ? await getPopularMovies()
            : await searchMovies(name)
)

// ########## Reducer ##########

const movieSlice = createSlice({
    name: "movies",
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchMoviesAsync.pending, (state) => {
                state.status = MovieStatus.Loading;
            })
            .addCase(fetchMoviesAsync.fulfilled, (state, action) => {
                state.status = MovieStatus.Success;
                state.movies = action.payload;
            })
            .addCase(fetchMoviesAsync.rejected, (state) => {
                state.status = MovieStatus.Error;
            });
    }
})

export default movieSlice.reducer
