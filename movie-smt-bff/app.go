package main

import (
	themoviedbgateway "movie-smt-bff/themoviedb_gateway"
	"net/http"

	"github.com/gin-gonic/gin"
)

type apiError struct {
	Message string `json:"message"`
}

var nameNotSuppliedError = apiError{Message: "query parameter 'name' must be supplied!"}
var internalServerErrorError = apiError{Message: "internal server error"}

func main() {
	r := gin.Default()

	r.GET("/search", search)

	r.Run()
}

func search(c *gin.Context) {
	name := c.Query("name")
	if name == "" {
		c.JSON(http.StatusBadRequest, nameNotSuppliedError)
		return
	}

	res, err := themoviedbgateway.SearchMovies(name)
	if err == nil {
		c.JSON(http.StatusOK, res)
	} else {
		c.JSON(http.StatusInternalServerError, internalServerErrorError)
	}
}
