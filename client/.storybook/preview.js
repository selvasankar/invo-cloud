// .storybook/preview.js

import '../styles/globals.css';
import { MemoryRouter } from 'react-router-dom';

export const decorators = [
  (Story) => (
    <MemoryRouter initialEntries={['/']}>
      <Story />
    </MemoryRouter>
  ),
];

export const parameters = {
  actions: { argTypesRegex: '^on.*' },
  controls: { expanded: true },
};
