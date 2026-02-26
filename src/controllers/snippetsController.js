import asyncHandler from 'express-async-handler';
import { validationResult } from 'express-validator';
import Snippet from '../models/Snippet.js';

export const crear = asyncHandler(async (req, res) => {
  const errores = validationResult(req);
  if (!errores.isEmpty()) return res.status(400).json({ errores: errores.array() });

  const { title, language, code, tags } = req.body;

  const snippet = await Snippet.create({
    user: req.user._id,
    title,
    language,
    code,
    tags
  });

  return res.status(201).json(snippet);
});

export const listar = asyncHandler(async (req, res) => {
  const snippets = await Snippet.find({ user: req.user._id }).sort({ createdAt: -1 });
  return res.json(snippets);
});

export const editar = asyncHandler(async (req, res) => {
  const errores = validationResult(req);
  if (!errores.isEmpty()) return res.status(400).json({ errores: errores.array() });

  const snippet = await Snippet.findOne({ _id: req.params.id, user: req.user._id });
  if (!snippet) return res.status(404).json({ error: 'Snippet no encontrado' });

  const updates = {};
  if (req.body.title !== undefined) updates.title = req.body.title;
  if (req.body.language !== undefined) updates.language = req.body.language;
  if (req.body.code !== undefined) updates.code = req.body.code;
  if (req.body.tags !== undefined) updates.tags = req.body.tags;

  Object.assign(snippet, updates);
  await snippet.save();

  return res.json(snippet);
});

export const borrar = asyncHandler(async (req, res) => {
  const snippet = await Snippet.findOneAndDelete({ _id: req.params.id, user: req.user._id });
  if (!snippet) return res.status(404).json({ error: 'Snippet no encontrado' });

  return res.json({ mensaje: 'Snippet eliminado' });
});