package service

import (
	"encoding/json"
	"log"
)

type IMovieService interface {
	SearchMovies(name string) ([]Movie, error)
	GetTopRatedMovies(page string) ([]Movie, error)
	GetPopularMovies(page string) ([]Movie, error)
}

type MovieService struct {
	BaseUrl string
	ApiKey  string
}

func (ms MovieService) SearchMovies(name string) ([]Movie, error) {
	queryParams := make(map[string]string)
	queryParams["query"] = name

	url := ms.buildUrl("/search/movie", queryParams)

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

func (ms MovieService) GetTopRatedMovies(page string) ([]Movie, error) {
	queryParams := make(map[string]string)
	queryParams["page"] = page

	url := ms.buildUrl("/movie/top_rated", queryParams)

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

func (ms MovieService) GetPopularMovies(page string) ([]Movie, error) {
	queryParams := make(map[string]string)

	queryParams["page"] = page

	url := ms.buildUrl("/movie/popular", queryParams)

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
