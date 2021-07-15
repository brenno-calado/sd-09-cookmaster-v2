const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const { createUser } = require('../controllers/userController');

app.use(bodyParser.json());

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

app.post('/users', createUser);

module.exports = app;