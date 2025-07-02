const express = require('express');
const { body } = require('express-validator');
const { auth } = require('../middleware/auth');
const { handleValidationErrors } = require('../middleware/validation');
const {
    signup,
    login,
    addToCart,
    removeFromCart,
    getCart,
    getProfile,
    updateProfile
} = require('../controllers/userController');

const router = express.Router();

// Validation middleware
const validateSignup = [
    body('name').trim().isLength({ min: 2, max: 50 }).withMessage('Name must be between 2 and 50 characters'),
    body('email').isEmail().normalizeEmail().withMessage('Please provide a valid email'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    handleValidationErrors
];

const validateLogin = [
    body('email').isEmail().normalizeEmail().withMessage('Please provide a valid email'),
    body('password').notEmpty().withMessage('Password is required'),
    handleValidationErrors
];

const validateCartOperation = [
    body('itemId').isInt({ min: 1 }).withMessage('Item ID must be a positive integer'),
    body('quantity').optional().isInt({ min: 1 }).withMessage('Quantity must be a positive integer'),
    handleValidationErrors
];

const validateRemoveFromCart = [
    body('itemId').isInt({ min: 1 }).withMessage('Item ID must be a positive integer'),
    handleValidationErrors
];

const validateUpdateProfile = [
    body('name').optional().trim().isLength({ min: 2, max: 50 }).withMessage('Name must be between 2 and 50 characters'),
    body('email').optional().isEmail().normalizeEmail().withMessage('Please provide a valid email'),
    handleValidationErrors
];

// Routes
// @route   POST /signup
// @desc    User registration
// @access  Public
router.post('/signup', validateSignup, signup);

// @route   POST /login
// @desc    User login
// @access  Public
router.post('/login', validateLogin, login);

// @route   POST /addtocart
// @desc    Add item to user's cart
// @access  Private
router.post('/addtocart', auth, validateCartOperation, addToCart);

// @route   POST /removefromcart
// @desc    Remove item from user's cart
// @access  Private
router.post('/removefromcart', auth, validateRemoveFromCart, removeFromCart);

// @route   POST /getcart
// @desc    Get user's cart data
// @access  Private
router.post('/getcart', auth, getCart);

// @route   GET /profile
// @desc    Get user profile
// @access  Private
router.get('/profile', auth, getProfile);

// @route   PUT /profile
// @desc    Update user profile
// @access  Private
router.put('/profile', auth, validateUpdateProfile, updateProfile);

module.exports = router; 