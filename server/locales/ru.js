// @ts-check

export default {
  translation: {
    appName: 'Менеджер задач',
    flash: {
      session: {
        create: {
          error: 'Неправильный емейл или пароль',
          success: 'Вы залогинены',
        },
        delete: {
          success: 'Вы разлогинены',
        },
      },
      users: {
        create: {
          error: 'Не удалось зарегистрировать',
          success: 'Пользователь успешно зарегистрирован',
        },
        update: {
          success: 'Пользователь успешно обновлен',
          error: 'Не удалось обновить пользователя',
        },
        delete: {
          action: 'Удалить',
          success: 'Пользователь успешно удален',
        },
      },
      authError: 'Доступ запрещён! Пожалуйста, авторизируйтесь.',
    },
    layouts: {
      application: {
        users: 'Пользователи',
        signIn: 'Вход',
        signUp: 'Регистрация',
        signOut: 'Выход',
        footer: 'Менеджер задач',
      },
    },
    views: {
      session: {
        new: {
          signIn: 'Вход',
          submit: 'Войти',
        },
      },
      users: {
        id: 'ID',
        fullName: 'Полное имя',
        email: 'Email',
        createdAt: 'Дата создания',
        new: {
          submit: 'Сохранить',
          signUp: 'Регистрация',
        },
        edit: {
          edit: 'Редактировать пользователя',
          action: 'Обновлять',
          submit: 'Сохранять',
        },
        delete: {
          action: 'Удалить',
        },
      },
      welcome: {
        index: {
          hello: 'Управляйте своими задачами с легкостью',
          description: 'Создавайте, организуйте и отслеживайте задачи в одном месте.',
          imageAlt: 'Менеджер задач',
          signUp: 'Начать',
          signIn: 'Войти',
        },
      },
    },
  },
};
