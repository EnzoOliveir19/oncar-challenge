import { useState } from 'react';

function SimulationForm({ vehicles }) {
  const [form, setForm] = useState({
    nome: '',
    vehicle_id: '',
    renda: ''
  });
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

  return (
    <div>
      <h2>Simulação de Financiamento</h2>
      <form onSubmit={handleSubmit}>
        <input name="nome" placeholder="Seu nome" value={form.nome} onChange={handleChange} /><br />
        <select name="vehicle_id" value={form.vehicle_id} onChange={handleChange}>
          <option value="">Selecione um veículo</option>
          {vehicles.map(v => (
            <option key={v.id} value={v.id}>
              {v.modelo} - {v.marca} (R$ {v.valor})
            </option>
          ))}
        </select><br />
        <input name="renda" placeholder="Sua renda mensal" value={form.renda} onChange={handleChange} /><br />
        <button type="submit">Simular</button>
      </form>

      {result && (
        <div>
          <h3>Resultado</h3>
          <p>Score: {result.score}</p>
          <p>Status: {result.status}</p>
          <p>Entrada necessária: R$ {result.entrada_necessaria}</p>
          <p>Comprometimento de renda: R$ {result.comprometimento_renda}</p>
        </div>
      )}
    </div>
  );
}

export default SimulationForm;