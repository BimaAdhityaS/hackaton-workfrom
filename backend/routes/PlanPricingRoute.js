import express from "express";
import { 
    getPlanPricings,
    getPlanPricingById,
    createPlanPricing,
    updatePlanPricing,
    deletePlanPricing
} from "../controllers/PlanPricings.js";
import { verifyUser } from '../middleware/AuthUser.js';

const router = express.Router();

router.get('/planpricing/:locationid',getPlanPricings);
router.get('/planpricing/:locationid/:id', getPlanPricingById);
router.post('/planpricing/:locationid', verifyUser, createPlanPricing);
router.patch('/planpricing/:locationid/:id', verifyUser, updatePlanPricing);
router.delete('/planpricing/:locationid/:id', verifyUser, deletePlanPricing);

export default router;