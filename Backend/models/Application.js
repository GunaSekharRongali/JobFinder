const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
    userProfile: { type: mongoose.Schema.Types.ObjectId, ref: 'UserProfile', required: true },
    job: { type: mongoose.Schema.Types.ObjectId, ref: 'Job', required: true },
    appliedDate: { type: Date, default: Date.now },
    status: {
        type: String,
        enum: ['applied', 'shortlisted', 'rejected', 'interview', 'hired'],
        default: 'applied'
    }
});

module.exports = mongoose.model('Application', applicationSchema);
