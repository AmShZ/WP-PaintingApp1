import React, { useEffect, useState } from 'react'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import Canvas from './components/Canvas'
import Footer from './components/Footer'
import { getUsers, login, loadPainting, savePainting } from './api'

export default function App () {
  const [shapes, setShapes] = useState([])
  const [selectedShape, setSelectedShape] = useState(null)
  const [title, setTitle] = useState('Untitled')
  const [users, setUsers] = useState([])
  const [user, setUser] = useState(null)

  useEffect(() => {
    getUsers().then(setUsers).catch(() => setUsers([]))
  }, [])

  const handleLogin = async (username) => {
    const u = await login(username)
    setUser(u)
  }

  const handleLoadFromServer = async () => {
    if (!user) return alert('ابتدا یک کاربر انتخاب/لاگین کنید.')
    const data = await loadPainting(user.id)
    setTitle(data.title ?? 'Untitled')
    setShapes(Array.isArray(data.shapes) ? data.shapes : [])
  }

  const handleSaveToServer = async () => {
    if (!user) return alert('ابتدا یک کاربر انتخاب/لاگین کنید.')
    await savePainting(user.id, { title, shapes })
    alert('ذخیره شد.')
  }

  return (
    <div className="app">
      <Header
        title={title}
        setTitle={setTitle}
        shapes={shapes}
        setShapes={setShapes}
        users={users}
        user={user}
        onLogin={handleLogin}
        onLoadFromServer={handleLoadFromServer}
        onSaveToServer={handleSaveToServer}
      />
      <div className="main">
        <Sidebar selectedShape={selectedShape} setSelectedShape={setSelectedShape} />
        <Canvas shapes={shapes} setShapes={setShapes} selectedShape={selectedShape} />
      </div>
      <Footer shapes={shapes} />
    </div>
  )
}
