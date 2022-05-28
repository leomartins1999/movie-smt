import axios from 'axios'
import { Movie } from '../../utils/types'

interface SearchResponse {
    results: Movie[]
}

export async function searchMovies() {
    const name = "Batman"
    const movies = await searchMovie(name)

    return movies
}

export async function searchMovie(name: string): Promise<Movie[]> {
    const resp = await axios.get(`http://localhost:8080/search?name=${name}`)
    const data: SearchResponse = resp.data
    return data.results
}
