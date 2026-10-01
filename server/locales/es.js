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
      session: {
        ...en.translation.flash.session,
        create: {
          ...en.translation.flash.session.create,
          success: 'Has iniciado sesión',
          error: 'Correo electrónico o contraseña incorrectos',
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
      },
    },

    views: {
      ...en.translation.views,

      statuses: {
        ...en.translation.views.statuses,
        new: {
          ...en.translation.views.statuses.new,
          action: 'Crear estado',
        },
      },

      labels: {
        ...en.translation.views.labels,
        new: {
          ...en.translation.views.labels.new,
          action: 'Crear etiqueta',
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
