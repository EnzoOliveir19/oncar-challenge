package main

import (
	"oncar-challenged/simulations"
	"oncar-challenged/vehicles"

	"github.com/gin-gonic/gin"
)

func main() {
	r := gin.Default()
	vehicles.RegisterRoutes(r)
	simulations.RegisterRoutes(r)
	r.Run(":8080")
}
