# CRUD Produtos Frontend

Frontend em Angular para o CRUD de Produtos, consumindo a API REST construída em Laravel. Projeto de estudo preparando para uma stack real com PHP 8.2 + MySQL 8 + Angular + REST API (JSON/XML).

## Stack

- Angular 18 (standalone components)
- TypeScript
- RxJS
- Reactive Forms
- Angular Signals (estado de autenticação)

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

> **Importante:** a API backend precisa estar rodando em `http://127.0.0.1:8000` para o frontend funcionar (veja o `apiUrl` em `src/app/services/produto.service.ts` e `src/app/services/auth.service.ts`).

## Autenticação

O app exige login para acessar as telas de produtos. O fluxo funciona assim:

1. Usuário se cadastra em `/registro` ou faz login em `/login`
2. O backend retorna um token, que é salvo no `localStorage`
3. Um **HttpInterceptor** (`auth.interceptor.ts`) anexa automaticamente o token em toda requisição subsequente, via header `Authorization: Bearer`
4. Um **Guard** (`auth.guard.ts`) bloqueia o acesso às rotas de produtos se não houver token salvo, redirecionando para `/login`
5. O botão "Sair" invalida o token no backend e limpa o `localStorage`

## Funcionalidades

- Cadastro e login de usuário
- Proteção de rotas (guard de autenticação)
- Listagem de produtos com **paginação**
- Cadastro de novo produto
- Edição de produto existente
- Remoção de produto (com confirmação)
- Validação de formulário (nome obrigatório, preço e estoque não negativos)
- Logout

## Estrutura do projeto

src/app/
├── components/
│ ├── produto-lista/ # Tela de listagem (com paginação)
│ ├── produto-form/ # Tela de criação/edição
│ ├── login/ # Tela de login
│ └── registro/ # Tela de cadastro
├── models/
│ ├── produto.ts # Interface do Produto
│ └── pagina.ts # Interface genérica de resposta paginada
├── services/
│ ├── produto.service.ts # Comunicação com a API de produtos
│ └── auth.service.ts # Login, registro, logout e estado de sessão
├── interceptors/
│ └── auth.interceptor.ts # Anexa o token em toda requisição
├── guards/
│ └── auth.guard.ts # Bloqueia rotas sem autenticação
├── app.routes.ts # Rotas da aplicação
└── app.config.ts # Configuração da aplicação (HttpClient, Router, Interceptors)


## Rotas

| Rota | Componente | Protegida? | Descrição |
|---|---|---|---|
| `/login` | LoginComponent | Não | Tela de login |
| `/registro` | RegistroComponent | Não | Tela de cadastro |
| `/` | ProdutoListaComponent | Sim | Lista paginada de produtos |
| `/novo` | ProdutoFormComponent | Sim | Formulário de criação |
| `/editar/:id` | ProdutoFormComponent | Sim | Formulário de edição |
