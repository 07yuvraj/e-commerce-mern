import express from 'express'
const router = express.Router()
import { addOrderItems, getOrderById, updateOrderToPaid, getAllOrders, getAdminOrders, updateOrderToDelivered } from '../controllers/orderController.js'
import { protect, admin } from '../middleware/authMiddleware.js'

router.route('/').post(protect, addOrderItems).get(protect, admin, getAdminOrders)
router.route('/myorders').get(protect, getAllOrders)
router.route('/:id').get(protect, getOrderById)
router.route('/:id/pay').put(protect, updateOrderToPaid)
router.route('/:id/deliver').put(protect, updateOrderToDelivered)

export default router