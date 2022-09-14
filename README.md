# Blogs API

O Blogs API é uma ma API REST e um banco de dados para a produção de conteúdo para um blog, onde você pode fazer requisições HTTP para criar, consultar, atualizar e deletar posts, categorias e usuários de um blog (CRUD). Tem autenticação de usuário, com JWT (Json Web Token), e você só pode alterar um post que você mesmo criou.</br>
Ele foi desenvolvido em JS, utilizando o banco de dados MySQL, com Express e o ORM Sequelize. Utiliza a arquitetura de camadas MSC.</br>

## Inicialização via Docker

1. Clone o repositório `git@github.com:trkotovicz/blogs-api.git`
2. Na raíz do repositório rode o comando `docker-compose up -d`
3. Entre o terminal do container criado `docker exec -it blogs_api bash`
4. Instale as dependências do projeto com `npm install`
5. Inicie a aplicação dentro do container `npm start`
</br>
O servidor vai estar rodando na porta local 3000 (http://localhost:3000).</br>
Utilize o cliente de requisições HTTP de sua preferência para fazer as requisições.

---

## 🚧 README em construção 🚧

*Algumas rotas ainda estão sem informações, mas logo você poderá consultar a documentação completa.*
</br>
</br>

## Rotas

⚠️ Alguns endpoints vão precisar de uma autenticação prévia, para que seja possível consumir o endpoint.</br>
Seu token vai ser gerado com a ferramenta JWT ao realizar o login ou cadastrar um novo usuário.

### POST `/login`

O endpoint recebe no corpo da requisição os campos `email` e `password` e retorna um token aleatório de 16 caracteres.</br>
A requisição deve ter o body com um email e uma senha válidos. Exemplo:
```json
  {
    "email": "usuario@email.com",
    "password": "123456",
  }
  ```
`http://localhost:3000/login`

### POST `/user`

Nessa rota o usuário pode cadastrar um novo usuário. A requisição valida o login através do token gerado.</br>
O corpo da requisição deve ter o seguinte formato:
```json
  {
    "displayName": "Bruce Wayne",
    "email": "bruce@wayneenterprises.com",
    "password": "batman"
    "image": "https://cdn.icon-icons.com/icons2/1736/PNG/512/4043232-avatar-batman-comics-hero_113278.png"
  }
 ```
`http://localhost:3000/user`

---

### ⚠️ Autenticação de usuário

As rotas abaixo irão utilizar o token de validação gerado no login.</br>
Para isso, adicione o token de autenticação nos headers, no campo `Authorization`.</br>

---

### GET `/user`

Essa rota lista todos os usuários cadastrados.</br>
`http://localhost:3000/user`




<!--
### GET `/user/:id`

### DELETE `/user/me`

### GET `/categories`
-->




### POST `/categories`

Nessa rota o usuário pode cadastrar uma nova categoria de post.</br>
O corpo da requisição deve ter o seguinte formato:
```json
  {
    "name": "Nova categoria"
  }
  ```
`http://localhost:3000/user`




<!-- 
### GET `/post`


### GET `/post/:id`
-->





### POST `/post`

O endpoint permite o usuário criar um novo post.</br>
O corpo da requisição deve ter um título, o conteúdo do post e os ids das categorias do post. Exemplo:
```json
  {
	  "title": "Novo post no blog",
	  "content": "Um conteúdo bem legal aqui",
	  "categoryIds": [1]
  }
```
`http://localhost:3000/post`




<!--
### PUT `/post/:id`

### DELETE `/post/:id`

### GET `/post/search`
-->



---

### GET `/user/:id`

### DELETE `/user/me`

### GET `/categories`

### GET `/post`

### GET `/post/:id`

### PUT `/post/:id`

### DELETE `/post/:id`

### GET `/post/search`
