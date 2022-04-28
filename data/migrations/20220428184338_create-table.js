exports.up = function (knex) {
  return knex.schema.createTable("students", (tbl) => {
    tbl.increments("student_id");
    tbl.string("student_name").notNullable();
    tbl.integer("student_grade").notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("students");
};
