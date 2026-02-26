# DevLocker v1 — API REST (Snippets privados)

API REST para guardar snippets de forma **privada** por usuario, usando **JWT** y **MongoDB** (Docker opcional).  
Incluye validaciones con **express-validator**, manejo de errores centralizado y patrón **asyncHandler**.

---

## Requisitos

- Node.js 18+
- npm
- MongoDB (local) o Docker + Docker Compose

---

## Configuración

1) Instala dependencias:

```bash
npm install
```

2) Crea tu archivo `.env` basado en `.env`:



Variables:

- `PORT`: puerto del servidor (default 3000)
- `MONGO_URI`: conexión a MongoDB
- `JWT_SECRET`: secreto para firmar tokens JWT



---

## Levantar MongoDB con Docker (recomendado)

Este proyecto incluye `docker-compose.yml` con:
- `mongo` en `localhost:27017`
- `mongo-express` en `http://localhost:8081`

Ejecuta:

```bash
docker compose up -d
```

Mongo Express:
- URL: `http://localhost:8081`
- Usuario: `admin`
- Password: `pass`

Para detener:

```bash
docker compose down
```

---

## Ejecutar la API

Modo desarrollo (con nodemon):

```bash
npm run dev
```

Producción:

```bash
npm start
```

Servidor por defecto:

- `http://localhost:3000`

---

## Autenticación (JWT)

Las rutas de **snippets** están protegidas con JWT.  
Debes enviar el header:

```http
Authorization: Bearer <token>
```

El backend **NO** toma el `userId` desde el body; el dueño del recurso se asigna usando el token (`req.user._id`).

---

## Endpoints (v1)

### Auth
- `POST /api/v1/registro`
- `POST /api/v1/login`

### Snippets (JWT requerido)
- `POST /api/v1/snippets` → Crear snippet (se asigna al usuario logueado)
- `GET /api/v1/snippets` → Lista SOLO snippets del usuario actual
- `PUT /api/v1/snippets/:id` → Editar SOLO si pertenece al usuario
- `DELETE /api/v1/snippets/:id` → Borrar SOLO si pertenece al usuario

---

## Ejemplos de uso (Thunder Client / Postman)

### 1) Registro

**POST** `http://localhost:3000/api/v1/registro`  
Body (JSON):

```json
{
  "email": "usera@test.com",
  "password": "123456"
}
```

### 2) Login (obtener token)

**POST** `http://localhost:3000/api/v1/login`  
Body (JSON):

```json
{
  "email": "usera@test.com",
  "password": "123456"
}
```

Respuesta esperada:

```json
{
  "token": "JWT_AQUI"
}
```

### 3) Crear snippet (requiere token)

**POST** `http://localhost:3000/api/v1/snippets`  
Header:

```http
Authorization: Bearer JWT_AQUI
Content-Type: application/json
```

Body (JSON):

```json
{
  "title": "Mi primer snippet",
  "language": "javascript",
  "code": "console.log('hola');",
  "tags": ["js", "intro"]
}
```

### 4) Listar snippets (requiere token)

**GET** `http://localhost:3000/api/v1/snippets`  
Header:

```http
Authorization: Bearer JWT_AQUI
```

---


## Notas

- La relación `Snippet.user` se implementa con **Mongoose References**: `ObjectId` + `ref: 'User'`.
- Manejo de errores centralizado en middleware global (`errorHandler`).
- Controladores async envueltos con `express-async-handler`.