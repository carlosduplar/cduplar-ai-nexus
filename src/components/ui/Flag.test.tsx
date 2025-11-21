import { render, screen } from '@testing-library/react';
import Flag from './Flag';

describe('Flag component', () => {
  it('renders the flag with the correct country code', () => {
    render(<Flag countryCode="US" />);
    const flagElement = screen.getByRole('generic').firstChild;
    expect(flagElement).toHaveClass('fi-us');
  });

  it('renders with an additional className', () => {
    render(<Flag countryCode="BR" className="my-class" />);
    const flagElement = screen.getByRole('generic').firstChild;
    expect(flagElement).toHaveClass('fi-br');
    expect(flagElement).toHaveClass('my-class');
  });
});
