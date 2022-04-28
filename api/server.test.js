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

test("sanity check", () => {
  expect(true).not.toBe(false);
});

test("make sure our environment is set correctly", () => {
  expect(process.env.NODE_ENV).toBe("testing");
});

describe("data access function are working properly", () => {
  test.todo("getAll");
  test.todo("getById");
  test.todo("insert");
  test.todo("remove");
  test.todo("update");
});

describe("HTTP API functions are working properly", () => {
  test.todo("GET /api/students");
  test.todo("GET /api/students/:id");
  test.todo("POST /api/students");
  test.todo("DELETE /api/students/:id");
  test.todo("PUT /api/students/:id");
});
