const InvalidArgumentError = require('./InvalidArgumentError');
const ConflictError = require('./ConflictError');
const AccessError = require('./AccessError');
const NotFoundError = require('./NotFoundError');
const JWTError = require('./JWTError');
const PermissionError = require('./PermissionError');

module.exports = {
  InvalidArgumentError,
  ConflictError,
  AccessError,
  NotFoundError,
  JWTError,
  PermissionError,
};
