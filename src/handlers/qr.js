const QRCode = require('qrcode');

async function qrcodeHandler(
  text,
  {
    output,
    scale = 6,
    margin = 2,
    colorDark = '#000000',
    colorLight = '#FFFFFF',
  }
) {
  try {
    if (output) {
      await QRCode.toFile(output, text, {
        scale,
        margin,
        color: {
          dark: colorDark,
          light: colorLight,
        },
      });
    } else {
      const url = await QRCode.toString(text, {
        type: 'terminal',
        small: true,
      });
      console.log(url);
    }
  } catch (error) {
    console.log('=> Error to generate QRCode');
    console.error(error);
  }
}

module.exports = {
  qrcodeHandler,
};
