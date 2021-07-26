const insertNewUser = require('./insertNewUser');
const insertNewRecipe = require('./insertNewRecipe');
const searchEmail = require('./searchEmail');
const validateNewUser = require('./validateNewUser');
const validateToken = require('./validateToken');
const validateUser = require('./validateUser');
const delById = require('./delById');
const updateById = require('./updateById');

module.exports = {
  insertNewRecipe,
  insertNewUser,
  searchEmail,
  validateNewUser,
  validateToken,
  validateUser,
  delById,
  updateById,
};
