const express = require("express");
const app = express();
app.use(express.json());
const getTopics = require('../Controllers/getTopics.controller.js')
;

app.get('/api/topics', getTopics)

app.get("/api", (req, res) => {
    res.status(200).send({ message: "Server is working" })
})

app.use('/*', (req, res) => {
    res.status(404).send({message:'Path does not exist'})
})

module.exports = app


