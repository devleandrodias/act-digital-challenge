# Brain Agriculture - Sistema de Gestão de Produtores Rurais

Bem-vindo ao **Brain Agriculture**, um sistema desenvolvido para facilitar o gerenciamento de produtores rurais, fazendas, safras e culturas plantadas. Este projeto faz parte de um desafio técnico e foi desenvolvido utilizando **NestJS, TypeORM, PostgreSQL e Next.js**.

---

## 📌 Funcionalidades

- 📄 **Cadastro completo de produtores rurais**
- 🏡 **Gerenciamento de fazendas e suas áreas**
- 🌾 **Registro e controle de safras e culturas plantadas**
- 📊 **Painel de métricas e dashboard**
- 🔍 **Consulta paginada e ordenada de produtores**
- ⚙️ **CRUD completo para todas as entidades**
- 🔐 **Validações robustas para CPF/CNPJ e áreas de fazenda**
- 📈 **Integração com Swagger para documentação da API**
- ✅ **Cobertura de testes unitários com 100% de coverage nas regras de negócio**
- 🚀 **Execução via Docker para ambiente local e produção**

---

## 🛠 Tecnologias Utilizadas

### **Backend (API - NestJS)**

- **NestJS** - Framework modular baseado em TypeScript
- **TypeORM** - ORM para banco de dados PostgreSQL
- **PostgreSQL** - Banco de dados relacional
- **nestjs-paginate** - Biblioteca de paginação para consultas eficientes
- **class-validator** - Validação de DTOs
- **Swagger** - Documentação automática da API
- **Jest** - Testes unitários

### **Frontend (Next.js)**

- **Next.js** - Framework React para SSR e SPA
- **Shadcn UI** - Biblioteca de componentes estilizados
- **Context API** - Gerenciamento de estado sem Redux
- **Axios** - Consumo de APIs

### **Infraestrutura**

- **Docker** - Contêinerização do backend, frontend e banco de dados
- **Docker Compose** - Orquestração dos serviços

---

## 🚀 Como Executar o Projeto com Docker

### 1️⃣ **Clone o repositório**

```sh
git clone https://github.com/devleandrodias/act-digital-challenge
cd act-digital-challenge
```

### 2️⃣ **Suba os containers com Docker**

```sh
docker compose up -d
```

Isso iniciará os serviços **backend, frontend e banco de dados PostgreSQL**.

### 3️⃣ **Acesse os serviços**

- **API Backend**: `http://localhost:3000`
- **Documentação Swagger**: `http://localhost:3000/api`
- **Frontend Next.js**: `http://localhost:3001`
- **Banco de Dados (PostgreSQL)**: `localhost:5432`

---

## 📄 Endpoints da API

### **📌 Produtores (`/producers`)**

| Método   | Endpoint                     | Descrição                             |
| -------- | ---------------------------- | ------------------------------------- |
| `POST`   | `/producers`                 | Cadastrar um produtor e suas fazendas |
| `GET`    | `/producers?page=1&limit=10` | Listar produtores paginados           |
| `GET`    | `/producers/:id`             | Buscar um produtor específico         |
| `PUT`    | `/producers/:id`             | Atualizar dados de um produtor        |
| `DELETE` | `/producers/:id`             | Remover um produtor                   |

### **🌾 Safras (`/harvests`)**

| Método   | Endpoint        | Descrição                   |
| -------- | --------------- | --------------------------- |
| `POST`   | `/harvests`     | Cadastrar uma nova safra    |
| `GET`    | `/harvests`     | Listar todas as safras      |
| `GET`    | `/harvests/:id` | Buscar uma safra específica |
| `PUT`    | `/harvests/:id` | Atualizar uma safra         |
| `DELETE` | `/harvests/:id` | Remover uma safra           |

### **🏡 Fazendas (`/farms`)**

| Método   | Endpoint     | Descrição                     |
| -------- | ------------ | ----------------------------- |
| `POST`   | `/farms`     | Cadastrar uma nova fazenda    |
| `GET`    | `/farms`     | Listar todas as fazendas      |
| `GET`    | `/farms/:id` | Buscar uma fazenda específica |
| `PUT`    | `/farms/:id` | Atualizar dados da fazenda    |
| `DELETE` | `/farms/:id` | Remover uma fazenda           |

### **🌱 Culturas (`/crops`)**

| Método   | Endpoint     | Descrição                        |
| -------- | ------------ | -------------------------------- |
| `POST`   | `/crops`     | Cadastrar uma nova cultura       |
| `GET`    | `/crops`     | Listar todas as culturas         |
| `GET`    | `/crops/:id` | Buscar uma cultura específica    |
| `PUT`    | `/crops/:id` | Atualizar informações da cultura |
| `DELETE` | `/crops/:id` | Remover uma cultura              |

### **📊 Dashboard (`/dashboard`)**

| Método | Endpoint               | Descrição                      |
| ------ | ---------------------- | ------------------------------ |
| `GET`  | `/dashboard/summary`   | Resumo geral                   |
| `GET`  | `/dashboard/producers` | Métricas de produtores         |
| `GET`  | `/dashboard/farms`     | Dados estatísticos de fazendas |
| `GET`  | `/dashboard/crops`     | Estatísticas de culturas       |

Para mais detalhes, acesse a **documentação Swagger** em `http://localhost:3000/api`.

---

## ✅ Executando Testes Unitários

Os testes unitários foram implementados utilizando **Jest** e cobrem **100% das regras de negócio**. Para rodar os testes:

```sh
npm install
```

```sh
npm run test
```

Para visualizar o **relatório de cobertura**:

```sh
npm run test:cov
```

Isso gera um relatório detalhado com a cobertura dos testes.

---

## 📞 Contato

📧 **E-mail:** leandrodbdias@gmail.com  
🔗 **LinkedIn:** [Acesse aqui](https://www.linkedin.com/in/leandrodbdias/)  
📂 **GitHub:** [Acesse aqui](https://github.com/devleandrodias)

---

## 📌 Considerações Finais

Este projeto foi desenvolvido como parte de um desafio técnico para a **Brain Agriculture**. O objetivo foi demonstrar a capacidade de modelagem de dados, desenvolvimento backend, frontend e infraestrutura.

Caso tenha sugestões ou melhorias, fique à vontade para contribuir!
