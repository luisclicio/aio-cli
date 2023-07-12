const { getIPs } = require('../utils/index.js');

async function ipHandler({ external }) {
  if (external) {
    try {
      const res = await fetch('https://api.ipify.org?format=json');
      const { ip } = await res.json();
      console.log(`=> External IP: ${ip}`);
    } catch (error) {
      console.log('=> Error to get external IP');
    }
  } else {
    const ips = getIPs();

    if (ips) {
      ips.forEach((ip) => console.log(`=> Local IP: ${ip}`));
    } else {
      console.log('=> No IP found');
    }
  }
}

module.exports = {
  ipHandler,
};
