const express = require('express');
const fs = require('fs');
const path = require('path');
const nodemailer = require('nodemailer');
const { trySendEmail } = require('./mailer_helper')

const router = express.Router();
const SUB_PATH = path.join(__dirname, 'submissions.json');

function ensureSubs() {
  if (!fs.existsSync(SUB_PATH)) {
    fs.writeFileSync(SUB_PATH, JSON.stringify({ submissions: [] }, null, 2));
  }
}

function saveSubmission(sub) {
  ensureSubs();
  const raw = fs.readFileSync(SUB_PATH, 'utf8');
  const db = JSON.parse(raw);
  db.submissions = db.submissions || [];
  db.submissions.push(sub);
  fs.writeFileSync(SUB_PATH, JSON.stringify(db, null, 2));
}

// use shared mailer helper

router.post('/', async (req, res) => {
  const { name, email, message } = req.body || {};
  if (!email || !message) return res.status(400).json({ error: 'email and message required' });
  const sub = { id: Date.now().toString(), name: name || '', email, message, createdAt: new Date().toISOString() };
  try {
    saveSubmission(sub);
  } catch (err) {
    console.error('save submission failed', err);
  }

  let ack = null;
  try {
    // send acknowledgement to user
    ack = await trySendEmail({
      to: email,
      subject: 'Thanks for contacting CareerPilot AI',
      text: `Hi ${name || ''},\n\nThanks for your message. We'll get back to you soon.`,
    });
    if (ack) console.log('Contact ack sent:', ack.messageId || ack.response || ack);
  } catch (err) {
    console.error('email send failed', err);
  }

  // also send a notification to site owner if configured
  let ownerAck = null;
  try {
    const owner = process.env.CONTACT_NOTIFY_EMAIL;
    if (owner) {
      ownerAck = await trySendEmail({
        to: owner,
        subject: `New contact from ${email}`,
        text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
      });
      if (ownerAck) console.log('Owner notify sent:', ownerAck.messageId || ownerAck.response || ownerAck);
    }
  } catch (err) {
    console.error('owner notify failed', err);
  }

  // Return debug info when requested
  if (process.env.DEBUG_EMAILS === 'true') {
    return res.json({ ok: true, ack: ack || null, ownerAck: ownerAck || null });
  }

  res.json({ ok: true });
});

module.exports = router;
