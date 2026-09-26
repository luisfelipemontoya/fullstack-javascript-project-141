// @ts-check

import fastify from 'fastify';
import init from '../server/plugin.js';
import { getTestData, prepareData } from './helpers/index.js';

describe('test labels CRUD', () => {
  let app;
  let knex;
  let models;

  const testData = getTestData();

  const signIn = async () => {
    const response = await app.inject({
      method: 'POST',
      url: app.reverse('session'),
      payload: {
        data: testData.users.existing,
      },
    });

    const [sessionCookie] = response.cookies;

    return {
      [sessionCookie.name]: sessionCookie.value,
    };
  };

  beforeAll(async () => {
    app = fastify({
      exposeHeadRoutes: false,
      logger: { target: 'pino-pretty' },
    });

    await init(app);

    knex = app.objection.knex;
    models = app.objection.models;

    await knex.migrate.latest();
  });

  beforeEach(async () => {
    await knex('tasks_labels').del();
    await knex('tasks').del();
    await knex('labels').del();
    await knex('task_statuses').del();
    await knex('users').del();

    await prepareData(app);
  });

  it('index', async () => {
    const response = await app.inject({
      method: 'GET',
      url: app.reverse('labels'),
    });

    expect(response.statusCode).toBe(200);
  });

  it('new', async () => {
    const cookie = await signIn();

    const response = await app.inject({
      method: 'GET',
      url: app.reverse('newLabel'),
      cookies: cookie,
    });

    expect(response.statusCode).toBe(200);
  });

  it('create', async () => {
    const cookie = await signIn();
    const params = testData.labels.new;

    const response = await app.inject({
      method: 'POST',
      url: app.reverse('labels'),
      cookies: cookie,
      payload: {
        data: params,
      },
    });

    expect(response.statusCode).toBe(302);

    const label = await models.label.query().findOne({
      name: params.name,
    });

    expect(label).toMatchObject(params);
  });

  it('edit', async () => {
    const cookie = await signIn();
    const label = await models.label.query().first();

    const response = await app.inject({
      method: 'GET',
      url: app.reverse('editLabel', { id: label.id }),
      cookies: cookie,
    });

    expect(response.statusCode).toBe(200);
  });

  it('cannot edit when unauthenticated', async () => {
    const label = await models.label.query().first();

    const response = await app.inject({
      method: 'GET',
      url: app.reverse('editLabel', { id: label.id }),
    });

    expect(response.statusCode).toBe(302);
  });

  it('update', async () => {
    const cookie = await signIn();
    const label = await models.label.query().first();

    const params = testData.labels.updated;

    const response = await app.inject({
      method: 'PATCH',
      url: app.reverse('label', { id: label.id }),
      cookies: cookie,
      payload: {
        data: params,
      },
    });

    expect(response.statusCode).toBe(302);

    const updatedLabel = await models.label.query().findById(label.id);

    expect(updatedLabel).toMatchObject(params);
  });

  it('delete', async () => {
    const cookie = await signIn();
    const label = await models.label.query().first();

    const response = await app.inject({
      method: 'DELETE',
      url: app.reverse('deleteLabel', { id: label.id }),
      cookies: cookie,
    });

    expect(response.statusCode).toBe(302);

    const deletedLabel = await models.label.query().findById(label.id);

    expect(deletedLabel).toBeUndefined();
  });

  it('cannot delete when unauthenticated', async () => {
    const label = await models.label.query().first();

    const response = await app.inject({
      method: 'DELETE',
      url: app.reverse('deleteLabel', { id: label.id }),
    });

    expect(response.statusCode).toBe(302);

    const existingLabel = await models.label.query().findById(label.id);

    expect(existingLabel).toBeDefined();
  });

  afterAll(async () => {
    await app.close();
  });
});
