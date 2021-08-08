import { render, screen } from '@testing-library/react';
import SavedMovies from './SavedMovies';

test('renders learn react link', () => {
  render(<SavedMovies />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
