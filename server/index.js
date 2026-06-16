const express = require('express')
const Stripe = require('stripe')
const cors = require('cors')
require('dotenv').config()
const { readAll, append } = require('./inquiries')

const app = express()
const stripe = Stripe(process.env.STRIPE_SECRET_KEY)
const PORT = process.env.PORT || 3001
const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:5173'

app.use(cors({ origin: CLIENT_URL }))
app.use(express.json())

// Plan definitions — amounts are in the smallest currency unit (fils for AED).
// AED 75.00 = 7500 fils, AED 550.00 = 55000 fils, AED 5000.00 = 500000 fils.
const PLANS = {
  day_pass: {
    name: 'Day Pass — The Compound Cafe',
    description: 'Single-day drop-in access to the Cafe & Co-working space, including Wi-Fi and your first drink.',
    amount: 7500,
    currency: 'aed',
    mode: 'payment',
  },
  monthly: {
    name: 'Monthly Membership — The Compound',
    description: 'Unlimited monthly access with hot-desk priority, 5 meeting room hours, and a 10% food & beverage discount.',
    amount: 55000,
    currency: 'aed',
    mode: 'subscription',
    interval: 'month',
  },
  annual: {
    name: 'Annual Membership — The Compound',
    description: 'Full-year membership with a permanent dedicated desk, 15 meeting room hours, guest passes, and 20% food & beverage discount.',
    amount: 500000,
    currency: 'aed',
    mode: 'subscription',
    interval: 'year',
  },
}

app.post('/api/create-checkout-session', async (req, res) => {
  const { plan } = req.body

  if (!plan || !PLANS[plan]) {
    return res.status(400).json({ error: 'Invalid plan selected.' })
  }

  const selected = PLANS[plan]

  const priceData = {
    currency: selected.currency,
    product_data: {
      name: selected.name,
      description: selected.description,
    },
    unit_amount: selected.amount,
  }

  if (selected.mode === 'subscription') {
    priceData.recurring = { interval: selected.interval }
  }

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: selected.mode,
      line_items: [{ price_data: priceData, quantity: 1 }],
      success_url: `${CLIENT_URL}/membership/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${CLIENT_URL}/membership`,
      metadata: { plan },
    })

    res.json({ url: session.url })
  } catch (err) {
    console.error('Stripe error:', err.message)
    res.status(500).json({ error: 'Failed to start checkout. Please try again.' })
  }
})

// ── Inquiry routes ────────────────────────────────────────────────────────────

const VALID_SPACES = [
  'cucina-edit',
  'ghost-dinners',
  'serveo-offices',
  'automotive-vault',
  'cafe-coworking',
]
const VALID_USES = ['lease', 'content-creation', 'event', 'workshop', 'other']

app.post('/api/inquiry', (req, res) => {
  const { name, company, email, phone, space, intendedUse, preferredDates, message } = req.body

  if (!name?.trim())
    return res.status(400).json({ error: 'Name is required.' })
  if (!email?.trim() || !email.includes('@'))
    return res.status(400).json({ error: 'A valid email address is required.' })
  if (!VALID_SPACES.includes(space))
    return res.status(400).json({ error: 'Please select a valid space.' })
  if (!VALID_USES.includes(intendedUse))
    return res.status(400).json({ error: 'Please select an intended use.' })

  const inquiry = append({
    id: Date.now(),
    submittedAt: new Date().toISOString(),
    name: name.trim(),
    company: company?.trim() || '',
    email: email.trim().toLowerCase(),
    phone: phone?.trim() || '',
    space,
    intendedUse,
    preferredDates: preferredDates?.trim() || '',
    message: message?.trim() || '',
  })

  console.log(`New inquiry #${inquiry.id} from ${inquiry.email} — ${inquiry.space} / ${inquiry.intendedUse}`)
  res.json({ success: true, id: inquiry.id })
})

// Simple review endpoint — open http://localhost:3001/api/inquiries in your browser
app.get('/api/inquiries', (req, res) => {
  res.json(readAll())
})

// ─────────────────────────────────────────────────────────────────────────────

app.listen(PORT, () => {
  console.log(`The Compound API running on http://localhost:${PORT}`)
}).on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`\nError: port ${PORT} is already in use.`)
    console.error(`Stop the existing process first:\n  lsof -ti:${PORT} | xargs kill -9\n`)
    process.exit(1)
  } else {
    throw err
  }
})
