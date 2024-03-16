import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; 
import { fetchBookDetails } from '../API'; 
const SingleBook = () => {
  const [book, setBook] = useState(null);
  const { bookId } = useParams();
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    fetchBookDetails(bookId)
      .then(data => {
       ("Fetched book details:", data);
        if (data.book) {
          setBook(data.book);
        } else {
          console.error('Book details are not in the expected format:', data);
          setBook(null);
        }
      })
      .catch(error => {
        console.error('Error fetching book details:', error);
      });
  }, [bookId]);

  if (!book) {
    return <div>Loading...</div>;
  }

  // Function to handle back navigation
  const handleBack = () => {
    navigate('/'); // Navigate to the home page
  };

  return (
    <div>
      <button onClick={handleBack}>Back to Home</button> 
      <h2>{book.title}</h2>
      <p><strong>Author:</strong> {book.author}</p>
      <p><strong>Description:</strong> {book.description}</p>
      <img src={book.coverimage} alt={`Cover of ${book.title}`} style={{ maxWidth: '200px', maxHeight: '300px' }} />
      <p><strong>ID:</strong> {book.id}</p>
      <p><strong>Availability:</strong> {book.available ? 'Available' : 'Checked out'}</p>
    </div>
  );
};

export default SingleBook;
