const { fetchTopics, fetchArticleById,
      updateArticleById, fetchArticles,
    fetchCommentsByArticleId, updatedCommentById,
    insertCommentByArticleId, insertArticles,
    removeCommentBYId, fetchUsers, fetchUserByUsername
    } = require('../model/model.js');
    // } = require('../../be-nc-news/model/model');

exports.getTopics = (req,res) =>{
    fetchTopics().then((topics)=>{
    res.status(200).send( topics )
    });
}

exports.getArticleById = (req,res,next) =>{
    const { article_id } = req.params;
    fetchArticleById(article_id).then((article)=>{
        if(article.length !== 0) res.status(200).send(article); 
        else return Promise.reject({status: 404, msg:"not found"})   
    }).catch((err)=>{
        next(err);
    })
}

exports.patchArticleById = (req,res,next) =>{
    const inc_votes = req.body.inc_votes;
    const {article_id} = req.params;
    updateArticleById(article_id , inc_votes).then((article)=>{
        if (article)  res.status(200).send({article}) 
        else   return Promise.reject({status: 404, msg:"not found"})
    }).catch((err)=>{
        next(err)
    })
}

exports.getArticles = (req,res,next) =>{
    const {sort_by} = req.query;
    const {order} = req.query;
    fetchArticles(sort_by, order).then((articles)=>{
        res.status(200).send({ articles })
    }).catch((err)=>{
        next(err)
    })
}


exports.getCommentsByArticleId = (req,res,next)=>{
    const {article_id} = req.params;
    fetchCommentsByArticleId(article_id).then((comments)=>{
   if(comments.length !== 0)   res.status(200).send({comments})  
   else return Promise.reject({status: 404, msg: "not found" })
    }).catch((err)=>{
      next(err)
    });
}

exports.postCommentsByArticleId = (req,res,next)=>{
    const postedComment = req.body;
    const {article_id} = req.params;
    insertCommentByArticleId(postedComment,article_id).then((comment)=>{
        if(comment) res.status(201).send(comment ); 
        else    return Promise.reject({   status: 404,   msg: "not found"  })
      }).catch((err)=>{
        next(err);
    })
}

exports.deleteCommentBYId = (req,res,next) =>{
    const { comment_id } = req.params;
    removeCommentBYId(comment_id).then((response)=>{
       const {rowCount} = response;
       if(rowCount) res.status(204).end();
       else  return Promise.reject({   status:404,  msg:"not found" })
    }).catch((err)=>{
        next(err)
    })
}

exports.getUsers = (req , res ,next) =>{
    fetchUsers().then((users)=>{
        res.status(200).send({ users })
    })
}

exports.getUserByUsername = (req,res,next)=>{
    const { username } = req.params;
    fetchUserByUsername(username).then((user)=>{
        if (user) res.status(200).send({ user })
        else return Promise.reject({   status: 404, msg:"not found" })
    }).catch((err)=>{
        next(err)
    })
}



exports.patchCommentByCommentId = (req ,res, next) =>{
    const {comment_id} = req.params;
    const {inc_votes} = req.body
    updatedCommentById(inc_votes,comment_id).then((comment)=>{
        res.status(200).send({comment})
    })
}

exports.postArticles = (req, res, next) =>{
    const {body} = req;
    insertArticles(body)
}