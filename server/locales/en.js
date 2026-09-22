// @ts-check

export default {
  translation: {
    appName: 'Task Manager',

    flash: {
      session: {
        create: {
          error: 'Wrong email or password',
          success: 'You are logged in',
        },
        delete: {
          success: 'You are logged out',
        },
      },

      users: {
        create: {
          error: 'Failed to register',
          success: 'User registered successfully',
        },
        update: {
          success: 'User updated successfully',
          error: 'Failed to update user',
        },
        delete: {
          success: 'User deleted successfully',
        },
      },

      statuses: {
        create: {
          success: 'Status created successfully',
          error: 'Failed to create status',
        },
        update: {
          success: 'Status updated successfully',
          error: 'Failed to update status',
        },
        delete: {
          success: 'Status deleted successfully',
        },
      },

      tasks: {
        create: {
          success: 'Task created successfully',
          error: 'Failed to create task',
        },
        update: {
          success: 'Task updated successfully',
          error: 'Failed to update task',
        },
      },

      authError: 'Access denied! Please login',
    },
    layouts: {
      application: {
        users: 'Users',
        signIn: 'Login',
        signUp: 'Register',
        signOut: 'Logout',
        statuses: 'Statuses',
        tasks: 'Tasks',
        footer: 'Task Manager',
      },
    },

    views: {
      session: {
        new: {
          signIn: 'Login',
          submit: 'Login',
        },
      },

      users: {
        id: 'ID',
        fullName: 'Full name',
        actions: 'Actions',
        email: 'Email',
        createdAt: 'Created at',
        new: {
          submit: 'Register',
          signUp: 'Register',
        },
        edit: {
          edit: 'Edit user',
          action: 'Update',
          submit: 'Save',
        },
        delete: {
          action: 'Delete',
        },
      },

      statuses: {
        id: 'ID',
        name: 'Name',
        createdAt: 'Created at',
        new: {
          header: 'Create status',
          action: 'Create status',
          submit: 'Create',
        },
        actions: 'Actions',
        edit: {
          header: 'Edit status',
          action: 'Edit',
          submit: 'Save',
        },
        delete: {
          action: 'Delete',
        },
      },

      tasks: {
        id: 'ID',
        name: 'Name',
        status: 'Status',
        creator: 'Creator',
        executor: 'Executor',
        description: 'Description',
        actions: 'Actions',
        new: {
          header: 'Create task',
          submit: 'Create',
        },

        edit: {
          header: 'Edit task',
          action: 'Edit',
          submit: 'Save',
        },

        delete: {
          action: 'Delete',
        },
      },
      welcome: {
        index: {
          hello: 'Manage your tasks with ease',
          description: 'Create, organize, and track your tasks in one place.',
          imageAlt: 'Task manager',
          signUp: 'Get started',
          signIn: 'Log in',
        },
      },
    },
  },
};
