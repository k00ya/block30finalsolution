import React, { useState } from 'react';
import { useAuth } from './AuthContext'; 
import { updateBookAvailability } from '../API'; 

const CheckOutBook = ({ bookId, isAvailable, onStatusChange }) => {
  const { token, isAuthenticated } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const handleAction = async () => {
    if (!isAuthenticated) {
      alert("Please log in to perform this action.");
      return;
    }

    if (!isAvailable) {
      alert("This book is currently checked out and cannot be checked out again.");
      return;
    }

    setIsLoading(true);
    try {
      await updateBookAvailability(bookId, !isAvailable, token);
      console.log('Action successful');
      if (onStatusChange) {
        onStatusChange(); // This will refresh the books list, updating the availability
      }
    } catch (error) {
      console.error('Failed to perform action:', error);
      alert('Failed to perform action. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return isAuthenticated ? (
    <button onClick={handleAction} disabled={isLoading || !isAvailable}>
      {isLoading ? 'Processing...' : !isAvailable ? 'Unavailable' : 'Check Out'}
    </button>
  ) : null;
};

export default CheckOutBook;
