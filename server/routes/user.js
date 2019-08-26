import express from 'express';
import UsersController from '../controllers/user';
import checkAuth from '../middleware/checkAuth';
import checkAdmin from '../middleware/checkAdmin';
import signUpValidator from '../middleware/signUpValidator';
import signinValidator from '../middleware/signInValidator';

const router = express.Router();
router.post('/auth/signup', signUpValidator, UsersController.usersSignUp);
router.post('/auth/signIn', signinValidator, UsersController.usersSignIn);
router.patch('/user/:userId', [checkAuth, checkAdmin], UsersController.userChangeToMentor);

module.exports = router;
