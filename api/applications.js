const express = require('express')
const fs = require('fs')
const path = require('path')

const router = express.Router()
const DB = path.join(__dirname, 'applications.json')

function ensure() {
  if (!fs.existsSync(DB)) fs.writeFileSync(DB, JSON.stringify({ items: [] }, null, 2))
}

function read() {
  ensure()
  return JSON.parse(fs.readFileSync(DB, 'utf8'))
}

function write(d){ fs.writeFileSync(DB, JSON.stringify(d, null, 2)) }

router.get('/', (req, res) => {
  const d = read()
  res.json({ items: d.items })
})

router.post('/', (req, res) => {
  const { company, role } = req.body || {}
  const status = (req.body && req.body.status) || 'Applied'
  if (!company || !role) return res.status(400).json({ error: 'company and role required' })
  const d = read()
  const item = { id: Date.now().toString(), company, role, status }
  d.items.push(item)
  write(d)
  res.json({ ok: true, item })
})

module.exports = router
