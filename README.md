[npm-image]: https://badge.fury.io/js/id-90-api.svg
[npm-url]: https://npmjs.org/package/id-90-api
[travis-image]: https://travis-ci.org/nijat12/id-90-api.svg?branch=master
[travis-url]: https://travis-ci.org/nijat12/id-90-api
[daviddm-image]: https://david-dm.org/nijat12/id-90-api.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/nijat12/id-90-api
[coveralls-image]: https://coveralls.io/repos/nijat12/id-90-api/badge.svg
[coveralls-url]: https://coveralls.io/r/nijat12/id-90-api



# App and Api for id90 Task App

This repo contains both the ionic app and NodeJS backend to run this app

## Getting Started

The Ionic app is under app/ directory
The NodeJS application is under server/ directory
The backend uses MySQL database to store the information

### Prerequisites

What things you need to install the software and how to install them

```
npm
ionic
ionic-cli
mysql
Google Chrome CORS Plugin
```

### Running the Front-End

To run the ionic app on a browser navigate to app/ folder and run

```
npm install
ionic serve
```

This should install the necessary libraries for you to serve the app on a browser. You will need a CORS plugin fro Chrome since ionic serve uses http but the backend is on https.

### Set Up the Database

You need to create a database for the Back-end to connect to.
Define the tables as follows
Tasks
```
name varchar(1000)
description varchar(1000)
dueDate TIMESTAMP
sort INT(10)
importance varchar(255)
taskId int NOT NULL AUTO_INCREMENT
updatedAt TIMESTAMP NOT NULL DEFAULT NOW() ON UPDATE NOW()
createdAt TIMESTAMP NOT NULL
cardId int
PRIMARY KEY(taskId)
```

Tasks
```
name varchar(1000)
description varchar(1000)
dueDate TIMESTAMP
sort INT(10)
importance varchar(255)
taskId int NOT NULL AUTO_INCREMENT
updatedAt TIMESTAMP NOT NULL DEFAULT NOW() ON UPDATE NOW()
createdAt TIMESTAMP NOT NULL
cardId int
PRIMARY KEY(taskId)
```

Cards
```
name varchar(255)
sort INT(10)
cardId int NOT NULL AUTO_INCREMENT;
updatedAt TIMESTAMP NOT NULL DEFAULT NOW() ON UPDATE NOW();
PRIMARY KEY(cardId);
```

### Running the Back-End

Go to the server/ directory and run. Make sure you have a MySQL database up and running with tasks and cards table
```
npm install
npm start
```

### Deployed instances
Back-end application has been deployed to Heroku to make testing the front end application easier.
Endpoint is located inside:
```
app/src/app/resources/endPoints.ts
```
There are also commented endpoints pointing to Apiary amd localhost that I have used for local development

MySQL database connection is defined inside:
```
server/config/mysql-dev.js
```
It is pointing to ClearDB instance in Heroku with some sample data.
You can run
```
ionic serve
```
Inside app/ directory and it will pull the data from Heroku.