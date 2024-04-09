# Parkour-Devs - Prueba Técnica

## Set up project

Comandos básicos para inicializar el proyecto.

Lo primero de todo es crear el archivo `.env` con la misma estructura que encontramos en el archivo `.env.template`, lo llenamos con la información requerida.

```bash
# JWT
JWT_SEED=

# DB config
DB_PASSWORD=
DATABASE_URL=postgresql://postgres:{DB_PASSWORD}@127.0.0.1:5432/{DB_NAME}

# Resend config
RESEND_API_KEY=

# Auth.js config
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=

# Google provider
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
```

Para levantar la DB con Docker en caso de no tener Postgres instalado en nuestra máquina

```bash
# windows
docker compose up
# linux/mac
docker-compose up
```

Luego, instalamos las dependencias necesarias

```bash
# para instalar dependencias
npm i
# o también
npm ci

# finalmente
npm run db:generate
npm run db:migrate
npm run dev
```

¡Y listo! Ya está corriendo nuestro sistema.

Abrimos [http://localhost:3000](http://localhost:3000) para visualizar el proyecto.

---

### Características principales - Implementación

+ Sign in
El inicio de sesión se lleva a cabo con el Google Provider para mayor simplicidad, por ello es importante configurar las keys en las variables de entorno
+ Usuarios y Trabajadores
Se puede encontrar la estructura de los usuarios y trabajadores en `src/lib/types`
+ Búsqueda
La búsqueda se implementó bajo una serie de criterios generales dados los trabajadores, el usuario podrá buscar en toda la DB bajo *email*, *nombre*, *cédula* y *dirección* enviando una petición **PATCH** a `/api/worker` con los datos de la búsqueda
+ JWT
Los métodos del archivo `JWT.ts` reciben genéricos y tienen un propósito general, en esta ocasión se usan principalmente para la confirmación de correos electrónicos
+ Protección de rutas
Esta se realiza mediante un middleware general ofrecido por `Auth.js` donde se exportan las rutas que se deseen proteger
+ Correos automáticos
Se implementó *Resend* como plataforma para el envío de correos electrónicos y la confirmación de cuentas
+ Seed
Al iniciar sesión, si realizamos una petición **GET** a la ruta `/api/seed` se cargará información de ejemplo sobre trabajadores para poder realizar pruebas generales
