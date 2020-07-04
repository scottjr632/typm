TYPM
====

Typescript Package Manager 🗄

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/typm.svg)](https://npmjs.org/package/typm)
[![CircleCI](https://circleci.com/gh/scottjr632/typm/tree/master.svg?style=shield)](https://circleci.com/gh/scottjr632/typm/tree/master)
[![Codecov](https://codecov.io/gh/scottjr632/typm/branch/master/graph/badge.svg)](https://codecov.io/gh/scottjr632/typm)
[![Downloads/week](https://img.shields.io/npm/dw/typm.svg)](https://npmjs.org/package/typm)
[![License](https://img.shields.io/npm/l/typm.svg)](https://github.com/scottjr632/typm/blob/master/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g typm
$ typm COMMAND
running command...
$ typm (-v|--version|version)
typm/1.1.0 darwin-x64 node-v13.8.0
$ typm --help [COMMAND]
USAGE
  $ typm COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`typm config`](#typm-config)
* [`typm help [COMMAND]`](#typm-help-command)
* [`typm init`](#typm-init)
* [`typm install`](#typm-install)

## `typm config`

show preferred package manager

```
USAGE
  $ typm config
```

_See code: [src/commands/config.ts](https://github.com/scottjr632/typm/blob/v1.1.0/src/commands/config.ts)_

## `typm help [COMMAND]`

display help for typm

```
USAGE
  $ typm help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v3.1.0/src/commands/help.ts)_

## `typm init`

initialize typm with your package manager

```
USAGE
  $ typm init

OPTIONS
  -g, --global
  -h, --help    show CLI help

ALIASES
  $ typm initialize
```

_See code: [src/commands/init.ts](https://github.com/scottjr632/typm/blob/v1.1.0/src/commands/init.ts)_

## `typm install`

install npm package[s]

```
USAGE
  $ typm install

OPTIONS
  -h, --help  show CLI help

ALIASES
  $ typm i
  $ typm add

EXAMPLE
  $ typm add react react-dom
```

_See code: [src/commands/install.ts](https://github.com/scottjr632/typm/blob/v1.1.0/src/commands/install.ts)_
<!-- commandsstop -->
