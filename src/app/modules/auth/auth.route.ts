import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AuthValidations } from './auth.validation';

const router = express.Router();

router.post('/signup', validateRequest(AuthValidations.createUserZodSchema));

router.post('/signin');

export const AuthRoutes = router;
