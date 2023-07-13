#!/usr/bin/env node
const { program } = require('commander');

const handlers = require('./handlers/index.js');

program
  .name('aio')
  .description('All-in-One CLI: one tool all things.')
  .usage(
    `
  $ aio <command> [options]
  $ aio help [command]
  $ aio image <inputPath> [outputPath] -r auto,400 -g -b 1 -c mask.png,center -t "#000000" -f horizontal
  $ aio qr -o qrcode.png -cd "#000000" -cl "#FFFFFF" -s 6 -m 2 "<TEXT>"
  $ aio serve -f . -p 3000
  $ aio ip -e
`
  );

program
  .command('image')
  .alias('img')
  .description('apply image transformations')
  .argument('<inputPath>', 'path of image to be transformed')
  .argument('[outputPath]', 'path of transformed image')
  .option(
    '-e, --extract <extract>',
    'extract a region of the image (format: <left>,<top>,<width>,<height>)'
  )
  .option(
    '-r, --resize <width?,height?>',
    'new image size (format: <width>,<height>)'
  )
  .option('-g, --grayscale', 'apply grayscale filter to image')
  .option(
    '-b, --blur [blur]',
    'apply gaussian blur filter to image (default: 1)'
  )
  .option(
    '-c, --composite <composite>',
    'composite image with another image (format: <mask_image_path>,<position?>, where position is one of: center, top, left, right, bottom, topright, topleft, bottomright, bottomleft) (default: center)'
  )
  .option('-t, --tint <tint>', 'tint image with a color (format: <RGB_color>)')
  .option(
    '-f, --flip [flip]',
    'flip image horizontally or vertically (format: <horizontal|vertical>) (default: horizontal)'
  )
  .action(handlers.imageHandler);

program
  .command('qr')
  .description('creates QR Code to terminal or image file')
  .argument('<text>', 'QR Code text')
  .option('-o, --output <output>', 'output image filename')
  .option(
    '-cd, --color-dark <color>',
    'color for the foreground (Default: #000000)'
  )
  .option(
    '-cl, --color-light <color>',
    'color for the background (Default: #FFFFFF)'
  )
  .option('-s, --scale <scale>', 'scale factor (Default: 6)')
  .option(
    '-m, --margin <margin>',
    'margin from the main area to the border (Default: 2)'
  )
  .action(handlers.qrcodeHandler);

program
  .command('serve')
  .description('creates a static file server from a folder')
  .option('-f, --folder <folder>', 'folder to be served (default: .)')
  .option('-p, --port <port> (default: 3000)')
  .action(handlers.serveHandler);

program
  .command('ip')
  .description('shows the IP address of the machine')
  .option(
    '-e, --external',
    'show external IP address instead of local (default: false)'
  )
  .action(handlers.ipHandler);

program.parse();
