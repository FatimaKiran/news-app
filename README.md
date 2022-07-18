## Background
I am building an API for the purpose of accessing application data programmatically. The intention here is to mimic the building of a real world backend service (such as reddit) which should provide this information to the front end architecture.


##  setup

For clone:
 `git clone https://github.com/FatimaKiran/news-app.git`


.You need to create `.env.test` and `.env.development` files that contains PGDATABASE=nc_news_test & PGDATABASE=nc_news respectively that is for setup your database.
Double check that these `.env` files are .gitignored.



## Install packages

Type the below command to install all pacakges
`npm install`



## Set your database
Run the below command in terminal to set your database
`npm run setup-dbs`

Below commands allow you to populate your database from your CLI (command line interface).

`npm run seed`

## Test

If you want to check that all the test is passing then, type 
`npm test`


If you want to check any specific test'file then type npm test with specific file name. If you want to check app.test.file then type,

`npm test app.test.js`

## Versions

For node v17.3.0 
For postgres 12.9 
version is best