import '../src/styles/normalize.css';
import '../src/styles/variables.css';
import '../src/styles/main.css';

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
    options: {
      storySort: (a, b) => a[0].localeCompare(b[0]),
    },
    layout: 'fullscreen',
  },
};
