import express from "express";
import { 
    getAmenities,
    getAmenitieById,
    createAmenitie,
    updateAmenitie,
    deleteAmenitie
} from "../controllers/Amenities.js";
import { verifyUser } from '../middleware/AuthUser.js';

const router = express.Router();

router.get('/amenities/:locationid', getAmenities);
router.get('/amenities/:locationid/:id', getAmenitieById);
router.post('/amenities/:locationid', verifyUser, createAmenitie);
router.patch('/amenities/:locationid/:id', verifyUser,updateAmenitie);
router.delete('/amenities/:locationid/:id', verifyUser,deleteAmenitie);

export default router;