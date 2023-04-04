import { screen } from '@testing-library/react';

import { Header } from '.';
import { renderWithTheme } from '../../../.vitest/setup-tests';

describe('<Header />', () => {
  it('should render correctly', () => {
    renderWithTheme(<Header />);

    expect(screen.getByRole('img')).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: /collaborative todo list/i })
    ).toBeInTheDocument();
  });
});
