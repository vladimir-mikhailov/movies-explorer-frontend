import { render, screen } from '@testing-library/react';
import AboutMe from './AboutMe';

test('renders learn react link', () => {
  render(<AboutMe />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
