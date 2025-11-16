import { render, screen } from '@testing-library/react';
import App from './App';
import axios from 'axios';

jest.mock('axios');

test('renders login component', () => {
  axios.get.mockResolvedValue({ data: [] });
  render(<App />);
  const loginButton = screen.getByRole('button', { name: /Log in/i });
  expect(loginButton).toBeInTheDocument();
});
