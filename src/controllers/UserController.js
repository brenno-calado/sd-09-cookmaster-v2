const { Router } = require('express');
const UserService = require('../services/UserService');

const UserRouter = Router();
const AuthRouter = Router();

const HTTP_OK = 200;
const HTTP_CREATED = 201;

UserRouter.post('/', async (req, res, next) => {
  try {
    const userData = req.body;
    const resp = await UserService.create(userData);
    res.status(HTTP_CREATED).json({ user: resp });
  } catch (err) {
    next(err);
  }
});

AuthRouter.post('/', async (req, res, next) => {
  try {
    const loginData = req.body;
    const token = await UserService.auth(loginData);
    res.status(HTTP_OK).json({ token });
  } catch (err) {
    next(err);
  }
});

module.exports = { UserRouter, AuthRouter };
