const express = require('express');
const UsersController = require('../controllers/UsersController');
const RecipesController = require('../controllers/RecipesController');
const validateToken = require('../middlewares/validateToken');

const router = express.Router();

router.post('/users', UsersController.addNewUser);
router.post('/login', UsersController.userLogin);
router.post('/recipes', validateToken, RecipesController.addNewRecipe);
router.get('/recipes', RecipesController.listRecipe);
router.get('/recipes/:id', RecipesController.listRecipe);
router.put('/recipes/:id', validateToken, RecipesController.updateRecipe);
router.delete('/recipes/:id', validateToken, RecipesController.deleteRecipe);

module.exports = router;