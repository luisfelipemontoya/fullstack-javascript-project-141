// @ts-check

/*
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = (knex) =>
  knex.schema.createTable('tasks', (table) => {
    table.increments('id').primary();

    table.string('name').notNullable();
    table.text('description');

    table
      .integer('status_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('task_statuses');

    table
      .integer('creator_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('users');

    table
      .integer('executor_id')
      .unsigned()
      .nullable()
      .references('id')
      .inTable('users');

    table.timestamps(true, true);
  });

/*
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = (knex) => knex.schema.dropTable('tasks');
