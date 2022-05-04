import { render, screen } from '@testing-library/react';
import Modal from './Modal';

jest.mock('react-dom', () => ({
  ...jest.requireActual('react-dom'),
  createPortal: (element) => element
}));

describe('Modal component', () => {  
  test('renders as expected', () => {
    render(<Modal><h1>Test</h1></Modal>);
    const backdropElement = screen.getByRole('backdrop');
    const modalElement = screen.getByRole('modal');
    const testElement = screen.getByText('Test');
    expect(backdropElement).toBeInTheDocument();
    expect(modalElement).toBeInTheDocument();
    expect(testElement).toBeInTheDocument();
  });
});

