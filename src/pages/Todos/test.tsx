import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';

import Todos from '.';
import { renderWithTheme } from '../../../.vitest/setup-tests';

vi.mock('@components/Header', () => ({
  Header: () => <div data-testid="Header" />,
}));

vi.mock('@components/InputSelect', () => ({
  InputSelect: () => <div data-testid="InputSelect" />,
}));

vi.mock('@components/TodoItem', () => ({
  TodoItem: () => <div data-testid="TodoItem" />,
}));

const mockAddDoc = vi.fn();

vi.mock('firebase/firestore', () => ({
  getFirestore: vi.fn(),
  addDoc: vi.fn((arg1, arg2) => mockAddDoc(arg1, arg2)),
  collection: vi.fn(),
  onSnapshot: vi.fn(),
  query: vi.fn(),
}));

vi.mock('@contexts/auth', () => ({
  useAuth: vi.fn(() => ({
    user: {
      id: 'creatorId',
      name: 'name',
      email: 'email@email.com',
    },
    login: vi.fn(),
    logout: vi.fn(),
  })),
}));

describe('<Todos />', () => {
  it('should render correctly', () => {
    renderWithTheme(<Todos />);

    expect(screen.getByTestId('Header')).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toBeInTheDocument();
    expect(
      screen
        .getAllByRole('button')
        .filter((button) => (button as HTMLButtonElement).type === 'submit')[0]
    ).toBeInTheDocument();
    expect(screen.getByTestId('InputSelect')).toBeInTheDocument();
  });

  it('should render error message if user tries to enter empty todo', async () => {
    renderWithTheme(<Todos />);

    const todoInput = screen.getByRole('textbox');

    expect(screen.queryByText(/campo obrigatório/i)).not.toBeInTheDocument();

    todoInput.focus();
    await userEvent.type(todoInput, '{enter}');

    expect(screen.getByText(/campo obrigatório/i)).toBeInTheDocument();
  });

  it('should create new todo', async () => {
    renderWithTheme(<Todos />);

    const todoInput = screen.getByRole('textbox');
    todoInput.focus();

    await userEvent.type(todoInput, 'Todo{enter}');

    expect(mockAddDoc).toHaveBeenCalled();
  });
});
