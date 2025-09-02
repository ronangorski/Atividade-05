# Atividade 5 - Consumo de API com ReactJS


# React Movie App

Este é um aplicativo React para buscar filmes, visualizar detalhes e gerenciar uma lista de favoritos, consumindo a API do TMDB (The Movie Database).

## Funcionalidades

- Buscar filmes pelo nome.
- Exibir lista de resultados com pôster, título e ano.
- Paginação para navegar entre páginas de resultados.
- Página de detalhes do filme com informações completas (diretor, elenco, sinopse, avaliação).
- Adicionar/remover filmes da lista de favoritos.
- Tratamento de carregamento e erros.
- Exibição de filmes populares na página inicial antes da busca.

## Tecnologias usadas

- React.js com hooks (useState, useEffect, useCallback)
- React Router para navegação
- Axios para chamadas HTTP
- CSS para estilização simples e responsiva

## Pré-requisitos

- Node.js (versão 16 ou superior recomendada)
- npm ou yarn instalado
- Api Key do TMDB, disponível em https://developer.themoviedb.org/docs/getting-started

## Passos para rodar localmente

1. Clone o repositório:
   ```bash
   git clone https://github.com/ronangorski/Atividade-05.git
   ```

2. Acesse o diretório do repositório:
    ```bash 
    cd seu-repositorio
    ```
    
3. Instale as dependências:
    ```bash 
    npm install
    ```

4. No arquivo .env da raiz do projeto, insira sua chave da API TMDB:
    ```bash
    REACT_APP_TMDB_API_KEY=sua_api_key_aqui
    ```

5. Inicie a aplicação:
    ```bash
    npm start
    ```

6. Abra no navegador o endereço:
    ```
    http://localhost:5173/
    ```