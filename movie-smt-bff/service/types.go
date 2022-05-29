package service

type SearchResponse struct {
	Results []Movie `json:"results"`
}

type Movie struct {
	Title    string `json:"title"`
	Overview string `json:"overview"`
}
