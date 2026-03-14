# ONCar Challenge

Aplicação de gestão de veículos com simulação de financiamento.

## Tecnologias

**Backend:** Go, Gin  
**Frontend:** React, Tailwind CSS

## Como rodar

### Backend
```bash
cd oncar-challenge
go run cmd/main.go
```

Servidor sobe em `http://localhost:8080`

### Frontend
```bash
cd oncar-frontend
npm start
```

Aplicação abre em `http://localhost:3000`

## Rotas da API

| Método | Rota | Descrição |
|--------|------|-----------|
| GET | /vehicles | Lista todos os veículos |
| GET | /vehicles/:id | Busca um veículo por ID |
| POST | /vehicles | Cadastra um novo veículo |
| DELETE | /vehicles/:id | Remove um veículo |
| POST | /simulations | Cria uma simulação de financiamento |

## Regras de financiamento

| Score | Resultado |
|-------|-----------|
| 1 a 299 | Reprovado |
| 300 a 599 | 70% de entrada, 30% de comprometimento de renda |
| 600 a 799 | 50% de entrada, 25% de comprometimento de renda |
| 800 a 950 | 30% de entrada, 20% de comprometimento de renda |
| 951 a 999 | 100% financiado, taxa zero |