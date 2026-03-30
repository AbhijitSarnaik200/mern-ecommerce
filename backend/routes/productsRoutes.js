import express from 'express';

import {
    createProduct,
    getProducts,
    updateProduct,
    deleteProduct
} from '../controllers/productController.js';

const router = express.Router();

// Route to Create a new products 
router.post('/add',createProduct );

// Route to get all products 
router.get('/', getProducts );

// Route to Update all products 
router.put('/update/:id', updateProduct );

// Route to Delete a product by ID
router.delete('/delete/:id', deleteProduct );

export default router;