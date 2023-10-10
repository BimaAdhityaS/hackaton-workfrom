import express from 'express';
import {
    getLocations,
    getLocationById,
    createLocation,
    updateLocation,
    deleteLocation
} from '../controllers/Locations.js';
import { verifyUser } from '../middleware/AuthUser.js';


const router = express.Router();

router.get('/locations', verifyUser,getLocations);
router.get('/locations/:id', verifyUser,getLocationById);
router.post('/locations', verifyUser,createLocation);
router.patch('/locations/:id', verifyUser,updateLocation);
router.delete('/locations/:id', verifyUser,deleteLocation);

export default router;