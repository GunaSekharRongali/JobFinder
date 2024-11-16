const path = require('path');
const User = require(path.resolve(__dirname, '../models/User'));
const UserProfile = require(path.resolve(__dirname, '../models/UserProfile'));

// Get all users
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Create a new user
exports.createUser = async (req, res) => {
    const { username, email, password } = req.body;

    const newUser = new User({
        username,
        email,
        password
    });

    try {
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Login a user
exports.loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: 'User not found' });
        if (user.password !== password) return res.status(401).json({ message: 'Invalid password' });
        res.json(user);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

exports.createUserProfile = async (req, res) => {
    const { username, email, education, skills, languages, experience, certifications, location, preferedJobType } = req.body;
    

    
    const newUserProfile = new UserProfile({
        username,
        email,
        education,
        skills,
        languages,
        experience,
        certifications,
        location,
        preferedJobType
    });
    
    try {
        const user = await User.findOne({email});
        console.log(user);
        
        if (!user) return res.status(404).json({ message: 'User not found' });
        const savedUserProfile = await newUserProfile.save();
        res.status(201).json(savedUserProfile);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}
// Get user by ID
exports.getUserProfile = async (req, res) => {
    try {
        const userId = req.params.userId;
        const data = await UserProfile.findOne({email:userId});
        // .populate('applications');
        if (!data) return res.status(404).json({ message: 'User not found' });
        res.json(data);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Update a user by ID
exports.updateUserProfile = async (req, res) => {
    const { username, email, education, skills, languages, experience, certifications, location, preferedJobType } = req.body;

    try {
        console.log(req.params.userId);
        const userId = req.params.userId;

        const updatedUserProfile = await UserProfile.findOneAndUpdate(
            {email:userId},
            { username, email, education, skills, languages, experience, certifications, location, preferedJobType },
            { new: true }
        );
        if (!updatedUserProfile) return res.status(404).json({ message: 'User not found' });
        res.json(updatedUserProfile);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Delete a user by ID
exports.deleteUser = async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);
        if (!deletedUser) return res.status(404).json({ message: 'User not found' });
        res.json({ message: 'User deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
