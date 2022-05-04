import { render, screen } from '@testing-library/react';
import Input from './Input';

describe('Input component', () => {  
  test('renders as expected', () => {
    render(<Input label='Test' input={{id: 1}}/>);
    const inputElement = screen.getByRole('input');
    const testElement = screen.getByText('Test');
    expect(inputElement).toBeInTheDocument();
    expect(testElement).toBeInTheDocument();
  });
});