const express = require('express');
const { createJsonDb } = require('./json_db_helper');

const router = express.Router();
const { readDb, writeDb, ensureDb } = createJsonDb('applications.json');
ensureDb({ items: [] });

router.get('/', (req, res) => {
  const d = readDb();
  res.json({ items: d.items });
});

router.post('/', (req, res) => {
  const { company, role } = req.body || {};
  const status = (req.body && req.body.status) || 'Applied';
  if (!company || !role) return res.status(400).json({ error: 'company and role required' });
  const d = readDb();
  const item = { id: Date.now().toString(), company, role, status };
  d.items.push(item);
  writeDb(d);
  res.json({ ok: true, item });
});

module.exports = router;
