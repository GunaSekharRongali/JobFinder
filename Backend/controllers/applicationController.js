const path = require('path');
const UserProfile = require('../models/UserProfile');
const Application = require(path.resolve(__dirname, '../models/Application'));
const Job = require(path.resolve(__dirname, '../models/Job'));

// Create a new job application
exports.createApplication = async (req, res) => {
    const { userId, jobId } = req.body;
    console.log(userId, jobId );
    
    try {
        const userProfile = await UserProfile.findById(userId);
        const job = await Job.findById(jobId);
        if (!userProfile || !job) return res.status(404).json({ message: 'User or Job not found' });

        const newApplication = new Application({
            userProfile: userId,
            job: jobId
        });

        const savedApplication = await newApplication.save();

        // Add the application to the user's applications list
        userProfile.applications.push(savedApplication._id);
        await userProfile.save();

        res.status(201).json(savedApplication);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Get applications by user
exports.getApplicationsByUser = async (req, res) => {
    try {
        // Ensure the query uses the correct field name from the schema
        const applications = await Application.find({ userProfile: req.params.userId }).populate('job'); 
        res.json(applications);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


// Update application status
exports.updateApplicationStatus = async (req, res) => {
    const { status } = req.body;

    try {
        const updatedApplication = await Application.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true }
        );
        if (!updatedApplication) return res.status(404).json({ message: 'Application not found' });
        res.json(updatedApplication);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
