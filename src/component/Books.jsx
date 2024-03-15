import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CheckOutBook from './CheckOutBook';
import { fetchBooks } from '../API';

function Books() {
  const [books, setBooks] = useState([]);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  // Function to fetch or refresh the books list
  const refreshBooks = () => {
    fetchBooks().then(data => {
      setBooks(data.books || []);
    }).catch(error => {
      setError('Error fetching books');
      console.error(error);
    });
  };

  useEffect(() => {
    refreshBooks(); // Fetch books on component mount
  }, []);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredBooks = books.filter(book =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (error) {
    return <div>Error: {error}</div>;
  }

  // Function to handle clicking on a book, navigating to its details page
  const handleBookClick = (bookId) => {
    navigate(`/book/${bookId}`);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search by title or author..."
        value={searchTerm}
        onChange={handleSearchChange}
        style={{ display: 'block', width: 'calc(100% - 20px)', padding: '10px', margin: '10px auto 20px auto', boxSizing: 'border-box' }}
      />
      <div className="bookListContainer">
        {filteredBooks.length > 0 ? (
          filteredBooks.map(book => (
            <div key={book.id} className="bookItem">
              <div className="bookItemContent" onClick={() => handleBookClick(book.id)}>
                <img src={book.coverimage} alt={`Cover of ${book.title}`} />
                <h3>{book.title} - {book.author}</h3>
                <p>Status: {book.available ? 'Available' : 'Checked out'}</p>
              </div>
              <div className="bookItemButton">
                <CheckOutBook bookId={book.id} isAvailable={book.available} onStatusChange={refreshBooks} />
              </div>
            </div>
          ))
        ) : (
          <div>No books found matching your criteria.</div>
        )}
      </div>
    </div>
  );
}

export default Books;
