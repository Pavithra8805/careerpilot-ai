const express = require('express')
const router = express.Router()

// Simple mock: returns a short summary / suggestions based on input text
router.post('/summary', (req, res) => {
  const { text } = req.body || {}
  if (!text) return res.status(400).json({ error: 'text required' })
  // naive mock: return first 2 sentences and a suggestion
  const sentences = text.split(/[.\n]+/).map(s => s.trim()).filter(Boolean)
  const summary = sentences.slice(0,2).join('. ') + (sentences.length > 2 ? '...' : '')
  const suggestions = `Summary: ${summary}\n\nSuggestions:\n- Use bullet points for achievements\n- Quantify results where possible\n- Tailor keywords to the job description`;
  res.json({ summary: suggestions })
})

module.exports = router
