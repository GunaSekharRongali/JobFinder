import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { signup } from '../api';
import { Link, useNavigate } from 'react-router-dom';

const SignupForm = () => {
    const [formData, setFormData] = useState({ username: '', email: '', password: '' });
    const navigate = useNavigate(); 

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = await signup(formData);
            navigate('/login');
            localStorage.setItem('userInfo', JSON.stringify(data));  // Save token to localStorage
            alert('Signup successful!');
        } catch (error) {
            alert('Error in signup');
        }
    };

    return (
        <div className='container sm:w-[340px] mt-5 mx-0 p-5 w-50 mx-auto bg-smoke rounded shadow'>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formUsername">
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="text" name="username" onChange={handleChange} required/>
                </Form.Group>
                <Form.Group controlId="formEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" name="email" onChange={handleChange} required/>
                </Form.Group>
                <Form.Group controlId="formPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" name="password" onChange={handleChange} required/>
                </Form.Group>
                <Button variant="primary" type="submit" className="mt-3">Signup</Button>
            </Form>
            <p className="mt-3">
                Already have an account? <Link to="/login">Login here</Link>.
            </p>
        </div>
    );
};

export default SignupForm;
