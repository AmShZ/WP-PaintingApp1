const API_BASE = 'http://localhost:3001/api'

export async function getUsers () {
  const r = await fetch(`${API_BASE}/users`)
  return r.json()
}

export async function login (username) {
  const r = await fetch(`${API_BASE}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username })
  })
  if (!r.ok) throw new Error('login failed')
  return r.json()
}

export async function loadPainting (userId) {
  const r = await fetch(`${API_BASE}/painting`, {
    headers: { 'x-user-id': String(userId) }
  })
  if (!r.ok) throw new Error('load failed')
  return r.json()
}

export async function savePainting (userId, data) {
  const r = await fetch(`${API_BASE}/painting`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-user-id': String(userId)
    },
    body: JSON.stringify(data)
  })
  if (!r.ok) throw new Error('save failed')
  return r.json()
}
