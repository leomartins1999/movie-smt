package service

import (
	"encoding/json"
	"log"
)

type IMovieService interface {
	SearchMovies(name string) ([]MovieDO, error)
	GetTopRatedMovies(page string) ([]MovieDO, error)
	GetPopularMovies(page string) ([]MovieDO, error)
}

type MovieService struct {
	BaseUrl      string
	ApiKey       string
	ImageBaseUrl string
}

func (ms MovieService) SearchMovies(name string) ([]MovieDO, error) {
	queryParams := make(map[string]string)
	queryParams["query"] = name

	url := ms.buildUrl("/search/movie", queryParams)

	resp, err := get(url)
	if err != nil {
		return []MovieDO{}, err
	}

	data, err := getResponseBody(resp)
	if err != nil {
		return []MovieDO{}, err
	}

	movies, err := deserializeMovies(data)
	if err != nil {
		return []MovieDO{}, err
	}

	return ms.moviesWithPosterUrl(movies), nil
}

func (ms MovieService) GetTopRatedMovies(page string) ([]MovieDO, error) {
	queryParams := make(map[string]string)
	queryParams["page"] = page

	url := ms.buildUrl("/movie/top_rated", queryParams)

	resp, err := get(url)
	if err != nil {
		return []MovieDO{}, err
	}

	data, err := getResponseBody(resp)
	if err != nil {
		return []MovieDO{}, err
	}

	movies, err := deserializeMovies(data)
	if err != nil {
		return []MovieDO{}, err
	}

	return ms.moviesWithPosterUrl(movies), nil
}

func (ms MovieService) GetPopularMovies(page string) ([]MovieDO, error) {
	queryParams := make(map[string]string)

	queryParams["page"] = page

	url := ms.buildUrl("/movie/popular", queryParams)

	resp, err := get(url)

	if err != nil {
		return []MovieDO{}, err
	}

	data, err := getResponseBody(resp)
	if err != nil {
		return []MovieDO{}, err
	}

	movies, err := deserializeMovies(data)
	if err != nil {
		return movies, err
	}

	return ms.moviesWithPosterUrl(movies), nil
}

func deserializeMovies(data []byte) ([]MovieDO, error) {
	resp := SearchResponse{}
	err := json.Unmarshal(data, &resp)

	if err != nil {
		log.Println("Error deserializing response!", err)
		return []MovieDO{}, err
	}

	return resp.Results, nil
}

func (ms MovieService) moviesWithPosterUrl(movies []MovieDO) []MovieDO {
	res := []MovieDO{}

	for _, m := range movies {
		movieWithPosterUrl := m.withPosterUrl(ms.ImageBaseUrl, "original")
		res = append(res, movieWithPosterUrl)
	}

	return res
}
