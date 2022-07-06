exports.formatedTopics = (topicData) => topicData.map((topic)=>[topic.slug,topic.description]);

exports.formatedUsers = (userData) => userData.map((user)=>[user.username,user.avatar_url,user.name]);
    
exports.formatedArticles = (articleData) => articleData.map((article)=>[article.title,article.body,article.votes,article.topic,article.author])
    
exports.formatedComments = (commentData) => commentData.map((comment)=> [comment.author , comment.article_id ,comment.votes,comment.body])
   