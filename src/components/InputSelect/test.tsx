import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';

import { InputSelect } from '.';
import { renderWithTheme } from '../../../.vitest/setup-tests';

vi.mock('phosphor-react', () => ({
  CaretRight: function Mock() {
    return <div data-testid="CaretRight" />;
  },
}));

describe('<InputSelect />', () => {
  it('should render correctly', async () => {
    const mockOnSelect = vi.fn();

    renderWithTheme(
      <InputSelect
        onSelect={mockOnSelect}
        options={['all', 'completed', 'pendind', 'archived', 'user']}
        selectedIndex={0}
        label="all"
      />
    );

    expect(screen.getByText('all')).toBeInTheDocument();
    expect(screen.getByTestId('CaretRight')).toBeInTheDocument();

    expect(screen.getAllByRole('listitem')).toHaveLength(1);

    await userEvent.click(screen.getByText('all'));

    expect(screen.getAllByRole('listitem')).toHaveLength(5);
  });
});
