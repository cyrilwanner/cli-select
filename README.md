<h1 align="center">cli-select :arrow_forward: :red_circle:</h1>

<p align="center">
    <a href="https://www.npmjs.com/package/cli-select"><img src="https://img.shields.io/npm/v/cli-select.svg" alt="NPM"></a>
    <a href="https://github.com/cyrilwanner/cli-select/blob/master/LICENSE"><img src="https://img.shields.io/github/license/cyrilwanner/cli-select.svg" alt="License"></a>
</p>

<p align="center">
    Simple and interactive solution to provide a list of selectable items on the command line.
    <img src="https://cyrilwanner.github.io/packages/cli-select/assets/preview.gif" alt="cli-select preview">
</p>

> Note: cli-select does not produce colored output by default to keep the dependencies at a minimum. See the [example](#example) below on how to reproduce this preview.

## Table of contents

- [Installation](#installation)
- [Usage](#usage)
- [Configuration](#configuration)
- [Example](#example)
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

When the function gets called, the select list gets immediately rendered and the user can select an option with the `up` and `down` arrow keys. To confirm the selection, just press `enter`/`return`. It is also possible to cancel a selection with `ctrl+c` or `esc`.

`cli-select` supports both, a __callback__ function or a __Promise__ (if your node environment supports promises).

If the callback function is defined, two parameters will get passed where the valueId is the numeric index if values is an array or the object key if values is an object. Both parameters will be `null` if the selection gets cancelled.
```javascript
cliSelect(options, (valueId, value) => {
    if (valueId !== null) {
        console.log('selected ' + valueId + ': ' + value);
    } else {
        console.log('cancelled');
    }
});
```

If no callback function is defined, a promise will be returned:
```javascript
cliSelect(options).then((response) => {
    console.log('selected ' + response.id + ': ' + response.value);
}).catch(() => {
    console.log('cancelled');
});
```

It is up to you how you want to handle the cancellation of a selection (`ctrl+c` or `esc`), the process won't be ended by default.

## Configuration

The configuration gets passed to the `cliSelect` function as a normal object and can contain the following keys:

__`outputStream`__: `{Stream}` Stream where the output should be written to (optional, default: `process.stdout`).

__`inputStream`__: `{Stream}` Stream to use for the keyboard events (optional, default: `process.stdin`).

__`values`__: `{array|object}` All values which can be selected (required).

This can either be an array or an object with string keys and values. If an array is specified, the numerical index gets passed to the callback, if an object is specified, the object key will get passed to the callback.
If you use the `valueRenderer` option, you can also pass in any array/object you want, the value can be anything as the `valueRenderer` returns the string to render on the terminal.

__`defaultValue`__: `{number|string}` The default value which will be pre-selected when the list shows up (optional, default: `0`).

If `values` is an object, the object key can be specified, otherwise it requires the numerical index in the array.

__`selected`__: `{string}` Symbol which gets rendered if an option is selected (optional, default: `'(x)'`).

__`unselected`__: `{string}` Symbol which gets rendered if an option is not selected (optional, default: `'( )'`).

__`indentation`__: `{number}` If you want an indent before the symbol and options, you can specify it here with the number of spaces (optional, default: `0`).

__`cleanup`__: `{boolean}` If true, the list will get removed from the output once an item gets selected or it gets cancelled (optional, default: `true`).

__`valueRenderer`__: `{function}` If you use a custom object for values or want to render the values differently, you can overwrite it with a custom function (optional, default: `(value) => value`).

The function gets two parameters passed, the value (which can be a string or your custom object, depending what you have in the `values` option) and a boolean specifying if the value is selected.
```javascript
const options = {
    values: ['Major', 'Minor', 'Patch'],
    valueRenderer: (value, selected) => {
        if (selected) {
            return chalk.underline(value);
        }

        return value;
    },
};
```

## Example

Todo

## License

[MIT](https://github.com/cyrilwanner/cli-select/blob/master/LICENSE)
