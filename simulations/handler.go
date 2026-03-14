package simulations

import (
	"math/rand"
	"net/http"

	"oncar-challenged/vehicles"

	"github.com/gin-gonic/gin"
)

type Simulation struct {
	Nome      string  `json:"nome"`
	VehicleID int     `json:"vehicle_id"`
	Renda     float64 `json:"renda"`
}

type SimulationResult struct {
	Nome                 string  `json:"nome"`
	Score                int     `json:"score"`
	Status               string  `json:"status"`
	EntradaNecessaria    float64 `json:"entrada_necessaria"`
	ComprometimentoRenda float64 `json:"comprometimento_renda"`
}

func CreateSimulation(c *gin.Context) {
	var sim Simulation

	if err := c.ShouldBindJSON(&sim); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "dados inválidos"})
		return
	}

	var foundVehicle vehicles.Vehicle

	vehicleExists := false
	for _, v := range vehicles.Vehicles {
		if v.ID == sim.VehicleID {
			foundVehicle = v
			vehicleExists = true
			break
		}
	}

	if !vehicleExists {
		c.JSON(http.StatusNotFound, gin.H{"error": "veículo não encontrado"})
		return
	}

	score := rand.Intn(999) + 1

	var status string
	var entrada float64
	var comprometimento float64

	if score <= 299 {
		status = "Reprovado"
		entrada = 0
		comprometimento = 0
	} else if score <= 599 {
		status = "Aprovado"
		entrada = 0.70
		comprometimento = 0.30
	} else if score <= 799 {
		status = "Aprovado"
		entrada = 0.50
		comprometimento = 0.25
	} else if score <= 950 {
		status = "Aprovado"
		entrada = 0.30
		comprometimento = 0.20
	} else {
		status = "Aprovado - Taxa Zero"
		entrada = 0
		comprometimento = 0
	}

	result := SimulationResult{
		Nome:                 sim.Nome,
		Score:                score,
		Status:               status,
		EntradaNecessaria:    foundVehicle.Valor * entrada,
		ComprometimentoRenda: sim.Renda * comprometimento,
	}

	c.JSON(http.StatusOK, result)
}
