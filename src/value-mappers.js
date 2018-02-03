/**
 * Map incoming and outgoing values if the initial values are an array
 *
 * @param {object} options - cli-select options
 */
export const withArrayValues = (options) => {
  return {
    input: options.values,
    output: (id, value) => {
      return {
        id,
        value,
      };
    },
  };
};

/**
 * Map incoming and outgoing values if the initial values are an object
 *
 * @param {object} options - cli-select options
 */
export const withObjectValues = (options) => {
  const originalValues = options.values;

  return {
    input: Object.values(originalValues),
    output: (id, value) => {
      return {
        id: Object.keys(originalValues)[id],
        value,
      };
    },
  };
};
