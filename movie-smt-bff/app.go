package main

import (
	"movie-smt-bff/controllers"
	"movie-smt-bff/service"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

const apiKey = "102cf37d47760088746f948d4fff234f"
const baseUrl = "https://api.themoviedb.org/3"

func main() {
	service := service.MovieService{BaseUrl: baseUrl, ApiKey: apiKey}

	movieController := controllers.MovieController{MovieService: service}

	router := gin.Default()

	router.Use(cors.Default())

	movieController.Routes(router)

	router.Run()
}
