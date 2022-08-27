### Background
I am building an API for the purpose of accessing application data programmatically. The intention here is to mimic the building of a real world backend service (such as reddit) which should provide this information to the front end architecture.
It was designed using the MVC framework, built using TDD and deployed to Heroku.

### Hosted version 
    https://fatima-news-app.herokuapp.com/api


## Requirements

  Node v16+
  NPM v8+
  postgreSQL v12+
  OPTIONAL: Jest (for testing)

## Running the App

If you would like to host and run the app locally:


  1: Clone the repo by first navigating to the desired folder within a terminal, then entering:
       git clone https://github.com/FatimaKiran/news-app.git
  
  2: Install the dependencies for the app by navigating to the root directory of the cloned repo and entering:
       npm i
       
  3: Create two .env files      
       You need to create `.env.test` and `.env.development` files that contains PGDATABASE=nc_news_test & PGDATABASE=nc_news respectively that is for                 setup your database.
       Double check that these `.env` files are .gitignored.
       
       
  4: Create and seed the databases by entering:
       npm run setup-dbs
       npm run seed
       
       
  OPTIONAL: Check that everything is setup correctly by entering:
       npm t





