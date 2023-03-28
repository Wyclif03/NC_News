const db = require ('../db/connection')

exports.fetchArticles = () => {
    return db.query("SELECT * FROM articles;").then((result) => {
        return result.rows;
    });
}

exports.fetchArticlesById = (article_id) => {
    return db.query("SELECT * FROM articles WHERE article_id = $1", [article_id])
        .then((result) => result.rows[0]);
}
