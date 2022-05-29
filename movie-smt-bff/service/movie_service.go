package service

import (
	"encoding/json"
	"log"
)

func SearchMovies(name string) ([]Movie, error) {
	queryParams := make(map[string]string)
	queryParams["query"] = name

	url := buildUrl("/search/movie", queryParams)

	resp, err := get(url)
	if err != nil {
		return []Movie{}, err
	}

	data, err := getResponseBody(resp)
	if err != nil {
		return []Movie{}, err
	}

	return deserializeMovies(data)
}

func GetPopularMovies(page string) ([]Movie, error) {
	queryParams := make(map[string]string)

	queryParams["page"] = page

	url := buildUrl("/movie/popular", queryParams)

	resp, err := get(url)

	if err != nil {
		return []Movie{}, err
	}

	data, err := getResponseBody(resp)
	if err != nil {
		return []Movie{}, err
	}

	return deserializeMovies(data)
}

func deserializeMovies(data []byte) ([]Movie, error) {
	resp := SearchResponse{}
	err := json.Unmarshal(data, &resp)

	if err != nil {
		log.Println("Error deserializing response!", err)
		return []Movie{}, err
	}

	return resp.Results, nil
}
