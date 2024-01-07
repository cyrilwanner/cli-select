import cliSelect from 'cli-select';
import chalk from 'chalk';

cliSelect({
  values: ['Major', 'Minor', 'Patch'],
  valueRenderer: (value, selected) => {
    if (selected) {
      return chalk.underline(value);
    }

    return value;
  },
}).then((option) => {
  console.log(`Option selected: ${option.value}`)
});