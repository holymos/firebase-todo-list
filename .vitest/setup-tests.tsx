import '@testing-library/jest-dom';
import 'jest-styled-components';

import { render } from '@testing-library/react';
import { ReactElement } from 'react';
import { ThemeProvider } from 'styled-components';

import theme from '../src/styles/theme';
import { vi } from 'vitest';

vi.mock('firebase/app', () => ({
  initializeApp: vi.fn(),
}));

vi.mock('firebase/firestore', () => ({
  getFirestore: vi.fn(),
}));

export const renderWithTheme = (children: ReactElement) => {
  return render(<ThemeProvider theme={theme}>{children}</ThemeProvider>);
};
