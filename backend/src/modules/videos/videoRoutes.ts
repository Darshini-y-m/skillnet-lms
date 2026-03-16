import { Router } from 'express';
import { getVideoPlayback } from './videoController';
import { authenticate } from '../../middleware/authMiddleware';

const router = Router();

router.get('/:videoId', authenticate, getVideoPlayback);

export default router;
