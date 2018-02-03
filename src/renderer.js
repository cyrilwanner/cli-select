import readline from 'readline';
import { eraseLines, cursorHide, cursorShow } from 'ansi-escapes';

/**
 * Response renderer
 */
export default class Renderer {

  /**
   * Renderer constructor
   *
   * @param {any} stream - stream to write to (optional)
   */
  constructor(stream = process.stdout) {
    this.stream = stream;
    this.values = [];
    this.initialRender = true;
  }

  /**
   * Set the available values
   *
   * @param {array} values - all available values
   */
  setValues(values) {
    this.values = values;
  }

  /**
   * Render the values
   *
   * @param {number} selectedValue - selected value (optional)
   */
  render(selectedValue = 0) {
    if (this.initialRender) {
      // hide the cursor initially
      this.initialRender = false;
      this.stream.write(cursorHide);
    } else {
      // remove previous lines and values
      this.stream.write(eraseLines(this.values.length));
    }

    // output the current values
    this.values.forEach((value, index) => {
      const symbol = selectedValue === index ? '(x)' : '( )';
      this.stream.write(symbol + ' ' + value + (index !== this.values.length - 1 ? '\n' : ''));
    });
  }

  /**
   * Cleanup the console at the end
   */
  cleanup() {
    this.stream.write(eraseLines(this.values.length));
    this.stream.write(cursorShow);
  }
}
