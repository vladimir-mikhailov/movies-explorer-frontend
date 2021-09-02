import { render, screen } from '@testing-library/react';
import AboutProject from './AboutProject';

test('renders learn react link', () => {
  render(<AboutProject />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
