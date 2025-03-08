# Brain Agriculture - Sistema de Gestão de Produtores Rurais

Bem-vindo ao **Brain Agriculture**, um sistema desenvolvido para facilitar o gerenciamento de produtores rurais, fazendas, safras e culturas plantadas. Este projeto faz parte de um desafio técnico e foi desenvolvido utilizando **NestJS, TypeORM, PostgreSQL e Next.js**.

## 📌 Funcionalidades

- 📄 **Cadastro completo de produtores rurais**
- 🌾 **Gerenciamento de propriedades rurais e suas áreas**
- 📊 **Registro de safras e culturas plantadas**
- 🔍 **Consulta paginada e ordenada de produtores**
- ⚙️ **CRUD completo para todas as entidades**
- 🔐 **Validações robustas para CPF/CNPJ e áreas de fazenda**
- 📈 **Integração com Swagger para documentação da API**
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

### 2️⃣ **Configure as variáveis de ambiente**

Crie um arquivo **`.env`** na raiz do projeto e adicione as seguintes configurações:

```env
DATABASE_URL=postgres://user:password@postgres:5432/agriculture
```

### 3️⃣ **Suba os containers com Docker**

```sh
 docker-compose up --build
```

Isso iniciará os serviços **backend, frontend e banco de dados PostgreSQL**.

### 4️⃣ **Acesse os serviços**

- **API Backend**: `http://localhost:3000`
- **Documentação Swagger**: `http://localhost:3000/api`
- **Frontend Next.js**: `http://localhost:3001`
- **Banco de Dados (PostgreSQL)**: `localhost:5432`

---

## 📄 Endpoints da API

| Método   | Endpoint                     | Descrição                             |
| -------- | ---------------------------- | ------------------------------------- |
| `POST`   | `/producers`                 | Cadastrar um produtor e suas fazendas |
| `GET`    | `/producers?page=1&limit=10` | Listar produtores paginados           |
| `GET`    | `/producers/:id`             | Buscar um produtor específico         |
| `PUT`    | `/producers/:id`             | Atualizar dados de um produtor        |
| `DELETE` | `/producers/:id`             | Remover um produtor                   |

Para mais detalhes, acesse a **documentação Swagger** em `http://localhost:3000/api`.

---

## 📞 Contato

📧 **E-mail:** leandrodbdias@gmail.com  
🔗 **LinkedIn:** [Seu LinkedIn](https://www.linkedin.com/in/leandrodbdias/)  
📂 **GitHub:** [Seu GitHub](https://github.com/devleandrodias)

---

## 📌 Considerações Finais

Este projeto foi desenvolvido como parte de um desafio técnico para a **Brain Agriculture**. O objetivo foi demonstrar a capacidade de modelagem de dados, desenvolvimento backend, frontend e infraestrutura. Caso tenha sugestões ou melhorias, fique à vontade para contribuir!
