import readline from 'readline';
import { eraseLines, cursorHide, cursorShow } from 'ansi-escapes';

export default class Renderer {
  constructor(stream = process.stdout) {
    this.stream = stream;
    this.values = [];
    this.initialRender = true;
  }

  setValues(values) {
    this.values = values;
  }

  render(selectedOption = 0) {
    if (this.initialRender) {
      this.initialRender = false;
      this.stream.write(cursorHide);
    } else {
      this.stream.write(eraseLines(this.values.length));
    }

    this.values.forEach((value, index) => {
      const symbol = selectedOption === index ? '(x)' : '( )';
      this.stream.write(symbol + ' ' + value + (index !== this.values.length - 1 ? '\n' : ''));
    });
  }

  cleanup() {
    this.stream.write(eraseLines(this.values.length));
    this.stream.write(cursorShow);
  }
}
