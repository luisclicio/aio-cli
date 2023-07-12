const sharp = require('sharp');

const { ImageTransformer } = require('../services/image.js');

async function imageHandler(imagePath, outputPath, { ...options }) {
  try {
    const image = sharp(imagePath);
    const transformedImage = await ImageTransformer.transform(image, options);

    if (!outputPath) {
      outputPath = imagePath;
    }

    await transformedImage.toFile(outputPath);

    console.log(`=> Image saved at ${outputPath}`);
  } catch (error) {
    console.log('=> Error to transform image');
    console.error(error);
  }
}

module.exports = {
  imageHandler,
};
