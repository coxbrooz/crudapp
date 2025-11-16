import { render, screen } from '@testing-library/react';
import Login from './login';

test('renders email input', () => {
  render(<Login />);
  const emailInput = screen.getByLabelText(/Eamail:/i);
  expect(emailInput).toBeInTheDocument();
});

test('renders password input', () => {
  render(<Login />);
  const passwordInput = screen.getByLabelText(/Password:/i);
  expect(passwordInput).toBeInTheDocument();
});

test('renders login button', () => {
  render(<Login />);
  const loginButton = screen.getByRole('button', { name: /Log in/i });
  expect(loginButton).toBeInTheDocument();
});

test('renders create account button', () => {
  render(<Login />);
  const createAccountButton = screen.getByRole('button', { name: /Create Account/i });
  expect(createAccountButton).toBeInTheDocument();
});
