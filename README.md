# TaskFlow

TaskFlow é um aplicativo de gerenciamento de tarefas construído com **React** no front-end e **Node.js** com **Express** no back-end. Este projeto permite aos usuários se registrar, fazer login e gerenciar suas tarefas de forma simples e eficiente.

## Requisitos

Antes de começar, certifique-se de ter o seguinte instalado:

- **Node.js**: [Node.js](https://nodejs.org/)
- **MySQL**: [MySQL](https://www.mysql.com/)

## Configuração do Ambiente

### 1. Configuração do arquivo `.env`

Este projeto é um **monorepo**, contendo tanto o front-end quanto o back-end na mesma estrutura de diretórios. Para funcionar corretamente, é necessário configurar as variáveis de ambiente tanto no front-end quanto no back-end.

#### Variáveis de Ambiente do Backend:

Crie um arquivo `.env` na pasta do back-end e adicione as seguintes variáveis:

<pre>
<code class="bash">JWT_SECRET=kXkQ1J1XF9ASYpuR74iR4WdKlK9xdMUXc+9QVEu63Bs=
DATABASE_NAME=challenge
DATABASE_USERNAME=root
DATABASE_PASSWORD=
DATABASE_PORT=3307
PORT=5000
</code>
</pre>

- `JWT_SECRET`: Chave secreta usada para gerar e verificar tokens JWT.
- `DATABASE_NAME`: Nome do banco de dados utilizado (neste caso, `challenge`).
- `DATABASE_USERNAME`: Nome de usuário para acessar o banco de dados MySQL (neste caso, `root`).
- `DATABASE_PASSWORD`: Senha para o usuário do banco de dados MySQL.
- `DATABASE_PORT`: Porta do MySQL (o padrão é 3306, mas aqui estamos usando a porta 3307).
- `PORT`: Porta do servidor backend (padrão 5000).

#### Variáveis de Ambiente do Frontend:

Crie um arquivo `.env` na pasta do front-end e adicione a seguinte variável:

<pre>
<code class="bash">VITE_API_URL=http://localhost:5000/api</code>
</pre>

- `VITE_API_URL`: URL para a API do backend (usado para fazer as requisições do front-end).

### 2. Instalando as Dependências

Navegue até as pastas `frontend` e `backend` e execute o seguinte comando em ambas as pastas para instalar as dependências necessárias:

<pre>
<code class="bash">npm install</code>
</pre>

### 3. Configuração do Banco de Dados

Crie um banco de dados no MySQL com o nome configurado nas variáveis de ambiente (neste caso, `challenge`). Você pode fazer isso executando o seguinte comando no terminal do MySQL:

<pre>
<code class="sql">CREATE DATABASE challenge;</code>
</pre>

### 4. Sincronizando o Banco de Dados

Agora, execute o comando abaixo na pasta do back-end para sincronizar o banco de dados com os modelos:

<pre>
<code class="bash">npm run sync-db</code>
</pre>

### 5. Iniciando o Servidor

Agora que tudo está configurado, inicie o servidor back-end e o front-end.

- No diretório `backend`, execute:

<pre>
<code class="bash">npm run dev</code>
</pre>

- No diretório `frontend`, execute:

<pre>
<code class="bash">npm run dev</code>
</pre>

Seu projeto estará funcionando nas portas configuradas no `.env`. Por padrão, o back-end estará na porta `5000`, e o front-end estará na porta `3000`.

### 6. Testando o Projeto

Acesse o front-end no navegador (geralmente, em `http://localhost:3000`) e teste as funcionalidades, como login, registro, e gerenciamento de tarefas.

---

## Mais

Se quiser ver mais dos meus projetos, pode acessar o site da minha agência: [https://www.studioadonai.com](https://www.studioadonai.com)

Caso precise de suporte para rodar o projeto, sinta-se à vontade para me chamar no Discord: `lastmgl`, ou se preferir, no WhatsApp que tenho dentro do meu site.
