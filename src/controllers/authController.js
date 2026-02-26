import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import { validationResult } from 'express-validator';
import User from '../models/User.js';

export const registro = asyncHandler(async (req, res) => {
  const errores = validationResult(req);
  if (!errores.isEmpty()) return res.status(400).json({ errores: errores.array() });

  const { email, password } = req.body;

  const existe = await User.findOne({ email });
  if (existe) return res.status(400).json({ error: 'Correo ya registrado' });

  const hash = await bcrypt.hash(password, 10);
  const user = await User.create({ email, password: hash });

  return res.status(201).json({ id: user._id, email: user.email });
});

export const login = asyncHandler(async (req, res) => {
  const errores = validationResult(req);
  if (!errores.isEmpty()) return res.status(400).json({ errores: errores.array() });

  const { email, password } = req.body;

  const user = await User.findOne({ email });
  const ok = user && (await bcrypt.compare(password, user.password));
  if (!ok) return res.status(401).json({ error: 'Credenciales inválidas' });

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
  return res.json({ token });
});