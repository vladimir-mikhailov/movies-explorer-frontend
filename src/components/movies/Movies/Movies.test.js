import { render, screen } from '@testing-library/react';
import Movies from './Movies';

test('renders learn react link', () => {
  render(<Movies />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
