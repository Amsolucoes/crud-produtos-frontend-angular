# CRUD Produtos Frontend

Frontend em Angular para o CRUD de Produtos, consumindo a API REST construída em Laravel. Projeto de estudo preparando para uma stack real com PHP 8.2 + MySQL 8 + Angular + REST API (JSON).

## Stack

- Angular 18 (standalone components)
- TypeScript
- RxJS
- Reactive Forms

## Pré-requisitos

- **Node.js** 20+
- **Angular CLI** (pode ser usado via `npx` sem instalação global)
- Backend da API rodando (veja o repositório [crud-produtos-api](https://github.com/seu-usuario/crud-produtos-api))

## Instalação

1. Clonar o repositório:
```bash
git clone https://github.com/seu-usuario/crud-produtos-frontend.git
cd crud-produtos-frontend
```

2. Instalar as dependências:
```bash
npm install
```

3. Subir o servidor de desenvolvimento:
```bash
ng serve
```

A aplicação estará disponível em `http://localhost:4200`.

> **Importante:** a API backend precisa estar rodando em `http://127.0.0.1:8000` para o frontend funcionar (veja o `apiUrl` em `src/app/services/produto.service.ts`).

## Funcionalidades

- Listagem de produtos
- Cadastro de novo produto
- Edição de produto existente
- Remoção de produto (com confirmação)
- Validação de formulário (nome obrigatório, preço e estoque não negativos)

## Estrutura do projeto
