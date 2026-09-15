// @ts-check

import i18next from 'i18next';

export default (app) => {
  app
    .get('/session/new', { name: 'newSession' }, (_req, reply) => {
      const signInForm = {};
      const header = i18next.t('views.session.new.signIn');

      reply.render('session/new', { signInForm, header });
    })
    .post(
      '/session',
      { name: 'session' },
      app.fp.authenticate('form', async (req, reply, err, user) => {
        if (err) {
          return app.httpErrors.internalServerError(err);
        }
        if (!user) {
          const signInForm = req.body.data;
          const errors = {
            email: [{ message: i18next.t('flash.session.create.error') }],
          };
          const header = i18next.t('views.session.new.signIn');

          reply.render('session/new', {
            signInForm,
            errors,
            header,
          });

          return reply;
        }
        await req.logIn(user);
        req.flash('success', i18next.t('flash.session.create.success'));
        reply.redirect(app.reverse('root'));

        return reply;
      }),
    )
    .delete('/session', (req, reply) => {
      req.logOut();
      req.flash('info', i18next.t('flash.session.delete.success'));
      reply.redirect(app.reverse('root'));
    });
};
