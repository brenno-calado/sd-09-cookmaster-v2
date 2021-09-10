const connection = require('./connection');

const create = async ({ name, ingredients, preparation, userId }) => (
  connection()
    .then(
      (db) => db
        .collection('recipes')
          .insertOne({
            name,
            ingredients,
            preparation,
            userId,
          }),
    )
);

const find = async (query) => (
  connection()
    .then(
      (db) => db
        .collection('recipes')
          .find(query).toArray(),
    )
);

const findOne = async (id) => (
  connection()
    .then(
      (db) => db
        .collection('recipes')
          .find(id).toArray(),
    )
);

const updateOne = async (_id, { name, ingredients, preparation }) => (
  connection()
    .then(
      (db) => db
        .collection('recipes')
          .updateOne(
            { _id },
            { $set: { name, ingredients, preparation } },
          ),
    )
);

const deleteOne = async (_id) => (
  connection()
    .then(
      (db) => db
        .collection('recipes')
          .deleteOne({ _id }),
    )
);

const upload = async (_id, image) => (
  connection()
    .then(
      (db) => db
        .collection('recipes')
          .updateOne(
            { _id },
            { $set: { image } },
          ),
    )
);

module.exports = { create, find, findOne, updateOne, deleteOne, upload };
