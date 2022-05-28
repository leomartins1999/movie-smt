import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../../app/store';
import { searchMovie, searchMovies } from './search-movieApi';
import { Movie } from '../../utils/types'

export interface MovieState {
  movies: Movie[];
  status: 'success' | 'loading' | 'failed';
}

const initialState: MovieState = {
  movies: [],
  status: 'loading',
};

export const fetchMoviesAsync = createAsyncThunk(
  "movies/fetchMovies",
  async () => {
    const response = await searchMovies()
    return response
  }
)

export const movieSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMoviesAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchMoviesAsync.fulfilled, (state, action) => {
        state.status = 'success';
        state.movies = action.payload;
      })
      .addCase(fetchMoviesAsync.rejected, (state) => {
        state.status = 'failed';
      });
  },

});

export const selectMovies = (state: RootState) => state.movies.movies


export default movieSlice.reducer
