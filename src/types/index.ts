export type TodoStatus = 'completed' | 'pending' | 'archived';

export type TodoItemData = {
  id: string;
  title: string;
  status: TodoStatus;
  createdAt: string;
  createdBy: string;
  creatorId: string;
  isLocked: boolean;
};

export type FilterOption =
  | 'all'
  | 'completed'
  | 'pending'
  | 'user'
  | 'archived'
  | string;

export type User = {
  name: string | null;
  email: string | null;
  id: string;
};
