<p align="center">
  <h1 align="center">
    DrivenPass
  </h1>
</p>

## 💻 Technologies and Tools

- REST APIs
- Node.js
- TypeScript
- PostgreSQL
- Prisma

---

## 🏁 Usage

```bash
$ git clone https://github.com/LucasPerroni/drivenpass-back.git

$ cd drivenpass-back

$ npm install

$ npm run dev
```

---

## 🚀 API:

```yml
POST /signup
    - Route to sign up
    - headers: {}
    - body: {
        "name": "loremipsum"
        "email": "lorem@gmail.com",
        "password": "loremipsum" (min 10)
    }
```

```yml
POST /signin
    - Route to sign in
    - headers: {}
    - body: {
        "email": "lorem@gmail.com",
        "password": "loremipsum" (min 10)
    }
```

```yml
POST /credentials (authenticated)
    - Route to create a credential
    - headers: { "Authorization": "Bearer $token"}
    - body: {
        "title": "loremipsum",
        "url": "http://loremipsum",
        "username": "loremipsum",
        "password": "loremipsum"
    }
```

```yml
GET /credentials (authenticated)
    - Route to get all the user credentials
    - headers: { "Authorization": "Bearer $token"}
    - body: {}
```

```yml
GET /credentials/:id (authenticated)
    - Route to get one of the user credentials
    - headers: { "Authorization": "Bearer $token"}
    - body: {}
```

```yml
DELETE /credentials/:id (authenticated)
    - Route to delete a credential
    - headers: { "Authorization": "Bearer $token"}
    - body: {}
```

```yml
POST /safenotes (authenticated)
    - Route to create a safe note
    - headers: { "Authorization": "Bearer $token"}
    - body: {
        "title": "loremipsum" (max 50),
        "text": "loremipsum" (max 1000)
    }
```

```yml
GET /safenotes (authenticated)
    - Route to get all the user safe notes
    - headers: { "Authorization": "Bearer $token"}
    - body: {}
```

```yml
GET /safenotes/:id (authenticated)
    - Route to get one of the user safe notes
    - headers: { "Authorization": "Bearer $token"}
    - body: {}
```
