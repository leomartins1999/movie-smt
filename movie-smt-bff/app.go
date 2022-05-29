package main

import (
	controllers "movie-smt-bff/controller"

	"github.com/gin-gonic/gin"
)

func main() {
	router := gin.Default()
	controllers.Routes(router)

	router.Run()
}
