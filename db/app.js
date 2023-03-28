const express = require("express");
const app = express();
app.use(express.json());

const getTopics = require('../Controllers/Topics.controller.js')
const { getArticles, getArticleById }  = require('../Controllers/Articles.controller.js')

app.get('/api/topics', getTopics)
app.get('/api/articles', getArticles)
app.get('/api/articles/:article_id', getArticleById);
app.get("/api", (req, res) => {
    res.status(200).send({ message: "Server is working" })
})

app.use('/*', (req, res) => {
    res.status(404).send({message:'Path does not exist'})
})

app.use(PSQLerrors = (err, req, res, next) => {
    if (err.code === '22P02') {
        res.status(400).send({msg: 'Incorrect ID format'})
    } else {
        next(err);
    }
})

module.exports = app
