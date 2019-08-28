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

const router = express.Router();

router.post('/sessions', [checkAuth, sessionRequestValidator], sessionRequest);
router.patch('/sessions/:sessionId/accept', [checkAuth, checkMentor], sessionAccept);
router.patch('/sessions/:sessionId/reject', [checkAuth, checkMentor], sessionDecline);
router.get('/sessions', checkAuth, allSessions);
router.post('/sessions/:sessionId/review', [checkAuth, reviewMentorValidator], reviewMentor);
router.delete('/sessions/:sessionId/review', [checkAuth, checkAdmin], deleteReview);

export default router;
