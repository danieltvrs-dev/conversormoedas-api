# API de Conversão de Moedas

Uma plataforma para converter valores entre moedas em tempo real. Você escolhe a moeda de origem e a de destino, digita um valor e vê o resultado na hora, junto com a cotação atual e um gráfico de como ela variou nos últimos dias.

Comecei esse projeto como estudo de desenvolvimento fullstack, e ele também serve como peça de portfólio.

## Funcionalidades

- Conversão em tempo real entre Real, Dólar, Euro, Libra, Iene, Bitcoin e outras moedas
- Cotação atual e data da última atualização
- Botão para inverter a moeda de origem e a de destino
- Histórico das conversões salvas, com opção de limpar
- Gráfico da variação da cotação, com escolha de período (7, 15 ou 30 dias)
- Interface responsiva, que funciona bem no celular e no computador

## Tecnologias

Frontend:

- React com Vite
- TailwindCSS para o estilo
- React Router para as rotas
- Axios para conversar com a API
- Recharts para o gráfico

Backend:

- Python com FastAPI
- SQLAlchemy para acessar o banco
- PostgreSQL para guardar o histórico

As cotações vêm da AwesomeAPI, uma API pública e gratuita.

## Como rodar o projeto

### Pré-requisitos

- Python 3.11 ou superior
- Node.js 20 ou superior
- PostgreSQL instalado e em execução

### Banco de dados

Crie um banco vazio chamado `conversormoedas` no seu PostgreSQL.

### Backend

A partir da pasta `backend`, crie o ambiente virtual e instale as dependências:

```bash
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
```

No Linux ou no macOS, o comando para ativar o ambiente é `source .venv/bin/activate`.

Crie um arquivo `.env` na pasta `backend`, usando o `.env.example` como modelo, e preencha a conexão com o seu PostgreSQL:

```
DATABASE_URL=postgresql://usuario:senha@localhost:5432/conversormoedas
```

Para iniciar o servidor:

```bash
uvicorn app.main:app --reload
```

A API responde em `http://localhost:8000`, e a documentação interativa fica em `http://localhost:8000/docs`.

### Frontend

A partir da pasta `frontend`, instale as dependências e suba o servidor de desenvolvimento:

```bash
npm install
npm run dev
```

O site abre em `http://localhost:5173`.

## Estrutura do projeto

```
conversormoedas-api/
├── backend/    API em FastAPI
└── frontend/   Aplicação em React
```
