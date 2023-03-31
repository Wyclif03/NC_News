const app = require("../app");
const { fetchArticles, 
    fetchArticlesById,
    fetchArticleByIdAndComments,
    checkCommentExists
} = require('../Models/fetchArticles.Models.js')
const { 
    postModelCommentsbyArticle
} = require('../Models/postArticles.Models.js')

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


exports.getArticleByIdAndComments = (req, res, next) => {
    const { article_id } = req.params;
    fetchArticleByIdAndComments(article_id)
        .then((articles) => {
                res.status(200).send({articles})
        })
        .catch((err) => {
            next(err)
        })
}

exports.postCommentsbyArticle = (req, res, next) => {
    const { username, body} = req.body;
    const { article_id } = req.params;

    postModelCommentsbyArticle(username, body, article_id)
        .then((comment) => {
            console.log(comment, "inside controller")
            res.status(201).send({ comment });
        })
        .catch((err) => {
            next(err);
        });
};
