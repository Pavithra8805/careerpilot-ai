const express = require('express');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const authRoutes = require('./auth');
const contactRoutes = require('./contact');
const applicationsRoutes = require('./applications');
const resumeRoutes = require('./resume');
const emailRoutes = require('./email');
const jobsRoutes = require('./jobs');
const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());

// Allow requests from the frontend dev server
app.use(cors({ origin: process.env.FRONTEND_ORIGIN || 'http://localhost:3000' }));

app.get('/health', (req, res) => res.json({status: 'ok'}));

// Root info page for quick checks
app.get('/', (req, res) => {
  res.send(`<html><body><h2>CareerPilot API</h2><p>API is running. Available endpoints:</p><ul><li>/health</li><li>/auth/register</li><li>/auth/login</li><li>/contact</li><li>/applications</li><li>/resume/summary</li></ul></body></html>`)
})

app.use('/auth', authRoutes);
app.use('/contact', contactRoutes);
app.use('/applications', applicationsRoutes);
app.use('/resume', resumeRoutes);
app.use('/email', emailRoutes);
app.use('/jobs', jobsRoutes);

// Sample protected route using JWT
function authMiddleware(req, res, next) {
  const auth = req.headers.authorization;
  if (!auth || !auth.startsWith('Bearer ')) return res.status(401).json({ error: 'Missing token' });
  const token = auth.split(' ')[1];
  try {
    const secret = process.env.AUTH_SECRET || 'dev_secret';
    const payload = jwt.verify(token, secret);
    req.user = payload;
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid token' });
  }
}

app.get('/api/protected', authMiddleware, (req, res) => {
  res.json({ message: 'This is protected data', user: req.user });
});

app.listen(port, () => {
  console.log(`API listening on http://localhost:${port}`);
});
