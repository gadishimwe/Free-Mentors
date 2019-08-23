import express from 'express';
import UsersController from '../controllers/user';

const router = express.Router();
router.post('/auth/signup', UsersController.usersSignUp);
router.post('/auth/signIn', UsersController.usersSignIn);

module.exports = router;
