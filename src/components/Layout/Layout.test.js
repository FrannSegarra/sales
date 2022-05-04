import { render, screen } from '@testing-library/react';
import Layout from './Layout';

describe('Layout components', () => {  
  test('renders the content as expected', () => {
    render(<Layout><label>My label test</label></Layout>);
    const bodyElement = screen.getByText('My label test');
    const headerElement = screen.getByText('Sales Challenge');
    const footerElement = screen.getByText('Francisco Segarra - 2022');
    expect(bodyElement).toBeInTheDocument();
    expect(headerElement).toBeInTheDocument();
    expect(footerElement).toBeInTheDocument();
  });
});