const server = require("./server");
const request = require("supertest");
const db = require("../data/db-config");
const Student = require("./students/students-model");

beforeAll(async () => {
  await db.migrate.rollback();
  await db.migrate.latest();
});

beforeEach(async () => {
  await db.seed.run();
});

afterAll(async () => {
  await db.destroy();
});

test("[1] sanity check", () => {
  expect(true).not.toBe(false);
});

test("[2] make sure our environment is set correctly", () => {
  expect(process.env.NODE_ENV).toBe("testing");
});

describe("data access function are working properly", () => {
  test("[3] getAll", async () => {
    const result = await Student.getAll();
    expect(result.length).toBe(3);
    expect(result[0]).toMatchObject({ student_name: "Bobby", student_grade: 75 });
  });

  test("[4] getById", async () => {
    const result = await Student.getById(2);
    expect(result).toBeDefined();
    expect(result.student_name).toBe("Marry");
  });

  test("[5] insert", async () => {
    let result = await Student.insert({ student_name: "Will", student_grade: 40 });
    expect(result).toHaveProperty("student_id", 4);
    result = await Student.getAll();
    expect(result.length).toBe(4);
  });

  test("[6] remove", async () => {
    let result = await Student.remove(1);
    expect(result).toHaveProperty("student_name", "Bobby");
    result = await Student.getAll();
    expect(result).toHaveLength(2);
    expect(result[1].student_id).toBe(3);
  });

  test("[7] update", async () => {
    let result = await Student.update(3, { student_name: "Samantha" });
    expect(result).toEqual({ student_id: 3, student_name: "Samantha", student_grade: 100 });
    result = await Student.getAll();
    expect(result).toHaveLength(3);
  });
});

describe("HTTP API functions are working properly", () => {
  test("[8] GET /api/students", async () => {
    const res = await request(server).get("/api/students");
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(3);
  });
  test.todo("[9] GET /api/students/:id");
  test.todo("[10] POST /api/students");
  test.todo("[11] DELETE /api/students/:id");
  test.todo("[12] PUT /api/students/:id");
});
