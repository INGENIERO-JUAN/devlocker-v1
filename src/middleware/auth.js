import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';

const autenticar = asyncHandler(async (req, res, next) => {
  const header = req.headers.authorization;
  const token = header?.startsWith('Bearer ') ? header.split(' ')[1] : null;

  if (!token) return res.status(401).json({ error: 'Token no proporcionado' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { _id: decoded.id };
    return next();
  } catch (e) {
    return res.status(401).json({ error: 'Token inválido' });
  }
});

export default autenticar;