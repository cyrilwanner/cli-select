/**
 * Open the input with a normal callback function
 *
 * @param {Input} input - input object
 * @param {function} valueMapper - function which maps the resulting id and value back to the expected format
 * @param {function} callback - callback function
 */
export const withCallback = (input, valueMapper, callback) => {
  input.open();
  input.onSelect((id, value) => callback(valueMapper(id, value)));
};

/**
 * Open the input with a promise
 *
 * @param {Input} input - input object
 * @param {function} valueMapper - function which maps the resulting id and value back to the expected format
 */
export const withPromise = (input, valueMapper) => {
  return new Promise((resolve, reject) => {
    input.open();
    input.onSelect((id, value) => {
      if (id === null) {
        reject();
      } else {
        resolve(valueMapper(id, value));
      }
    });
  });
};
