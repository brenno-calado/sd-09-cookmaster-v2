const express = require('express');
const recipesController = require('../../../controllers/recipesController');
const {
  validateToken,
  validateRecipesFields,
} = require('../../../middlewares');

const router = express.Router();

router.post('/', [
  validateToken,
  validateRecipesFields,
  recipesController.addRecipe,
]);

router.get('/', [recipesController.listRecipes]);
router.get('/:id', [recipesController.getRecipe]);

module.exports = router;
