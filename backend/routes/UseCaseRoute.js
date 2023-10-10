import express from "express";
import { 
    getUseCases,
    getUseCaseById,
    createUseCase,
    updateUseCase,
    deleteUseCase
} from "../controllers/UseCases.js";
import { verifyUser } from '../middleware/AuthUser.js';

const router = express.Router();

router.get('/usecases/:locationid', getUseCases);
router.get('/usecases/:locationid/:id',getUseCaseById);
router.post('/usecases/:locationid', verifyUser,createUseCase);
router.patch('/usecases/:locationid/:id', verifyUser, updateUseCase);
router.delete('/usecases/:locationid/:id', verifyUser,deleteUseCase);

export default router;