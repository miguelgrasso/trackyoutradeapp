# Track Your Trade App - Backend API

Una aplicación backend robusta para el seguimiento y gestión de operaciones de trading, construida con NestJS, TypeScript y principios SOLID.

## 🚀 Características

- **API RESTful** completa para gestión de trades
- **Arquitectura SOLID** implementada en todo el proyecto
- **Repository Pattern** con interfaces para abstracción de datos
- **Strategy Pattern** para logging y validación
- **Caching inteligente** con múltiples estrategias
- **Validación robusta** con pipes de NestJS
- **Documentación automática** con Swagger/OpenAPI
- **Base de datos PostgreSQL** con Prisma ORM
- **Testing completo** con Jest

## 🛠️ Tecnologías

- **Framework**: NestJS 10.x
- **Lenguaje**: TypeScript 5.x
- **Base de datos**: PostgreSQL
- **ORM**: Prisma
- **Documentación**: Swagger/OpenAPI
- **Testing**: Jest + Supertest
- **Containerización**: Docker & Docker Compose
- **Validación**: class-validator, class-transformer

## 📋 Prerrequisitos

- Node.js >= 18.0.0
- npm o yarn
- Docker y Docker Compose
- PostgreSQL (o usar el contenedor Docker incluido)

## 🔧 Instalación

### 1. Clonar el repositorio
```bash
git clone <repository-url>
cd trackyoutradeapp
```

### 2. Instalar dependencias
```bash
npm install
```

### 3. Configurar variables de entorno
```bash
cp .env.example .env
```

Editar `.env` con tus configuraciones:
```env
DATABASE_URL="postgresql://admin:admin@localhost:5499/tradedb?schema=public"
NODE_ENV=development
PORT=4000
ENABLE_CACHING=true
ENABLE_DB_LOGGING=false
```

### 4. Levantar la base de datos
```bash
docker-compose up -d
```

### 5. Ejecutar migraciones
```bash
npx prisma migrate dev
```

### 6. Poblar la base de datos (opcional)
```bash
npx prisma db seed
```

## 🚀 Ejecución

### Desarrollo
```bash
npm run start:dev
```

### Producción
```bash
npm run build
npm run start:prod
```

La API estará disponible en: `http://localhost:4000/api`

## 📚 Documentación de la API

Una vez que la aplicación esté ejecutándose, puedes acceder a:

- **Swagger UI**: `http://localhost:4000/api`
- **OpenAPI JSON**: `http://localhost:4000/api-json`

## 🔗 Endpoints Principales

### Trades
- `GET /api/trades` - Listar todos los trades
- `POST /api/trades` - Crear nuevo trade
- `GET /api/trades/:id` - Obtener trade específico
- `PATCH /api/trades/:id` - Actualizar trade
- `DELETE /api/trades/:id` - Eliminar trade

### Símbolos
- `GET /api/symbol` - Listar símbolos
- `POST /api/symbol` - Crear símbolo
- `GET /api/symbol/:id` - Obtener símbolo específico

### Estrategias
- `GET /api/strategy` - Listar estrategias
- `POST /api/strategy` - Crear estrategia
- `GET /api/strategy/:id` - Obtener estrategia específica

### Otros Endpoints
- `/api/result` - Gestión de resultados
- `/api/operation-type` - Tipos de operación
- `/api/status-operation` - Estados de operación
- `/api/confirmations` - Confirmaciones
- `/api/conditions` - Condiciones

## 🧪 Testing

### Ejecutar todos los tests
```bash
npm run test
```

### Tests con coverage
```bash
npm run test:cov
```

### Tests end-to-end
```bash
npm run test:e2e
```

### Tests en modo watch
```bash
npm run test:watch
```

## 🏗️ Arquitectura

El proyecto sigue los principios SOLID y utiliza:

- **Dependency Injection**: Para inversión de control
- **Repository Pattern**: Abstracción de acceso a datos
- **Strategy Pattern**: Para logging y validación
- **Decorator Pattern**: Para caching
- **Factory Pattern**: Para configuración de servicios

### Estructura del Proyecto

```
src/
├── common/           # Servicios y utilities compartidos
│   ├── interfaces/   # Interfaces comunes
│   ├── services/     # Servicios globales
│   ├── filters/      # Filtros de excepción
│   ├── logging/      # Sistema de logging
│   └── caching/      # Sistema de cache
├── config/           # Configuraciones
├── trade/            # Módulo de trades
│   ├── dto/         # Data Transfer Objects
│   ├── entities/    # Entidades
│   ├── interfaces/  # Interfaces del módulo
│   ├── repositories/ # Implementaciones de repositorios
│   └── validators/  # Validadores de negocio
└── [otros-módulos]/ # Otros módulos de la aplicación
```

## 🐳 Docker

### Desarrollo con Docker
```bash
docker-compose up -d
```

### Solo base de datos
```bash
docker-compose up postgres -d
```

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📝 Scripts Disponibles

- `npm run build` - Compilar para producción
- `npm run start` - Iniciar en producción
- `npm run start:dev` - Iniciar en desarrollo con watch
- `npm run lint` - Ejecutar linter
- `npm run test` - Ejecutar tests
- `npm run test:e2e` - Tests end-to-end
- `npm run prisma:generate` - Generar cliente Prisma
- `npm run prisma:migrate` - Ejecutar migraciones

## 🐛 Troubleshooting

### Error de conexión a la base de datos
1. Verificar que Docker esté ejecutándose
2. Comprobar que el puerto 5499 esté disponible
3. Revisar las variables de entorno en `.env`

### Error de compilación TypeScript
1. Ejecutar `npm run build` para ver errores detallados
2. Verificar que todas las dependencias estén instaladas
3. Limpiar cache con `npm run clean` (si está disponible)

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para más detalles.

## 👥 Autores

- **Tu Nombre** - *Trabajo inicial* - [TuGitHub](https://github.com/tuusario)

## 🙏 Agradecimientos

- NestJS por el excelente framework
- Prisma por el ORM moderno
- La comunidad de TypeScript
