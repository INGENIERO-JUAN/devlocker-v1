import express from 'express';
import { body } from 'express-validator';
import autenticar from '../middleware/auth.js';
import { crear, listar, editar, borrar } from '../controllers/snippetsController.js';

const router = express.Router();

router.post(
  '/snippets',
  autenticar,
  body('title').isLength({ min: 3 }),
  body('code').notEmpty(),
  body('language').optional().isString(),
  body('tags').optional().isArray(),
  crear
);

router.get('/snippets', autenticar, listar);

router.put(
  '/snippets/:id',
  autenticar,
  body('title').optional().isLength({ min: 3 }),
  body('code').optional().notEmpty(),
  body('language').optional().isString(),
  body('tags').optional().isArray(),
  editar
);

router.delete('/snippets/:id', autenticar, borrar);

export default router;