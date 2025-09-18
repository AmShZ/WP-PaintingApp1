import React, { useRef } from 'react'

export default function Header({ title, setTitle, shapes, setShapes }) {
  const fileRef = useRef(null)

  const exportJSON = () => {
    const data = JSON.stringify({ title, shapes }, null, 2)
    const blob = new Blob([data], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "painting.json"
    a.click()
    URL.revokeObjectURL(url)
  }

  const triggerImport = () => fileRef.current?.click()

  const importJSON = (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (event) => {
      try {
        const data = JSON.parse(event.target.result)
        setTitle(data.title ?? "Untitled")
        setShapes(Array.isArray(data.shapes) ? data.shapes : [])
      } catch (err) {
        alert("Invalid JSON file")
      } finally {
        e.target.value = ""
      }
    }
    reader.readAsText(file)
  }

  return (
    <header className="header">
      <input
        className="title-input"
        value={title}
        onChange={e => setTitle(e.target.value)}
        placeholder="Painting Title"
      />
      <button className="btn" onClick={exportJSON}>Export</button>
      <button className="btn" onClick={triggerImport}>Import</button>
      <input
        ref={fileRef}
        type="file"
        accept="application/json"
        onChange={importJSON}
        style={{ display: 'none' }}
      />
    </header>
  )
}
