const db = require ('../db/connection')

exports.fetchArticles = () => {
    return db.query(`
    SELECT articles.author, articles.title, articles.article_id, articles.topic, articles.created_at, articles.votes, articles.article_img_url, 
    CAST(COUNT(comments.article_id) AS INTEGER) AS comment_count
    FROM articles
    LEFT JOIN comments ON articles.article_id = comments.article_id
    GROUP BY articles.author, articles.title, articles.article_id, articles.topic, articles.created_at, articles.votes, articles.article_img_url
    ORDER BY articles.created_at DESC;
  `).then((result) => {
    return result.rows;
    });
}

exports.fetchArticlesById = (article_id) => {
    return db.query("SELECT * FROM articles WHERE article_id = $1", [article_id])
        .then((result) => {
            if(!result.rows[0]){
                return Promise.reject({msg: 'Article ID not found', status: 404})
        }
        return result.rows[0]
    }) 
}

exports.fetchArticleByIdAndComments = (article_id) => {
    return db.query("SELECT comment_id, votes, created_at, author, body, article_id FROM comments WHERE article_id = $1", [article_id])
        .then((result) => {
            if(!result.rows[0]){
                return Promise.reject({msg: 'Article ID not found', status: 404})
        }
        return result.rows
    }) 
}



