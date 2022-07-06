const express = require('express');
const app = express();
const apiRouter = require('./routers/router')
// const endpoints = require('../be-nc-news/endpoints.json');
const endpoints = require('./endpoints.json');

const { getTopics , getArticleById , patchArticleById
     , getArticles ,  getCommentsByArticleId , postCommentsByArticleId,
     deleteCommentBYId , getUsers , getUserByUsername , postArticles
    ,  patchCommentByCommentId} = require('./controller/controller');


app.use(express.json());
app.use("/api", apiRouter);



app.get('/api/topics',getTopics);
app.get('/api/articles/:article_id',getArticleById);
app.get('/api/articles',getArticles);

app.get('/api/articles/:article_id/comments', getCommentsByArticleId);
app.patch('/api/articles/:article_id',patchArticleById);
app.post('/api/articles/:article_id/comments',postCommentsByArticleId);

app.delete('/api/comments/:comment_id',deleteCommentBYId);
app.get('/api/users',getUsers);
app.get('/api/users/:username', getUserByUsername)

app.patch("/api/comments/:comment_id", patchCommentByCommentId)
app.post("/api/articles",postArticles);
app.get("/api",(req,res,next)=>{
    res.send(endpoints);
})


app.all("*",(req,res)=>{
    res.status(404).send({msg:"not found"})
})



app.use((err,req,res,next)=>{
if(err.code === '22P02'){
    res.status(400).send({"msg": "bad request"})
}else if(err.status === 404){
    res.status(404).send({msg: "not found"});
}
next(err)
});

app.use((err,req,res,next)=>{
    if(err.status === 400)  res.status(400).send({"msg": "bad request"})
    next(err);
 });
    

module.exports = app;

