const { imageHandler } = require('./image.js');
const { qrcodeHandler } = require('./qr.js');
const { serveHandler } = require('./serve.js');
const { ipHandler } = require('./ip.js');

module.exports = {
  imageHandler,
  qrcodeHandler,
  serveHandler,
  ipHandler,
};
