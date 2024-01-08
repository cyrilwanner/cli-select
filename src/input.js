const readline = require('readline');

class Input {
  // Handle cli input

  constructor(stream = process.stdin) {
    /**
     * Input constructor
     *
     * @param {any} stream - stream to catch (optional)
     */

    // set default values
    this.stream = stream;
    this.values = [];
    this.selectedValue = 0;
    this.onSelectListener = () => { };
    this.onKeyPress = this.onKeyPress.bind(this);
  }

  setValues(values) {
    /**
     * Set the available values
     *
     * @param {array} values - all available values
     */

    this.values = values;

    if (this.renderer) {
      this.renderer.setValues(values);
    }
  }

  setDefaultValue(defaultValue) {
    /**
      * Set the default value
      *
      * @param {number} defaultValue - default value id
      */
    this.selectedValue = defaultValue;
  }

  attachRenderer(renderer) {
    /**
     * Attach a renderer to the input catcher
     *
     * @param {Renderer} renderer - renderer to use for rendering responses
     */

    this.renderer = renderer;
    this.renderer.setValues(this.values);
  }

  onSelect(listener) {
    /**
     * Register an on select listener
     *
     * @param {function} listener - listener function which receives two parameters: valueId and value
     */

    this.onSelectListener = listener;
  }

  open() {
    /**
     * Open the stream and listen for input
     */

    // register keypress event
    readline.emitKeypressEvents(this.stream);

    // handle keypress
    this.stream.on('keypress', this.onKeyPress);

    // initially render the response
    if (this.renderer) {
      this.renderer.render(this.selectedValue);
    }

    // hide pressed keys and start listening on input
    this.stream.setRawMode(true);
    this.stream.resume();
  }

  close(cancelled = false) {
    /**
     * Close the stream
     *
     * @param {boolean} cancelled - true if no value was selected (optional)
     */

    // reset stream properties
    this.stream.setRawMode(false);
    this.stream.pause();

    // cleanup the output
    if (this.renderer) {
      this.renderer.cleanup();
    }

    // call the on select listener
    if (cancelled) {
      this.onSelectListener(null);
    } else {
      this.onSelectListener(this.selectedValue, this.values[this.selectedValue]);
    }

    this.stream.removeListener('keypress', this.onKeyPress);
  }

  render() {
    /**
    * Render the response
    */

    if (!this.renderer) {
      return;
    }

    this.renderer.render(this.selectedValue);
  }

  onKeyPress(string, key) {
    /**
     * Handle key press event
     *
     * @param {string} string - input string
     * @param {object} key - object containing information about the pressed key
     */

    if (key) {
      if (key.name === 'up' && this.selectedValue > 0) {
        this.selectedValue--;
        this.render();
      } else if (key.name === 'down' && this.selectedValue + 1 < this.values.length) {
        this.selectedValue++;
        this.render();
      } else if (key.name === 'return') {
        this.close();
      } else if (key.name === 'escape' || (key.name === 'c' && key.ctrl)) {
        this.close(true);
      }
    }
  }
}

module.exports = Input;