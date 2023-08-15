const app = require("../db/seeds/app");
const request = require("supertest");
const connection = require("../db/connection");
const seed = require("../db/seeds/seed");
const data = require("../db/data/test-data/index");
const endpointData = require("../endpoints.json");

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
    test("GET: 200 sends an array of topics with properties of slug and description", () => {
      return request(app)
        .get("/api/topics")
        .expect(200)
        .then(({ body }) => {
          expect(body).toBeInstanceOf(Object);
        });
    });
    test("GET: 200 sends an array of topics with properties of slug and description", () => {
      return request(app)
        .get("/api/topics")
        .expect(200)
        .then(({ body }) => {
          const response = body.topics;
          expect(response).toHaveLength(3);
          response.forEach((topic) => {
            expect(topic).toHaveProperty("slug", expect.any(String));
            expect(topic).toHaveProperty("description", expect.any(String));
          });
        });
    });
  });
});
describe("endpoints", () => {
  test("GET: /api provides json documentation for all endpoints", () => {
    return request(app).get("/api").expect(200).then((response)=> {
    expect(response.body.data).toEqual(endpointData);
    })
     });
});
