<div align="center">

# API de Conversão de Moedas

Conversor fullstack em tempo real, com histórico persistente e gráfico de variação. Suporta 10 moedas, incluindo Bitcoin.

[![demo](https://img.shields.io/badge/demo-conversormoedas--app.onrender.com-2dd4bf?style=for-the-badge)](https://conversormoedas-app.onrender.com)

[![React](https://img.shields.io/badge/React-19-61dafb?logo=react&logoColor=white)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-8-646cff?logo=vite&logoColor=white)](https://vite.dev)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4-38bdf8?logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.136-009688?logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-18-4169e1?logo=postgresql&logoColor=white)](https://postgresql.org)
[![Render](https://img.shields.io/badge/deploy-Render-46e3b7?logo=render&logoColor=white)](https://render.com)

<br />

<img src="docs/screenshot.png" alt="Tela do conversor de moedas" width="900" />

</div>

---

Esse é o meu projeto de estudo de desenvolvimento fullstack. Comecei do zero, desenhando a arquitetura, escolhendo a stack e construindo etapa por etapa: API com FastAPI, banco com PostgreSQL, frontend em React, deploy no Render. O código está aberto, e o histórico de commits granulares conta o passo a passo da construção.

## Demo

**https://conversormoedas-app.onrender.com**

A primeira conversão pode demorar uns 50 segundos: o backend gratuito do Render dorme depois de 15 minutos sem uso. Depois que ele acorda, fica instantâneo.

## Funcionalidades

- **Conversão em tempo real** entre Real, Dólar, Euro, Libra, Iene, Bitcoin e mais
- **Cotação atual em destaque**, com mini gráfico de tendência
- **Selo de alta ou baixa** mostrando quanto a cotação variou no período
- **Inverter moedas** com um clique
- **Histórico persistente** no PostgreSQL: salvar, listar, limpar
- **Gráfico de variação** com escolha de período (7, 15 ou 30 dias)
- **Layout responsivo** com tema escuro, no estilo de dashboards fintech

## Stack

| Camada | Tecnologias |
|---|---|
| Frontend | React 19, Vite, TailwindCSS, React Router, Axios, Recharts |
| Backend | Python, FastAPI, SQLAlchemy, httpx, Pydantic |
| Banco | PostgreSQL |
| Deploy | Render (frontend, backend e banco), com `render.yaml` |

As cotações vêm da [AwesomeAPI](https://docs.awesomeapi.com.br/api-de-moedas), API brasileira gratuita.

## Como funciona

```
   ┌──────────────┐         ┌──────────────┐         ┌──────────────┐
   │              │  HTTPS  │              │  HTTPS  │              │
   │   Frontend   │ ──────► │   Backend    │ ──────► │  AwesomeAPI  │
   │  React+Vite  │ ◄────── │   FastAPI    │ ◄────── │  (cotações)  │
   │              │         │              │         │              │
   └──────────────┘         └──────┬───────┘         └──────────────┘
                                   │
                                   ▼
                            ┌──────────────┐
                            │              │
                            │  PostgreSQL  │
                            │  (histórico) │
                            │              │
                            └──────────────┘
```

O frontend nunca fala direto com a AwesomeAPI nem com o banco. Tudo passa pelo backend, que centraliza as regras, esconde chaves de API e cacheia o que precisa.

## Decisões técnicas

**Por que o backend usa o Real como pivô para conversão**
A AwesomeAPI não tem todos os pares de moedas (por exemplo, `BTC-JPY` e `BRL-BTC` não existem). Mas toda moeda tem par contra o Real (`X-BRL`). Então, para qualquer conversão, busco quanto valem ambas em reais e divido. Funciona para 100% das combinações, em uma única chamada à API.

**Por que tem cache em memória das cotações**
O frontend converte ao digitar, o que dispararia uma chamada à AwesomeAPI a cada tecla. Como ela tem limite de uso, o backend guarda em memória as respostas por 5 minutos (cotações atuais) e 1 hora (séries diárias). Reduz drasticamente as chamadas e mantém a experiência instantânea.

**Por que o startup do backend tem retry de banco**
Em ambientes onde o banco é provisionado em paralelo com o serviço (como no Render), a primeira conexão pode falhar antes do banco estar aceitando conexões. O `criar_tabelas` tenta até 10 vezes, com espera entre tentativas, e o backend sobe assim que o banco responde.

## Como rodar localmente

### Pré-requisitos

- Python 3.11 ou superior
- Node.js 20 ou superior
- PostgreSQL em execução
- Uma chave gratuita da [AwesomeAPI](https://awesomeapi.com.br) (cadastro grátis)

### Banco de dados

Crie um banco vazio chamado `conversormoedas` no seu PostgreSQL.

### Backend

A partir da raiz do projeto:

```bash
cd backend
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
```

No Linux ou no macOS, o comando para ativar o ambiente é `source .venv/bin/activate`.

Copie `.env.example` para `.env` e preencha:

```env
DATABASE_URL=postgresql://usuario:senha@localhost:5432/conversormoedas
AWESOMEAPI_KEY=sua_chave_aqui
```

Suba o servidor:

```bash
uvicorn app.main:app --reload
```

A API responde em `http://localhost:8000`. A documentação interativa fica em `http://localhost:8000/docs`.

### Frontend

A partir da raiz do projeto:

```bash
cd frontend
npm install
npm run dev
```

O site abre em `http://localhost:5173`.

## Deploy

O projeto se configura sozinho no Render através do `render.yaml`. Frontend como Static Site, backend como Web Service e PostgreSQL gerenciado, todos no plano grátis. Cada `git push` no `main` dispara um redeploy automático dos serviços que mudaram.

## Estrutura do projeto

```
conversormoedas-api/
├── backend/
│   └── app/
│       ├── config.py        configurações lidas do .env
│       ├── database.py      conexão e ORM com PostgreSQL
│       ├── main.py          ponto de entrada do FastAPI
│       ├── models/          tabelas como classes Python
│       ├── routers/         rotas HTTP agrupadas por tema
│       ├── schemas/         contratos de entrada e saída
│       └── services/        regras de negócio
├── frontend/
│   └── src/
│       ├── components/      peças reutilizáveis de UI
│       ├── pages/           telas inteiras
│       ├── services/        clientes HTTP do backend
│       └── utils/           funções utilitárias
├── render.yaml              blueprint de deploy
└── README.md
```

## Autor

Feito por **Daniel Tavares** durante a graduação em ADS, como projeto de estudo e portfólio.

[GitHub @danieltvrs-dev](https://github.com/danieltvrs-dev)
