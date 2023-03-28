const app = require("../db/app");
const { fetchArticles, fetchArticlesById } = require('../Models/fetchArticles.Models.js')

exports.getArticles = (req, res, next) => {
    fetchArticles().then((articles) => res.status(200).send({articles}))
}

exports.getArticleById = (req, res, next) => {
    const { article_id } = req.params;
    fetchArticlesById(article_id)
        .then((articles) => {
            if(!articles){
                res.status(404).send({msg: 'Article ID not found'})
            } else {
                res.status(200).send({articles})
            }
        })
        .catch((err) => {
            next(err)
        })
}
