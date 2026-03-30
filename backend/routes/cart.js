import express from 'express';

import {
    addToCart,
    removeItem,
    updateQuantity,
    getCart
} from '../controllers/cartController.js';

const router = express.Router();

// Add items to cart
router.post('/add', addToCart);

// Remove items to cart
router.post('/remove', removeItem);

// Updates items to cart
router.post('/update', updateQuantity);

// Add items to cart
router.get('/:userId', getCart);

export default router ;

