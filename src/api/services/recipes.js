const Joi = require('joi');
const { Recipe } = require('../models');
const { InvalidArgumentError, NotFoundError } = require('../errors');

const RecipeSchema = Joi.object({
  name: Joi.string().required(),
  ingredients: Joi.string().required(),
  preparation: Joi.string().required(),
  id: Joi.string(),
});

module.exports = {
  async create(payload, userId) {
    const { error } = RecipeSchema.validate(payload);

    if (error) throw new InvalidArgumentError('Invalid entries. Try again.');

    const recipe = new Recipe(payload);
    const response = await recipe.create(userId);

    return { recipe: response };
  },
  async getAll() {
    const recipe = new Recipe({});
    const response = await recipe.getAll();

    return response;
  },
  async getById(id) {
    const recipe = new Recipe({ id });
    const response = await recipe.getById();

    if (!response || !Object.keys(response).length) {
      throw new NotFoundError('recipe');
    }

    return response;
  },
  async update(payload) {
    const { error } = RecipeSchema.validate(payload);

    if (error) throw new InvalidArgumentError('Invalid entries. Try again again');

    const recipe = new Recipe(payload);
    const response = await recipe.update();

    if (!response) {
      throw new InvalidArgumentError('Invalid entries. Try again again');
    } else if (!Object.keys(response).length) {
      throw new NotFoundError('recipe');
    }

    return response;
  },
  async remove(id) {
    const recipe = new Recipe({ id });
    const response = await recipe.remove();

    if (!response) {
      throw new InvalidArgumentError('Invalid entries. Try again again');
    } else if (!Object.keys(response).length) {
      throw new NotFoundError('recipe');
    }
  },
};