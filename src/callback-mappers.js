Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.withPromise = exports.withCallback = void 0;

const withCallback = (input, valueMapper, callback) => {
  /**
   * Open the input with a normal callback function
   *
   * @param {Input} input - input object
   * @param {function} valueMapper - function which maps the resulting id and value back to the expected format
   * @param {function} callback - callback function
   */

  input.open();
  input.onSelect((id, value) => callback(valueMapper(id, value)));
};
exports.withCallback = withCallback;

const withPromise = (input, valueMapper) => {
  /**
   * Open the input with a promise
   *
   * @param {Input} input - input object
   * @param {function} valueMapper - function which maps the resulting id and value back to the expected format
   */

  return new Promise((resolve, reject) => {
    input.open();
    input.onSelect((id, value) => {
      if (id === null || id == undefined) {
        reject();
      } else {
        resolve(valueMapper(id, value));
      }
    });
  });
};
exports.withPromise = withPromise;