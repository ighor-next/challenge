# Teste Challenge

Este repositório é um monorepo utilizando **Yarn Workspaces**, contendo um frontend desenvolvido com **React** e um backend utilizando **NestJS**.

## Estrutura do Projeto

```
root/
 |-- packages/
 |    |-- frontend/   # Aplicação React
 |    |-- backend/    # Aplicação NestJS
 |-- package.json
 |-- yarn.lock
```

## 🚀 Tecnologias Utilizadas

![Yarn](https://img.shields.io/badge/Yarn-1E6EDE?logo=yarn&logoColor=white&style=for-the-badge)
![React](https://img.shields.io/badge/React-61DAFB?logo=react&logoColor=white&style=for-the-badge)
![Vite](https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=white&style=for-the-badge)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white&style=for-the-badge)
![Zustand](https://img.shields.io/badge/Zustand-000000?logo=zustand&logoColor=white&style=for-the-badge)
![NestJS](https://img.shields.io/badge/NestJS-E0234E?logo=nestjs&logoColor=white&style=for-the-badge)
![Zod](https://img.shields.io/badge/Zod-8E44AD?style=for-the-badge)
![Prisma](https://img.shields.io/badge/Prisma-2D3748?logo=prisma&logoColor=white&style=for-the-badge)
![SQLite](https://img.shields.io/badge/SQLite-003B57?logo=sqlite&logoColor=white&style=for-the-badge)
![Monorepo](https://img.shields.io/badge/Monorepo-FFD700?style=for-the-badge)

- **Monorepo:** Yarn Workspaces
- **Frontend:** React, Vite 
- **Backend:** NestJS, Zod, Sqlite, Prisma
- **Gerenciador de Pacotes:** Yarn

## Requisitos

Certifique-se de ter instalado:

- [Node.js](https://nodejs.org/) (versão 16 ou superior)
- [Yarn](https://yarnpkg.com/) 

⚠️ **IMPORTANTE:** Este projeto utiliza **Yarn Workspaces**, então **é obrigatório usar o Yarn como gerenciador de pacotes**. **Não use npm ou pnpm**, pois isso pode causar erros na resolução das dependências.

## Instalação

Clone o repositório e instale as dependências:

```sh
# Clone o repositório
git clone https://github.com/seu-usuario/seu-repositorio.git
cd seu-repositorio

# Instale as dependências
yarn install
```

## Inicialização do Projeto

### Iniciando o Backend

```sh
cd challenge/
yarn run backend
```

### Iniciando o Frontend

```sh
cd challenge/
yarn run frontend
```

O frontend estará disponível em `http://localhost:5173` e o backend em `http://localhost:3000` .

## Configuração de Ambiente

Crie um arquivo `.env` dentro de `packages/backend` com a variavel de ambiente  seguinte:

**Backend (`packages/backend/.env`)**

```
DATABASE_URL="file:./dev.db"
```

## Contribuições

Contribuições são bem-vindas! Siga os passos abaixo para colaborar:

1. Faça um fork do repositório.
2. Crie um branch para sua feature ou bugfix: `git checkout -b minha-feature`.
3. Faça os commits e adicione uma descrição clara: `git commit -m "Minha nova feature"`.
4. Envie seu código: `git push origin minha-feature`.
5. Abra um Pull Request.

---

## Licença

Este projeto está licenciado sob a Licença MIT. Consulte o arquivo [LICENSE](LICENSE) para mais informações.

---

## Contato

- **Desenvolvedor**: Max Assis
- **E-mail**: max.assis@outlook.com
- **GitHub**: [@maxassis](https://github.com/maxassis)
