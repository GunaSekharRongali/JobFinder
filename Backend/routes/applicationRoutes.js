const express = require('express');
const router = express.Router();
const applicationController = require('../controllers/applicationController');

router.post('/applications', applicationController.createApplication);
router.get('/applications/userprofile/:userId', applicationController.getApplicationsByUser);
router.put('/applications/:id', applicationController.updateApplicationStatus);

module.exports = router;
