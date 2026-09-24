// @ts-check

import _ from 'lodash';
import fastify from 'fastify';

import init from '../server/plugin.js';
import encrypt from '../server/lib/secure.cjs';
import { getTestData, prepareData } from './helpers/index.js';

describe('test users CRUD', () => {
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

    // TODO: пока один раз перед тестами
    // тесты не должны зависеть друг от друга
    // перед каждым тестом выполняем миграции
    // и заполняем БД тестовыми данными
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
      url: app.reverse('users'),
    });

    expect(response.statusCode).toBe(200);
  });

  it('new', async () => {
    const response = await app.inject({
      method: 'GET',
      url: app.reverse('newUser'),
    });

    expect(response.statusCode).toBe(200);
  });

  it('create', async () => {
    const params = testData.users.new;
    const response = await app.inject({
      method: 'POST',
      url: app.reverse('users'),
      payload: {
        data: params,
      },
    });

    expect(response.statusCode).toBe(302);
    const expected = {
      ..._.omit(params, 'password'),
      passwordDigest: encrypt(params.password),
    };
    const user = await models.user.query().findOne({ email: params.email });
    expect(user).toMatchObject(expected);
  });

  it('edit', async () => {
    const user = await models.user.query().findOne({ email: testData.users.existing.email });

    const cookie = await signIn();

    const response = await app.inject({
      method: 'GET',
      url: `/users/${user.id}/edit`,
      cookies: cookie,
    });

    expect(response.statusCode).toBe(200);
  });

  it('cannot edit another user', async () => {
    const currentUser = await models.user.query().findOne({ email: testData.users.existing.email });

    const anotherUser = await models.user.query().whereNot('id', currentUser.id).first();

    const cookie = await signIn();

    const response = await app.inject({
      method: 'GET',
      url: `/users/${anotherUser.id}/edit`,
      cookies: cookie,
    });

    expect(response.statusCode).toBe(302);
  });

  it('update', async () => {
    const user = await models.user.query().findOne({
      email: testData.users.existing.email,
    });

    const cookie = await signIn();
    const params = testData.users.updated;

    const response = await app.inject({
      method: 'PATCH',
      url: `/users/${user.id}`,
      cookies: cookie,
      payload: {
        data: params,
      },
    });

    expect(response.statusCode).toBe(302);

    const updatedUser = await models.user.query().findById(user.id);

    const expected = {
      ..._.omit(params, 'password'),
      passwordDigest: encrypt(params.password),
    };

    expect(updatedUser).toMatchObject(expected);
  });

  it('delete', async () => {
    const user = await models.user.query().findOne({
      email: testData.users.existing.email,
    });

    const cookie = await signIn();

    const response = await app.inject({
      method: 'DELETE',
      url: `/users/${user.id}`,
      cookies: cookie,
    });

    expect(response.statusCode).toBe(302);

    const deletedUser = await models.user.query().findById(user.id);

    expect(deletedUser).toBeUndefined();
  });

  it('cannot delete another user', async () => {
    const currentUser = await models.user.query().findOne({
      email: testData.users.existing.email,
    });

    const anotherUser = await models.user.query().whereNot('id', currentUser.id).first();

    const cookie = await signIn();

    const response = await app.inject({
      method: 'DELETE',
      url: `/users/${anotherUser.id}`,
      cookies: cookie,
    });

    expect(response.statusCode).toBe(302);

    const existingUser = await models.user.query().findById(anotherUser.id);

    expect(existingUser).toBeDefined();
  });
  it('cannot delete user associated with a task', async () => {
    const cookie = await signIn();

    const users = await models.user.query();
    const statuses = await models.taskStatus.query();
    const user = users[0];

    await models.task.query().insert({
      name: 'Task with user',
      description: 'Task used to test user restriction',
      statusId: statuses[0].id,
      creatorId: user.id,
      executorId: null,
    });

    const response = await app.inject({
      method: 'DELETE',
      url: `/users/${user.id}`,
      cookies: cookie,
    });

    expect(response.statusCode).toBe(302);

    const existingUser = await models.user.query().findById(user.id);

    expect(existingUser).toBeDefined();
  });

  afterEach(async () => {
    // Пока Segmentation fault: 11
    // после каждого теста откатываем миграции
    // await knex.migrate.rollback();
  });

  afterAll(async () => {
    await app.close();
  });
});
