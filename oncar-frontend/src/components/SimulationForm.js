import { useState } from 'react';

function SimulationForm({ vehicles }) {
  const [form, setForm] = useState({ nome: '', vehicle_id: '', renda: '' });
  const [result, setResult] = useState(null);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    fetch('http://localhost:8080/simulations', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        nome: form.nome,
        vehicle_id: parseInt(form.vehicle_id),
        renda: parseFloat(form.renda)
      })
    })
      .then(res => res.json())
      .then(data => setResult(data));
  }

  const statusColor = result?.status === 'Reprovado' ? 'text-red-500' : 'text-green-400';

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
      <h2 className="text-lg font-bold text-orange-500 uppercase tracking-widest mb-6">
        Simulação de Financiamento
      </h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
        <input name="nome" placeholder="Seu nome" value={form.nome} onChange={handleChange}
          className="bg-gray-800 border border-gray-700 text-white placeholder-gray-500 rounded-lg px-4 py-2 focus:outline-none focus:border-orange-500" />
        <input name="renda" placeholder="Renda mensal (R$)" value={form.renda} onChange={handleChange}
          className="bg-gray-800 border border-gray-700 text-white placeholder-gray-500 rounded-lg px-4 py-2 focus:outline-none focus:border-orange-500" />
        <select name="vehicle_id" value={form.vehicle_id} onChange={handleChange}
          className="col-span-2 bg-gray-800 border border-gray-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:border-orange-500">
          <option value="">Selecione um veículo</option>
          {vehicles.map(v => (
            <option key={v.id} value={v.id}>
              {v.modelo} - {v.marca} (R$ {v.valor.toLocaleString('pt-BR')})
            </option>
          ))}
        </select>
        <button type="submit"
          className="col-span-2 bg-orange-500 hover:bg-orange-400 text-white font-bold py-2 rounded-lg uppercase tracking-widest transition">
          Simular
        </button>
      </form>

      {result && (
        <div className="mt-6 bg-gray-800 border border-gray-700 rounded-xl p-6">
          <h3 className="text-white font-bold text-lg mb-4">Resultado para {result.nome}</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-900 rounded-lg p-4">
              <p className="text-gray-400 text-xs uppercase tracking-widest">Score</p>
              <p className="text-orange-500 font-bold text-2xl">{result.score}</p>
            </div>
            <div className="bg-gray-900 rounded-lg p-4">
              <p className="text-gray-400 text-xs uppercase tracking-widest">Status</p>
              <p className={`font-bold text-2xl ${statusColor}`}>{result.status}</p>
            </div>
            <div className="bg-gray-900 rounded-lg p-4">
              <p className="text-gray-400 text-xs uppercase tracking-widest">Entrada necessária</p>
              <p className="text-white font-bold text-xl">R$ {result.entrada_necessaria.toLocaleString('pt-BR')}</p>
            </div>
            <div className="bg-gray-900 rounded-lg p-4">
              <p className="text-gray-400 text-xs uppercase tracking-widest">Comprometimento de renda</p>
              <p className="text-white font-bold text-xl">R$ {result.comprometimento_renda.toLocaleString('pt-BR')}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default SimulationForm;