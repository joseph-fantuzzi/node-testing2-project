const router = require("express").Router();

const Student = require("./students-model");

const { checkIdExists, validatePostBody, validatePutBody } = require("./students-middleware");

router.get("/", (req, res, next) => {
  Student.getAll()
    .then((students) => {
      res.json(students);
    })
    .catch((err) => next(err));
});

router.get("/:id", checkIdExists, (req, res) => {
  res.json(req.student);
});

router.post("/", validatePostBody, (req, res, next) => {
  Student.insert(req.newStudent)
    .then((newStudent) => {
      res.status(201).json(newStudent);
    })
    .catch((err) => next(err));
});

router.delete("/:id", checkIdExists, (req, res, next) => {
  Student.remove(req.student.student_id)
    .then((deletedStudent) => {
      res.json(deletedStudent);
    })
    .catch((err) => next(err));
});

router.put("/:id", checkIdExists, validatePutBody, (req, res, next) => {
  Student.update(req.student.student_id, req.updatedStudent)
    .then((updatedStudent) => {
      res.json(updatedStudent);
    })
    .catch((err) => next(err));
});

module.exports = router;
