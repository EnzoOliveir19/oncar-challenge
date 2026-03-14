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
    <div>
      <h1>ONCar - Gestão de Veículos</h1>
      <VehicleForm onVehicleCreated={handleVehicleCreated} />
      <VehicleList key={refresh} onVehiclesLoaded={setVehicles} />
      <SimulationForm vehicles={vehicles} />
    </div>
  );
}

export default App;