// src/API.js
const BASE_URL = 'https://fsa-book-buddy-b6e748d1380d.herokuapp.com';

export const fetchBooks = () => {
  return fetch(`${BASE_URL}/api/books`, {
    headers: {
      'Content-Type': 'application/json',
    },
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .catch(error => {
    throw new Error('Error fetching data: ' + error.message);
  });
};

export const fetchBookDetails = (bookId) => {
    return fetch(`${BASE_URL}/api/books/${bookId}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .catch(error => {
      throw new Error('Error fetching book details: ' + error.message);
    });
  };
  
  export const registerUser = ({ firstname, lastname, email, password }) => {
    return fetch(`${BASE_URL}/api/users/register`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            firstname,
            lastname,
            email,
            password,
        }),
    })
    .then(response => {
        if (!response.ok) {
            // Convert non-2xx HTTP responses into errors
            return response.json().then(body => {
                throw new Error(body.message || 'Registration failed');
            });
        }
        return response.json();
    });
};

export const loginUser = ({ email, password }) => {
  return fetch('https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/users/login', {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
      password,
    }),
  })
  .then(response => {
    if (!response.ok) {
      // Convert non-2xx HTTP responses into errors
      return response.json().then(body => {
        throw new Error(body.message || 'Login failed');
      });
    }
    return response.json();
  });
};

export const fetchUserDetails = (token) => {
  return fetch('https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/users/me', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .catch(error => {
    console.error("Error fetching user details:", error);
    throw error;
  });
};

export const updateBookAvailability = (bookId, available, token) => {
  return fetch(`${BASE_URL}/api/books/${bookId}`, {
    method: "PATCH",
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({
      available
    }),
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(result => {
    (result);
    return result;
  })
  .catch(error => {
    console.error("Error updating book availability:", error);
    throw error;
  });
};

export const deleteReservation = (reservationId, token) => {
  return fetch(`${BASE_URL}/api/reservations/${reservationId}`, {
    method: "DELETE",
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(result => {
    (result);
    return result;
  })
  .catch(error => {
    console.error("Error deleting reservation:", error);
    throw error;
  });
};

export const fetchUserReservations = (token) => {
  return fetch(`${BASE_URL}/api/reservations`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(result => {
    (result);
    return result;
  })
  .catch(error => {
    console.error("Error fetching user reservations:", error);
    throw error;
  });
};