import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './component/AuthContext';
import Navigation from './component/Navigation';
import Books from './component/Books';
import SingleBook from './component/SingleBook';
import Login from './component/Login';
import Register from './component/Register';
import Account from './component/Account';
import UserCheckedOutBooks from './component/UserCheckedOutBooks'; 
function App() {
  return (
    <AuthProvider> 
      <BrowserRouter>
        <div className="App">
          <header className="App-header">
            <h1>Online Library</h1>
            <Navigation /> 
          </header>
          <main>
            <Routes>
              <Route path="/" element={<Books />} />
              <Route path="/book/:bookId" element={<SingleBook />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/account" element={<Account />} />
              <Route path="/reservations" element={<UserCheckedOutBooks />} /> 
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
