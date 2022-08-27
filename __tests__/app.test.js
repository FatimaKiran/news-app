const db = require('../db/connection.js');
const testData = require('../db/data/test-data/index.js');
// const { seed } = require('../db/seeds/seed.js');
const { seed } = require('../db/seeds/seed.js')

// const app = require('../../be-nc-news/app')
const app = require('../app.js')
const request = require('supertest');
const { TestWatcher } = require('jest');
require("jest-sorted");
beforeEach(() => seed(testData));
afterAll(() => db.end());



describe("/api/topics", () => {
    describe("GET", () => {
      test("200 code and responds with an array of topics", () => {
        return request(app)
          .get("/api/topics")
          .expect(200)
          .then(( res ) => {
           const  topics  =  res.body;
            expect(topics).toBeInstanceOf(Array);
            expect(topics).toHaveLength(3);
            topics.forEach((topic) => {
              expect(topic).toEqual(
                expect.objectContaining({
                  slug: expect.any(String),
                  description: expect.any(String),
                })
              );
            });
          });
      });

    test("status 404, responds with not found msg",()=>{
      return request(app)
      .get('/api/topic')
      .expect(404)
      .then((res)=>{
        expect(res.body.msg).toBe("not found");

      });
 });
  });
    });


describe('/api/articles/:article_id',()=>{
    describe("GET",()=>{
        test("responds with 200 status and array of article",()=>{
            return request(app)
            .get("/api/articles/1")
            .expect(200)
            .then((res)=>{
              const body = res.body;
              const article =  body[0];
              expect(article).toEqual( {
                comment_count : "11",
                article_id: 1,
                title: 'Living in the shadow of a great man',
                topic: 'mitch',
                author: 'butter_bridge',
                body: 'I find this existence challenging',
                created_at: expect.any(String),
                votes: 100
              })              
            })
        });

        test("responds with 200 status and array of article",()=>{
          return request(app)
          .get("/api/articles/2")
          .expect(200)
          .then((res)=>{
            const body = res.body;
            const article =  body[0];
            expect(article).toEqual( {
              article_id : 2,
               comment_count : "0",
                title: 'Sony Vaio; or, The Laptop',
                topic: 'mitch',
                author: 'icellusedkars',
                body: 'Call me Mitchell. Some years ago—never mind how long precisely—having little or no money in my purse, and nothing particular to interest me on shore, I thought I would buy a laptop about a little and see the codey part of the world. It is a way I have of driving off the spleen and regulating the circulation. Whenever I find myself growing grim about the mouth; whenever it is a damp, drizzly November in my soul; whenever I find myself involuntarily pausing before coffin warehouses, and bringing up the rear of every funeral I meet; and especially whenever my hypos get such an upper hand of me, that it requires a strong moral principle to prevent me from deliberately stepping into the street, and methodically knocking people’s hats off—then, I account it high time to get to coding as soon as I can. This is my substitute for pistol and ball. With a philosophical flourish Cato throws himself upon his sword; I quietly take to the laptop. There is nothing surprising in this. If they but knew it, almost all men in their degree, some time or other, cherish very nearly the same feelings towards the the Vaio with me.',
                created_at: expect.any(String),
                votes: 0
            })              
          })
      });

        test("reposnd with 400 and message of bad request ",()=>{
          return request(app)
          .get("/api/articles/a")
          .expect(400)
          .then((res)=>{
            expect(res.body.msg).toBe("bad request")
          })
        })

        test("reposnd with 400 and message of bad request ",()=>{
          return request(app)
          .get("/api/articles/banana")
          .expect(400)
          .then((res)=>{
            expect(res.body.msg).toBe("bad request")
          })
        })

        test("reposnd with 404 and message of not found ",()=>{
          return request(app)
          .get("/api/articles/111111")
          .expect(404)
          .then((res)=>{
            expect(res.body.msg).toBe("not found")
          })
        })
    })
})

//Patch task is going to increase the votes by inc_votes like
// if votes is 2 and inc_votes is 1 then
// return object will be response by votes : 3;


describe("/api/articles/:article_id",()=>{
  describe("Patch",()=>{
    test("status :200, responds wit updated object",()=>{
      const updatedVotes = {
        inc_votes: 2,
      };
      return request(app)
      .patch('/api/articles/1')
      .send(updatedVotes)
      .expect(200)
      .then((res)=>{
        expect(res.body.article).toEqual({
          article_id: 1,
      title: 'Living in the shadow of a great man',
      body: 'I find this existence challenging',
      votes: 102,
      topic: 'mitch',
      author: 'butter_bridge',
      created_at: expect.any(String)
        })
      })
    });

    test("status :200, responds wit updated object",()=>{
      const updatedVotes = {
        inc_votes: -100,
      };
      return request(app)
      .patch('/api/articles/1')
      .send(updatedVotes)
      .expect(200)
      .then((res)=>{
        expect(res.body.article).toEqual({
          article_id: 1,
      title: 'Living in the shadow of a great man',
      body: 'I find this existence challenging',
      votes: 0,
      topic: 'mitch',
      author: 'butter_bridge',
      created_at: expect.any(String)
        })
      })
    });

    test("status: 400,responds with bad request msg",()=>{
      const updatedVotes = {
        inc_votes: 1,
      };
      return request(app)
      .patch('/api/articles/a')
      .send(updatedVotes)
      .expect(400)
      .then((res)=>{
        expect(res.body.msg).toBe("bad request")
      })
    });


    test("status: 400,responds with bad request msg",()=>{
      const updatedVotes = {
        inc_votes: "abc",
      };
      return request(app)
      .patch('/api/articles/a')
      .send(updatedVotes)
      .expect(400)
      .then((res)=>{
        expect(res.body.msg).toBe("bad request")
      })
    });

    test("status:200, votes do not change when not passed an inc_votes value",()=>{
      const updatedVotes = {};
      return request(app)
      .patch('/api/articles/1')
      .send(updatedVotes)
      .expect(200)
      .then((res)=>{
        expect(res.body.article.votes).toBe(100)
      })
    });




    test("status: 404,responds with bad request msg",()=>{
      const updatedVotes = {
        inc_votes: 1,
      };
      return request(app)
      .patch('/api/articles/123456789')
      .send(updatedVotes)
      .expect(404)
      .then((res)=>{
        expect(res.body.msg).toBe("not found")
      })
    });
  });
});


describe("/api/articles",()=>{
  describe("GET",()=>{
    test("status: 200, responds with array of article objects default sorted_by created_at",()=>{
      return request(app)
      .get('/api/articles')
      .expect(200)
      .then((res)=>{
        const {articles} = res.body;
        expect(articles).toBeInstanceOf(Array);
        expect(articles).toHaveLength(12);
        expect(articles).toBeSortedBy("created_at");
        articles.forEach((article)=>{
        expect(article).toEqual({
          article_id: expect.any(Number),
          title: expect.any(String),
          votes: expect.any(Number),
          topic: expect.any(String),
          author: expect.any(String),
          created_at: expect.any(String),
          comment_count: expect.any(String) 
        })
      })
      })
    });

    test('stats: 200, responds with array of objects sorted_by topic',()=>{
      return request(app)
      .get("/api/articles?sort_by=topic")
      .expect(200)
      .then((res)=>{
        expect(res.body.articles).toBeSortedBy("topic",{
          ascending : true,
          coerce: true
        })
      })
    });


    test('stats: 200, responds with array of objects sorted_by topic',()=>{
      return request(app)
      .get("/api/articles?order=desc")
      .expect(200)
      .then((res)=>{
        expect(res.body.articles).toBeSorted({ descending: true });
      })
    });



    test("status: 400, responds with msg of bad request",()=>{
      return request(app)
      .get('/api/articles?sort_by=world')
      .expect(400)
      .then((res)=>{
        expect(res.body.msg).toBe("bad request")
      })
    });

    test("status: 400, responds with msg of bad request",()=>{
      return request(app)
      .get('/api/articles?order=world')
      .expect(400)
      .then((res)=>{
        expect(res.body.msg).toBe("bad request")
      })
    });



    test("status: 404, responds with msg of not found",()=>{
      return request(app)
      .get('/api/article?sort_by=topic')
      .expect(404)
      .then((res)=>{
        expect(res.body.msg).toBe("not found")
      })
    });

  })
});

describe("/api/articles/:article_id/comments",()=>{
  describe("GET",()=>{

    test("status: 200, responds with array of comments for given id",()=>{
      return request(app)
      .get('/api/articles/1/comments')
      .expect(200)
      .then((res)=>{
        const {comments} = res.body;
        expect(comments).toBeInstanceOf(Array);
        expect(comments).toHaveLength(11);
        comments.forEach((comment)=>{
          expect(comment).toEqual({
          comment_id: expect.any(Number),
          votes: expect.any(Number),
          created_at: expect.any(String),
          author: expect.any(String),
          body: expect.any(String)
          })
        })
      })
    });

    test("status: 400, responds with msg of bad request",()=>{
      return request(app)
      .get('/api/articles/a/comments')
      .expect(400)
      .then((res)=>{
      expect(res.body.msg).toBe("bad request")
      })
    });

    test("status: 404, responds with msg of not found",()=>{
      return request(app)
      .get('/api/articles/12345/comments')
      .expect(404)
      .then((res)=>{
      expect(res.body.msg).toBe("not found")
      })
    });


  });

  /// do error handling
  describe("POST",()=>{
    test("status: 201, responds with posted object",()=>{
      const updatedObj = {author: "butter_bridge",body:"This world is beautiful"}
      return request(app)
      .post("/api/articles/5/comments")
      .send(updatedObj)
      .expect(201)
      .then((res)=>{
        const comment = res.body;
        expect(comment).toEqual( {
          comment_id: 19,
          author: 'butter_bridge',
          article_id: 5,
          votes: 0,
          created_at: expect.any(String),
          body: 'This world is beautiful'
        }
      )
      }).then(()=>{
        return db.query("SELECT * FROM comments WHERE comment_id = 19")
      }).then((res)=>{
        expect(res.rows.length).toBe(1);
      })
    })

    test("status: 201, responds with posted object",()=>{
      const updatedObj = {author: "butter_bridge",body:"Hello World"};
      return request(app)
      .post("/api/articles/2/comments")
      .send(updatedObj)
      .expect(201)
      .then((res)=>{
        const comment = res.body;
        expect(comment).toEqual( {
          comment_id: 19,
          author: 'butter_bridge',
          article_id: 2,
          votes: 0,
          created_at:expect.any(String),
          body: 'Hello World'
        })
      })
    });


  

  

    test("status: 400, responds with bad request",()=>{
      const updatedObj = {author: "butter_bridge",body:"This world is beautiful"};
      return request(app)
      .post("/api/articles/adb/comments")
      .send(updatedObj)
      .expect(400)
      .then((res)=>{
        const {msg} = res.body;
        expect(msg).toBe("bad request");
      })
    });

  })
});



describe("/api/comments/:comment_id",()=>{
  describe("DELETE",()=>{
    test("status: 204",()=>{
      return request(app)
      .delete('/api/comments/1')
      .expect(204)
    });

    test("status: 404, responds with not found msg",()=>{
      return request(app)
      .delete('/api/comments/1111111')
      .expect(404)
      .then((res)=>{
        const {msg} = res.body;
        expect(msg).toBe("not found")
      })
    });
    test("status: 400, responds with bad request",()=>{
      return request(app)
      .delete('/api/comments/q')
      .expect(400)
      .then((res)=>{
        const {msg} = res.body;
        expect(msg).toBe("bad request")
      })
    });
  })
})


describe("/api",()=>{
  describe("GET",()=>{
    test("status: 200,responds with json",()=>{
      return request(app)
      .get("/api")
      .expect(200)
    })
  })
})

// describe(("My server "),()=>{
//     test("our server ",()=>{
        
//     })
// })

describe("/api/users", () => {
  describe("GET", () => {

    test("status: 200, responds with an array of users", () => {
      return request(app)
        .get("/api/users")
        .expect(200)
        .then(({ body }) => {
         const { users } =  body;
          expect(users).toBeInstanceOf(Array);
          expect(users).toHaveLength(4);
        });
    });

    test("status: 200, responds with an array of users", () => {
      return request(app)
        .get("/api/user")
        .expect(404)
        .then(({ body }) => {
          const { msg } = body;
          expect(msg).toBe("not found")
        });
    });
  })
});

describe("/api/users/:username",()=>{
describe("GET",()=>{
  test("status: 200, responds with array of user",()=>{
    return request(app)
    .get('/api/users/icellusedkars')
    .expect(200)
    .then((res)=>{
      const { user } = res.body;
      // console.log(user);
      expect(user).toEqual( {
        username: 'icellusedkars',
        name: 'sam',
        avatar_url: 'https://avatars2.githubusercontent.com/u/24604688?s=460&v=4'
      })
    })
  });

  test("status: 200, responds with array of user",()=>{
    return request(app)
    .get('/api/users/rogersop')
    .expect(200)
    .then((res)=>{
      const { user } = res.body;
      expect(user).toEqual(  {
        username: 'rogersop',
        name: 'paul',
        avatar_url: 'https://avatars2.githubusercontent.com/u/24394918?s=400&v=4'
      })
    })
  });


  test("status: 404, responds with msg of not found",()=>{
    return request(app)
    .get("/api/users/chipie")
    .expect(404)
    .then((res)=>{
      expect(res.body.msg).toBe("not found");
    })
  });

 
})
})

describe("PATCH",()=>{
describe("/api/comments/:comment_id",()=>{
  test("status: 200, responds with array of updated object",()=>{
    const updated = {inc_votes: 1 }
    return request(app)
    .patch("/api/comments/1")
    .send(updated)
    .expect(200)
    .then((res)=>{
      const { comment } = res.body;
      expect(comment[0]).toEqual( {

        comment_id: 1,
        author: 'butter_bridge',
        article_id: 9,
        votes: 17,
        created_at:  expect.any(String),
        body: "Oh, I've got compassion running out of my nose, pal! I'm the Sultan of Sentiment!"
      })
    })
  });

  test("status: 200, responds with array of updated object",()=>{
    const updated = {inc_votes: -1 }
    return request(app)
    .patch("/api/comments/2")
    .send(updated)
    .expect(200)
    .then((res)=>{
      const {comment} = res.body;
      expect(comment[0]).toEqual({
        comment_id: 2,
        author: 'butter_bridge',
        article_id: 1,
        votes: 13,
        created_at: expect.any(String),
        body: 'The beautiful thing about treasure is that it exists. Got to find out what kind of sheets these are; not cotton, not rayon, silky.'
      })

    })
  });

})
})

