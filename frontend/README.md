# Frontend da Aplicação

## Visão Geral
Este é o frontend da nossa aplicação web, desenvolvido usando React e SCSS. Ele interage com o backend para fornecer uma interface dinâmica e responsiva aos usuários.

## Tecnologias Utilizadas
- React
- SCSS
- Axios (para requisições HTTP)
- React Router (para roteamento)
- Zod
- React Toastify
- Vite

## Estrutura do Projeto
- `/src`: Contém todos os arquivos de código fonte do frontend.
  - `/components`: Componentes React reutilizáveis.
  - `/pages`: Páginas da aplicação.
  - `/styles`: Arquivos SCSS para estilização.
  - `/utils`: Funções utilitárias.
  - `/hooks`: Custom Hooks.
  - `/providers`: Ligação com backend.
  - `/routes`:  Chamada de rotas.
  - `/services`: Configuração Axios.

## Como Rodar o Projeto Localmente
1. Clone o repositório:
   ```bash
   git clone <URL-do-repositório>
   # Frontend da Aplicação

## Visão Geral
Este é o frontend da nossa aplicação web, desenvolvido usando React e SCSS. Ele interage com o backend para fornecer uma interface dinâmica e responsiva aos usuários.

## Tecnologias Utilizadas
- React
- SCSS
- Axios (para requisições HTTP)
- React Router (para roteamento)

## Estrutura do Projeto
- `/src`: Contém todos os arquivos de código fonte do frontend.
  - `/components`: Componentes React reutilizáveis.
  - `/pages`: Páginas da aplicação.
  - `/styles`: Arquivos SCSS para estilização.
  - `/utils`: Funções utilitárias.
  - `/hooks`: Custom Hooks.

## Como Rodar o Projeto Localmente
1. Clone o repositório:
   ```bash
   git clone <URL-do-repositório>
   ```
2. Navegue até a pasta do frontend:
   ```bash
   cd frontend
   ```  
3. Instale as dependências:
   ```bash
   npm install
   ```
4. Inicie o servidor de desenvolvimento::
    ```bash
    npm run dev
    ```
3. Acesse a aplicação no navegador:

## Variáveis de ambiente

 - Arquivo .env > `REACT_APP_API_URL`: URL da API do backend.

 ## Deploy

 1. Crie uma versão de produção:
 ```bash
    npm run build
```

2. Hospede a pasta build em seu serviço de hospedagem favorito.