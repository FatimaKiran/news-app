const db = require('../connection')
const format = require('pg-format');
const { formatedTopics,
   formatedUsers ,
   formatedArticles ,
   formatedComments
  } = require('../../utils.js') ;
const seed = (data) => {
  const { articleData, commentData, topicData, userData } = data;
  return db.query(`DROP TABLE IF EXISTS comments;`)
  .then(() => {
    // drop any existing shops articles
    return db.query(`DROP TABLE IF EXISTS articles`);
  }).then(() => {
    // drop any existing shops users
    return db.query(`DROP TABLE IF EXISTS users`);
  })
  .then(() => {
    // drop any existing shops topics
    return db.query(`DROP TABLE IF EXISTS topics`);
  })
  .then(() => {
    return db.query(`
    CREATE TABLE topics (
     slug TEXT PRIMARY KEY NOT NULL,
     description TEXT NOT NULL
    );`);

  }).then(() => {
    return db.query(`
    CREATE TABLE users (
     username TEXT PRIMARY KEY ,
     avatar_url TEXT NOT NULL,
     name TEXT NOT NULL
    );`);
  }).then(()=>{
    return db.query(`
    CREATE TABLE articles (
      article_id SERIAL PRIMARY KEY,
      title TEXT NOT NULL,
      body TEXT NOT NULL,
      votes INT DEFAULT 0 NOT NULL,
      topic TEXT NOT NULL REFERENCES topics(slug) ,
      author TEXT NOT NULL REFERENCES users(username),
      created_at  TIMESTAMP  DEFAULT CURRENT_TIMESTAMP
     );`);
  }).then(()=>{
    return db.query(`
    CREATE TABLE comments (
    comment_id SERIAL PRIMARY KEY,
    author TEXT REFERENCES users(username) NOT NULL,
    article_id INT  REFERENCES articles(article_id) NOT NULL,
    votes INT DEFAULT 0,
    created_at  TIMESTAMP  DEFAULT CURRENT_TIMESTAMP,
    body TEXT NOT NULL
     );`);
  })
  .then(()=>{
    const formatedTopicsData = formatedTopics(topicData);
    const sql = format(`INSERT INTO topics(slug,description) VALUES %L RETURNING *;`,formatedTopicsData);
    return db.query(sql);
  }).then(()=>{
    const formatedUsersData = formatedUsers(userData);
    const sql = format(`INSERT INTO users(username,avatar_url,name)VALUES %L RETURNING *;`,formatedUsersData);
    return db.query(sql);
  }).then(()=>{
    const formatedArticlesData = formatedArticles(articleData);
   const sql = format(`INSERT INTO articles(title,body,votes,topic,author) VALUES %L RETURNING *;`, formatedArticlesData)
    return db.query(sql);
}).then(()=>{
  const formatedCommentsData = formatedComments(commentData)
  const sql = format(`INSERT INTO comments (author,article_id,votes,body)VALUES %L RETURNING *;`,formatedCommentsData);
  return db.query(sql)
});
};



module.exports = {seed};
// 1. create tables
  // 2. insert data