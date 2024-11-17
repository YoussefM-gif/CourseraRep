import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import ReservationForm from './reservationForm';
import axios from 'axios';
import { act } from 'react';

jest.mock('axios');

beforeEach(() => {
  jest.spyOn(window, 'alert').mockImplementation(() => {});
});

afterEach(() => {
  jest.restoreAllMocks();
});

describe('ReservationForm Tests', () => {
  test('shows alert if fields are empty', async () => {
    render(<ReservationForm />);
    await act(async () => {
      fireEvent.click(screen.getByText(/Submit/i));
    });
    expect(window.alert).toHaveBeenCalledWith('Veuillez remplir tous les champs.');
  });

  test('submits form data correctly', async () => {
    axios.post.mockResolvedValueOnce({ data: {} });
    render(<ReservationForm />);
    fireEvent.change(screen.getByLabelText(/Name/i), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'john.doe@example.com' } });
    fireEvent.change(screen.getByLabelText(/Date/i), { target: { value: '2023-10-10' } });
    fireEvent.change(screen.getByLabelText(/Time/i), { target: { value: '18:00' } });
    fireEvent.change(screen.getByLabelText(/Number of Seats/i), { target: { value: '2' } });
    await act(async () => {
      fireEvent.click(screen.getByText(/Submit/i));
    });
    expect(window.alert).toHaveBeenCalledWith('Réservation confirmée pour John Doe.');
  });

  test('shows error alert on API error', async () => {
    axios.post.mockRejectedValueOnce(new Error('API Error'));
    render(<ReservationForm />);
    fireEvent.change(screen.getByLabelText(/Name/i), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'john.doe@example.com' } });
    fireEvent.change(screen.getByLabelText(/Date/i), { target: { value: '2023-10-10' } });
    fireEvent.change(screen.getByLabelText(/Time/i), { target: { value: '18:00' } });
    fireEvent.change(screen.getByLabelText(/Number of Seats/i), { target: { value: '2' } });
    await act(async () => {
      fireEvent.click(screen.getByText(/Submit/i));
    });
    expect(window.alert).toHaveBeenCalledWith('Erreur lors de la réservation. Veuillez réessayer.');
  });

  // Additional tests...
});