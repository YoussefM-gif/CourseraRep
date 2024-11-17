import React from 'react';
import Header from './components/Header';
import ReservationForm from './components/reservationForm';
import './App.css';

function App() {
  return (
    <div className="App">
      <Header />
      <ReservationForm />
      {/* Add other components here */}
    </div>
  );
}

export default App;
