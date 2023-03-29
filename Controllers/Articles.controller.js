const app = require("../app");
const { fetchArticles, fetchArticlesById } = require('../Models/fetchArticles.Models.js')

exports.getArticles = (req, res, next) => {
    fetchArticles().then((articles) => res.status(200).send({articles}))
}

exports.getArticleById = (req, res, next) => {
    const { article_id } = req.params;
    fetchArticlesById(article_id)
        .then((articles) => {
                res.status(200).send({articles})
        })
        .catch((err) => {
            next(err)
        })
}
