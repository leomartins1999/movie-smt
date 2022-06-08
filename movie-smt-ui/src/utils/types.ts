export interface Movie {
    id: number;
    title: string
    overview: string
    poster_path: string
    release_date: string
    vote_average: number
    adult: boolean
    genres: Genre[]
    spoken_languages: SpokenLanguage[]
    runtime: number
    status: string
    tagline: string
}

export interface Genre {
    id: number;
    name: string
}

export interface SpokenLanguage {
    iso_639_1: string;
    name: string;
}
