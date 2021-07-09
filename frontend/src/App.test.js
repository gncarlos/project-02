import { render, screen } from '@testing-library/react';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import UserInput from './components/UserInput'

test('renders Enter your information header', () => {
  render(<Router>
    <UserInput />
  </Router>);
  const header = screen.getByText(/Enter your information:/i);
  expect(header).toBeInTheDocument();
});




test('continue button appears on page', () => {
  render(<Router> <UserInput/>
  </Router>);
  const searchButton = screen.getByRole('button');
  expect(searchButton).toBeInTheDocument();
});

test('First Name textfield appears on page', () => {
  render(<Router> <UserInput/>
  </Router>);
  const searchButton = screen.getAllByRole('textbox');
  expect(searchButton).toHaveLength(2);
});

test('age field appears on screed', async () => {
  render(<Router> <UserInput/> 
  </Router>);
  const searchButton = screen.getByTestId('age_field');
  expect(searchButton).toBeInTheDocument();
});

