const router = require("express").Router();

const Student = require("./students-model");

router.get("/", (req, res, next) => {
  Student.getAll()
    .then((students) => {
      res.json(students);
    })
    .catch((err) => next(err));
});

router.get("/:id", (req, res, next) => {
  Student.getById(req.params.id)
    .then((student) => {
      res.json(student);
    })
    .catch((err) => next(err));
});

router.post("/", (req, res, next) => {
  Student.insert(req.body)
    .then((newStudent) => {
      res.status(201).json(newStudent);
    })
    .catch((err) => next(err));
});

router.delete("/:id", (req, res, next) => {
  Student.remove(req.params.id)
    .then((deletedStudent) => {
      res.json(deletedStudent);
    })
    .catch((err) => next(err));
});

router.put("/:id", (req, res, next) => {
  Student.update(req.params.id, req.body)
    .then((updatedStudent) => {
      res.json(updatedStudent);
    })
    .catch((err) => next(err));
});

module.exports = router;
