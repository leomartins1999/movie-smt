package controllers

import (
	service "movie-smt-bff/service"
	"net/http"

	"github.com/gin-gonic/gin"
)

func Routes(router *gin.Engine) {
	router.GET("/search", search)
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
