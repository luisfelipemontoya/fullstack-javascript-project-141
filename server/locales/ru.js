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
          success: 'Пользователь успешно удален',
          error: 'Невозможно удалить пользователя, связанного с задачей.',
        },
      },

      statuses: {
        create: {
          success: 'Статус успешно создан',
          error: 'Не удалось создать статус',
        },
        update: {
          success: 'Статус успешно обновлен',
          error: 'Не удалось обновить статус',
        },
        delete: {
          success: 'Статус успешно удален',
          error: 'Невозможно удалить статус, связанный с задачей.',
        },
      },
      tasks: {
        create: {
          success: 'Задача успешно создана',
          error: 'Не удалось создать задачу',
        },
        update: {
          success: 'Задача успешно обновлена',
          error: 'Не удалось обновить задачу',
        },
        delete: {
          success: 'Задача успешно удалена',
          error: 'Только создатель задачи может её удалить.',
        },
      },

      labels: {
        create: {
          success: 'Ярлык успешно создан',
          error: 'Не удалось создать метку',
        },
        update: {
          success: 'Метка успешно обновлена',
          error: 'Не удалось обновить метку',
        },
        delete: {
          success: 'Метка успешно удалена',
          error: 'Не удалось удалить метку',
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
        statuses: 'Статусы',
        labels: 'Метки',
        tasks: 'Задачи',
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
        actions: 'Действия',
        edit: {
          header: 'Edit status',
          action: 'Изменить статус',
          submit: 'Сохранять',
        },
        delete: {
          action: 'Удалить',
        },
      },

      tasks: {
        id: 'ID',
        name: 'Имя',
        status: 'Статус',
        creator: 'Создатель',
        executor: 'Исполнитель завещания',
        description: 'Описание',
        actions: 'Действия',
      },
      new: {
        header: 'Создать задачу',
        submit: 'Создавать',
      },

      edit: {
        header: 'Редактировать задачу',
        action: 'Редактировать',
        submit: 'Сохранять',
      },

      delete: {
        action: 'Удалить',
      },

      labels: {
        id: 'ID',
        name: 'Name',
        createdAt: 'Создано',
        new: {
          header: 'Создать метку',
          action: 'Создать метку',
          submit: 'Создавать',
        },
        edit: {
          header: 'этикетка',
          action: 'Редактировать',
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
