import express from 'express';
import { body } from 'express-validator';
import { registro, login } from '../controllers/authController.js';

const router = express.Router();

router.post('/registro', body('email').isEmail().normalizeEmail(), body('password').isLength({ min: 6 }), registro);

router.post('/login', body('email').isEmail().normalizeEmail(), body('password').exists(), login);

export default router;