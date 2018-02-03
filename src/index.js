import Input from './input';
import Renderer from './renderer';

const defaultOptions = {
  outputStream: process.stdout,
  inputStream: process.stdin,
  values: [],
  defaultValue: 0,
};

const withCallback = (input, callback) => {
  input.open();
  input.onSelect(callback);
};

const withPromise = (input) => {
  return new Promise((resolve, reject) => {
    input.open();
    input.onSelect((valueId) => {
      if (valueId === null) {
        reject();
      } else {
        resolve(valueId);
      }
    });
  });
};

const creator = (options, callback) => {
  options = {
    ...defaultOptions,
    ...options,
  };

  const renderer = new Renderer(options.outputStream);
  const input = new Input(options.inputStream);
  input.setValues(options.values);
  input.setDefaultValue(options.defaultValue);
  input.attachRenderer(renderer);

  if (typeof callback === 'function') {
    return withCallback(input, callback);
  } else {
    return withPromise(input);
  }
};

module.exports = creator;
export default creator;
