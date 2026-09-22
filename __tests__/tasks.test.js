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

    const params = {
      name: faker.lorem.words(3),
      description: faker.lorem.sentence(),
      statusId: 1,
      executorId: 2,
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

  afterAll(async () => {
    await app.close();
  });
});
