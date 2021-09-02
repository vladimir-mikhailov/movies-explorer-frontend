import { render, screen } from '@testing-library/react';
import Promo from './Promo';

test('renders learn react link', () => {
  render(<Promo />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
