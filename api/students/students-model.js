const db = require("../../data/db-config");

const getAll = () => {
  return db("students");
};

const getById = (student_id) => {
  return db("students").where({ student_id }).first();
};

const insert = async (student) => {
  const [id] = await db("students").insert(student);
  return getById(id);
};

const remove = async (student_id) => {
  const deletedStudent = await getById(student_id);
  await db("students").where({ student_id }).del();
  return deletedStudent;
};

const update = async (student_id, changes) => {
  const count = await db("students").where({ student_id }).update(changes);
  if (count > 0) {
    return getById(student_id);
  }
};

module.exports = { getAll, getById, insert, remove, update };
