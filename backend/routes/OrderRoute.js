import express from "express";
import { 
    getOrders,
    getOrderById,
    createOrder,
    updateOrder,
    deleteOrder
} from "../controllers/Orders.js";
import { verifyUser } from '../middleware/AuthUser.js';

const router = express.Router();

router.get('/orders', getOrders);
router.get('/orders/:id', getOrderById);
router.post('/orders/:locationid', verifyUser,createOrder);
router.patch('/orders/:id', verifyUser,updateOrder);
router.delete('/orders/:id', verifyUser,deleteOrder);

export default router;