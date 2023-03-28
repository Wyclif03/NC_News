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
      test('Responds with a message that the server is responding', () => {
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
    test('it should return an array of objects', () => {
        return request(app)
        .get('/api/topics')
        .expect(200)
        .then(({body}) => {
            const {topics} = body
            expect(topics).toBeInstanceOf(Array)
        })
    })
    test('it should return objects with the keys slug and description', () =>{
        return request(app)
        .get('/api/topics')
        .expect(200)
        .then(({body}) => {
            const {topics} = body
            expect(Object.keys(topics[0])).toEqual(["slug", "description"])
    })
})
test('it should return the keys slug and description for each item in the array', () =>{
    return request(app)
    .get('/api/topics')
    .expect(200)
    .then(({body}) => {
        const {topics} = body
        topics.forEach((topic) => {
            expect(Object.keys(topic)).toEqual(["slug", "description"]);
})
})
})
})