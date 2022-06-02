package service

import "fmt"

type SearchResponse struct {
	Results []Movie `json:"results"`
}

type Movie struct {
	Id       int    `json:"id"`
	Title    string `json:"title"`
	Overview string `json:"overview"`
	Poster   string `json:"poster_path"`
}

func (m Movie) withPosterUrl(baseUrl string, size string) Movie {
	return Movie{
		Id:       m.Id,
		Title:    m.Title,
		Overview: m.Overview,
		Poster:   fmt.Sprintf("%s/%s%s", baseUrl, size, m.Poster),
	}
}
