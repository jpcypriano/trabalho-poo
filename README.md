# Trabalho semestral — Programação Orientada a Objetos

API de uma loja feita com **NestJS** e **PostgreSQL** (TypeORM).

## Módulos e rotas

| Módulo   | Método | Rota            | O que faz                                        |
|----------|--------|-----------------|--------------------------------------------------|
| Clientes | GET    | /clientes       | lista os clientes                                |
| Clientes | GET    | /clientes/:id   | busca um cliente                                 |
| Clientes | POST   | /clientes       | cadastra um cliente                              |
| Clientes | DELETE | /clientes/:id   | remove um cliente                                |
| Produtos | GET    | /produtos       | lista os produtos                                |
| Produtos | GET    | /produtos/:id   | busca um produto                                 |
| Produtos | POST   | /produtos       | cadastra um produto                              |
| Produtos | DELETE | /produtos/:id   | remove um produto                                |
| Pedidos  | GET    | /pedidos        | lista os pedidos                                 |
| Pedidos  | GET    | /pedidos/:id    | busca um pedido                                  |
| Pedidos  | POST   | /pedidos        | cria um pedido (calcula o total e baixa estoque) |
| Pedidos  | DELETE | /pedidos/:id    | remove um pedido                                 |

### Exemplos de corpo (JSON)

- POST /clientes: `{ "nome": "Carlos", "email": "carlos@email.com" }`
- POST /produtos: `{ "nome": "Cabo HDMI", "preco": 25.9, "estoque": 100 }`
- POST /pedidos: `{ "clienteId": 1, "produtoId": 2, "quantidade": 3 }`

## Como rodar

Requisitos: Node.js 18+ e PostgreSQL instalado e rodando.

1. Criar o banco `loja` no PostgreSQL:
   ```
   sudo -u postgres psql -c "CREATE DATABASE loja;"
   ```
   (no Windows, pode ser criado pelo pgAdmin ou com `psql -U postgres -c "CREATE DATABASE loja;"`)
2. Instalar as dependências:
   ```
   npm install
   ```
3. Popular o banco com dados de exemplo (seed):
   ```
   npx ts-node src/seed.ts
   ```
4. Iniciar a API:
   ```
   npm run start
   ```
   A API fica em http://localhost:3000

As tabelas são criadas automaticamente quando a API (ou o seed) conecta no banco.

A conexão usa por padrão: host `localhost`, porta `5432`, usuário `postgres`,
senha `postgres` e banco `loja`. Se o seu PostgreSQL for diferente, ajuste os
valores em `src/database.ts` (ou use as variáveis `DB_HOST`, `DB_PORT`,
`DB_USER`, `DB_PASS` e `DB_NAME`).

## Estrutura

```
src/
  main.ts                 inicia a aplicação
  app.module.ts           módulo principal (conexão com o banco + 3 módulos)
  database.ts             configuração do PostgreSQL
  seed.ts                 script de seed
  clientes/               entity, service, controller e module
  produtos/               entity, service, controller e module
  pedidos/                entity, service, controller e module
```

Cada módulo segue o mesmo padrão:
- **entity**: classe que representa a tabela no banco
- **service**: regras de negócio e acesso ao banco
- **controller**: define as rotas HTTP e chama o service
- **module**: junta as peças do módulo
