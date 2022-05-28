package themoviedbgateway

import (
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
)

const apiKey = "102cf37d47760088746f948d4fff234f"
const baseUrl = "https://api.themoviedb.org/3%s?%s"

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

func buildUrl(path string, queryParams map[string]string) string {
	queryParamsStr := buildQueryParams(queryParams)
	return fmt.Sprintf(baseUrl, path, queryParamsStr)
}

func buildQueryParams(queryParams map[string]string) string {
	res := ""

	res += fmt.Sprintf("api_key=%s", apiKey)

	for key, value := range queryParams {
		res += fmt.Sprintf("&%s=%s", key, value)
	}

	return res
}

func getResponseBody(resp *http.Response) ([]byte, error) {
	body, err := ioutil.ReadAll(resp.Body)

	if err != nil {
		log.Println("base#getResponseBody - Error getting response body!", err)
		return []byte{}, err
	}

	return body, nil
}
