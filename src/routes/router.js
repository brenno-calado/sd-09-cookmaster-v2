const express = require('express');
const UsersController = require('../controllers/UsersController');
const LoginController = require('../controllers/LoginController');
const RecipesController = require('../controllers/RecipesController');
const ImagesController = require('../controllers/ImagesController');

const router = express.Router();

router.use('/users', UsersController);
router.use('/login', LoginController);
router.use('/recipes', RecipesController);
router.use('/images', ImagesController);

module.exports = router;
