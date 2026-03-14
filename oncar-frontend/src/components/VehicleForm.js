import { useState } from 'react';

function VehicleForm({ onVehicleCreated }) {
  const [form, setForm] = useState({
    modelo: '', marca: '', cor: '', valor: '', imagem: ''
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
        setForm({ modelo: '', marca: '', cor: '', valor: '', imagem: '' });
      });
  }

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
      <h2 className="text-lg font-bold text-orange-500 uppercase tracking-widest mb-6">
        Cadastrar Veículo
      </h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
        <input name="modelo" placeholder="Modelo" value={form.modelo} onChange={handleChange}
          className="bg-gray-800 border border-gray-700 text-white placeholder-gray-500 rounded-lg px-4 py-2 focus:outline-none focus:border-orange-500" />
        <input name="marca" placeholder="Marca" value={form.marca} onChange={handleChange}
          className="bg-gray-800 border border-gray-700 text-white placeholder-gray-500 rounded-lg px-4 py-2 focus:outline-none focus:border-orange-500" />
        <input name="cor" placeholder="Cor" value={form.cor} onChange={handleChange}
          className="bg-gray-800 border border-gray-700 text-white placeholder-gray-500 rounded-lg px-4 py-2 focus:outline-none focus:border-orange-500" />
        <input name="valor" placeholder="Valor (R$)" value={form.valor} onChange={handleChange}
          className="bg-gray-800 border border-gray-700 text-white placeholder-gray-500 rounded-lg px-4 py-2 focus:outline-none focus:border-orange-500" />
        <input name="imagem" placeholder="URL da imagem" value={form.imagem} onChange={handleChange}
          className="col-span-2 bg-gray-800 border border-gray-700 text-white placeholder-gray-500 rounded-lg px-4 py-2 focus:outline-none focus:border-orange-500" />
        <button type="submit"
          className="col-span-2 bg-orange-500 hover:bg-orange-400 text-white font-bold py-2 rounded-lg uppercase tracking-widest transition">
          Cadastrar
        </button>
      </form>
    </div>
  );
}

export default VehicleForm;