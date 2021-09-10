const jwt = require('jsonwebtoken');
const Users = require('../models/users');

const SECRET = 'mysohiddensecret';

const tokenValidate = async (request, _response, next) => {
  const token = request.headers.authorization;
  if (!token) return next({ code: 'unauthorized', message: 'missing auth token' });
  try {
    const decode = await jwt.verify(token, SECRET);
    const user = await Users.findByEmail(decode.data.email);
    request.user = user;
    next();
  } catch (err) {
    return next({ code: 'unauthorized', message: err.message });
  }
};

module.exports = tokenValidate;
