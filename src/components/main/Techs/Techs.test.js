import { render, screen } from '@testing-library/react';
import Techs from './Techs';

test('renders learn react link', () => {
  render(<Techs />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
