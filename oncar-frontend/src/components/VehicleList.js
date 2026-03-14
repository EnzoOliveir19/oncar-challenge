import { useState, useEffect } from 'react';

function VehicleList({ onVehiclesLoaded }) {
  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8080/vehicles')
      .then(res => res.json())
      .then(data => {
        setVehicles(data);
        onVehiclesLoaded(data);
      });
  }, []);

  return (
    <div>
      <h2>Veículos disponíveis</h2>
      {vehicles.map(vehicle => (
        <div key={vehicle.id}>
          <p>{vehicle.modelo} - {vehicle.marca}</p>
          <p>Cor: {vehicle.cor}</p>
          <p>Valor: R$ {vehicle.valor}</p>
        </div>
      ))}
    </div>
  );
}

export default VehicleList;