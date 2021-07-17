const { ObjectId } = require('mongodb');
const connection = require('./connection');

const create = async (recipe, userId) => {
  const db = await connection();
  const result = await db.collection('recipes').insertOne({ ...recipe, userId });
  return { recipe: result.ops[0] };
};

const findAll = async () => {
  const db = await connection();
  const result = await db.collection('recipes').find().toArray();
  return result;
};

const findById = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  const db = await connection();
  const result = await db.collection('recipes').findOne(new ObjectId(id));
  return result;
};

module.exports = {
  create,
  findAll,
  findById,
};
