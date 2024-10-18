import axios from 'axios';

const API_URL = 'http://localhost:3000/api';  // Update based on your server

// Signup user
export const signup = async (userData) => {
    const response = await axios.post(`${API_URL}/signup`, userData);
    return response.data;
};

// Login user
export const login = async (userData) => {
    const response = await axios.post(`${API_URL}/login`, userData);
    return response.data;
};

// Get all jobs
export const getAllJobs = async () => {
    const response = await axios.get(`${API_URL}/jobs`);
    return response.data;
};

// Get job by ID
export const getJobById = async (id) => {
    const response = await axios.get(`${API_URL}/jobs/${id}`);
    return response.data;
};

// Apply to a job
export const applyToJob = async (jobId) => {
    const userId = JSON.parse(localStorage.getItem("userProfile"));
    console.log(userId, jobId);
    
    const response = await axios.post(`${API_URL}/applications`, { userId, jobId });
    return response.data;
};

// Get all applications for a user
export const getUserApplications = async () => {
    const userId = JSON.parse(localStorage.getItem("userProfile"));
    console.log(userId);
    
    const response = await axios.get(`${API_URL}/applications/userprofile/${userId}`);
    return response.data;
};

// Get user profile
export const getUserProfile = async () => {
    const userId = JSON.parse(localStorage.getItem('userInfo')).email;
    const response = await axios.get(`${API_URL}/userprofile/${userId}`);
    return response.data;
};

// Update user profile
export const createUserProfile = async (profileData) => {
    const response = await axios.post(`${API_URL}/userprofile`, profileData);
    return response.data;
};

export const updateUserProfile = async (profileData) => {
    const userId = JSON.parse(localStorage.getItem('userInfo')).email;
    const response = await axios.put(`${API_URL}/userprofile/${userId}`, profileData);
    return response.data;
};
