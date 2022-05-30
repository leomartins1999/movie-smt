package controllers

import (
	service "movie-smt-bff/service"
	"net/http"

	"github.com/gin-gonic/gin"
)

func Routes(router *gin.Engine) {
	router.GET("/search", search)
	router.GET("/movie/popular", getPopular)
	router.GET("/movie/top_rated", getTopRated)
}

func search(c *gin.Context) {
	name := c.Query("name")
	if name == "" {
		c.JSON(http.StatusBadRequest, nameNotSuppliedError)
		return
	}

	res, err := service.SearchMovies(name)
	if err == nil {
		c.JSON(http.StatusOK, res)
	} else {
		c.JSON(http.StatusInternalServerError, internalServerErrorError)
	}
}

func getPopular(c *gin.Context) {
	page := c.Query("page")
	if page == "" {
		page = "1"
	}

	res, err := service.GetPopularMovies(page)
	if err == nil {
		c.JSON(http.StatusOK, res)
	} else {
		c.JSON(http.StatusInternalServerError, internalServerErrorError)
	}

}

func getTopRated(c *gin.Context) {
	page := c.Query("page")
	if page == "" {
		page = "1"
	}
	res, err := service.GetTopRatedMovies(page)
	if err == nil {
		c.JSON(http.StatusOK, res)
	} else {
		c.JSON(http.StatusInternalServerError, internalServerErrorError)
	}

}
