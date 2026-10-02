// @ts-check

export default {
  translation: {
    appName: 'Gestor de Tareas',
    flash: {
      session: {
        create: {
          error: 'Correo electrónico o contraseña incorrectos',
          success: 'Has iniciado sesión',
        },
        delete: {
          success: 'Has cerrado sesión',
        },
      },
      users: {
        create: {
          error: 'No se pudo registrar el usuario',
          success: 'Usuario registrado con éxito',
        },
        update: {
          success: 'Usuario actualizado con éxito',
          error: 'No se pudo actualizar el usuario',
        },
        delete: {
          success: 'Usuario eliminado con éxito',
          error: 'No se pudo eliminar el usuario',
        },
      },
      statuses: {
        create: {
          success: 'Estado creado con éxito',
          error: 'No se pudo crear el estado',
        },
        update: {
          success: 'Estado actualizado con éxito',
          error: 'No se pudo actualizar el estado',
        },
        delete: {
          success: 'Estado eliminado con éxito',
          error: 'No se pudo eliminar el estado',
        },
      },
      tasks: {
        create: {
          success: 'Tarea creada con éxito',
          error: 'No se pudo crear la tarea',
        },
        update: {
          success: 'Tarea actualizada con éxito',
          error: 'No se pudo actualizar la tarea',
        },
        delete: {
          success: 'Tarea eliminada con éxito',
          error: 'Solo el autor puede eliminar esta tarea',
        },
      },
      labels: {
        create: {
          success: 'Etiqueta creada con éxito',
          error: 'No se pudo crear la etiqueta',
        },
        update: {
          success: 'Etiqueta actualizada con éxito',
          error: 'No se pudo actualizar la etiqueta',
        },
        delete: {
          success: 'Etiqueta eliminada con éxito',
          error: 'No se pudo eliminar la etiqueta',
        },
      },
      authError: '¡Acceso denegado! Por favor, inicia sesión.',
      usersUnauthorized: 'No puedes editar o eliminar a otro usuario',
    },
    layouts: {
      application: {
        users: 'Usuarios',
        signIn: 'Iniciar sesión',
        signUp: 'Registrarse',
        signOut: 'Cerrar sesión',
        statuses: 'Estados',
        labels: 'Etiquetas',
        tasks: 'Tareas',
        footer: 'Gestor de Tareas',
      },
    },
    views: {
      session: {
        'new': {
          signIn: 'Iniciar sesión',
          submit: 'Entrar',
        },
      },
      users: {
        id: 'ID',
        fullName: 'Nombre completo',
        actions: 'Acciones',
        email: 'Correo electrónico',
        createdAt: 'Fecha de creación',
        'new': {
          signUp: 'Registrarse',
          submit: 'Guardar',
        },
        edit: {
          edit: 'Actualizar usuario',
          action: 'Actualizar',
          submit: 'Actualizar',
        },
        delete: {
          action: 'Eliminar',
        },
      },
      statuses: {
        id: 'ID',
        name: 'Nombre',
        createdAt: 'Fecha de creación',
        'new': {
          header: 'Crear estado',
          action: 'Crear estado',
          submit: 'Crear',
        },
        actions: 'Acciones',
        edit: {
          header: 'Actualizar estado',
          action: 'Actualizar',
          submit: 'Actualizar',
        },
        delete: {
          action: 'Eliminar',
        },
      },
      tasks: {
        id: 'ID',
        name: 'Nombre',
        status: 'Estado',
        creator: 'Autor',
        executor: 'Ejecutor',
        description: 'Descripción',
        actions: 'Acciones',
        labels: 'Etiquetas',
        'new': {
          header: 'Crear tarea',
          submit: 'Crear',
        },
        edit: {
          header: 'Actualizar tarea',
          action: 'Actualizar',
          submit: 'Actualizar',
        },
        delete: {
          action: 'Eliminar',
        },
        filters: {
          status: 'Estado',
          executor: 'Ejecutor',
          label: 'Etiqueta',
          own: 'Solo mis tareas',
          show: 'Mostrar',
        },
      },
      labels: {
        id: 'ID',
        name: 'Nombre',
        createdAt: 'Fecha de creación',
        index: {
          header: 'Etiquetas',
        },
        'new': {
          header: 'Crear etiqueta',
          action: 'Crear etiqueta',
          submit: 'Crear',
        },
        edit: {
          header: 'Actualizar etiqueta',
          action: 'Actualizar',
          submit: 'Actualizar',
        },
        delete: {
          action: 'Eliminar',
        },
      },
      welcome: {
        index: {
          hello: 'Gestiona tus tareas con facilidad',
          description: 'Crea, organiza y sigue tus tareas en un solo lugar.',
          imageAlt: 'Gestor de tareas',
          signUp: 'Comenzar',
          signIn: 'Iniciar sesión',
        },
      },
    },
    fields: {
      firstName: 'Nombre',
      lastName: 'Apellido',
      email: 'Correo electrónico',
      password: 'Contraseña',
      name: 'Nombre',
    },
  },
};
