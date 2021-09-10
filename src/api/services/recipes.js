const fs = require('fs').promises;
const Joi = require('joi');
const { ObjectId } = require('mongodb');
const path = require('path');
const model = require('../models/recipes');

const recipeSchema = Joi.object({
  name: Joi.string().not().empty().required(),
  ingredients: Joi.string().required(),
  preparation: Joi.string().not().empty().required(),
  userId: Joi.object().not().empty().required(),
});

const updateRecipeSchema = Joi.object({
  name: Joi.string().not().empty().required(),
  ingredients: Joi.string().required(),
  preparation: Joi.string().not().empty().required(),
});

const create = async (recipe) => {
  const { error } = recipeSchema.validate(recipe);
  if (error) return { err: { code: 'invalid_data', message: 'Invalid entries. Try again.' } };
  const { insertedId } = await model.create(recipe);
  return insertedId;
};

const find = async (query) => {
  const Recipes = await model.find(query);
  return Recipes;
};

const findOne = async (id) => {
  if (!ObjectId.isValid(id)) return { err: { code: 'not_found', message: 'recipe not found' } };
  const [Recipe] = await model.findOne(new ObjectId(id));
  return Recipe;
};

const updateOne = async (id, recipe) => {
  const { error } = updateRecipeSchema.validate(recipe);
  if (error) return { err: { code: 'invalid_data', message: 'Invalid entries. Try again.' } };
  return model.updateOne(id, recipe);
};

const deleteOne = async (id) => model.deleteOne(id);

const upload = async ({ buffer, mimetype }, id, host) => {
  if (mimetype === 'image/jpeg') {
    const FILE_PATH = path.join(__dirname, '..', '..', 'uploads', `${id}.jpeg`);
    await fs.writeFile(FILE_PATH, buffer);
    const imagePath = path.join(host, 'src', 'uploads', `${id}.jpeg`);
    await model.upload(new ObjectId(id), imagePath);
    return imagePath;
  }
  return { err: { code: 'forbidden', message: 'extension must be jpg' } };
};

module.exports = { create, find, findOne, updateOne, deleteOne, upload };
