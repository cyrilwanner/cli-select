import readline from 'readline';

export default class Input {
  constructor(stream = process.stdin) {
    // set default values
    this.stream = stream;
    this.values = [];
    this.selectedValue = 0;
    this.onSelectListener = () => {};

    this.onKeyPress = this.onKeyPress.bind(this);
  }

  setValues(values) {
    this.values = values;

    if (this.renderer) {
      this.renderer.setValues(values);
    }
  }

  setDefaultValue(defaultValue) {
    this.selectedValue = defaultValue;
  }

  attachRenderer(renderer) {
    this.renderer = renderer;
    this.renderer.setValues(this.values);
  }

  onSelect(listener) {
    this.onSelectListener = listener;
  }

  open() {
    readline.emitKeypressEvents(this.stream);

    this.stream.on('keypress', this.onKeyPress);

    this.stream.setRawMode(true);
    this.stream.resume();

    if (this.renderer) {
      this.renderer.render(this.selectedValue);
    }
  }

  close(cancelled = false) {
    this.stream.setRawMode(false);
    this.stream.pause();

    if (this.renderer) {
      this.renderer.cleanup();
    }

    this.onSelectListener(cancelled ? null : this.selectedValue);
  }

  render() {
    if (!this.renderer) {
      return;
    }

    this.renderer.render(this.selectedValue);
  }

  onKeyPress(string, key) {
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
