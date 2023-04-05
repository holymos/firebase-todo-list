import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';

import { TodoItemData } from 'types/index';

import { TodoItem } from '.';
import { renderWithTheme } from '../../../.vitest/setup-tests';

const mockDeleteDoc = vi.fn();
const mockDoc = vi.fn(() => 'doc');
const mockOnSnapshot = vi.fn();
const mockUpdateDoc = vi.fn();

vi.mock('firebase/firestore', () => ({
  getFirestore: vi.fn(),
  deleteDoc: (arg: any) => mockDeleteDoc(arg),
  doc: () => mockDoc(),
  onSnapshot: () => mockOnSnapshot(),
  updateDoc: (arg1: any, arg2: any) => mockUpdateDoc(arg1, arg2),
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

vi.mock('phosphor-react', () => ({
  File: function Mock() {
    return <div data-testid="File" />;
  },
  Lock: function Mock() {
    return <div data-testid="Lock" />;
  },
  LockOpen: function Mock() {
    return <div data-testid="LockOpen" />;
  },
  TrashSimple: function Mock() {
    return <div data-testid="TrashSimple" />;
  },
}));

describe('<TodoItem />', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render correctly', () => {
    const mockTodo: TodoItemData = {
      createdAt: '2023-04-03T20:30:00.000Z',
      createdBy: 'User',
      creatorId: 'creatorId',
      id: 'todoId',
      isLocked: false,
      status: 'pending',
      title: 'Todo',
    };

    renderWithTheme(<TodoItem todo={mockTodo} />);

    expect(screen.getByText('Todo')).toBeInTheDocument();
    expect(screen.getByTestId('LockOpen')).toBeInTheDocument();
    expect(screen.getByTestId('TrashSimple')).toBeInTheDocument();
    expect(screen.queryByTestId('File')).not.toBeInTheDocument();

    expect(screen.getByText(/created by:/i)).toBeInTheDocument();
    expect(screen.getByText(/User/i)).toBeInTheDocument();

    expect(screen.getByText(/date:/i)).toBeInTheDocument();
    expect(screen.getByText(/03\/04\/2023/i)).toBeInTheDocument();
  });

  it('should render a completed todo', () => {
    const mockTodo: TodoItemData = {
      createdAt: '2023-04-03T20:30:00.000Z',
      createdBy: 'User',
      creatorId: 'creatorId',
      id: 'todoId',
      isLocked: false,
      status: 'completed',
      title: 'Todo',
    };

    renderWithTheme(<TodoItem todo={mockTodo} />);

    expect(screen.getByText('Todo')).toHaveStyle({
      textDecoration: 'line-through',
    });
    expect(screen.getByText('Todo').parentElement?.parentElement).toHaveStyle({
      filter: 'opacity( 0.3 )',
    });
  });

  it('should render a locked todo', () => {
    const mockTodo: TodoItemData = {
      createdAt: '2023-04-03T20:30:00.000Z',
      createdBy: 'User',
      creatorId: 'creatorId',
      id: 'todoId',
      isLocked: true,
      status: 'pending',
      title: 'Todo',
    };

    renderWithTheme(<TodoItem todo={mockTodo} />);

    expect(screen.queryByTestId('LockOpen')).not.toBeInTheDocument();
    expect(screen.getByTestId('Lock')).toBeInTheDocument();
  });

  it('should show archive button when todo is completed', () => {
    const mockTodo: TodoItemData = {
      createdAt: '2023-04-03T20:30:00.000Z',
      createdBy: 'User',
      creatorId: 'creatorId',
      id: 'todoId',
      isLocked: false,
      status: 'completed',
      title: 'Todo',
    };

    renderWithTheme(<TodoItem todo={mockTodo} />);

    expect(screen.getByTestId('File')).toBeInTheDocument();
  });

  it('should complete an item', async () => {
    const mockTodo: TodoItemData = {
      createdAt: '2023-04-03T20:30:00.000Z',
      createdBy: 'User',
      creatorId: 'creatorId',
      id: 'todoId',
      isLocked: false,
      status: 'pending',
      title: 'Todo',
    };

    renderWithTheme(<TodoItem todo={mockTodo} />);

    await userEvent.click(screen.getByTestId('Checkbox'));
    expect(mockUpdateDoc).toHaveBeenCalledWith('doc', {
      status: 'completed',
    });
  });

  it('should delete an item', async () => {
    const mockTodo: TodoItemData = {
      createdAt: '2023-04-03T20:30:00.000Z',
      createdBy: 'User',
      creatorId: 'creatorId',
      id: 'todoId',
      isLocked: false,
      status: 'pending',
      title: 'Todo',
    };

    renderWithTheme(<TodoItem todo={mockTodo} />);

    await userEvent.click(screen.getByTestId('TrashSimple'));
    expect(mockDeleteDoc).toHaveBeenCalledWith('doc');
  });

  it('should archive an item', async () => {
    const mockTodo: TodoItemData = {
      createdAt: '2023-04-03T20:30:00.000Z',
      createdBy: 'User',
      creatorId: 'creatorId',
      id: 'todoId',
      isLocked: false,
      status: 'completed',
      title: 'Todo',
    };

    renderWithTheme(<TodoItem todo={mockTodo} />);

    await userEvent.click(screen.getByTestId('File'));
    expect(mockUpdateDoc).toHaveBeenCalledWith('doc', {
      status: 'archived',
    });
  });

  it('should lock an item', async () => {
    const mockTodo: TodoItemData = {
      createdAt: '2023-04-03T20:30:00.000Z',
      createdBy: 'User',
      creatorId: 'creatorId',
      id: 'todoId',
      isLocked: false,
      status: 'completed',
      title: 'Todo',
    };

    renderWithTheme(<TodoItem todo={mockTodo} />);

    await userEvent.click(screen.getByTestId('LockOpen'));
    expect(mockUpdateDoc).toHaveBeenCalledWith('doc', {
      isLocked: true,
    });
  });

  it('should edit on click and change item title on blur', async () => {
    const mockTodo: TodoItemData = {
      createdAt: '2023-04-03T20:30:00.000Z',
      createdBy: 'User',
      creatorId: 'creatorId',
      id: 'todoId',
      isLocked: false,
      status: 'completed',
      title: 'Todo',
    };

    renderWithTheme(<TodoItem todo={mockTodo} />);

    await userEvent.click(screen.getByText('Todo').parentElement as Element);
    await userEvent.type(screen.getByRole('textbox'), '123');
    screen.getByRole('textbox').blur();
    expect(mockUpdateDoc).toHaveBeenCalledWith('doc', {
      title: 'Todo123',
    });
  });

  it('should edit on click and change item title  "Enter" key press', async () => {
    const mockTodo: TodoItemData = {
      createdAt: '2023-04-03T20:30:00.000Z',
      createdBy: 'User',
      creatorId: 'creatorId',
      id: 'todoId',
      isLocked: false,
      status: 'completed',
      title: 'Todo',
    };

    renderWithTheme(<TodoItem todo={mockTodo} />);

    await userEvent.click(screen.getByText('Todo').parentElement as Element);
    await userEvent.type(screen.getByRole('textbox'), '123{enter}');

    expect(mockUpdateDoc).toHaveBeenCalledWith('doc', {
      title: 'Todo123',
    });
  });
});
