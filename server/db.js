const Database = require('better-sqlite3')
const path = require('path')

const db = new Database(path.join(__dirname, 'data.sqlite'))

db.exec(`
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT NOT NULL UNIQUE
);
CREATE TABLE IF NOT EXISTS paintings (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL UNIQUE,
  title TEXT,
  json TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id)
);
`)

function seedUsers () {
  const count = db.prepare('SELECT COUNT(*) AS c FROM users').get().c
  if (count === 0) {
    const ins = db.prepare('INSERT INTO users (username) VALUES (?)')
    ;['alice', 'bob', 'carol'].forEach(u => ins.run(u))
  }
}

function listUsers () {
  return db.prepare('SELECT id, username FROM users ORDER BY username').all()
}

function getUserByUsername (username) {
  return db.prepare('SELECT id, username FROM users WHERE username = ?').get(username)
}

function getPaintingByUserId (userId) {
  const row = db.prepare('SELECT json FROM paintings WHERE user_id = ?').get(userId)
  if (!row) return null
  return JSON.parse(row.json)
}

function upsertPainting (userId, data) {
  const json = JSON.stringify(data)
  const title = data.title ?? 'Untitled'
  const now = new Date().toISOString()
  const exists = db.prepare('SELECT id FROM paintings WHERE user_id = ?').get(userId)
  if (exists) {
    db.prepare('UPDATE paintings SET title=?, json=?, updated_at=? WHERE user_id=?')
      .run(title, json, now, userId)
  } else {
    db.prepare('INSERT INTO paintings (user_id, title, json, updated_at) VALUES (?,?,?,?)')
      .run(userId, title, json, now)
  }
}

module.exports = {
  db,
  seedUsers,
  listUsers,
  getUserByUsername,
  getPaintingByUserId,
  upsertPainting
}
