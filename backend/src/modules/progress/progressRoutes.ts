import { Router } from 'express';
import { getProgress, updateProgress } from './progressController';
import { authenticate } from '../../middleware/authMiddleware';

const router = Router();

router.get('/videos/:videoId', authenticate, getProgress);
router.post('/videos/:videoId', authenticate, updateProgress);

export default router;
