import express from 'express';
import { userChangeToMentor, allMentors, specificMentor } from '../controllers/mentor';
import checkAuth from '../middleware/checkAuth';
import checkAdmin from '../middleware/checkAdmin';

const router = express.Router();

router.patch('/user/:userId', [checkAuth, checkAdmin], userChangeToMentor);
router.get('/mentors', checkAuth, allMentors);
router.get('/mentors/:mentorId', checkAuth, specificMentor);

export default router;
