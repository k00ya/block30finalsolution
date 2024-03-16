import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { deleteReservation } from '../API';

const ReturnBook = ({ reservationId, onReturnSuccess }) => { // Added onReturnSuccess prop
  const { token, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');


  const handleReturnBook = () => {
    if (!isAuthenticated || !token) {
      alert("You must be logged in to return a book.");
      return;
    }
    if (!reservationId) {
      console.error('No reservationId provided.');
      setErrorMessage('Error: No book selected for return.');
      return;
    }

    setIsProcessing(true);
    deleteReservation(reservationId, token)
      .then(result => {
        ('Reservation deleted successfully:', result);
        if (onReturnSuccess) {
          onReturnSuccess(); 
        }
        navigate('/account'); // Redirect after successful operation. Consider revising based on UX.
      })
      .catch(error => {
        console.error('Failed to delete reservation:', error);
        setErrorMessage('Failed to return the book. Please try again later.');
      })
      .finally(() => setIsProcessing(false)); // Reset processing state
  };

  return (
    <div>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      <button onClick={handleReturnBook} disabled={isProcessing}>
        {isProcessing ? 'Returning...' : 'Return Book'}
      </button>
    </div>
  );
};

export default ReturnBook;
