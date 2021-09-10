const express = require('express');
const errorMiddleware = require('./middlewares/error');
require('dotenv').config();
const users = require('./routes/users');
const recipes = require('./routes/recipes');
const { login } = require('./controllers/users');

const app = express();

app.use(express.json());

app.get('/', (request, response) => {
  response.send();
});

app.use('/images', express.static(`${__dirname}/../uploads/`));

app.use('/users', users);

app.use('/recipes', recipes);

app.post('/login', login);

app.use(errorMiddleware);

module.exports = app;
