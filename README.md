# Introduction

Simple Signup, Signin and Todolist webpage. Little practice for NodeJS express with MongoDB. The frontend part is made by Vite React : [https://github.com/terence223/todo-frontend](https://github.com/terence223/todo-frontend)

# Homepage

[https://terence223.github.io/todo-frontend/](https://terence223.github.io/todo-frontend/)

# .env file variables

- DB_ACCOUNT : your mongoDB account
- DB_PASSWORD : your mongoDB password
- DB_URL : your mongoDB cluster domain
- DB_JWT_SECRET : JWT secret key

# How to Run

### npm install

install all necessary plugins

### npm start

run NodeJS express server and connect to your mongoDB

# API

### SIGNUP

- request

```
POST /signup

{
	email : "johnson@day.com"
	password : "12345678"
	name : "johnson"
}
```

- response

```
status : 201

{
	message : 'Signup success!'
	userId : "osdifuosdijoi34344"
}
```

### SIGNIN

- request

```
POST /login

{
	email : "johnson@day.com"
	password : "12345678"
}
```

- response

```
status : 200

{
	token : (JWT token)
	user : "johnson"
}
```

### GET TODO LIST

- request

```
GET /list

Header
Authorization : Bearer "JWT token"
```

- response

```
status : 200

{
	todos : [
		{
            _id: (Todo ID)
            title: "Todo Title"
            checked: true
            owner: (User ID)
            createdAt: "2023-09-18T12:30:45.395Z"
            updatedAt: "2023-09-18T12:40:03.457Z"
		}
	]
}
```

### CREATE TODO

- request

```
POST /create

Header
Authorization : Bearer "JWT token"

{
	title : "Todo Title"
}
```

- response

```
status : 201

{
	message: "created successfully!"
}
```

### UPDATE TODO

- request

```
PUT /:todoId

Header
Authorization : Bearer "JWT token"

{
	title : "Todo Title"
	checked : true
}
```

- response

```
status : 200

{
	message: "updated successfully!"
}
```

### DELETE TODO

- request

```
DELETE /:todoId

Header
Authorization : Bearer "JWT token"
```

- response

```
status : 200

{
	message: "deleted successfully!"
}
```
