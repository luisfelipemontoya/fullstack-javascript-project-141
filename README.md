# Gestor de tareas

[![hexlet-check](https://github.com/luisfelipemontoya/fullstack-javascript-project-141/actions/workflows/hexlet-check.yml/badge.svg)](https://github.com/luisfelipemontoya/fullstack-javascript-project-141/actions)

Aplicación web para crear, organizar y dar seguimiento a tareas. Permite asignar estados, ejecutores y etiquetas, y filtrar el listado por esos criterios o por las tareas creadas por el usuario actual.

Proyecto de aprendizaje del [programa Fullstack JavaScript de Códica](https://app.codica.la/programs/fullstack-javascript), basado en la plantilla [fastify-nodejs-application](https://github.com/hexlet-boilerplates/fastify-nodejs-application).

[Referencia del proyecto de demostración](https://files.hexlet.app/a/s44d43).

## Demo

[Ver aplicación en vivo](https://fullstack-javascript-project-141-093s.onrender.com)

## Funcionalidades

- Registro, inicio y cierre de sesión.
- Creación, edición y eliminación de usuarios, estados, etiquetas y tareas.
- Asignación de ejecutor y múltiples etiquetas a cada tarea.
- Filtros por estado, ejecutor, etiqueta y autor actual.
- Eliminación de tareas restringida a su autor.
- Protección frente a la eliminación de usuarios, estados o etiquetas vinculados a tareas.
- Captura de errores con Bugsink mediante el SDK de Sentry.

## Stack

- JavaScript con módulos ES y Node.js.
- Fastify y Pug para el servidor y las vistas.
- Objection.js y Knex para modelos, consultas y migraciones.
- SQLite en desarrollo y pruebas; PostgreSQL en producción.
- Bootstrap y Webpack para estilos y recursos del frontend.
- Passport y sesiones seguras para autenticación.
- dotenv para configuración e i18next para traducciones.
- Jest para pruebas; Biome para lint y Oxfmt para formato.
- GitHub Actions para autoverificación y Render para despliegue.

## Instalación

Requisitos: Git, Node.js 22.x y npm. Los siguientes comandos están pensados para Linux o WSL.

```bash
git clone https://github.com/luisfelipemontoya/fullstack-javascript-project-141.git
cd fullstack-javascript-project-141
npm ci
cp .env.example .env
```

Configura las variables en `.env`:

| Variable | Uso |
|---|---|
| `SESSION_KEY` | Secreto de sesión. Sustituye el valor de ejemplo por uno propio. |
| `SENTRY_DSN` | DSN del proyecto de Bugsink. Puede quedar vacío si no deseas activar el monitoreo local. |
| `NODE_ENV` | Entorno: `development`, `test` o `production`. Por defecto se usa desarrollo. |
| `DATABASE_URL` | Conexión a PostgreSQL, necesaria en producción. |

Para generar tu propio `SESSION_KEY`:

```bash
node -e "console.log(require('node:crypto').randomBytes(32).toString('hex'))"
```

Copia el resultado en `.env`. Este archivo está excluido del repositorio; en Render, configura los secretos mediante variables de entorno.

## Uso

Compila los recursos e inicia el servidor:

```bash
npm run build
npm start
```

Abre [http://localhost:3000](http://localhost:3000). El comando de inicio aplica automáticamente las migraciones pendientes. En desarrollo, los datos se guardan en `database.sqlite`.

Registra una cuenta e inicia sesión. Crea estados y etiquetas, añade tareas y asigna su ejecutor. Desde el listado de tareas puedes combinar los filtros y activar **Solo mis tareas** para ver las que creaste.

Para recompilar los recursos mientras trabajas en el frontend, ejecuta en otra terminal:

```bash
npx webpack --watch
```

## Verificaciones

Ejecutar las pruebas locales con la configuración de pruebas:

```bash
NODE_ENV=test npm test
```

Revisar reglas de código y formato:

```bash
npm run lint
```

Aplicar las correcciones automáticas y el formato:

```bash
npm run lint:fix
```

Comprobar la compilación:

```bash
npm run build
```

## Producción y monitoreo

La aplicación está desplegada en Render y utiliza PostgreSQL. La configuración de producción requiere `NODE_ENV=production`, `DATABASE_URL` y `SESSION_KEY`. Para enviar errores a Bugsink, configura también `SENTRY_DSN`.

El archivo `instrument.js` inicializa el SDK de Sentry antes de cargar el servidor. El monitoreo se activa cuando hay un DSN configurado y el entorno no es `test`.

## Pruebas automáticas de Códica

El workflow `.github/workflows/hexlet-check.yml` ejecuta la autoverificación de Hexlet en GitHub Actions. Incluye pruebas del comportamiento de la aplicación y controles de código y formato. La insignia al inicio de este documento muestra el resultado de la ejecución más reciente.

Conserva el workflow y el nombre del repositorio para mantener la integración con la plataforma.

## Acerca de Códica

[Códica](https://app.codica.la/) es una escuela de programación con programas de aprendizaje, práctica, apoyo de mentores y proyectos reales. Este repositorio forma parte de ese proceso de aprendizaje.
