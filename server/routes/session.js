import express from 'express';
import { sessionRequest, sessionAccept, sessionDecline, allSessions} from '../controllers/sessions';
import checkAuth from '../middleware/checkAuth';
import sessionRequestValidator from '../middleware/sessionRequestValidator';
import checkMentor from '../middleware/checkMentor';

const router = express.Router();

router.post('/sessions', [checkAuth, sessionRequestValidator], sessionRequest);
router.patch('/sessions/:sessionId/accept', [checkAuth, checkMentor], sessionAccept);
router.patch('/sessions/:sessionId/reject', [checkAuth, checkMentor], sessionDecline);
router.get('/sessions', checkAuth, allSessions);

export default router;