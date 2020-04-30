# gnumake

[![GitHub stars](https://img.shields.io/github/stars/codejamninja/gnumake.svg?style=social&label=Stars)](https://github.com/codejamninja/gnumake)

> cross platform gnu make

Please ★ this repo if you found it useful ★ ★ ★

## Features

- supports windows
- supports osx
- supports linux

## Installation

```sh
npm install -g gnumake
```

## Dependencies

- [NodeJS](https://nodejs.org)

## Usage

1. Create a Makefile

_Makefile_

```make
include node_modules/gnumake/gnumake.mk

.PHONY: build
build: lib
lib:
	-@$(RM) -rf lib || true
	@babel src -d lib
```

2. Reference Makefile from npm scripts

_package.json_

```json
  "scripts": {
    "build": "make -s build"
  }
```

## Cross Platform Commands

The following commands are supported on linux, osx and windows.

`$(CAT)`
`$(CHMOD)`
`$(CHMOD)`
`$(CP)`
`$(FALSE)`
`$(FIND)`
`$(GREP)`
`$(LN)`
`$(LS)`
`$(MAKE)`
`$(MKDIRP)`
`$(MV)`
`$(NULL)`
`$(PWD)`
`$(RM)`
`$(SED)`
`$(SHELL)`
`$(TAIL)`
`$(TOUCH)`
`$(TRUE)`

## Support

Submit an [issue](https://github.com/codejamninja/gnumake/issues/new)

## Screenshots

[Contribute](https://github.com/codejamninja/gnumake/blob/master/CONTRIBUTING.md) a screenshot

## Contributing

Review the [guidelines for contributing](https://github.com/codejamninja/gnumake/blob/master/CONTRIBUTING.md)

## License

[MIT License](https://github.com/codejamninja/gnumake/blob/master/LICENSE)

[Jam Risser](https://codejam.ninja) © 2020

## Changelog

Review the [changelog](https://github.com/codejamninja/gnumake/blob/master/CHANGELOG.md)

## Credits

- [Jam Risser](https://codejam.ninja) - Author

## Support on Liberapay

A ridiculous amount of coffee ☕ ☕ ☕ was consumed in the process of building this project.

[Add some fuel](https://liberapay.com/codejamninja/donate) if you'd like to keep me going!

[![Liberapay receiving](https://img.shields.io/liberapay/receives/codejamninja.svg?style=flat-square)](https://liberapay.com/codejamninja/donate)
[![Liberapay patrons](https://img.shields.io/liberapay/patrons/codejamninja.svg?style=flat-square)](https://liberapay.com/codejamninja/donate)
