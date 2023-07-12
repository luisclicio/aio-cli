const os = require('node:os');

function getIPs() {
  const interfaces = os.networkInterfaces();
  const IPs = [];

  for (const interfaceId in interfaces) {
    for (const addressId in interfaces[interfaceId]) {
      const addressData = interfaces[interfaceId][addressId];

      if (addressData.family === 'IPv4' && !addressData.internal) {
        IPs.push(addressData.address);
      }
    }
  }

  return IPs.length > 0 ? IPs : null;
}

module.exports = {
  getIPs,
};
