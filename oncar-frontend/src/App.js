import './App.css';
import { useState } from 'react';
import VehicleList from './components/VehicleList';
import VehicleForm from './components/VehicleForm';
import SimulationForm from './components/SimulationForm';

function App() {
  const [refresh, setRefresh] = useState(0);
  const [vehicles, setVehicles] = useState([]);

  function handleVehicleCreated() {
    setRefresh(refresh + 1);
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <header className="bg-gray-900 border-b border-gray-800 px-8 py-4">
        <h1 className="text-2xl font-bold text-orange-500">ONCar</h1>
        <p className="text-gray-400 text-sm">Gestão de Veículos</p>
      </header>

      <main className="max-w-5xl mx-auto px-8 py-10 grid grid-cols-1 gap-10">
        <VehicleForm onVehicleCreated={handleVehicleCreated} />
        <VehicleList key={refresh} onVehiclesLoaded={setVehicles} />
        <SimulationForm vehicles={vehicles} />
      </main>
    </div>
  );
}

export default App;