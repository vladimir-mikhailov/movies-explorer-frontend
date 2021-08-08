import { render, screen } from '@testing-library/react';
import NavTab from './NavTab';

test('renders learn react link', () => {
  render(<NavTab />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
