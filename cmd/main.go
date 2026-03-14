package main

import (
	"oncar-challenged/vehicles"

	"github.com/gin-gonic/gin"
)

func main() {
	r := gin.Default()
	vehicles.RegisterRoutes(r)
	r.Run(":8080")
}
