import express from 'express'
const router = express.Router()
import {
    getProducts,
    getProductById,
    getTopProducts,
    deleteProduct,
    createProduct,
    updateProduct,
    createProductReview,
    updateProductOnOrder
} from '../controllers/productController.js'
import { protect, admin } from '../middleware/authMiddleware.js'

router
    .route('/')
    .get(getProducts)
    .post(protect, admin, createProduct)
router.get('/top', getTopProducts)
router
    .route('/:id')
    .get(getProductById)
    .delete(protect, admin, deleteProduct)
    .put(protect, admin, updateProduct)
router.route('/:id/order').put(protect, updateProductOnOrder)
router.route('/:id/reviews').post(protect, createProductReview)


export default router