// @ts-check

export default {
  translation: {
    appName: 'Task Manager',
    flash: {
      session: {
        create: {
          success: 'You are logged in',
          error: 'Wrong email or password',
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
      },
      authError: 'Access denied! Please login',
    },
    layouts: {
      application: {
        users: 'Users',
        signIn: 'Login',
        signUp: 'Register',
        signOut: 'Logout',
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
        update: {
          success: 'User updated successfully',
          error: 'Failed to update user',
        },
        delete: {
          action: 'Delete',
          success: 'User deleted successfully',
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
