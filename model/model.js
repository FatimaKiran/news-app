const db = require('../../news-app/db/connection');
const articles = require('../../news-app/db/data/test-data/articles');

exports.fetchTopics = () =>{
    return db.query(`SELECT * FROM topics;`).then((topics)=>{
    
        return topics.rows;
    });
}


exports.fetchArticleById = (id) =>{
    return db.query(`SELECT articles.*,COUNT(comments.article_id)
    AS comment_count 
    FROM articles 
    LEFT JOIN comments 
    ON comments.article_id = articles.article_id
    WHERE articles.article_id = $1
    GROUP BY articles.article_id
    ;`,[id]).then((articles)=>{
        return articles.rows;
    });
}

exports.updateArticleById = (id , {inc_votes = 0}) =>{
    return db.query(`UPDATE articles
    SET votes = votes + $1
    WHERE article_id = $2
    RETURNING * ;`,[inc_votes,id])
    .then((res)=>{

       return  res.rows[0]
    })


   
}

exports.fetchArticles = (sort_by="created_at",order="desc") =>{
    const allowedSorts = ["author","title","article_id","topic","created_at","votes","comment_count"];
    const allowedOrder = ["asc","desc"];
    
    if(!allowedSorts.includes(sort_by) ||   !allowedOrder.includes(order)){
      return Promise.reject ({ status: 400, msg :"Bad Request" })
    }
    return db.query(`SELECT articles.article_id,articles.title,articles.topic,articles.author,articles.created_at,articles.votes,COUNT(comments.article_id)
    AS comment_count 
    FROM articles 
    LEFT JOIN comments
    ON comments.article_id = articles.article_id
    GROUP BY articles.article_id
    ORDER BY ${sort_by} ${order};`)
    .then((res)=>{
        return res.rows;
    })
}


exports.fetchCommentsByArticleId = (id)=>{
    return db .query(`SELECT comment_id,votes,created_at,author,body FROM comments 
    WHERE article_id = $1;`,[id]).then((res)=>{
        return res.rows;
    })
}

exports.insertCommentByArticleId = (comment,id) => {
  const {author, body} = comment;
  return db.query(`INSERT INTO comments (author , body,article_id)
  VALUES ($1,$2,$3) RETURNING *;`,
[author,body , id] ).then((res)=>{
   return res.rows[0];
  })
}
    
exports.removeCommentBYId = (id) =>{
   return db.query(`DELETE FROM comments WHERE comment_id = $1;`,[id])
}
    
exports.fetchUsers = () =>{
    return db.query(`SELECT username FROM users;`)
    .then((res)=>{
        return res.rows;
    })
}
exports.fetchUserByUsername = (username) =>{
    return db.query(`SELECT * FROM users WHERE username = $1
    ;`,[username]).then((res)=>{
        return res.rows[0];
    })
}

exports.updatedCommentById = (inc_votes,id) =>{
    return db.query(`UPDATE comments SET 
    votes = votes + $1
    WHERE comment_id = $2 RETURNING *;` , [inc_votes,id]).then((res)=>{
        return res.rows;
    })
}

exports.insertArticles = (postedObj) =>{
    const { author,title,body,topic } = postedObj;
    return db.query(`INSERT INTO articles (author,title,body,topic)
    VALUES($1,$2,$3,$4) RETURNING *;`,[author,title,body,topic])
    .then((res)=>{
        return res.rows
    })
} 