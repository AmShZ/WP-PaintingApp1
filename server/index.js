const http = require('http')
const url = require('url')
const { seedUsers, listUsers, getUserByUsername, getPaintingByUserId, upsertPainting } = require('./store')
const { Painting } = require('./paintingModel')

const ORIGIN = 'http://localhost:5173'
const PORT = process.env.PORT || 3001

function setCors(res) {
  res.setHeader('Access-Control-Allow-Origin', ORIGIN)
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, x-user-id')
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS')
}

function send(res, status, data) {
  setCors(res)
  res.writeHead(status, { 'Content-Type': 'application/json' })
  res.end(JSON.stringify(data))
}

function noContent(res) {
  setCors(res)
  res.writeHead(204)
  res.end()
}

function parseBody(req) {
  return new Promise((resolve, reject) => {
    let data = ''
    req.on('data', chunk => { data += chunk })
    req.on('end', () => {
      if (!data) return resolve({})
      try { resolve(JSON.parse(data)) } catch (e) { reject(e) }
    })
    req.on('error', reject)
  })
}

const server = http.createServer(async (req, res) => {
  const { pathname } = url.parse(req.url, true)

  // Preflight CORS
  if (req.method === 'OPTIONS') return noContent(res)

  try {
    if (pathname === '/api/health' && req.method === 'GET') {
      return send(res, 200, { ok: true })
    }

    if (pathname === '/api/users' && req.method === 'GET') {
      const users = await listUsers()
      return send(res, 200, users)
    }

    if (pathname === '/api/login' && req.method === 'POST') {
      const body = await parseBody(req)
      const { username } = body || {}
      if (!username) return send(res, 400, { error: 'username required' })
      const user = await getUserByUsername(username)
      if (!user) return send(res, 401, { error: 'invalid username' })
      return send(res, 200, user)
    }

    if (pathname === '/api/painting') {
      const userId = parseInt(req.headers['x-user-id'], 10)
      if (!userId) return send(res, 401, { error: 'x-user-id header required' })

      if (req.method === 'GET') {
        const data = await getPaintingByUserId(userId)
        const p = data ? new Painting(data) : new Painting()
        return send(res, 200, p.toJSON())
      }
      if (req.method === 'POST') {
        const body = await parseBody(req)
        const p = new Painting(body)
        await upsertPainting(userId, p.toJSON())
        return send(res, 200, { ok: true })
      }
    }

    send(res, 404, { error: 'not found' })
  } catch (err) {
    send(res, 500, { error: 'server error', details: err.message })
  }
})

seedUsers().then(() => {
  server.listen(PORT, () => console.log(`API listening on http://localhost:${PORT}`))
})
