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
      authError: '¡Acceso denegado! Por favor, inicia sesión.',
      users: {
        ...en.translation.flash.users,
        create: {
          ...en.translation.flash.users.create,
          error: 'No se pudo registrar el usuario',
        },
      },
    },

    views: {
      ...en.translation.views,

      session: {
        new: {
          signIn: 'Iniciar sesión',
          submit: 'Entrar',
        },
      },

      users: {
        ...en.translation.views.users,

        new: {
          signUp: 'Registrarse',
          submit: 'Guardar',
        },
      },
    },
  },
};
