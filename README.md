# [TYPM - Typescript Package Management 🗄](https://github.com/scottjr632/typm)


[![NPM version](http://img.shields.io/npm/v/typm.svg)](https://www.npmjs.com/package/typm)
[![NPM downloads](http://img.shields.io/npm/dm/typm.svg)](https://www.npmjs.com/package/typm)

Install types for each package that you install. Works with `npm` and `yarn`.  

Having to run `npm i --save-dev @types/react` or `yarn add -D @types/react` whenever you install a new package can get old. Especially when starting a new project with typescript. Sometimes it's difficult to even know if a package has @types. TYPM allows you to just run `typm add {package name[s]}` to install the package but also the typings for the package or packages.

## Getting started

### Installing
```bash
$ npm -g i typm
```
Or you can also use `npx`
```bash
$ npx typm
```

### Initialize typm
TYPM needs to be initialized to it knows which package manger to use.

Initialize `typm` by running 
```bash
$ typm init
# or 
$ typm initialize
Thanks for using typm!

Specify which package manager to use (npm|yarn) [npm]: yarn
Success: configuration file has been saved for typm
```
After `typm` is initialized, it will run either `npm init` or `yarn init`. Feel free to cancel this section if you have already run `init` for your preferred package manager.  

You can also just add a `.typm.json` file to the root of your project instead of running `typm init`
```json
{
	"packageManager": "npm" // This can be either npm or yarn
}
```

## Installing a package
Installing a package works like using your preferred package manager.

To install a package run
```bash
$ typm {add|install|i} {name of the package[s]}
```
TYPM will install the package and then check to see if the package has any `@types` typings and installs them.

You can still install packages as dev dependencies because TYPM passes down all flags
The below command will install `jest` as well as `@types/jest` as dev dependencies
```bash
$ typm install --save-dev jest
```

## Running package manager commands
You can run any package manager command for your preferred package manager.
For example you can still run `npm search` if you have `npm` has your set package manager. 

```bash
$ typm search react
Thanks for using typm!

NAME                      | DESCRIPTION          | AUTHOR          | DATE       | VERSION  | KEYWORDS
react                     | React is a…          | =acdlite…       | 2020-03-19 | 16.13.1  | react
react-dom                 | React package for…   | =acdlite…       | 2020-03-19 | 16.13.1  | react
```

## Issues or Feature requests
Request a new feature or report issues [here](https://github.com/scottjr632/typm/issues/new/choose)


Pull requests are also welcome!
