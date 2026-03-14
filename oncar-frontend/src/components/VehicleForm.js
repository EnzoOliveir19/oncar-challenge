import { useState } from 'react';

function VehicleForm({ onVehicleCreated }) {
  const [form, setForm] = useState({
    modelo: '',
    marca: '',
    cor: '',
    valor: ''
  });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    fetch('http://localhost:8080/vehicles', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...form, valor: parseFloat(form.valor) })
    })
      .then(res => res.json())
      .then(() => {
        onVehicleCreated();
        setForm({ modelo: '', marca: '', cor: '', valor: '' });
      });
  }

  return (
    <div>
      <h2>Cadastrar Veículo</h2>
      <form onSubmit={handleSubmit}>
        <input name="modelo" placeholder="Modelo" value={form.modelo} onChange={handleChange} /><br />
        <input name="marca" placeholder="Marca" value={form.marca} onChange={handleChange} /><br />
        <input name="cor" placeholder="Cor" value={form.cor} onChange={handleChange} /><br />
        <input name="valor" placeholder="Valor" value={form.valor} onChange={handleChange} /><br />
        <button type="submit">Cadastrar</button>
      </form>
    </div>
  );
}

export default VehicleForm;