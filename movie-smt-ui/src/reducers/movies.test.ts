import moviesReducer, { getMovies, getMoviesStatus, initialState, MovieStatus } from "./movies"

const state = {
    movies: initialState
}

describe("getMovies", () => {
    it("should return the initial state", () => {
        expect(getMovies(state)).toEqual([])
    })
})

describe("getMoviesStatus", () => {
    it("should return the initial state", () => {
        expect(getMoviesStatus(state)).toEqual(MovieStatus.Success)
    })
}) 
