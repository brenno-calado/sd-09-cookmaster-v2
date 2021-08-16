const router = require('express').Router();
const Users = require('./controllers/users');
const Recipes = require('./controllers/recipes');
const { validateToken } = require('./middlewares/validateToken');

router.post('/users', Users.create);
router.post('/login', Users.login);
router.post('/recipes', validateToken, Recipes.create);
router.get('/recipes', Recipes.getAllRecipes);
router.get('/recipes/:id', Recipes.getById);
router.put('/recipes/:id', validateToken, Recipes.editRecipe);

module.exports = router;