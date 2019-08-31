/* eslint-disable import/named */
import express from 'express';
import {
  sessionRequest, sessionAccept, sessionDecline, allSessions, reviewMentor, deleteReview,
} from '../controllers/sessions';
import checkAuth from '../middleware/checkAuth';
import sessionRequestValidator from '../middleware/sessionRequestValidator';
import checkMentor from '../middleware/checkMentor';
import reviewMentorValidator from '../middleware/reviewMentorValidator';
import checkAdmin from '../middleware/checkAdmin';
import requestConfirmationValidator from '../middleware/requestConfirmationValidator';

const router = express.Router();

router.post('/sessions', [checkAuth, sessionRequestValidator], sessionRequest);
router.patch('/sessions/:sessionId/accept', [checkAuth, checkMentor, requestConfirmationValidator], sessionAccept);
router.patch('/sessions/:sessionId/reject', [checkAuth, checkMentor, requestConfirmationValidator], sessionDecline);
router.get('/sessions', checkAuth, allSessions);
router.post('/sessions/:sessionId/review', [checkAuth, reviewMentorValidator], reviewMentor);
router.delete('/sessions/:sessionId/review', [checkAuth, checkAdmin], deleteReview);

export default router;
