const path = require('path');
const Job = require(path.resolve(__dirname, '../models/Job'));


// Get all jobs
exports.getAllJobs = async (req, res) => {
    try {
        const jobs = await Job.find();
        res.json(jobs);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Create a new job
exports.createJob = async (req, res) => {
    const { title, company, location, description, jobType } = req.body;

    const newJob = new Job({
        title,
        company,
        location,
        description,
        jobType
    });

    try {
        const savedJob = await newJob.save();
        res.status(201).json(savedJob);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Get a specific job by ID
exports.getJobById = async (req, res) => {
    try {
        const job = await Job.findById(req.params.id);
        if (!job) return res.status(404).json({ message: 'Job not found' });
        res.json(job);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Update a job by ID
exports.updateJob = async (req, res) => {
    const { title, company, location, description, jobType } = req.body;

    try {
        const updatedJob = await Job.findByIdAndUpdate(
            req.params.id,
            { title, company, location, description, jobType },
            { new: true }
        );
        if (!updatedJob) return res.status(404).json({ message: 'Job not found' });
        res.json(updatedJob);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Delete a job by ID
exports.deleteJob = async (req, res) => {
    try {
        const deletedJob = await Job.findByIdAndDelete(req.params.id);
        if (!deletedJob) return res.status(404).json({ message: 'Job not found' });
        res.json({ message: 'Job deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
