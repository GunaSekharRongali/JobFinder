import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { login } from '../api';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const navigate = useNavigate(); // Initialize the useNavigate hook

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = await login(formData);
            localStorage.setItem('userInfo', JSON.stringify(data));  // Save token to localStorage
            navigate('/createUserProfile'); // Redirect to job listings page
            alert('Login successful!');
        } catch (error) {
            setError('Invalid email or password');
        }
    };

    return (
        <div className='container mt-5 p-5 w-50 mx-auto bg-smoke rounded shadow mx-auto'>
        <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" name="email" onChange={handleChange} required/>
            </Form.Group>
            <Form.Group controlId="formPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" name="password" onChange={handleChange} required/>
            </Form.Group>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <Button variant="primary" type="submit" className="mt-3">Login</Button>
        </Form>
        <p className="m-3">Don't have an account? <Link to="/signup">Signup</Link></p>
        </div>
    );
};

export default LoginForm;
