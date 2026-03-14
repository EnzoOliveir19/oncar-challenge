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
    <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
      <h2 className="text-lg font-bold text-orange-500 uppercase tracking-widest mb-6">
        Veículos Disponíveis
      </h2>
      {vehicles.length === 0 ? (
        <p className="text-gray-500 text-sm">Nenhum veículo cadastrado.</p>
      ) : (
        <div className="grid grid-cols-3 gap-4">
          {vehicles.map(vehicle => (
            <div key={vehicle.id}
              className="bg-gray-800 border border-gray-700 rounded-lg p-4 hover:border-orange-500 transition">
              <p className="text-white font-bold text-lg">{vehicle.modelo}</p>
              <p className="text-gray-400 text-sm">{vehicle.marca}</p>
              <div className="mt-3 flex justify-between items-center">
                <span className="text-xs bg-gray-700 text-gray-300 px-2 py-1 rounded-full">
                  {vehicle.cor}
                </span>
                <span className="text-orange-500 font-bold text-sm">
                  R$ {vehicle.valor.toLocaleString('pt-BR')}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default VehicleList;