const express = require('express');
const controller = require('../controllers/users');

const users = express.Router();

users.post('/', controller.create);

module.exports = users;