/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema
    .createTable("users", (u) => {
      u.increments("user_id");
      u.string("username").notNullable();
      u.string("password").notNullable();
    })
    .createTable("companies", (c) => {
      c.increments("company_id");
      c.string("company_name").notNullable();
      c.string("company_legalnumber").notNullable();
      c.string("company_country").notNullable();
      c.string("company_website").notNullable();
    })
    .createTable("products", (p) => {
      p.increments("product_id");
      p.string("product_name").notNullable();
      p.string("product_category").notNullable();
      p.string("product_price").notNullable();
      p.string("product_quatity").notNullable();
      p.integer("company_id")
        .references("company_id")
        .inTable("companies")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists("products")
    .dropTableIfExists("companies")
    .dropTableIfExists("users");
};
