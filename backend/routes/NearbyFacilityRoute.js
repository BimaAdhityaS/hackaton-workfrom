import express from 'express';
import { 
    getNearbyFacilites,
    getNearbyFaciliteById,
    createNearbyFacilite,
    updateNearbyFacilite,
    deleteNearbyFacilite 
} from '../controllers/NearbyFacilities.js';
import { verifyUser } from '../middleware/AuthUser.js';

const router = express.Router();

router.get('/nearbyfacility/:locationid', getNearbyFacilites);
router.get('/nearbyfacility/:locationid/:id', getNearbyFaciliteById);
router.post('/nearbyfacility/:locationid', verifyUser,createNearbyFacilite);
router.patch('/nearbyfacility/:locationid/:id', verifyUser,updateNearbyFacilite);
router.delete('/nearbyfacility/:locationid/:id', verifyUser,deleteNearbyFacilite);

export default router;