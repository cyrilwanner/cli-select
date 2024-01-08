Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

_interopRequireDefault(require("readline"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Renderer {
  // Response renderer

  constructor(options, stream = process.stdout) {
    /**
     * Renderer constructor
     *
     * @param {object} options - renderer options
     * @param {any} stream - stream to write to (optional)
     */

    this.options = options;
    this.stream = stream;
    this.values = [];
    this.initialRender = true;
  }

  setValues(values) {
    /**
     * Set the available values
     *
     * @param {array} values - all available values
     */

    this.values = values;
  }

  render(selectedValue = 0) {
    /**
      * Render the values
      *
      * @param {number} selectedValue - selected value (optional)
      */

    // if (process.stdout.rows > this.values.length + 4) {
    this.stream.write("\u001B[G");
    if (this.initialRender) {
      // hide the cursor initially
      this.initialRender = false;
      this.stream.write("\u001B[?25l");
    } else {
      // remove previous lines and values
      this.stream.write(`\u001B[${this.values.length - 1}A\u001B[K`);
    }

    // output the current values
    this.values.forEach((value, index) => {
      const symbol = selectedValue === index ? this.options.selected : this.options.unselected;
      const indentation = ' '.repeat(this.options.indentation);
      const renderedValue = this.options.valueRenderer(value, selectedValue === index);
      const end = index !== this.values.length - 1 ? '\n' : '';
      this.stream.write(indentation + symbol + ' ' + renderedValue + end);
    });
  }
  // }

  cleanup() {
    /**
     * Cleanup the console at the end
     */

    this.stream.write(`\u001B[${this.values.length - 1}H\u001B[J`);
    this.stream.write("\u001B[?25h");
  }
}

module.exports = Renderer;