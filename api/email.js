const express = require('express')
const { trySendEmail } = require('./mailer_helper')

const router = express.Router()

// Send a test message. POST { to?: string, subject?: string, text?: string }
router.post('/test', async (req, res) => {
  const to = req.body && req.body.to ? req.body.to : process.env.CONTACT_NOTIFY_EMAIL
  if (!to) return res.status(400).json({ error: 'No recipient configured. Set CONTACT_NOTIFY_EMAIL or supply {to}.' })
  try {
    const info = await trySendEmail({
      to,
      subject: req.body.subject || 'CareerPilot AI — test message',
      text: req.body.text || 'This is a test message from CareerPilot AI.'
    })
    return res.json({ ok: true, info })
  } catch (err) {
    console.error('test email failed', err)
    return res.status(500).json({ error: 'Send failed', details: err && err.message ? err.message : String(err) })
  }
})

module.exports = router
