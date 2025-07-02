const express = require('express');
const { body, param, query } = require('express-validator');
const { auth, adminAuth } = require('../middleware/auth');
const { uploadMiddleware } = require('../middleware/upload');
const {
    addProduct,
    getAllProducts,
    removeProduct,
    getNewCollections,
    getPopularInWomen,
    updateProduct,
    getProductById
} = require('../controllers/productController');

const router = express.Router();

// Validation middleware
const validateProduct = [
    body('id').isInt({ min: 1 }).withMessage('Product ID must be a positive integer'),
    body('name').trim().isLength({ min: 1, max: 100 }).withMessage('Product name is required and must be less than 100 characters'),
    body('image').trim().isLength({ min: 1 }).withMessage('Product image is required'),
    body('category').isIn(['men', 'women', 'kids', 'accessories', 'electronics', 'home', 'sports']).withMessage('Invalid category'),
    body('new_price').isFloat({ min: 0 }).withMessage('New price must be a positive number'),
    body('old_price').isFloat({ min: 0 }).withMessage('Old price must be a positive number'),
    body('description').optional().trim().isLength({ max: 500 }).withMessage('Description must be less than 500 characters'),
    body('stock').optional().isInt({ min: 0 }).withMessage('Stock must be a non-negative integer')
];

const validateUpdateProduct = [
    body('name').optional().trim().isLength({ min: 1, max: 100 }).withMessage('Product name must be less than 100 characters'),
    body('image').optional().trim().isLength({ min: 1 }).withMessage('Product image is required'),
    body('category').optional().isIn(['men', 'women', 'kids', 'accessories', 'electronics', 'home', 'sports']).withMessage('Invalid category'),
    body('new_price').optional().isFloat({ min: 0 }).withMessage('New price must be a positive number'),
    body('old_price').optional().isFloat({ min: 0 }).withMessage('Old price must be a positive number'),
    body('description').optional().trim().isLength({ max: 500 }).withMessage('Description must be less than 500 characters'),
    body('stock').optional().isInt({ min: 0 }).withMessage('Stock must be a non-negative integer'),
    body('available').optional().isBoolean().withMessage('Available must be a boolean')
];

const validateRemoveProduct = [
    body('id').isInt({ min: 1 }).withMessage('Product ID must be a positive integer')
];

const validateProductId = [
    param('id').isInt({ min: 1 }).withMessage('Product ID must be a positive integer')
];

const validateQueryParams = [
    query('category').optional().isIn(['men', 'women', 'kids', 'accessories', 'electronics', 'home', 'sports']).withMessage('Invalid category'),
    query('available').optional().isIn(['true', 'false']).withMessage('Available must be true or false'),
    query('limit').optional().isInt({ min: 1, max: 100 }).withMessage('Limit must be between 1 and 100'),
    query('page').optional().isInt({ min: 1 }).withMessage('Page must be a positive integer')
];

// Routes
// @route   POST /addproduct
// @desc    Add new product (Admin only)
// @access  Private/Admin
router.post('/addproduct', adminAuth, validateProduct, addProduct);

// @route   GET /allproducts
// @desc    Get all products with optional filtering
// @access  Public
router.get('/allproducts', validateQueryParams, getAllProducts);

// @route   POST /removeproduct
// @desc    Remove product by ID (Admin only)
// @access  Private/Admin
router.post('/removeproduct', adminAuth, validateRemoveProduct, removeProduct);

// @route   GET /newcollections
// @desc    Get latest 8 products
// @access  Public
router.get('/newcollections', getNewCollections);

// @route   GET /popularinwomen
// @desc    Get popular products in women category
// @access  Public
router.get('/popularinwomen', getPopularInWomen);

// @route   PUT /updateproduct/:id
// @desc    Update product by ID (Admin only)
// @access  Private/Admin
router.put('/updateproduct/:id', adminAuth, validateProductId, validateUpdateProduct, updateProduct);

// @route   GET /product/:id
// @desc    Get single product by ID
// @access  Public
router.get('/product/:id', validateProductId, getProductById);

module.exports = router; 