import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Starter from './Starter';

// Sample Test
describe('Starter', () => {
  const user = userEvent.setup();

  it('renders', () => {
    render(<Starter />);
    expect(
      screen.getByText('Mui + Mui icons installed!')
    ).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('responds to clicks', async () => {
    render(<Starter />);
    await user.click(screen.getByRole('button'));
  });
});
