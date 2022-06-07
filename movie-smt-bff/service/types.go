package service

import "fmt"

type SearchResponse struct {
	Results []MovieDO `json:"results"`
}

type MovieDO struct {
	Id              int          `json:"id"`
	Title           string       `json:"title"`
	Overview        string       `json:"overview"`
	TagLine         string       `json:"tagline"`
	Poster          string       `json:"poster_path"`
	VoteAverage     float32      `json:"vote_average"`
	ReleaseDate     string       `json:"release_date"`
	Status          string       `json:"status"`
	Runtime         int          `json:"runtime"`
	Adult           bool         `json:"adult"`
	Genres          []GenreDO    `json:"genres"`
	SpokenLanguages []LanguageDO `json:"spoken_languages"`
}

type GenreDO struct {
	Id   int    `json:"id"`
	Name string `json:"name"`
}

type LanguageDO struct {
	Short string `json:"iso_639_1"`
	Name  string `json:"name"`
}

func (m MovieDO) withPosterUrl(baseUrl string, size string) MovieDO {
	return MovieDO{
		Id:       m.Id,
		Title:    m.Title,
		Overview: m.Overview,
		Poster:   fmt.Sprintf("%s/%s%s", baseUrl, size, m.Poster),
	}
}
