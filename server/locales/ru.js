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
        statuses: {
          create: {
            success: 'Статус успешно создан',
            error: 'Не удалось создать статус',
          },
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
        statuses: 'Statuses',
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
      statuses: {
        id: 'ИДЕНТИФИКАТОР',
        name: 'Имя',
        createdAt: 'Создано',
        new: {
          header: 'Создать статус',
          action: 'Создать статус',
          submit: 'Создавать',
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
