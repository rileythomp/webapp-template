# Web App Template

Template for a simple web app built with Angular, Go, and Supabase.

### Features

- Sign in with Google and GitHub accounts or email

- User accounts with privacy controls

### Development

Server

```
$ cd backend
$ go mod tidy
$ docker compose up -d postgres
$ source .env
$ make run
```

Client

```
$ cd frontend
$ npm install
$ ng serve
```
