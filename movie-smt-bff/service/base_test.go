package service

import "testing"

func TestBuildUrlEmptyUrl(t *testing.T) {
	service := MovieService{BaseUrl: "http://localhost", ApiKey: "api-key"}

	url := "/"
	pathParameters := make(map[string]string)

	expected := "http://localhost/?api_key=api-key"

	result := service.buildUrl(url, pathParameters)

	if result != expected {
		t.Fatalf(`Expected %s, got %s`, expected, result)
	}
}

func TestBuildUrlSearchUrl(t *testing.T) {
	service := MovieService{BaseUrl: "http://localhost", ApiKey: "api-key"}

	url := "/search"
	pathParameters := make(map[string]string)

	expected := "http://localhost/search?api_key=api-key"

	result := service.buildUrl(url, pathParameters)

	if result != expected {
		t.Fatalf(`Expected %s, got %s`, expected, result)
	}
}

func TestBuildUrlWithQueryParameters(t *testing.T) {
	service := MovieService{BaseUrl: "http://localhost", ApiKey: "api-key"}

	url := "/search"
	pathParameters := make(map[string]string)
	pathParameters["name"] = "batman"

	expected := "http://localhost/search?api_key=api-key&name=batman"

	result := service.buildUrl(url, pathParameters)

	if result != expected {
		t.Fatalf(`Expected %s, got %s`, expected, result)
	}
}

func TestBuildUrlParametersAreEscaped(t *testing.T) {
	service := MovieService{BaseUrl: "http://localhost", ApiKey: "api-key"}

	url := "/search"
	pathParameters := make(map[string]string)
	pathParameters["name"] = "The Lord"

	expected := "http://localhost/search?api_key=api-key&name=The+Lord"

	result := service.buildUrl(url, pathParameters)

	if result != expected {
		t.Fatalf(`Expected %s, got %s`, expected, result)
	}
}
