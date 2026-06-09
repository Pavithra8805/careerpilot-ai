const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { getUserByEmail, addUser } = require('./db');
const router = express.Router();

function verifyToken(req) {
  const auth = req.headers.authorization;
  if (!auth || !auth.startsWith('Bearer ')) return null;
  const token = auth.split(' ')[1];
  try {
    const secret = process.env.AUTH_SECRET || 'dev_secret';
    return jwt.verify(token, secret);
  } catch (err) {
    return null;
  }
}

router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;
  if (!email || !password) return res.status(400).json({ error: 'email and password required' });
  const existing = getUserByEmail(email);
  if (existing) return res.status(400).json({ error: 'User already exists' });
  const hashed = await bcrypt.hash(password, 10);
  const user = { id: Date.now().toString(), name: name || '', email, password: hashed };
  addUser(user);
  const secret = process.env.AUTH_SECRET || 'dev_secret';
  const token = jwt.sign({ id: user.id, email: user.email, name: user.name }, secret, { expiresIn: '7d' });
  res.json({ token, user: { id: user.id, name: user.name, email: user.email } });
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ error: 'email and password required' });
  const user = getUserByEmail(email);
  if (!user) return res.status(400).json({ error: 'Invalid credentials' });
  const ok = await bcrypt.compare(password, user.password);
  if (!ok) return res.status(400).json({ error: 'Invalid credentials' });
  const secret = process.env.AUTH_SECRET || 'dev_secret';
  const token = jwt.sign({ id: user.id, email: user.email, name: user.name }, secret, { expiresIn: '7d' });
  res.json({ token, user: { id: user.id, name: user.name, email: user.email } });
});

// Update profile (protected)
router.put('/profile', async (req, res) => {
  const payload = verifyToken(req);
  if (!payload) return res.status(401).json({ error: 'Invalid token' });
  const updates = req.body || {};
  // Disallow updating password via this endpoint
  delete updates.password;
  const updated = require('./db').updateUser(payload.id, updates);
  if (!updated) return res.status(404).json({ error: 'User not found' });
  res.json({ ok: true, user: { id: updated.id, name: updated.name, email: updated.email, ...updates } });
});

module.exports = router;

