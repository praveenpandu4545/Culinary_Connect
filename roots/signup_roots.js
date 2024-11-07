const express = require('express');
const bcrypt = require('bcrypt');
const signupModel = require("../model/b_signup"); 
const session = require('express-session'); // Add session

const router = express.Router();

// Initialize session middleware
router.use(session({
    secret: 'your_secret_key', // Replace with a strong secret key
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false, httpOnly: true }
}));

// Signup route remains unchanged
router.post('/signup', async (req, res) => {
    const { name, email, mobile, password } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new signupModel({
            name,
            email,
            mobile,
            password: hashedPassword
        });

        await newUser.save();
        res.status(201).send("User signed up successfully!");
    } catch (error) {
        res.status(500).send("Error signing up user: " + error.message);
    }
});

// Login route with session creation
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await signupModel.findOne({ email });
        if (!user) {
            return res.status(400).send("User not found. Please sign up.");
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).send("Invalid password.");
        }

        // Successful login: set session
        req.session.userId = user._id; // Store user ID in session
        req.session.userName = user.name; // Store user name
        req.session.userEmail = user.email; // Store email
        req.session.userMobile = user.mobile; // Store mobile
        res.status(200).send("Login successful!");
    } catch (error) {
        res.status(500).send("Error during login: " + error.message);
    }
});

// Fetch user account details from session
router.get('/account', (req, res) => {
    if (req.session.userId) {
        // If session is available, send the stored user details
        res.status(200).json({
            name: req.session.userName,
            email: req.session.userEmail,
            mobile: req.session.userMobile
        });
    } else {
        res.status(401).send("User not logged in.");
    }
});

// Logout route: destroy the session
router.post('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).send("Failed to log out.");
        }
        res.status(200).send("Logged out successfully!");
    });
});

module.exports = router;
