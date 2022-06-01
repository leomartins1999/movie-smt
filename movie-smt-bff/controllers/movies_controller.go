package controllers

import (
	"movie-smt-bff/service"
	"net/http"

	"github.com/gin-gonic/gin"
)

type IController interface {
	Routes(router *gin.Engine)
}

type MovieController struct {
	MovieService service.IMovieService
}

func (mc MovieController) Routes(router *gin.Engine) {
	router.GET("/search", mc.search)
	router.GET("/movie/popular", mc.getPopular)
	router.GET("/movie/top_rated", mc.getTopRated)
}

func (mc MovieController) search(c *gin.Context) {
	name := c.Query("name")
	if name == "" {
		c.JSON(http.StatusBadRequest, nameNotSuppliedError)
		return
	}

	res, err := mc.MovieService.SearchMovies(name)
	if err == nil {
		c.JSON(http.StatusOK, res)
	} else {
		c.JSON(http.StatusInternalServerError, internalServerErrorError)
	}
}

func (mc MovieController) getPopular(c *gin.Context) {
	page := c.Query("page")
	if page == "" {
		page = "1"
	}

	res, err := mc.MovieService.GetPopularMovies(page)
	if err == nil {
		c.JSON(http.StatusOK, res)
	} else {
		c.JSON(http.StatusInternalServerError, internalServerErrorError)
	}

}

func (mc MovieController) getTopRated(c *gin.Context) {
	page := c.Query("page")
	if page == "" {
		page = "1"
	}
	res, err := mc.MovieService.GetTopRatedMovies(page)
	if err == nil {
		c.JSON(http.StatusOK, res)
	} else {
		c.JSON(http.StatusInternalServerError, internalServerErrorError)
	}

}
