const express = require('express');
const recipesService = require('../services/recipesService');
const validateJWT = require('../api/auth/validateJWT');
const validateUser = require('../middlewares/validateUser');

const route = express.Router();

route.post('/recipes', validateJWT, async (req, res, next) => {
  try {
    const response = await recipesService.addRecipe(req.body);
    return res.status(201).json(response);
  } catch (error) {
    return next(error);
  }
});

route.get('/recipes', async (_req, res, next) => {
  try {
    const response = await recipesService.getAllRecipes();
    return res.status(200).json(response);
  } catch (error) {
    return next(error);
  }
});

route.get('/recipes/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const response = await recipesService.getById(id);
    return res.status(200).json(response);
  } catch (error) {
    return next(error);
  }
});

route.put('/recipes/:id', validateJWT, validateUser, async (req, res, next) => {
  try {
    const { id } = req.params;
    const updatedRecipe = await recipesService.updateRecipe(id, req.body);
    return res.status(200).json(updatedRecipe);
  } catch (error) {
    return next(error);
  }
});

module.exports = route;
