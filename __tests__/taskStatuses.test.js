// @ts-check

import fastify from 'fastify';
import init from '../server/plugin.js';
import { getTestData, prepareData } from './helpers/index.js';

describe('test task statuses CRUD', () => {
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
    await knex('tasks').del();
    await knex('task_statuses').del();
    await knex('users').del();

    await prepareData(app);
  });

  it('index', async () => {
    const response = await app.inject({
      method: 'GET',
      url: app.reverse('statuses'),
    });

    expect(response.statusCode).toBe(200);
  });

  it('new', async () => {
    const cookie = await signIn();

    const response = await app.inject({
      method: 'GET',
      url: app.reverse('newStatus'),
      cookies: cookie,
    });

    expect(response.statusCode).toBe(200);
  });

  it('create', async () => {
    const cookie = await signIn();
    const params = testData.taskStatuses.new;

    const response = await app.inject({
      method: 'POST',
      url: app.reverse('statuses'),
      cookies: cookie,
      payload: {
        data: params,
      },
    });

    expect(response.statusCode).toBe(302);

    const status = await models.taskStatus.query().findOne({
      name: params.name,
    });

    expect(status).toMatchObject(params);
  });

  it('edit', async () => {
    const cookie = await signIn();
    const status = await models.taskStatus.query().first();

    const response = await app.inject({
      method: 'GET',
      url: app.reverse('editStatus', { id: status.id }),
      cookies: cookie,
    });

    expect(response.statusCode).toBe(200);
  });

  it('cannot edit when unauthenticated', async () => {
    const status = await models.taskStatus.query().first();

    const response = await app.inject({
      method: 'GET',
      url: app.reverse('editStatus', { id: status.id }),
    });

    expect(response.statusCode).toBe(302);
  });

  it('update', async () => {
    const cookie = await signIn();
    const status = await models.taskStatus.query().first();

    const params = testData.taskStatuses.updated;

    const response = await app.inject({
      method: 'PATCH',
      url: app.reverse('status', { id: status.id }),
      cookies: cookie,
      payload: {
        data: params,
      },
    });

    expect(response.statusCode).toBe(302);

    const updatedStatus = await models.taskStatus.query().findById(status.id);

    expect(updatedStatus).toMatchObject(params);
  });

  it('delete', async () => {
    const cookie = await signIn();
    const status = await models.taskStatus.query().first();

    const response = await app.inject({
      method: 'DELETE',
      url: app.reverse('status', { id: status.id }),
      cookies: cookie,
    });

    expect(response.statusCode).toBe(302);

    const deletedStatus = await models.taskStatus.query().findById(status.id);

    expect(deletedStatus).toBeUndefined();
  });

  it('cannot delete when unauthenticated', async () => {
    const status = await models.taskStatus.query().first();

    const response = await app.inject({
      method: 'DELETE',
      url: app.reverse('status', { id: status.id }),
    });

    expect(response.statusCode).toBe(302);

    const existingStatus = await models.taskStatus.query().findById(status.id);

    expect(existingStatus).toBeDefined();
  });

  it('cannot delete status associated with a task', async () => {
    const cookie = await signIn();

    const users = await models.user.query();
    const statuses = await models.taskStatus.query();
    const status = statuses[0];

    await models.task.query().insert({
      name: 'Task with status',
      description: 'Task used to test status restriction',
      statusId: status.id,
      creatorId: users[0].id,
      executorId: null,
    });

    const response = await app.inject({
      method: 'DELETE',
      url: `/statuses/${status.id}`,
      cookies: cookie,
    });

    expect(response.statusCode).toBe(302);

    const existingStatus = await models.taskStatus.query().findById(status.id);

    expect(existingStatus).toBeDefined();
  });

  afterAll(async () => {
    await app.close();
  });
});
