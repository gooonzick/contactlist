import express, { Router } from 'express';
import { signIn, signUp, validateToken } from '../controllers/auth.controller';

const router: Router = express.Router();

router.post('/signup', signUp);
router.post('/signin', signIn);
router.get('/token', validateToken);

export default router;
