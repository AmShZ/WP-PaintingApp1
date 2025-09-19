const fs = require('fs/promises')
const path = require('path')

const dataDir = path.join(__dirname, 'data')
const usersFile = path.join(dataDir, 'users.json')
const paintingsFile = path.join(dataDir, 'paintings.json')

async function ensureFiles() {
  await fs.mkdir(dataDir, { recursive: true })
  try { await fs.access(usersFile) } catch { await fs.writeFile(usersFile, '[]') }
  try { await fs.access(paintingsFile) } catch { await fs.writeFile(paintingsFile, '{}') }
}

async function readJSON(file, fallback) {
  try { return JSON.parse(await fs.readFile(file, 'utf-8')) } catch { return fallback }
}
async function writeJSON(file, data) {
  const tmp = file + '.tmp'
  await fs.writeFile(tmp, JSON.stringify(data, null, 2))
  await fs.rename(tmp, file)
}

async function seedUsers() {
  await ensureFiles()
  const users = await readJSON(usersFile, [])
  if (users.length === 0) {
    await writeJSON(usersFile, [
      { id: 1, username: 'alice' },
      { id: 2, username: 'bob' },
      { id: 3, username: 'carol' }
    ])
  }
}

async function listUsers() { await ensureFiles(); return readJSON(usersFile, []) }
async function getUserByUsername(username) {
  const users = await listUsers()
  return users.find(u => u.username === username)
}
async function getPaintingByUserId(userId) {
  await ensureFiles()
  const all = await readJSON(paintingsFile, {})
  return all[userId] || null
}
async function upsertPainting(userId, data) {
  await ensureFiles()
  const all = await readJSON(paintingsFile, {})
  all[userId] = data
  await writeJSON(paintingsFile, all)
}

module.exports = { seedUsers, listUsers, getUserByUsername, getPaintingByUserId, upsertPainting }
