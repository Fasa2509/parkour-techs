# Parkour Devs - Prueba Técnica

## Set up project

Comandos básicos para inicializar el proyecto.

Lo primero de todo es crear el archivo `.env` con la misma estructura que encontramos en el archivo `.env.template`, lo llenamos con la información requerida.

```bash
# JWT
# Aquí puede ir cualquier cosa, pero preferiblemente utilizar un hash en base64
JWT_SEED=

# DB config
DB_PASSWORD=12345678
DATABASE_URL=postgresql://postgres:12345678@127.0.0.1:5432/{DB_NAME}

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

### Mejoras de actualización

+ Inicio de sesión
Ahora podemos crear una cuenta e iniciar sesión con correo y contraseña, esto implica que se envía un correo electrónico de confirmación y se debe activar la cuenta
+ Sidebar
Agregar Sidebar Menu de Kirimase
+ UX en formularios
Los botones de enviar formulario se desactivan al momento de darles click indicando al usuario que su solicitud se está ejecutando y reciben un mensaje de respuesta al completarse la acción
+ Dark Mode
Fue implementado un dark-mode funcional que se puede activar desde el Sidebar Menu - Settings
+ SSR
Todas las vistas fueron cambiadas a renderizado del lado del servidor (Server Side Rendering)

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

### Documentación
+ ```/api/login```
Operaciones generales de login
    - POST
    Para realizar el login de usuario con correo y contraseña
    Recibe en el body
    ```
    {
        email   : string;
        password: string;
    }
    ```
    - DELETE
    Para cerrar la sesión de usuario inicializada con correo y contraseña
    Rebice en el body: ---
+ ```/api/user```
Operaciones acerca de los usuarios
    - POST
    Para crear un nuevo usuario. Se aplica únicamente cuando se crea un usuario con correo y contraseña, de resto cuando el login es con **OAuth** la gestión de la creación la lleva a cabo el adaptador de Prisma
    Recibe en el body:
    ```
    {
        email          : string;
        name           : string;
        direction      : string;
        password       : string;
        confirmPassword: string;
    }
    ```
+ ```/api/worker```
Operaciones acerca de los trabajadores asociados a cada usuario
    - GET
    Devuelve la información **paginada** de los trabajadores asociados al usuario solicitante. Si no hay sesión retorna un error.
    Requiere de: sesión activa
    - POST
    Crea un nuevo trabajador asociado al usuario solicitante.
    Requiere de: sesión activa
    Recibe en el body:
    ```
    {
        email    : string;
        name     : string;
        ci       : number;
        phone    : string;  # debe iniciar con 0412, 0414, 0416, 0424, 0426
        direction: string;
        salary   : number;   # mayor a 0
        hours    : number;   # mayor a 0
        status   : active | inactive | vacations
    }
    ```
    - PATCH
    A partir de unos parámetros de búsqueda, devuelve la información filtrada según dichos parámetros
    Requiere de: sesión activa
    ```
    {
        email?    : string;
        name?     : string;
        ci?       : number;  # si viene, debe coincidir exactamente con la ci del trabajador buscado
        direction?: string;
    }
    ```
+ ```/api/worker/[workerId]```
Operaciones específicas sobre un trabajador en particular
    - PUT
    Actualiza la información del trabajador.
    Requiere de: sesión activa
    Recibe en el body: *Uno más parámetros del trabajador a actualizar. Altera únicamente los parámetros enviados, el resto se mantiene intacto*
    - DELETE
    Elimina un trabajador
    Requiere de: sesión activa
    Recibe en el body: ---
+ ```/api/seed```
Endpoint general para cargar información de ejemplo (*seed*)
    - GET
    Carga información de ejemplo asociada al usuario cuya sesión **debe estar activa** a la hora de llamar este endpoint.
    Requiere de: sesión activa

Fueron implementados múltiples componentes de ***Shadcn*** en conjunto con ***Tailwind*** para la agilización del desarrollo.