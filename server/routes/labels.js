// @ts-check

import i18next from 'i18next';

export default (app) => {
  app
    .get('/labels', { name: 'labels' }, async (_req, reply) => {
      const labels = await app.objection.models.label.query();
      const header = i18next.t('views.labels.index.header');

      reply.render('labels/index', { labels, header });
      return reply;
    })

    .get('/labels/new', { name: 'newLabel' }, (req, reply) => {
      if (!req.isAuthenticated()) {
        req.flash('error', i18next.t('flash.authError'));
        reply.redirect(app.reverse('root'));
        return reply;
      }

      const label = new app.objection.models.label();
      const header = i18next.t('views.labels.new.header');

      reply.render('labels/new', { label, header });
      return reply;
    })

    .get('/labels/:id/edit', { name: 'editLabel' }, async (req, reply) => {
      if (!req.isAuthenticated()) {
        req.flash('error', i18next.t('flash.authError'));
        reply.redirect(app.reverse('root'));
        return reply;
      }

      const label = await app.objection.models.label.query().findById(req.params.id);

      const header = i18next.t('views.labels.edit.header');

      reply.render('labels/edit', { label, header });
      return reply;
    })

    .patch('/labels/:id', { name: 'label' }, async (req, reply) => {
      if (!req.isAuthenticated()) {
        req.flash('error', i18next.t('flash.authError'));
        reply.redirect(app.reverse('root'));
        return reply;
      }

      const label = await app.objection.models.label.query().findById(req.params.id);

      try {
        const validLabel = app.objection.models.label.fromJson(req.body.data);

        await label.$query().patch(validLabel);

        req.flash('info', i18next.t('flash.labels.update.success'));
        reply.redirect(app.reverse('labels'));
      } catch ({ data }) {
        req.flash('error', i18next.t('flash.labels.update.error'));

        label.$set(req.body.data);

        const header = i18next.t('views.labels.edit.header');

        reply.render('labels/edit', {
          label,
          errors: data,
          header,
        });
      }

      return reply;
    })

    .delete('/labels/:id', { name: 'deleteLabel' }, async (req, reply) => {
      if (!req.isAuthenticated()) {
        req.flash('error', i18next.t('flash.authError'));
        reply.redirect(app.reverse('root'));
        return reply;
      }

      const label = await app.objection.models.label.query().findById(req.params.id);

      await label.$query().delete();

      req.flash('info', i18next.t('flash.labels.delete.success'));
      reply.redirect(app.reverse('labels'));

      return reply;
    })

    .post('/labels', async (req, reply) => {
      if (!req.isAuthenticated()) {
        req.flash('error', i18next.t('flash.authError'));
        reply.redirect(app.reverse('root'));
        return reply;
      }

      const label = new app.objection.models.label();
      label.$set(req.body.data);

      try {
        const validLabel = app.objection.models.label.fromJson(req.body.data);

        await app.objection.models.label.query().insert(validLabel);

        req.flash('info', i18next.t('flash.labels.create.success'));
        reply.redirect(app.reverse('labels'));
      } catch ({ data }) {
        req.flash('error', i18next.t('flash.labels.create.error'));

        const header = i18next.t('views.labels.new.header');

        reply.render('labels/new', {
          label,
          errors: data,
          header,
        });
      }

      return reply;
    });
};
