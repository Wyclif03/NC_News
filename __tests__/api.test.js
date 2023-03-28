const request = require("supertest")
const app = require("../db/app");
const db = require ('../db/connection')
const seed = require('../db/seeds/seed')
const testData = require('../db/data/test-data')

beforeEach(() => {
    return seed(testData)
})

afterAll(() => {
    return db.end();
});

describe("error codes", () => {
      test('Responds with a 200 that the server is responding', () => {
        return request(app)
            .get("/api")
            .expect(200)
            .then(({ body }) => {
                const { message } = body;
                expect(message).toBe("Server is working")
            })
    })
    test("404 - receive error code when path does not exist", () => {
        return request(app)
        .get('/api/xx')
        .expect(404)
        .then(({body}) => {
            const { message } = body;
            expect(message).toBe('Path does not exist')
        })
    })
})

describe("GET / API / TOPICS", () => {
    test('it should return an array', () => {
        return request(app)
        .get('/api/topics')
        .expect(200)
        .then(({body}) => {
            const {topics} = body
            expect(topics).toBeInstanceOf(Array)
        })
    })

test('it should return correct keys, match type and length ', () =>{
    return request(app)
    .get('/api/topics')
    .expect(200)
    .then(({body}) => {
        const {topics} = body
        expect(topics).toHaveLength(3)   
        topics.forEach((topics) => {
            expect(topics).toHaveProperty('slug', expect.any(String));
            expect(topics).toHaveProperty('description', expect.any(String));
})
})
})
})

describe('4. GET /api/articles/:article_id', () => {
    test('it should return correct keys, match type for all objects in array ', () => {
        return request(app)
        .get('/api/articles')
        .expect(200)
        .then(({body}) => {
            const {articles} = body
            articles.forEach((articles) => {
                expect(articles).toHaveProperty('author', expect.any(String));
                expect(articles).toHaveProperty('title', expect.any(String));
                expect(articles).toHaveProperty('article_id', expect.any(Number));
                expect(articles).toHaveProperty('body', expect.any(String));
                expect(articles).toHaveProperty('topic', expect.any(String));
                expect(articles).toHaveProperty('created_at', expect.any(String));
                expect(articles).toHaveProperty('votes', expect.any(Number));
                expect(articles).toHaveProperty('article_img_url', expect.any(String));
            })
    }) 
});

test('should return correct article Id for the given article ID path', () => {
    return request(app)
    .get('/api/articles/1')
    .expect(200)
    .then(({body}) => {
        const {articles} = body
        expect(articles.article_id).toBe(1)  
});
})
   
    test('should return a 400 status code when invalid ID format', () => {
        return request(app)
        .get('/api/articles/no_such_id')
        .expect(400)
        .then(({body}) => {
            expect(body.msg).toBe("Incorrect ID format")
        })
    });
    test('should return a 404 status code when valid ID given, but not found in DB', () => {
        return request(app)
        .get('/api/articles/999999')
        .expect(404)
        .then(({body}) => {
            expect(body.msg).toBe("Article ID not found")
        })
    });
})