import axios from "axios"
import { Movie } from "../utils/types"

const baseUrl = "http://localhost:8080"

const client = axios.create({ baseURL: baseUrl })

export async function searchMovies(name: string): Promise<Movie[]> {
    const resp = await client.get(`/search?name=${name}`)
    return resp.data
}

export async function getPopularMovies(): Promise<Movie[]> {
    const resp = await client.get('/movie/popular')
    return resp.data
}
