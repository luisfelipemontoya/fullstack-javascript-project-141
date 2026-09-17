// @ts-check

import i18next from 'i18next';

export default (app) => {
  app
    .get('/users', { name: 'users' }, async (_req, reply) => {
      const users = await app.objection.models.user.query();
      reply.render('users/index', { users });
      return reply;
    })
    .get('/users/new', { name: 'newUser' }, (_req, reply) => {
      const user = new app.objection.models.user();
      const header = i18next.t('views.users.new.signUp');

      reply.render('users/new', { user, header });
    })
    .get('/users/:id/edit', { name: 'editUser' }, async (req, reply) => {
      if (!req.isAuthenticated() || req.user.id !== Number(req.params.id)) {
        reply.redirect(app.reverse('root'));
        return reply;
      }

      const user = await app.objection.models.user.query().findById(req.params.id);
      const header = i18next.t('views.users.edit.edit');

      reply.render('users/edit', { user, header });
      return reply;
    })
    .post('/users', async (req, reply) => {
      const user = new app.objection.models.user();
      user.$set(req.body.data);

      try {
        const validUser = await app.objection.models.user.fromJson(req.body.data);
        await app.objection.models.user.query().insert(validUser);
        req.flash('info', i18next.t('flash.users.create.success'));
        reply.redirect(app.reverse('root'));
      } catch ({ data }) {
        req.flash('error', i18next.t('flash.users.create.error'));

        const header = i18next.t('views.users.new.signUp');

        reply.render('users/new', {
          user,
          errors: data,
          header,
        });
      }

      return reply;
    });
};
