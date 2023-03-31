const request = require("supertest")
const app = require("../app");
const db = require ('../db/connection')
const seed = require('../db/seeds/seed')
const testData = require('../db/data/test-data');



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

describe("5. GET /api/articles", () => {
    test('it should return an array with correct object keys and match types', () => {
        return request(app)
        .get('/api/articles')
        .expect(200)
        .then(({body}) => {
            const {articles} = body
            expect(articles).toBeInstanceOf(Array)
            expect(articles).toHaveLength(12)  
            articles.forEach((articles) => {
                expect(articles).toHaveProperty('author', expect.any(String));
                expect(articles).toHaveProperty('title', expect.any(String));
                expect(articles).toHaveProperty('article_id', expect.any(Number));
                expect(articles).toHaveProperty('topic', expect.any(String));
                expect(articles).toHaveProperty('created_at', expect.any(String));
                expect(articles).toHaveProperty('votes', expect.any(Number));
                expect(articles).toHaveProperty('article_img_url', expect.any(String));
                expect(articles).toHaveProperty('comment_count', expect.any(Number));
            })
    }) 
})
    test('should return single article with all relevant properties including comment count', () => {
        return request(app)
        .get('/api/articles')
        .expect(200)
        .then(({body}) => {
            const {articles} = body
            const articleOne = {"article_id": 1, 
            "article_img_url": "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700", 
            "author": "butter_bridge", 
            "created_at": "2020-07-09T20:11:00.000Z", 
            "title": "Living in the shadow of a great man", 
            "topic": "mitch", 
            "votes": 100,
            "comment_count": 11}
            const articleDB = articles.find((articleOne) => articleOne.article_id === 1);
            expect(articleDB).toEqual(articleOne)
    })
})
    test("should return articles in descending order of date created", () => {
        return request(app)
        .get('/api/articles')
        .expect(200)
        .then(({body}) => {
            const {articles} = body
        const orderedArticles = [...articles]
        orderedArticles.sort((a, b) => a.created_at - b.created_at);
        expect(orderedArticles).toEqual(articles)
})
})
})

describe('6. GET /api/articles/:article_id/comments', () => {
    test('should return the required outputs for a single hard coded example AND return 11 expected comments', () => {
        return request(app)
        .get('/api/articles/1/comments')
        .expect(200)
        .then(({body}) => {
            const articleOne = {"article_id": 1, "author": "butter_bridge", "body": "The beautiful thing about treasure is that it exists. Got to find out what kind of sheets these are; not cotton, not rayon, silky.", "comment_id": 2, "created_at": "2020-10-31T03:03:00.000Z", "votes": 14}
            const {articles} = body
            expect(articles.length).toBe(11)
            expect(articles[0]).toEqual(articleOne)  
    });
});
    test("should return most recengitt comments first", () => {
        return request(app)
        .get('/api/articles/1/comments')
        .expect(200)
        .then(({body}) => {
            const {articles} = body
        const orderedArticles = [...articles]
        orderedArticles.sort((a, b) => a.created_at - b.created_at);
        expect(orderedArticles).toEqual(articles)
})
})
})