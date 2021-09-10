const SECRET = 'mysohiddensecret';
const JWT_CONFIG = {
  expiresIn: '15m',
  algorithm: 'HS256',
};
const Joi = require('joi');
const jwt = require('jsonwebtoken');
const model = require('../models/users');

const UserSchema = Joi.object({
  name: Joi.string().not().empty().required(),
  email: Joi.string().email().not().empty()
    .required(),
  password: Joi.string().not().empty().required(),
  role: Joi.string(),
});

const LoginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
});

const create = async (user) => {
  const { error } = UserSchema.validate(user, { convert: false });
  if (error) {
    return { err: { code: 'invalid_data', message: 'Invalid entries. Try again.' } };
  }
  const usedEmail = await model.findByEmail(user.email);
  if (usedEmail) return { err: { code: 'existing_email', message: 'Email already registered' } };
  const { insertedId } = await model.create(user);
  return insertedId;
};

const login = async ({ email, password }) => {
  const { error } = LoginSchema.validate({ email, password });
  const user = await model.loginMatch({ email, password });
  if (!user || (error && user.role !== 'admin')) {
    return { err: { code: 'unauthorized', message: 'Incorrect username or password' } };
  }
  const { _id, role } = user;
  const token = jwt.sign(
    {
      data: { id: _id, email, role },
    },
  SECRET,
  JWT_CONFIG,
  );
  return token;
};

module.exports = { create, login };
