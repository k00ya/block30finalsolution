import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from './AuthContext'; 
import '../index.css'; 

const Navigation = () => {
  const { isAuthenticated, logout } = useAuth();

  return (
    <nav className="navBar">
      <ul className="navList">
        <li className="navItem"><Link className="link" to="/">Home</Link></li>
        {isAuthenticated ? (
          <>
            <li className="navItem"><Link className="link" to="/account">Account</Link></li>
            <li className="navItem"><button className="button" onClick={logout}>Logout</button></li>
          </>
        ) : (
          <>
            <li className="navItem"><Link className="link" to="/login">Login</Link></li>
            <li className="navItem"><Link className="link" to="/register">Register</Link></li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navigation;
