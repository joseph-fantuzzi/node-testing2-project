exports.seed = async function (knex) {
  return knex("students").insert([
    {
      student_name: "Bobby",
      student_grade: 75,
    },
    {
      student_name: "Marry",
      student_grade: 90,
    },
    {
      student_name: "Joe",
      student_grade: 100,
    },
  ]);
};
