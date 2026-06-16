const fs = require('fs')
const path = require('path')

const DATA_DIR = path.join(__dirname, 'data')
const FILE = path.join(DATA_DIR, 'inquiries.json')

function ensureDir() {
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true })
}

function readAll() {
  ensureDir()
  if (!fs.existsSync(FILE)) return []
  try {
    return JSON.parse(fs.readFileSync(FILE, 'utf8'))
  } catch {
    return []
  }
}

function append(inquiry) {
  ensureDir()
  const all = readAll()
  all.push(inquiry)
  fs.writeFileSync(FILE, JSON.stringify(all, null, 2), 'utf8')
  return inquiry
}

module.exports = { readAll, append }
