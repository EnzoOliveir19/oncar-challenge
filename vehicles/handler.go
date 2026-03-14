package vehicles

import (
	"strconv"

	"github.com/gin-gonic/gin"
)

type Vehicle struct {
	ID     int     `json:"id"`
	Modelo string  `json:"modelo"`
	Marca  string  `json:"marca"`
	Cor    string  `json:"cor"`
	Valor  float64 `json:"valor"`
	Imagem string  `json:"imagem"`
}

var Vehicles = []Vehicle{}

func GetVehicle(c *gin.Context) {
	id := c.Param("id")

	for _, v := range Vehicles {
		if strconv.Itoa(v.ID) == id {
			c.JSON(200, v)
			return
		}
	}

	c.JSON(404, gin.H{"error": "veículo não encontrado"})
}

func GetVehicles(c *gin.Context) {
	c.JSON(200, Vehicles)
}

func CreateVehicle(c *gin.Context) {
	var newVehicle Vehicle

	if err := c.ShouldBindJSON(&newVehicle); err != nil {
		c.JSON(400, gin.H{"error": "dados inválidos"})
		return
	}

	newVehicle.ID = len(Vehicles) + 1
	Vehicles = append(Vehicles, newVehicle)
	c.JSON(201, newVehicle)
}

func DeleteVehicle(c *gin.Context) {
	id := c.Param("id")

	for i, v := range Vehicles {
		if strconv.Itoa(v.ID) == id {
			Vehicles = append(Vehicles[:i], Vehicles[i+1:]...)
			c.JSON(200, gin.H{"message": "veículo removido"})
			return
		}
	}

	c.JSON(404, gin.H{"error": "veículo não encontrado"})
}
