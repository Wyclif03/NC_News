
const app = require("../app");
const { fetchArticles, 
    fetchArticlesById,
    fetchArticleByIdAndComments,
    patchModelArticlesVote
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
    if (fetchArticlesById(article_id))
     {
        fetchArticleByIdAndComments(article_id)
            .then((articles) => {
                res.status(200).send({articles})
                
            })
            .catch((err) => {
                next(err)
            })
    }
}

exports.postCommentsbyArticle = (req, res, next) => {
    const { username, body } = req.body;
    const { article_id } = req.params;
fetchArticlesById(article_id)
    .then((article) => {
      if (article) {
        postModelCommentsbyArticle(username, body, article_id)
          .then((comment) => {
            res.status(201).send({ comment });
          })
          .catch((err) => {
            next(err);
          });
      } else {
        res.status(404).send({ error: "Article not found" });
      }
    })
    .catch((err) => {
      next(err);
    });
};

exports.patchArticlesVote = (req, res, next) => {
    const { newVotes } = req.body;
    const { article_id } = req.params;
    patchModelArticlesVote(newVotes, article_id)
      .then((article) => {
        res.status(201).send({ article });
      })
      .catch((err) => {
        next(err);
      });
  };
