const app = require("../db/seeds/app");
const request = require("supertest");
const connection = require("../db/connection");
const seed = require("../db/seeds/seed");
const data = require("../db/data/test-data/index");

afterAll(() => {
  return connection.end();
});
beforeEach(() => {
  return seed(data);
});

describe("app", () => {
  describe("api/healthcheck", () => {
    test("returns 200 status code", () => {
      return request(app).get("/api/healthcheck").expect(200);
    });
  });
  describe("api/topics", () => {
    test("GET: 200 sends an array of topics with properties of slug and description", () => {
      return request(app).get("/api/topics").expect(200);
    });
    test("Responds with an object with slug and description properties", () => {
      return request(app)
        .get("/api/topics")
        .expect(200)
        .then(({ body }) => {
          expect(body).toEqual({
            topics: [
              {
                slug: "mitch",
                description: "The man, the Mitch, the legend",
              },
              { slug: "cats", description: "Not dogs" },
              { slug: "paper", description: "what books are made of" },
            ],
          });
        });
    });
  });
});
