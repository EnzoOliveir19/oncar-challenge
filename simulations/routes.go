package simulations

import "github.com/gin-gonic/gin"

func RegisterRoutes(r *gin.Engine) {
	r.POST("/simulations", CreateSimulation)
}
