const handler = require('serve-handler');
const http = require('node:http');

const { getIPs } = require('../utils/index.js');

function serveHandler({ folder = '.', port = 3000 }) {
  const server = http.createServer((req, res) => {
    return handler(req, res, {
      public: folder,
    });
  });

  const IPs = getIPs();
  const hostIP = IPs ? IPs[0] : 'localhost';

  server.listen(port, () => {
    console.info(
      `=> Serving ${
        folder === '.' ? 'current' : folder
      } folder at http://${hostIP}:${port}...`
    );
    console.info('\n=> Press `Ctrl + C` to stop.');
  });

  process.on('SIGINT', () => {
    server.close(() => {
      console.info('=> Server stopped.');
      process.exit(0);
    });
  });
}

module.exports = {
  serveHandler,
};
