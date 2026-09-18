// @ts-check

/*
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = (knex) =>
    knex.schema.createTable('task_statuses', (table) => {
        table.increments('id').primary();
        table.string('name').notNullable();
        table.timestamps(true, true);
    });

/*
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = (knex) => knex.schema.dropTable('task_statuses');
