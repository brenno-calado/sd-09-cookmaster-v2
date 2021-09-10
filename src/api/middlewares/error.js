const http = require('../constants/http.json');

module.exports = (err, _request, response, _next) => {
  const { code } = err;
  if (!code) return response.status(500).json(err);
  return response.status(http[code]).json(err);
};
