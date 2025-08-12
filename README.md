# Microservicios NestJS

Este proyecto contiene 5 microservicios desarrollados con NestJS que demuestran una arquitectura de microservicios con comunicación TCP y NATS.

## Servicios

### 1. User Service (Puerto 3001)
- Gestión de usuarios
- Operaciones CRUD para usuarios

### 2. Product Service (Puerto 3002)  
- Gestión de productos
- Operaciones CRUD para productos
- Filtrado por categoría

### 3. Order Service (Puerto 3003)
- Gestión de pedidos
- Creación y seguimiento de órdenes
- Estados de pedidos

### 4. API Gateway (Puerto 3000)
- Punto único de entrada
- Enrutamiento a microservicios
- API REST para clientes
- Comunicación TCP y NATS

### 5. Notification Service (Puerto 3004)
- Gestión de notificaciones
- Comunicación mediante NATS
- Eventos asincrónicos
- Notificaciones por email, SMS y push

## Instalación y Ejecución

### Con Docker Compose (Recomendado)

```bash
# Construir y ejecutar todos los servicios
docker-compose up --build

# Ejecutar en modo detached
docker-compose up -d --build

# Ver logs
docker-compose logs -f

# Parar servicios
docker-compose down
```

### Desarrollo Local

1. Instalar dependencias en cada servicio:
```bash
cd user-service && npm install
cd ../product-service && npm install  
cd ../order-service && npm install
cd ../notification-service && npm install
cd ../api-gateway && npm install
```

2. Ejecutar cada servicio en modo desarrollo:
```bash
# Terminal 1 - NATS Server
docker run -p 4222:4222 -p 6222:6222 -p 8222:8222 nats:2.10-alpine

# Terminal 2
cd user-service && npm run start:dev

# Terminal 3  
cd product-service && npm run start:dev

# Terminal 4
cd order-service && npm run start:dev

# Terminal 5
cd notification-service && npm run start:dev

# Terminal 6
cd api-gateway && npm run start:dev
```

## API Endpoints

### Usuarios (via API Gateway - http://localhost:3000)

- `GET /users` - Obtener todos los usuarios
- `GET /users/:id` - Obtener usuario por ID
- `POST /users` - Crear usuario
- `PUT /users/:id` - Actualizar usuario
- `DELETE /users/:id` - Eliminar usuario

### Productos

- `GET /products` - Obtener todos los productos
- `GET /products?category=Electronics` - Filtrar por categoría
- `GET /products/:id` - Obtener producto por ID
- `POST /products` - Crear producto
- `PUT /products/:id` - Actualizar producto
- `DELETE /products/:id` - Eliminar producto

### Pedidos

- `GET /orders` - Obtener todos los pedidos
- `GET /orders?userId=1` - Filtrar por usuario
- `GET /orders/:id` - Obtener pedido por ID
- `POST /orders` - Crear pedido
- `PUT /orders/:id/status` - Actualizar estado
- `PUT /orders/:id/cancel` - Cancelar pedido

### Notificaciones

- `GET /notifications` - Obtener todas las notificaciones
- `GET /notifications/recipient/:email` - Obtener notificaciones por recipient
- `POST /notifications` - Enviar notificación manual

## Ejemplos de Uso

### Crear Usuario
```bash
curl -X POST http://localhost:3000/users \
  -H "Content-Type: application/json" \
  -d '{"name": "Carlos Mendoza", "email": "carlos@example.com"}'
```

### Crear Producto
```bash
curl -X POST http://localhost:3000/products \
  -H "Content-Type: application/json" \
  -d '{"name": "Tablet", "price": 299.99, "category": "Electronics"}'
```

### Crear Pedido
```bash
curl -X POST http://localhost:3000/orders \
  -H "Content-Type: application/json" \
  -d '{
    "userId": 1,
    "products": [
      {"productId": 1, "quantity": 2},
      {"productId": 2, "quantity": 1}
    ]
  }'
```

### Enviar Notificación
```bash
curl -X POST http://localhost:3000/notifications \
  -H "Content-Type: application/json" \
  -d '{
    "type": "email",
    "recipient": "usuario@example.com",
    "subject": "Prueba de notificación",
    "message": "Este es un mensaje de prueba"
  }'
```

### Ver Notificaciones de un Usuario
```bash
curl http://localhost:3000/notifications/recipient/carlos@example.com
```

## Arquitectura

```
┌─────────────────┐
│   API Gateway   │ ← Puerto 3000 (HTTP REST)
│   (Port 3000)   │
└─────────┬───────┘
          │
    ┌─────┼─────┐
    │     │     │ TCP Communication
    ▼     ▼     ▼
┌─────┐ ┌─────┐ ┌─────┐
│User │ │Prod │ │Order│
│3001 │ │3002 │ │3003 │
└─────┘ └─────┘ └─────┘
    │
    │ NATS Events    ┌─────────────┐
    └────────────────│ NATS Server │
                     │ (Port 4222) │
                     └──────┬──────┘
                            │
                            ▼
                      ┌─────────┐
                      │ Notify  │ ← NATS Communication
                      │  3004   │
                      └─────────┘
```

## Características

- ✅ Comunicación TCP entre microservicios
- ✅ Comunicación asincrónica con NATS
- ✅ API Gateway con endpoints REST  
- ✅ Eventos y notificaciones automáticas
- ✅ Dockerización de cada servicio
- ✅ Docker Compose para orquestación
- ✅ Manejo de errores básico
- ✅ Estructura modular y escalable

## Próximos Pasos

Para extender este proyecto podrías agregar:

- Base de datos (PostgreSQL, MongoDB)
- Autenticación y autorización (JWT)
- Logging centralizado
- Monitoreo y métricas
- Tests unitarios e integración
- CI/CD pipeline
- Más eventos con NATS (órdenes, productos)
- Service discovery
- Load balancing

## Ejemplo de NATS en Acción

Cuando creas un usuario, verás cómo funciona la comunicación asincrónica:

1. **Crear usuario** → User Service guarda el usuario
2. **Evento NATS** → User Service emite evento 'user_created'  
3. **Notificación** → Notification Service recibe el evento y envía email de bienvenida

```bash
# 1. Crear usuario
curl -X POST http://localhost:3000/users \
  -H "Content-Type: application/json" \
  -d '{"name": "Ana Lopez", "email": "ana@example.com"}'

# 2. Ver la notificación generada automáticamente  
curl http://localhost:3000/notifications/recipient/ana@example.com
```

Los logs del Notification Service mostrarán:
```
📧 Notification sent: {
  type: 'email',
  recipient: 'ana@example.com', 
  subject: 'Bienvenido!',
  message: 'Hola Ana Lopez, tu cuenta ha sido creada exitosamente.'
}
```