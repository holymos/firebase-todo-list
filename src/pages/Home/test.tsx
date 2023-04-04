import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';

import Home from '.';
import { renderWithTheme } from '../../../.vitest/setup-tests';

const mockLogin = vi.fn();

vi.mock('@contexts/auth', () => ({
  useAuth: vi.fn(() => ({
    user: {
      id: 'creatorId',
      name: 'name',
      email: 'email@email.com',
    },
    login: vi.fn(() => mockLogin()),
    logout: vi.fn(),
  })),
}));

describe('<Home />', () => {
  it('should render correctly', () => {
    renderWithTheme(<Home />);

    expect(
      screen.getByRole('heading', {
        name: /welcome to our Collaborative Todo List!/i,
      })
    ).toBeInTheDocument();

    expect(
      screen.getByText(
        /collaborative todo list is an intuitive and powerful tool that lets you collaborate with others in real-time to manage your tasks\./i
      )
    ).toBeInTheDocument();

    expect(
      screen.getByRole('img', { name: /google logo/i })
    ).toBeInTheDocument();

    expect(
      screen.getByRole('button', { name: /sign in with google/i })
    ).toBeInTheDocument();
  });

  it('should login with google', async () => {
    renderWithTheme(<Home />);

    await userEvent.click(
      screen.getByRole('button', { name: /sign in with google/i })
    );
    expect(mockLogin).toHaveBeenCalledTimes(1);
  });
});
