import express from 'express';
import { usersSignUp, usersSignIn } from '../controllers/user';
import signUpValidator from '../middleware/signUpValidator';
import signinValidator from '../middleware/signInValidator';

const router = express.Router();
router.post('/auth/signup', signUpValidator, usersSignUp);
router.post('/auth/signIn', signinValidator, usersSignIn);

export default router;
