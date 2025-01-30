# Product Management API

Esta é uma API para gerenciar produtos. Ela permite realizar operações como criar, listar, e exportar produtos para um arquivo Excel.

## Funcionalidades

- **Cadastrar Produto:** Adiciona um produto no banco de dados.
- **Listar Produtos:** Recupera todos os produtos armazenados.
- **Exportar Produtos:** Exports todos os produtos em um arquivo Excel.

## Tecnologias Usadas

- **Node.js** - Ambiente de execução JavaScript no lado do servidor.
- **Express.js** - Framework web para Node.js.
- **PostgreSQL** - Banco de dados relacional.
- **ExcelJS** - Biblioteca para criação e manipulação de arquivos Excel.
- **TypeScript** - Superset do JavaScript que adiciona tipagem estática.
- **pg (node-postgres)** - Cliente PostgreSQL para Node.js.

## Pré-requisitos

Antes de rodar o projeto, certifique-se de ter os seguintes softwares instalados:

- **Node.js** (Recomendado versão LTS)
- **PostgreSQL** - Banco de dados relacional.
- **NPM** ou **Yarn** (para gerenciar dependências)

## Como Rodar o Projeto

### 1. Clone o repositório

Clone o repositório para sua máquina local:

```bash
git clone https://github.com/Caarlos7x/product-management-api.git
cd product-management-api
```

### 2. Instale as dependências
Execute o seguinte comando para instalar as dependências do projeto:

```
npm install
```

### 3. Configure o Banco de Dados
Certifique-se de ter o PostgreSQL rodando em sua máquina. Crie um banco de dados chamado product_db e configure o arquivo src/services/ProductServices.ts com as credenciais corretas de conexão.

```
const pool = new Pool({
  user: 'seu_usuario',
  host: 'localhost',
  database: 'product_db',
  password: 'sua_senha',
  port: 5432,
});
```
Execute a seguinte query para criar a tabela de produtos:
```
CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  description TEXT,
  price DECIMAL(10, 2) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 4. Rode o servidor
Com tudo configurado, rode o servidor local:

```
npm start
```
A API estará disponível em http://localhost:3000.

### Endpoints
GET /api/products
Recupera todos os produtos armazenados no banco de dados.

Resposta:
```
[
  {
    "id": 1,
    "name": "Amplificador Oneal",
    "description": "Descrição do produto",
    "price": 299.99,
    "created_at": "2025-01-01T00:00:00.000Z"
  },
  {
    "id": 2,
    "name": "Guitarra Fender",
    "description": "Guitarra elétrica",
    "price": 1499.99,
    "created_at": "2025-01-02T00:00:00.000Z"
  }
]
```

### POST /api/products
Adiciona um novo produto.

Body da Requisição: 
```
{
  "name": "Amplificador Oneal",
  "description": "Descrição do produto",
  "price": 299.99
}
```

Resposta:
```
{
  "id": 3,
  "name": "Amplificador Oneal",
  "description": "Descrição do produto",
  "price": 299.99,
  "created_at": "2025-01-01T00:00:00.000Z"
}
```

### POST /api/products/bulk
Adiciona múltiplos produtos de uma vez.

Body da Requisição:
```
[
  {
    "name": "Amplificador Oneal",
    "description": "Descrição do produto",
    "price": 299.99
  },
  {
    "name": "Guitarra Fender",
    "description": "Guitarra elétrica",
    "price": 1499.99
  }
]
```

### GET /api/products/export
Exporta todos os produtos para um arquivo Excel. O arquivo será enviado como um anexo.

Testando a API
Você pode usar o Insomnia, Postman, ou qualquer outra ferramenta de requisição HTTP para interagir com a API. Aqui estão os exemplos de endpoints para testar:

GET /api/products - Recupera todos os produtos.
POST /api/products - Cria um único produto.
POST /api/products/bulk - Cria múltiplos produtos.
GET /api/products/export - Exporta os produtos em um arquivo Excel.


### Licença
Este projeto está sob a Licença MIT.
