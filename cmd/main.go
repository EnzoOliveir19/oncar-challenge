package main

import (
	"oncar-challenged/simulations"
	"oncar-challenged/vehicles"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func main() {
	r := gin.Default()

	r.Use(cors.New(cors.Config{
		AllowOrigins: []string{"http://localhost:3000"},
		AllowMethods: []string{"GET", "POST", "DELETE"},
		AllowHeaders: []string{"Content-Type"},
	}))

	vehicles.RegisterRoutes(r)
	simulations.RegisterRoutes(r)

	r.Run(":8080")
}
