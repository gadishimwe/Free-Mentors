import express from 'express';
import { sessionRequest } from '../controllers/sessions';
import checkAuth from '../middleware/checkAuth';
import sessionRequestValidator from '../middleware/sessionRequestValidator';

const router = express.Router();

router.post('/sessions', [checkAuth, sessionRequestValidator], sessionRequest);

export default router;
