import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import JobList from './components/JobList';
import JobDetails from './components/JobDetails';
import ApplicationList from './components/ApplicationList';
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';
import ProtectedRoute from './components/ProtectedRoute';
import CreateUserProfile from './components/createUserProfile';
import NavbarComponent from './components/NavbarComponent';


function App() {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));

    return (
        <Router>
            {userInfo && <NavbarComponent/>}
            <Routes>
                <Route path="/" element={userInfo ? <Navigate to="/jobs" /> : <Navigate to="/login" />} />
                <Route path="/login" element={<LoginForm />} />
                <Route path="/signup" element={<SignupForm />} />
                <Route path="/jobs" element={<JobList />} />
                <Route path="/jobs/:id" element={<JobDetails />} />
                <Route
                    path="/profile"
                    element={
                        <ProtectedRoute>
                            <CreateUserProfile />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/applications"
                    element={
                        <ProtectedRoute>
                            <ApplicationList />
                        </ProtectedRoute>
                    }
                />
            </Routes>
        </Router>
    );
}

export default App;
