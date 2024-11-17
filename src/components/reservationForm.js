import React, { useState } from 'react';
import axios from 'axios';

function ReservationForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [seats, setSeats] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!name || !email || !date || !time || !seats) {
        window.alert('Veuillez remplir tous les champs.');
        return;
    }
    try {
        const response = await axios.post('/api/reservations', { name, email, date, time, seats });
        if (response && response.data) {
            window.alert(`Réservation confirmée pour ${name}.`);
        } else {
            console.error('No response data');
        }
    } catch (error) {
        console.error(error);
        window.alert('Erreur lors de la réservation. Veuillez réessayer.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Reservation Form</h2>
      <label htmlFor="name">
        Name:
        <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} required />
      </label>
      <label htmlFor="email">
        Email:
        <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      </label>
      <label htmlFor="date">
        Date:
        <input type="date" id="date" value={date} onChange={(e) => setDate(e.target.value)} lang="en-GB" required />
      </label>
      <label htmlFor="time">
        Time:
        <input type="time" id="time" value={time} onChange={(e) => setTime(e.target.value)} required />
      </label>
      <label htmlFor="seats">
        Number of Seats:
        <input type="number" id="seats" value={seats} onChange={(e) => setSeats(e.target.value)} required />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
}

export default ReservationForm;
