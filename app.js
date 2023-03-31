
const express = require("express");
const app = express();
const {
    PSQLerrors,
    customErrors,
    status500
        } = require ('./Controllers/errorHandling.controller.js')
const getTopics = require('./Controllers/Topics.controller.js')
const { 
    getArticles, 
    getArticleById,
    getArticleByIdAndComments,
     }  = require('./Controllers/Articles.controller.js');
app.use(express.json())
app.get('/api/topics', getTopics)
app.get('/api/articles', getArticles)
app.get('/api/articles/:article_id', getArticleById);
app.get('/api/articles/:article_id/comments', getArticleByIdAndComments)
app.get("/api", (req, res) => {
    res.status(200).send({ message: "Server is working" })
})

app.use('/*', (req, res) => {
    res.status(404).send({message:'Path does not exist'})
})

app.use(PSQLerrors)
app.use(customErrors)
app.use(status500) 


module.exports = app
