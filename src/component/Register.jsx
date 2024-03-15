import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../API'; 
const Register = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        firstname: '',
        lastname: '',
        email: '',
        password: '',
    });

    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');

        registerUser(formData)
            .then(result => {
                console.log('Registration successful:', result);
                navigate('/login'); // Redirect to login on successful registration
            })
            .catch(error => {
                console.error('Registration failed:', error);
                setError(error.message || 'Registration failed. Please try again.');
            });
    };

    return (
        <div>
            <h2>Register</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>First Name</label>
                    <input type="text" name="firstname" value={formData.firstname} onChange={handleChange} required />
                </div>
                <div>
                    <label>Last Name</label>
                    <input type="text" name="lastname" value={formData.lastname} onChange={handleChange} required />
                </div>
                <div>
                    <label>Email</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} required />
                </div>
                <div>
                    <label>Password</label>
                    <input type="password" name="password" value={formData.password} onChange={handleChange} required />
                </div>
                <button type="submit">Register</button>
            </form>
            {error && <div className="error">{error}</div>}
        </div>
    );
};

export default Register;
