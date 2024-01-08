const Input = require("./input");
const Renderer = require("./renderer");

const { withCallback, withPromise } = require("./callback-mappers");
const { withArrayValues, withObjectValues } = require("./value-mappers");

// Default options
const defaultOptions = {
  outputStream: process.stdout,
  inputStream: process.stdin,
  values: [],
  defaultValue: 0,
  selected: '(x)',
  unselected: '( )',
  indentation: 0,
  cleanup: true,
  valueRenderer: (value) => value,
};

const creator = (options, callback) => {
  /**
 * Create an instance of cli-select with the given options
 *
 * @param {object} options - options for cli-select
 * @param {function} callback - if specified, a callback will be used, otherwise a promise gets returned (optional)
 */

  // merge options with default options
  options = {
    ...defaultOptions,
    ...options,
  };

  // create renderer and input instances
  const renderer = new Renderer(options, options.outputStream);
  const input = new Input(options.inputStream);
  input.setDefaultValue(options.defaultValue);
  input.attachRenderer(renderer);

  // handle array and object values
  let valueMapper;
  if (Array.isArray(options.values)) {
    valueMapper = withArrayValues(options);
  } else {
    valueMapper = withObjectValues(options);
  }

  // map values
  options.values = valueMapper.input;
  input.setValues(options.values);

  // handle different callback methods
  if (typeof callback === 'function') {
    return withCallback(input, valueMapper.output, callback);
  } else {
    return withPromise(input, valueMapper.output);
  }
};

exports = module.exports = creator;
Object.defineProperty(exports, "__esModule", {
  value: true
});

module.exports = creator;