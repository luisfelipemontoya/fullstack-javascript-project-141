// @ts-check

import en from './en.js';

export default {
  translation: {
    ...en.translation,

    appName: 'Gestor de Tareas',

    fields: {
      firstName: 'Nombre',
      lastName: 'Apellido',
      email: 'Correo electrónico',
      password: 'Contraseña',
      name: 'Nombre',
    },

    layouts: {
      application: {
        ...en.translation.layouts.application,
        users: 'Usuarios',
        statuses: 'Estados',
        labels: 'Etiquetas',
        tasks: 'Tareas',
        signIn: 'Iniciar sesión',
        signUp: 'Registrarse',
        signOut: 'Cerrar sesión',
      },
    },

    flash: {
      ...en.translation.flash,
      statuses: {
        ...en.translation.flash.statuses,
        create: {
          ...en.translation.flash.statuses.create,
          success: 'Estado creado con éxito',
          error: 'No se pudo crear el estado',
        },
      },
      labels: {
        ...en.translation.flash.labels,
        create: {
          ...en.translation.flash.labels.create,
          success: 'Etiqueta creada con éxito',
          error: 'No se pudo crear la etiqueta',
        },
      },
      session: {
        ...en.translation.flash.session,
        create: {
          ...en.translation.flash.session.create,
          success: 'Has iniciado sesión',
          error: 'Correo electrónico o contraseña incorrectos',
        },
        delete: {
          ...en.translation.flash.session.delete,
          success: 'Has cerrado sesión',
        },
      },
      authError: '¡Acceso denegado! Por favor, inicia sesión.',
      users: {
        ...en.translation.flash.users,
        create: {
          ...en.translation.flash.users.create,
          success: 'Usuario registrado con éxito',
          error: 'No se pudo registrar el usuario',
        },
        update: {
          ...en.translation.flash.users.update,
          success: 'Usuario actualizado con éxito',
        },
        delete: {
          ...en.translation.flash.users.delete,
          success: 'Usuario eliminado con éxito',
        },
      },
    },

    views: {
      ...en.translation.views,

      tasks: {
        ...en.translation.views.tasks,
        new: {
          ...en.translation.views.tasks.new,
          header: 'Crear tarea',
        },
      },

      statuses: {
        ...en.translation.views.statuses,
        edit: {
          ...en.translation.views.statuses.edit,
          action: 'Actualizar',
        },
        delete: {
          ...en.translation.views.statuses.delete,
          action: 'Eliminar',
        },
        new: {
          ...en.translation.views.statuses.new,
          action: 'Crear estado',
          submit: 'Crear',
        },
      },

      labels: {
        ...en.translation.views.labels,
        edit: {
          ...en.translation.views.labels.edit,
          action: 'Actualizar',
        },
        delete: {
          ...en.translation.views.labels.delete,
          action: 'Eliminar',
        },
        new: {
          ...en.translation.views.labels.new,
          action: 'Crear etiqueta',
          submit: 'Crear',
        },
      },

      session: {
        new: {
          signIn: 'Iniciar sesión',
          submit: 'Entrar',
        },
      },

      users: {
        ...en.translation.views.users,

        edit: {
          ...en.translation.views.users.edit,
          action: 'Actualizar',
          submit: 'Actualizar',
        },
        delete: {
          ...en.translation.views.users.delete,
          action: 'Eliminar',
        },

        new: {
          signUp: 'Registrarse',
          submit: 'Guardar',
        },
      },
    },
  },
};
