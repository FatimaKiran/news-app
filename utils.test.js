const { formatedTopics,
    formatedUsers , 
    formatedArticles ,
     formatedComments
    } = require('./utils') ;

const data = require('./db/data/test-data');
const articles = require('./db/data/test-data/articles');
const { articleData,commentData, topicData,  userData } = data;

describe("Topics",()=>{
    const copiedTopics = topicData.map((topic)=> {
      return  {...topic}
    }) 
    const actual = formatedTopics(topicData);
    const expected = [
        [ 'mitch', 'The man, the Mitch, the legend' ],
        [ 'cats', 'Not dogs' ],
        [ 'paper', 'what books are made of' ]
      ];
  
    test("check by value ",()=>{
     expect(actual).toEqual(expected);
    });

    test("Data is mutated",()=>{
        expect(topicData).toEqual(copiedTopics)
    })
    
});

describe("Users",()=>{
    const copiedUsers = userData.map((user)=>{
        return {...user};
    })
    const actual = formatedUsers(userData);
    const expected =   [
        [
          'butter_bridge',
          'https://www.healthytherapies.com/wp-content/uploads/2016/06/Lime3.jpg',
          'jonny'
        ],
        [
          'icellusedkars',
          'https://avatars2.githubusercontent.com/u/24604688?s=460&v=4',
          'sam'
        ],
        [
          'rogersop',
          'https://avatars2.githubusercontent.com/u/24394918?s=400&v=4',
          'paul'
        ],
        [
          'lurker',
          'https://www.golenbock.com/wp-content/uploads/2015/01/placeholder-user.png',
          'do_nothing'
        ]
      ];
      test("Handle 1st test",()=>{
          expect(actual).toEqual(expected);
      });
      test("Data is mutated",()=>{
        expect(userData).toEqual(copiedUsers);
      });
});

describe("Articles",()=>{
    const actual = formatedArticles(articleData);
    const copiedArticles = articleData.map((article)=>{
        return {...article}
    })
    const expected =   [
        [
          'Living in the shadow of a great man',
          'I find this existence challenging',
          100,
          'mitch',
          'butter_bridge'
        ],
        [
          'Sony Vaio; or, The Laptop',
          'Call me Mitchell. Some years ago—never mind how long precisely—having little or no money in my purse, and nothing particular to interest me on shore, I thought I would buy a laptop about a little and see the codey part of the world. It is a way I have of driving off the spleen and regulating the circulation. Whenever I find myself growing grim about the mouth; whenever it is a damp, drizzly November in my soul; whenever I find myself involuntarily pausing before coffin warehouses, and bringing up the rear of every funeral I meet; and especially whenever my hypos get such an upper hand of me, that it requires a strong moral principle to prevent me from deliberately stepping into the street, and methodically knocking people’s hats off—then, I account it high time to get to coding as soon as I can. This is my substitute for pistol and ball. With a philosophical flourish Cato throws himself upon his sword; I quietly take to the laptop. There is nothing surprising in this. If they but knew it, almost all men in their degree, some time or other, cherish very nearly the same feelings towards the the Vaio with me.',
          0,
          'mitch',
          'icellusedkars'
        ],
        [
          'Eight pug gifs that remind me of mitch',
          'some gifs',
          0,
          'mitch',
          'icellusedkars'
        ],
        [
          'Student SUES Mitch!',
          'We all love Mitch and his wonderful, unique typing style. However, the volume of his typing has ALLEGEDLY burst another students eardrums, and they are now suing for damages',
          0,
          'mitch',
          'rogersop'
        ],
        [
          'UNCOVERED: catspiracy to bring down democracy',
          'Bastet walks amongst us, and the cats are taking arms!',
          0,
          'cats',
          'rogersop'
        ],
        [ 'A', 'Delicious tin of cat food', 0, 'mitch', 'icellusedkars' ],
        [ 'Z', 'I was hungry.', 0, 'mitch', 'icellusedkars' ],
        [
          'Does Mitch predate civilisation?',
          'Archaeologists have uncovered a gigantic statue from the dawn of humanity, and it has an uncanny resemblance to Mitch. Surely I am not the only person who can see this?!',
          0,
          'mitch',
          'icellusedkars'
        ],
        [
          "They're not exactly dogs, are they?",
          'Well? Think about it.',
          0,
          'mitch',
          'butter_bridge'
        ],
        [
          'Seven inspirational thought leaders from Manchester UK',
          "Who are we kidding, there is only one, and it's Mitch!",
          0,
          'mitch',
          'rogersop'
        ],
        [
          'Am I a cat?',
          'Having run out of ideas for articles, I am staring at the wall blankly, like a cat. Does this make me a cat?',
          0,
          'mitch',
          'icellusedkars'
        ],
        [
          'Moustache',
          'Have you seen the size of that thing?',
          0,
          'mitch',
          'butter_bridge'
        ]
      ];
      test("Handle 1st",()=>{
          expect(actual).toEqual(expected)
      });
      test("Data is mutated",()=>{
        expect(articleData).toEqual(copiedArticles);
      });

});

describe("Comments",()=>{
    const actual = formatedComments(commentData);
    const copiedComment = commentData.map((comment)=>{
        return {...comment}
    })
    const expected =  [
        [
          'butter_bridge',
          9,
          16,
          "Oh, I've got compassion running out of my nose, pal! I'm the Sultan of Sentiment!"
        ],
        [
          'butter_bridge',
          1,
          14,
          'The beautiful thing about treasure is that it exists. Got to find out what kind of sheets these are; not cotton, not rayon, silky.'
        ],
        [
          'icellusedkars',
          1,
          100,
          'Replacing the quiet elegance of the dark suit and tie with the casual indifference of these muted earth tones is a form of fashion suicide, but, uh, call me crazy — onyou it works.'
        ],
        [
          'icellusedkars',
          1,
          -100,
          ' I carry a log — yes. Is it funny to you? It is not to me.'
        ],
        [ 'icellusedkars', 1, 0, 'I hate streaming noses' ],
        [ 'icellusedkars', 1, 0, 'I hate streaming eyes even more' ],
        [ 'icellusedkars', 1, 0, 'Lobster pot' ],
        [ 'icellusedkars', 1, 0, 'Delicious crackerbreads' ],
        [ 'icellusedkars', 1, 0, 'Superficially charming' ],
        [ 'icellusedkars', 3, 0, 'git push origin master' ],
        [ 'icellusedkars', 3, 0, 'Ambidextrous marsupial' ],
        [ 'icellusedkars', 1, 0, 'Massive intercranial brain haemorrhage' ],
        [ 'icellusedkars', 1, 0, 'Fruit pastilles' ],
        [
          'icellusedkars',
          5,
          16,
          'What do you see? I have no idea where this will lead us. This place I speak of, is known as the Black Lodge.'
        ],
        [
          'butter_bridge',
          5,
          1,
          "I am 100% sure that we're not completely sure."
        ],
        [ 'butter_bridge', 6, 1, 'This is a bad article name' ],
        [ 'icellusedkars', 9, 20, 'The owls are not what they seem.' ],
        [
          'butter_bridge',
          1,
          16,
          'This morning, I showered for nine minutes.'
        ]
      ] ;
      test("1st case",()=>{
          expect(actual).toEqual(expected)
      });
      test("Data is mutated",()=>{
        expect(commentData).toEqual(copiedComment);
      });
})