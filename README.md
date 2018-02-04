<h1 align="center">▶️ 🔴 cli-select</h1>

<p align="center">
    <a href="https://www.npmjs.com/package/cli-select"><img src="https://img.shields.io/npm/v/cli-select.svg" alt="NPM"></a>
    <a href="https://github.com/cyrilwanner/cli-select/blob/master/LICENSE"><img src="https://img.shields.io/github/license/cyrilwanner/cli-select.svg" alt="License"></a>
</p>

<p align="center">
    Simple and interactive solution to provide a list of selectable items on the command line.
    <img src="https://cyrilwanner.github.io/packages/cli-select/assets/preview.gif" alt="cli-select preview">
</p>

> Note: cli-select does not produce colored output by default to keep the dependencies at a minimum. See the [examples](#examples) below on how to reproduce this preview.

## Table of contents

- [Installation](#installation)
- [Usage](#usage)
- [Configuration](#configuration)
- [Examples](#examples)
- [License](#license)

## Installation

```
npm install --save cli-select
```

## Usage

```javascript
const cliSelect = require('cli-select');

cliSelect(options, callback);
```

See the [configuration section](#configuration) for all available options.

The select list gets immediately rendered when the function gets called and the user can then select an option with the `up` and `down` arrow keys. To confirm the selection, just press `enter`/`return`. It is also possible to cancel a selection with `ctrl+c` or `esc` but it is up to you how you want to handle the cancellation of a selection, the process won't be ended by default.

cli-select supports both, a __callback__ function or a __Promise__ (if your node environment supports promises).

### Callback

If the __callback__ function is defined, two parameters will get passed where `valueId` is the numeric index if values is an array or the object key if values is an object. Both parameters will be `null` if the selection gets cancelled.
```javascript
cliSelect(options, (valueId, value) => {
    if (valueId !== null) {
        console.log('selected ' + valueId + ': ' + value);
    } else {
        console.log('cancelled');
    }
});
```

### Promise

If no callback function is defined, a __Promise__ will be returned:
```javascript
cliSelect(options).then((response) => {
    console.log('selected ' + response.id + ': ' + response.value);
}).catch(() => {
    console.log('cancelled');
});
```

## Configuration

> Note: All options are optional except `values` and will default as specified below.

The configuration gets passed to the `cliSelect` function as a normal object and can contain the following keys:

```javascript
cliSelect({
    /**
     * All values which can be selected.
     * This can either be an array or an object with string keys and values.
     * If an array is specified, the numerical index gets passed to the callback,
     * if an object is specified, the object key will get passed to the callback.
     * If you use the `valueRenderer` option, you can also pass in any array/object you want,
     * the value can be anything as the `valueRenderer` returns the string to render on the terminal.
     *
     * @type {array|object}
     */
    values: [],

    /**
     * The default value which will be pre-selected when the list shows up.
     * If `values` is an object, the object key can be specified, otherwise
     * it requires the numerical index in the array.
     *
     * @type {number|string}
     */
    defaultValue: 0,

    /**
     * Symbol which gets rendered if an option is selected.
     *
     * @type {string}
     */
    selected: '(x)',

    /**
     * Symbol which gets rendered if an option is not selected.
     *
     * @type {string}
     */
    unselected: '( )',

    /**
     * If you want an indent before the symbol and options,
     * you can specify it here with the number of spaces.
     *
     * @type {number}
     */
    indentation: 0,

    /**
     * If true, the list will get removed from the output
     * once an item gets selected or it gets cancelled.
     *
     * @type {boolean}
     */
    cleanup: true,

    /**
     * If you use a custom object for values or want to render the values differently,
     * you can overwrite it with a custom function.
     * The function gets two parameters passed, the value
     * (which can be a string or your custom object, depending what you have in the `values` option)
     * and a boolean specifying if the value is selected.
     * See the examples below for a simple example.
     *
     * @type {function}
     */
    valueRenderer: (value, selected) => value,

    /**
     * Stream where the output should be written to.
     *
     * @type {Stream}
     */
    outputStream: process.stdout,

    /**
     * Stream to use for the keyboard events.
     *
     * @type {Stream}
     */
    inputStream: process.stdin,
});
```

## Examples

`cli-select` does not produce colored outputs by default so you can use the package for that which you already have in your project and you don't have two packages doing basically the same at the end.
If you don't have such a package already in your project and you want the output to look similar to the preview gif above,
I recommend the packages [chalk](https://www.npmjs.com/package/chalk) for colored output and
[figures](https://www.npmjs.com/package/figures) for unicode symbols with fallbacks.
These two packages are also used in the examples below but `cli-select` is also compatible with every other package.

### Custom value renderer

```javascript
const cliSelect = require('cli-select');
const chalk = require('chalk');

cliSelect({
    values: ['Major', 'Minor', 'Patch'],
    valueRenderer: (value, selected) => {
        if (selected) {
            return chalk.underline(value);
        }

        return value;
    },
}).then(...);
```

Todo: more examples, also the one in the preview gif

## License

[MIT](https://github.com/cyrilwanner/cli-select/blob/master/LICENSE)
