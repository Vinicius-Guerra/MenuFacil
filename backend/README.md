# Backend da Aplicação

# Backend da Aplicação

## Visão Geral
Este é o backend da nossa aplicação web, desenvolvido usando Node.js, TypeScript, Prisma e JEST. Ele fornece uma API RESTful para o frontend e gerencia a lógica de negócios e o acesso ao banco de dados.

## Tecnologias Utilizadas
- Node.js
- Express
- Prisma (ORM)
- PostgreSQL (banco de dados)
- JWT (para autenticação)
- JEST (para testes)
- Superteste (para testes)
- Tsyringe (injeção)
- Zod (validação)

## Estrutura do Projeto
- `/prisma`: Configuração da ORM.
- `/src`: Contém todos os arquivos de código fonte do backend.
  - `/tests`: Contém todos os arquivos de testes.
    - `/mocks`: Mocks de entidades para testes.
    - `/integrations`: Testes de integração.
    - `/units`: Testes unitários.
    - `/utils`: utilitários.
  - `/controllers`: Controladores da API.
  - `/database`: Conexão com prima.
  - `/errors`: Configuração AppError.
  - `/middlewares`: Middlewares para autenticação, validação, etc.
  - `/routes`: Definições de rotas da API.
  - `/schemas`: Modelagem de entidades.
  - `/services`: Serviços da API.

## Como Rodar o Projeto Localmente
1. Clone o repositório:
   ```bash
   git clone <URL-do-repositório>
   ```
2. Navegue até a pasta do backend:
   ```bash
   cd backend
   ```
3. Instale as dependências:
   ```bash
   npm i
   ```
4. Configure as variáveis de ambiente. Crie um arquivo .env na raiz do projeto com as seguintes variáveis:
```typescript
DATABASE_URL=postgresql://username:password@localhost:5432/mydatabase
    
JWT_SECRET=your_jwt_secret
```

5. Execute as migrações do Prisma:
   ```bash
   npx prisma migrate dev
   ```
5. Inicie o servidor: 
   ```bash
   npm run dev
   ```
7. Acesse a API via postman ou integre com frontend já disponivel.

## Testes

### A aplicação possui testes unitários e de integração utilizando JEST.

1. Para rodar os testes:
```bash
    npm test
```

2. Para rodar testes específicos:
```bash
    npm run test:unit
    npm run test:integration
```

## Variáveis de ambiente
- `DATABASE_URL`:  URL de conexão com o banco de dados.
- `JWT_SECRET`: Segredo usado para assinar os tokens JWT.

## Scripts disponiveis

- `dev`: Inicia o servidor.
- `migrate:dev`: Migrações no ambiente de desenvolvimento.
- `migrate:test`: Migrações no ambiente de teste.
- `test:unit`: Roda os testes unitários.
- `test:integration`: Roda os testes de integração.
- `prisma:studio`: Abre o prisma studio no navegador.

## Deploy

1. Configure as variáveis de ambiente no seu servidor de produção.

2. Execute as migrações do banco de dados:
```bash
npx prisma migrate deploy
```

3. Inicie o servidor
```bash
npx start
```
