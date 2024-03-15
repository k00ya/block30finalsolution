import React, { useState, useEffect, useCallback } from 'react';
import { fetchUserReservations } from '../API'; 
import ReturnBook from './ReturnBook'; 

const UserCheckedOutBooks = ({ token }) => {
  const [books, setBooks] = useState([]);
  const [error, setError] = useState('');

  const fetchBooks = useCallback(() => {
    if (!token) {
      setError('No token found. Please log in.');
      return;
    }

    fetchUserReservations(token)
      .then(response => {
        if (response.reservation && Array.isArray(response.reservation)) {
          setBooks(response.reservation); // Use the reservation array from the response
        } else {
          console.error('Expected an array for books, but received:', response);
          setError('Failed to fetch checked out books due to unexpected data format.');
        }
      })
      .catch(error => {
        console.error('Error fetching checked out books:', error);
        setError('Failed to fetch checked out books.');
      });
  }, [token]); // Ensure fetchBooks is only recreated when token changes

  useEffect(() => {
    fetchBooks();
  }, [fetchBooks, token]);

  if (error) {
    return <div>{error}</div>;
  }

  if (books.length === 0) {
    return <div>No books checked out.</div>;
  }

  return (
    <div>
      <h3>Checked Out Books</h3>
      {books.map((book) => (
        <div key={book.id}>
          <h4>{book.title} by {book.author}</h4>
          <p>{book.description}</p>
          <img src={book.coverimage} alt={`Cover of ${book.title}`} style={{ maxWidth: '100px' }} />
          <ReturnBook reservationId={book.id} onReturnSuccess={fetchBooks} />
        </div>
      ))}
    </div>
  );
};

export default UserCheckedOutBooks;
