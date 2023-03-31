const db = require ('../db/connection')

exports.postModelCommentsbyArticle = (username, body, article_id) => {

    return db.query(
        `INSERT INTO comments (author, body, article_id)
        VALUES ($1, $2, $3)
        RETURNING *;`,
        [username, body, article_id]
    ).then((comments) => {
        return comments.rows[0].body;
    });
}
