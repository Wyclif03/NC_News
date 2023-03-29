const request = require("supertest")
const app = require("../app");
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
    test('should return correct article Id and values for the given article ID path.', () => {
    return request(app)
    .get('/api/articles/1')
    .expect(200)
    .then(({body}) => {
        const articleOne = {"article_id": 1, 
            "article_img_url": "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700", 
            "author": "butter_bridge", 
            "body": "I find this existence challenging", 
            "created_at": "2020-07-09T20:11:00.000Z", 
            "title": "Living in the shadow of a great man", 
            "topic": "mitch", 
            "votes": 100}
        const {articles} = body
        expect(articles).toEqual(articleOne)  
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