const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');
require('dotenv').config();
const jobRoutes = require('./routes/jobRoutes');
const userRoutes = require('./routes/userRoutes');
const applicationRoutes = require('./routes/applicationRoutes');
const path = require("path");

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/api', jobRoutes);
app.use('/api', userRoutes);
app.use('/api', applicationRoutes);

// Serve static files from the Vite build folder
const distPath = path.join(__dirname, 'dist');
app.use(express.static(distPath));

app.use((req, res, next) => {
    console.log(`Request made to: ${req.url}`);
    next();
  });
  

// Home route
app.get('/', (req, res) => {
    res.send('Welcome to the Job Finder API');
});

module.exports = app;
