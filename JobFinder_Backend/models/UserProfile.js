const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    education: { type: String, required: true },
    skills: { type: [String], required: true },
    languages: { type: [String], required: true },
    experience: { type: [String], required: true },
    certifications: { type: [String], required: true },
    location: { type: String, required: true },
    preferedJobType: { type: String, required: true },
    applications: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Application' }] // Add applications reference array
});

module.exports = mongoose.model('UserProfile', userSchema);