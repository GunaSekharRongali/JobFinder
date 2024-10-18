const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/users', userController.getAllUsers);
router.post('/signup', userController.createUser);
router.post('/login', userController.loginUser);
router.post('/userprofile', userController.createUserProfile);
router.get('/userprofile/:userId', userController.getUserProfile);
router.put('/userprofile/:userId', userController.updateUserProfile);
router.delete('/users/:id', userController.deleteUser);

module.exports = router;
