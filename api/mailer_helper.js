const nodemailer = require('nodemailer')

async function trySendEmail({ to, subject, text, html }) {
  const host = process.env.SMTP_HOST
  const port = process.env.SMTP_PORT || 587
  const user = process.env.SMTP_USER
  const pass = process.env.SMTP_PASS
  const from = process.env.FROM_EMAIL || user
  const secureEnv = process.env.SMTP_SECURE
  const secure = secureEnv ? secureEnv === 'true' : Number(port) === 465

  if (!host) {
    console.warn('SMTP_HOST not set; skipping send')
    return null
  }

  const transporter = nodemailer.createTransport({
    host,
    port: Number(port),
    secure,
    auth: user && pass ? { user, pass } : undefined,
  })

  const info = await transporter.sendMail({ from, to, subject, text, html })
  return info
}

module.exports = { trySendEmail }
