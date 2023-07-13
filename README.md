# All-in-One CLI: One tool all things

The All-in-One CLI (Command-Line Interface) project aims to provide users with a comprehensive and versatile tool that combines multiple functionalities and services into a single command-line interface. With this powerful utility, users can conveniently access and perform various tasks and operations without the need to switch between different tools or applications.

## Features

- [x] Image transformation
- [x] QR Code generation
- [x] Static file server
- [x] Host IP address

## Installation

### Method 1: Install from pre-built binaries

- Verify if binary file is available for your platform in the [Releases](https://github.com/luisclicio/aio-cli/releases) page

- Download the binary file for your platform and save it with the name `aio` (or `aio.exe` for Windows)

- Add the binary file to the system path (optional)

### Method 2: Install from code

- Install [Node.js](https://nodejs.org/)

- Clone this repository:

  ```bash
  git clone <REPOSITORY_URL>
  ```

- Go to the project directory:

  ```bash
  cd aio-cli
  ```

- Install dependencies:

  ```bash
  npm install
  ```

- Install the package globally:

  ```bash
  npm install -g .
  ```

## Usage

Run the `aio` command in the terminal:

```bash
$ aio

Usage: aio
  $ aio <command> [options]
  $ aio help [command]
  $ aio image <inputPath> [outputPath] -r auto,400 -g -b 1 -c mask.png,center -t "#000000" -f horizontal
  $ aio qr -o qrcode.png -cd "#000000" -cl "#FFFFFF" -s 6 -m 2 "<TEXT>"
  $ aio serve -f . -p 3000
  $ aio ip -e


All-in-One CLI: one tool all things.

Options:
  -h, --help                                    display help for command

Commands:
  image|img [options] <inputPath> [outputPath]  apply image transformations
  qr [options] <text>                           creates QR Code to terminal or image file
  serve [options]                               creates a static file server from a folder
  ip [options]                                  shows the IP address of the machine
  help [command]                                display help for command
```
