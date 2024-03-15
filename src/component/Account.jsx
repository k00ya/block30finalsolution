import React, { useState, useEffect } from 'react';
import { fetchUserDetails } from '../API'; 
import UserCheckedOutBooks from './UserCheckedOutBooks'; 
import { useAuth } from './AuthContext'; 
const Account = () => {
  const { token } = useAuth(); // Assuming useAuth provides the authenticated user's token
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!token) {
      setError('No token found. Please log in.');
      return;
    }

    fetchUserDetails(token)
      .then(data => {
        setUserData(data);
      })
      .catch(err => {
        setError('Failed to fetch user details. Please try logging in again.');
        console.error(err);
      });
  }, [token]);

  if (error) {
    return <div>{error}</div>;
  }

  if (!userData) {
    return <div>Loading user details...</div>;
  }

  // Display user details and the UserCheckedOutBooks component for checked-out books
  return (
    <div>
      <h2>Account Details</h2>
      <p><strong>ID:</strong> {userData.id}</p>
      <p><strong>First Name:</strong> {userData.firstname}</p>
      <p><strong>Last Name:</strong> {userData.lastname}</p>
      <p><strong>Email:</strong> {userData.email}</p>
      <UserCheckedOutBooks token={token} />
    </div>
  );
};

export default Account;
