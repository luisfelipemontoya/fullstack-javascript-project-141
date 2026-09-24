// @ts-check

import i18next from 'i18next';

export default (app) => {
  app
    .get('/tasks', { name: 'tasks' }, async (_req, reply) => {
      const tasks = await app.objection.models.task
        .query()
        .withGraphFetched('[status, creator, executor]');

      reply.render('tasks/index', { tasks });

      return reply;
    })

    .get('/tasks/new', { name: 'newTask' }, async (req, reply) => {
      if (!req.isAuthenticated()) {
        req.flash('error', i18next.t('flash.authError'));
        reply.redirect(app.reverse('root'));
        return reply;
      }

      const task = new app.objection.models.task();

      const statuses = await app.objection.models.taskStatus.query();
      const users = await app.objection.models.user.query();

      const header = i18next.t('views.tasks.new.header');

      reply.render('tasks/new', {
        task,
        statuses,
        users,
        header,
      });

      return reply;
    })

    .get('/tasks/:id', { name: 'task' }, async (req, reply) => {
      const task = await app.objection.models.task
        .query()
        .findById(req.params.id)
        .withGraphFetched('[status, creator, executor]');

      reply.render('tasks/show', { task });

      return reply;
    })

    .get('/tasks/:id/edit', { name: 'editTask' }, async (req, reply) => {
      if (!req.isAuthenticated()) {
        req.flash('error', i18next.t('flash.authError'));
        reply.redirect(app.reverse('root'));
        return reply;
      }

      const task = await app.objection.models.task.query().findById(req.params.id);

      const statuses = await app.objection.models.taskStatus.query();
      const users = await app.objection.models.user.query();

      const header = i18next.t('views.tasks.edit.header');

      reply.render('tasks/edit', {
        task,
        statuses,
        users,
        header,
      });

      return reply;
    })
    .patch('/tasks/:id', async (req, reply) => {
      if (!req.isAuthenticated()) {
        req.flash('error', i18next.t('flash.authError'));
        reply.redirect(app.reverse('root'));
        return reply;
      }

      const task = await app.objection.models.task.query().findById(req.params.id);

      const taskData = {
        name: req.body.data.name,
        description: req.body.data.description,
        statusId: Number(req.body.data.statusId),
        executorId: req.body.data.executorId ? Number(req.body.data.executorId) : null,
      };

      task.$set(taskData);

      try {
        await task.$query().patch(taskData);

        req.flash('info', i18next.t('flash.tasks.update.success'));
        reply.redirect(app.reverse('task', { id: task.id }));
      } catch ({ data }) {
        req.flash('error', i18next.t('flash.tasks.update.error'));

        const statuses = await app.objection.models.taskStatus.query();
        const users = await app.objection.models.user.query();
        const header = i18next.t('views.tasks.edit.header');

        reply.render('tasks/edit', {
          task,
          statuses,
          users,
          errors: data,
          header,
        });
      }

      return reply;
    })

    .delete('/tasks/:id', async (req, reply) => {
      if (!req.isAuthenticated()) {
        req.flash('error', i18next.t('flash.authError'));
        reply.redirect(app.reverse('root'));
        return reply;
      }

      const task = await app.objection.models.task.query().findById(req.params.id);

      if (task.creatorId !== req.user.id) {
        req.flash('error', i18next.t('flash.tasks.delete.error'));
        reply.redirect(app.reverse('tasks'));
        return reply;
      }

      await task.$query().delete();

      req.flash('info', i18next.t('flash.tasks.delete.success'));
      reply.redirect(app.reverse('tasks'));

      return reply;
    })

    .post('/tasks', async (req, reply) => {
      if (!req.isAuthenticated()) {
        req.flash('error', i18next.t('flash.authError'));
        reply.redirect(app.reverse('root'));
        return reply;
      }

      const taskData = {
        ...req.body.data,
        statusId: Number(req.body.data.statusId),
        executorId: req.body.data.executorId ? Number(req.body.data.executorId) : null,
        creatorId: req.user.id,
      };

      const task = new app.objection.models.task();
      task.$set(taskData);

      try {
        const validTask = app.objection.models.task.fromJson(taskData);

        await app.objection.models.task.query().insert(validTask);

        req.flash('info', i18next.t('flash.tasks.create.success'));
        reply.redirect(app.reverse('tasks'));
      } catch ({ data }) {
        req.flash('error', i18next.t('flash.tasks.create.error'));

        const statuses = await app.objection.models.taskStatus.query();
        const users = await app.objection.models.user.query();
        const header = i18next.t('views.tasks.new.header');

        reply.render('tasks/new', {
          task,
          statuses,
          users,
          errors: data,
          header,
        });
      }

      return reply;
    });
};
