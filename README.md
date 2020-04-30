# gnumake

[![GitHub stars](https://img.shields.io/github/stars/codejamninja/gnumake.svg?style=social&label=Stars)](https://github.com/codejamninja/gnumake)

> cross platform gnu make for nodejs

Please ★ this repo if you found it useful ★ ★ ★

## Features

- supports windows
- supports osx
- supports linux

## Installation

```sh
npm install --save-dev gnumake
```

## Dependencies

- [NodeJS](https://nodejs.org)

## Usage

1. Create a Makefile

    You must include `node_modules/gnumake/gnumake.mk`.

    _Makefile_
    ```make
    include node_modules/gnumake/gnumake.mk

    .PHONY: build
    build: lib
    lib:
    	-@$(RM) -rf lib || $(TRUE)
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

The following commands should be referenced from make variables instead of the raw
unix commands for cross platform suport on **linux**, **osx** and **windows**.

| unix command | make variable | example                                 |
| -----------  | ------------- | --------------------------------------- |
| `/dev/null`  | `$(NULL)`     | `echo hello >$(NULL)`                   |
| `cat`        | `$(CAT)`      | `$(CAT) hello.txt`                      |
| `chmod`      | `$(CHMOD)`    | `$(CHMOD) hello.txt`                    |
| `cp`         | `$(CP)`       | `$(CP) -r hello world`                  |
| `false`      | `$(FALSE)`    | `echo fail && $(FALSE)`                 |
| `find`       | `$(FIND)`     | `$(FIND) *.txt`                         |
| `grep`       | `$(GREP)`     | `$(GREP) ".+\.txt$"`                    |
| `ln`         | `$(LN)`       | `$(LN) -s hello.txt world.txt`          |
| `ls`         | `$(LS)`       | `$(LS) -a`                              |
| `make`       | `$(MAKE)`     | `$(MAKE) -s hello`                      |
| `mkdir -p`   | `$(MKDIRP)`   | `$(MKDIRP) hello/world`                 |
| `mv`         | `$(MV)`       | `$(MV) hello world`                     |
| `pwd`        | `$(PWD)`      | `$(PWD)`                                |
| `rm`         | `$(RM)`       | `$(RM) -rf hello`                       |
| `sed`        | `$(SED)`      | `$(SED) -i "s/hello/world/g" hello.txt` |
| `tail`       | `$(TAIL)`     | `$(TAIL) -f hello.log`                  |
| `touch`      | `$(TOUCH)`    | `$(TOUCH) hello.txt`                    |
| `true`       | `$(TRUE)`     | `echo success && $(TRUE)`               |

## Support

Submit an [issue](https://github.com/codejamninja/gnumake/issues/new)

## Contributing

Review the [guidelines for contributing](https://github.com/codejamninja/gnumake/blob/master/CONTRIBUTING.md)

## License

[MIT License](https://github.com/codejamninja/gnumake/blob/master/LICENSE)

[Jam Risser](https://codejam.ninja) © 2020

## Changelog

Review the [changelog](https://github.com/codejamninja/gnumake/blob/master/CHANGELOG.md)

## Credits

- [Jam Risser](https://codejam.ninja) - Author
