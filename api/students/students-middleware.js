const Student = require("./students-model");

const checkIdExists = (req, res, next) => {
  const { id } = req.params;
  Student.getById(id)
    .then((student) => {
      if (!student) {
        next({ status: 404, message: `Student with the id ${id} not found` });
      } else {
        req.student = student;
        next();
      }
    })
    .catch((err) => next(err));
};

const validatePostBody = (req, res, next) => {
  const { student_name, student_grade } = req.body;
  if (
    !student_name ||
    !student_grade ||
    student_name.trim() === "" ||
    typeof student_name !== "string" ||
    typeof student_grade !== "number"
  ) {
    next({ status: 400, message: "Invalid input" });
  } else {
    req.newStudent = { student_name: student_name.trim(), student_grade };
    next();
  }
};

const validatePutBody = (req, res, next) => {
  const { student_name, student_grade } = req.body;
  if (!student_name && !student_grade) {
    next({ status: 400, message: "student name or student grade needs to be supplied" });
  } else {
    if (
      student_name &&
      student_grade &&
      typeof student_name === "string" &&
      typeof student_grade === "number" &&
      student_name.trim().length > 0
    ) {
      req.updatedStudent = { student_name: student_name.trim(), student_grade };
      next();
    } else if (
      student_name &&
      !student_grade &&
      typeof student_name === "string" &&
      student_name.trim().length > 0
    ) {
      req.updatedStudent = { student_name: student_name.trim() };
      next();
    } else if (student_grade && !student_name && typeof student_grade === "number") {
      req.updatedStudent = { student_grade };
      next();
    } else {
      next({ status: 400, message: "Invalid input" });
    }
  }
};

module.exports = { checkIdExists, validatePostBody, validatePutBody };
