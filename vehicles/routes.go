package vehicles

import "github.com/gin-gonic/gin"

func RegisterRoutes(r *gin.Engine) {
	r.GET("/vehicles/:id", GetVehicle)
	r.GET("/vehicles", GetVehicles)
	r.POST("/vehicles", CreateVehicle)
	r.DELETE("/vehicles/:id", DeleteVehicle)
}
