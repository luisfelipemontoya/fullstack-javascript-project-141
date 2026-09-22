// @ts-check

import { faker } from '@faker-js/faker';
import fastify from 'fastify';
import init from '../server/plugin.js';
import { getTestData, prepareData } from './helpers/index.js';

describe('test tasks CRUD', () => {
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

    const users = await models.user.query();
    const statuses = await models.taskStatus.query();

    await models.task.query().insert({
      name: 'Implement authentication',
      description: 'Add authentication to the application',
      statusId: statuses[0].id,
      creatorId: users[0].id,
      executorId: users[1].id,
    });
  });

  it('index', async () => {
    const response = await app.inject({
      method: 'GET',
      url: app.reverse('tasks'),
    });

    expect(response.statusCode).toBe(200);
  });

  it('new', async () => {
    const cookie = await signIn();

    const response = await app.inject({
      method: 'GET',
      url: app.reverse('newTask'),
      cookies: cookie,
    });

    expect(response.statusCode).toBe(200);
  });

  it('cannot open new task page when unauthenticated', async () => {
    const response = await app.inject({
      method: 'GET',
      url: app.reverse('newTask'),
    });

    expect(response.statusCode).toBe(302);
  });

  it('create', async () => {
    const cookie = await signIn();

    const users = await models.user.query();
    const statuses = await models.taskStatus.query();

    const params = {
      name: faker.lorem.words(3),
      description: faker.lorem.sentence(),
      statusId: statuses[0].id,
      executorId: users[1].id,
    };

    const response = await app.inject({
      method: 'POST',
      url: app.reverse('tasks'),
      cookies: cookie,
      payload: {
        data: params,
      },
    });

    expect(response.statusCode).toBe(302);

    const task = await models.task.query().findOne({
      name: params.name,
    });

    expect(task).toMatchObject(params);
    expect(task.creatorId).toBeDefined();
  });

  it('show', async () => {
    const task = await models.task.query().first();

    const response = await app.inject({
      method: 'GET',
      url: `/tasks/${task.id}`,
    });

    expect(response.statusCode).toBe(200);
  });

  it('edit', async () => {
    const cookie = await signIn();
    const task = await models.task.query().first();

    const response = await app.inject({
      method: 'GET',
      url: `/tasks/${task.id}/edit`,
      cookies: cookie,
    });

    expect(response.statusCode).toBe(200);
  });

  it('cannot edit task when unauthenticated', async () => {
    const task = await models.task.query().first();

    const response = await app.inject({
      method: 'GET',
      url: `/tasks/${task.id}/edit`,
    });

    expect(response.statusCode).toBe(302);
  });

  it('update', async () => {
    const cookie = await signIn();
    const task = await models.task.query().first();
    const statuses = await models.taskStatus.query();
    const users = await models.user.query();

    const params = {
      name: faker.lorem.words(3),
      description: faker.lorem.sentence(),
      statusId: statuses[1].id,
      executorId: users[1].id,
    };

    const response = await app.inject({
      method: 'PATCH',
      url: `/tasks/${task.id}`,
      cookies: cookie,
      payload: {
        data: params,
      },
    });

    expect(response.statusCode).toBe(302);

    const updatedTask = await models.task.query().findById(task.id);

    expect(updatedTask).toMatchObject(params);
    expect(updatedTask.creatorId).toBe(task.creatorId);
  });

  it('cannot update task when unauthenticated', async () => {
    const task = await models.task.query().first();

    const response = await app.inject({
      method: 'PATCH',
      url: `/tasks/${task.id}`,
      payload: {
        data: {
          name: 'Unauthorized update',
        },
      },
    });

    expect(response.statusCode).toBe(302);

    const unchangedTask = await models.task.query().findById(task.id);

    expect(unchangedTask.name).toBe(task.name);
  });

  afterAll(async () => {
    await app.close();
  });
});
