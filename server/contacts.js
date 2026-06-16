const fs = require('fs')
const path = require('path')

const DATA_DIR = path.join(__dirname, 'data')
const FILE = path.join(DATA_DIR, 'contacts.json')

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

function append(record) {
  ensureDir()
  const all = readAll()
  all.push(record)
  fs.writeFileSync(FILE, JSON.stringify(all, null, 2), 'utf8')
  return record
}

module.exports = { readAll, append }
