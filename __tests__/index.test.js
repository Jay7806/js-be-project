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
describe("endpoints", () => {
  test("GET: /api provides json documentation for all endpoints", () => {
    return request(app)
      .get("/api")
      .expect(200)
      .then((response) => {
        expect(response.body.data).toEqual(endpointData);
      });
  });
});
describe("api/articles/:article_id", () => {
  test("200: Returns an article by the ID that is passed", () => {
    return request(app)
      .get("/api/articles/5")
      .expect(200)
      .then(({ body }) => {
        const { articles } = body;
        expect(articles).toHaveLength(1);
        articles.forEach(({ article_id }) => {
          expect(article_id).toBe(5);
        });
      });
  });
  test("404: receive a 404 error when article id is not found", () => {
    return request(app)
      .get("/api/articles/22")
      .expect(404)
      .then(({ body }) => {
        const { msg } = body;
        expect(msg).toEqual("Not found");
      });
  });
  test("400: receive a 400 error when it is a bad request", () => {
    return request(app)
      .get("/api/articles/articlesid")
      .expect(400)
      .then(({ body }) => {
        const { msg } = body;
        expect(msg).toEqual("Bad request");
      });
  });
});
describe("api/articles", () => {
  test("GET: 200 responds with an array of articles", () => {
    return request(app).get("/api/articles").expect(200);
  });
  test("Responds with an array of articles", () => {
    return request(app)
      .get("/api/articles")
      .expect(200)
      .then(({ body }) => {
        const { articles } = body;
        expect(articles).toHaveLength(13);
        expect(articles).toBeSortedBy(articles.created_by, {
          descending: true,
        });
        articles.forEach((article) => {
          expect(article).toHaveProperty(
            "article_id",
            "title",
            "topic",
            "author",
            "created_at",
            "votes",
            "article_img_url",
            "comment_count"
          );
        });
      });
  });
});
describe("/api/articles/:article_id/comments", () => {
  test("returns an empty array when the article id doesnt have any comments ", () => {
    return request(app)
      .get("/api/articles/2/comments")
      .expect(200)
      .then(({ body }) => {
        const { comments } = body;
        expect(comments).toHaveLength(0);
        expect(comments).toEqual([]);
      });
  });
  test("Responds with an array of comments from a specific article id", () => {
    return request(app)
      .get("/api/articles/9/comments")
      .expect(200)
      .then(({ body }) => {
        const { comments } = body;
        expect(comments).toHaveLength(2);
        expect(comments).toBeSortedBy(comments.created_by, {
          descending: true,
        });
        comments.forEach((comment) => {
          expect(comment).toHaveProperty(
            "comment_id",
            "body",
            "article_id",
            "author",
            "votes",
            "created_at"
          );
        });
      });
  });
  test("404: receive a 404 error when no comments match the article id", () => {
    return request(app)
      .get("/api/articles/9000/comments")
      .expect(404)
      .then(({ body }) => {
        const { msg } = body;
        expect(msg).toEqual("Not found");
      });
  });
  test("400: receive a 400 error when it is a bad request", () => {
    return request(app)
      .get("/api/articles/article/comments")
      .expect(400)
      .then(({ body }) => {
        const { msg } = body;
        expect(msg).toEqual("Bad request");
      });
  });
});
describe("/api/articles/:article_id/comments", () => {
  test("POST:201 inserts a new comment that has author and body properties", () => {
    const newComment = {
      author: "butter_bridge",
      body: "I am 100% sure that we're not completely sure.",
    };
    return request(app)
      .post("/api/articles/9/comments")
      .send(newComment)
      .expect(201)
      .then((response) => {
        expect(response.body.comment.comment_id).toBe(19);
        expect(response.body.comment.body).toEqual("I am 100% sure that we're not completely sure.");
        expect(response.body.comment.author).toEqual("butter_bridge")
        expect(response.body.comment.article_id).toBe(9);
        expect(response.body.comment.votes).toBe(0);
       });
    });
  test("POST:201 inserts a new comment that has an additional property that doesn't exist", () => {
    const newComment = {
      author: "butter_bridge",
      body: "I am 100% sure that we're not completely sure.",
      user: 'Hello'
    };
    return request(app)
      .post("/api/articles/1/comments")
      .send(newComment)
      .expect(201)
      .then((response) => {
        expect(response.body.comment.article_id).toBe(1);
      });
  });
  test("POST:400 responds with an appropriate error message when provided with an incorrect end pojnt", () => {
        const newComment = {
          author: "butter_bridge",
          body: "I am 100% sure that we're not completely sure.",
        };
    return request(app)
      .post("/api/articles/article/comments")
      .send(newComment)
      .expect(400)
      .then(({body}) => {
        const {msg} = body;
        expect(msg).toEqual("Bad request");
      });
  });
  test("404: receive a 404 error when no comments match the article id", () => {
    const newComment = {
      author: "butter_bridge",
      body: "I am 100% sure that we're not completely sure.",
    };
    return request(app)
      .post("/api/articles/40/comments")
      .send(newComment)
      .expect(404)
      .then(({ body }) => {
        const { msg } = body;
        expect(msg).toEqual("Not found");
      });
  });
  test("404: receive a 404 error when username doesn't exist in users", () => {
    const newComment = {
      author: 'Non author',
      body: "I am 100% sure that we're not completely sure."
    }
    return request(app)
      .post("/api/articles/1/comments")
      .send(newComment)
      .expect(404)
      .then(({ body }) => {
        const { msg } = body;
        expect(msg).toEqual("Not found");
      });
  });
});
