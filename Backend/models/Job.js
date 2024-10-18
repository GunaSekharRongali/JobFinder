const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
    title: { type: String, required: true },
    company: { type: String, required: true },
    location: { type: String, required: true },
    salary: { type: String, required: true },
    description: { type: String, required: true },
    type: { type: String, required: true },
    postedDate: { type: Date, default: Date.now },
    skills: { type: [String], required: true },
    remote: { type: Boolean, default: false }
});

module.exports = mongoose.model('Job', jobSchema);
