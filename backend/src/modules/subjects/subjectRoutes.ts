import { Router } from 'express';
import { getSubjects, getSubjectById, getSubjectTree } from './subjectController';
import { authenticate } from '../../middleware/authMiddleware';

const router = Router();

router.get('/', getSubjects);
router.get('/:subjectId', getSubjectById);
router.get('/:subjectId/tree', authenticate, getSubjectTree);

export default router;
