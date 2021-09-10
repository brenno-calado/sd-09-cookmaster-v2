const multer = require('multer');

const memoryStorage = multer.memoryStorage();

const memoryUpload = multer({ storage: memoryStorage });

module.exports = {
  memoryUpload,
};
