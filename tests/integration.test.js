const request = require('supertest');
const app = require('../src/app');

describe("POST /api/transaction ", () => {
  test("It should respond with the created block and status 201", async () => {
    const hashRegex = /^(00).*\w/;
    const response = await request(app).post("/api/transaction").send({message: "Jest test"});
    expect(response?.statusCode).toBe(201);
    expect(response?.body?.status?.success).toBeTruthy()
    expect(response?.body?.payload?.hash).toMatch(hashRegex);
  });
});