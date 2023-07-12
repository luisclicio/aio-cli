const sharp = require('sharp');

const COMPOSITE_POSITIONS = {
  center: 'center',
  top: 'north',
  right: 'east',
  bottom: 'south',
  left: 'west',
  topleft: 'northwest',
  topright: 'northeast',
  bottomleft: 'southwest',
  bottomright: 'southeast',
};

class ImageTransformer {
  static resize(image, resize) {
    const [width = null, height = null] = resize
      .split(',')
      .map((size) =>
        size === 'auto' || isNaN(size) || Number(size) <= 1
          ? null
          : Number(size)
      );

    return image.resize({
      width: width ? Number(width) : undefined,
      height: height ? Number(height) : undefined,
    });
  }

  static grayscale(image) {
    return image.grayscale();
  }

  static blur(image, blur = 1) {
    if (!isNaN(blur)) {
      blur = Number(blur);
      blur = blur > 8 ? 8 : blur;
      blur = blur < 0.3 ? 0.3 : blur;
      image.blur(blur);
    }

    return image;
  }

  static composite(image, composite) {
    const [input, position = 'center'] = composite.split(',');
    const gravity = COMPOSITE_POSITIONS[position.toLowerCase()] || 'center';

    return image.composite([
      {
        input,
        gravity, // 'north' | 'northeast' | 'southeast' | 'south' | 'southwest' | 'west' | 'northwest' | 'east' | 'center' | 'centre'
      },
    ]);
  }

  static tint(image, tint) {
    return image.tint(tint);
  }

  static flip(image, direction = 'horizontal') {
    return direction || direction === 'horizontal'
      ? image.flop()
      : image.flip();
  }

  static extract(image, extract) {
    const [left, top, width, height] = extract.split(',');

    return image.extract({
      left: Number(left),
      top: Number(top),
      width: Number(width),
      height: Number(height),
    });
  }

  static async transform(originalImage, options) {
    const { resize, grayscale, blur, composite, tint, flip, extract } = options;
    const image = sharp(await originalImage.toBuffer());

    if (extract) {
      ImageTransformer.extract(image, extract);
    }

    if (blur) {
      ImageTransformer.blur(image, blur);
    }

    if (resize) {
      ImageTransformer.resize(image, resize);
    }

    if (grayscale) {
      ImageTransformer.grayscale(image);
    }

    if (tint) {
      ImageTransformer.tint(image, tint);
    }

    if (flip) {
      ImageTransformer.flip(image, flip);
    }

    if (composite) {
      ImageTransformer.composite(image, composite);
    }

    return image;
  }
}

module.exports = {
  ImageTransformer,
};
