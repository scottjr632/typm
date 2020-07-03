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
typm/0.0.1 linux-x64 node-v12.16.3
$ typm --help [COMMAND]
USAGE
  $ typm COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`typm hello [FILE]`](#typm-hello-file)
* [`typm help [COMMAND]`](#typm-help-command)

## `typm hello [FILE]`

describe the command here

```
USAGE
  $ typm hello [FILE]

OPTIONS
  -f, --force
  -h, --help       show CLI help
  -n, --name=name  name to print

EXAMPLE
  $ typm hello
  hello world from ./src/hello.ts!
```

_See code: [src/commands/hello.ts](https://github.com/scottjr632/typm/blob/v0.0.1/src/commands/hello.ts)_

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
<!-- commandsstop -->
