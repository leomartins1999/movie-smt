package service

import (
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"net/url"
)

func get(url string) (*http.Response, error) {
	resp, err := http.Get(url)

	if err != nil {
		log.Println("base#get - Error executing request!", err)
		return nil, err
	}

	statusCode := resp.StatusCode
	if statusCode >= 400 {
		message := fmt.Sprintf("base#get - Response status code was %d!", statusCode)
		log.Println(message)

		return nil, fmt.Errorf(message)
	}

	return resp, nil
}

func (ms MovieService) buildUrl(path string, queryParams map[string]string) string {
	queryParamsStr := ms.buildQueryParams(queryParams)
	return fmt.Sprintf("%s%s?%s", ms.BaseUrl, path, queryParamsStr)
}

func (ms MovieService) buildQueryParams(queryParams map[string]string) string {
	params := url.Values{}

	params.Add("api_key", ms.ApiKey)
	
	for key, value := range queryParams {
		params.Add(key, value)
	}
	
	return params.Encode()
}

func getResponseBody(resp *http.Response) ([]byte, error) {
	body, err := ioutil.ReadAll(resp.Body)

	if err != nil {
		log.Println("base#getResponseBody - Error getting response body!", err)
		return []byte{}, err
	}

	return body, nil
}
