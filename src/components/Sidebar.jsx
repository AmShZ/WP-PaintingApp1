import React from 'react'

export default function Sidebar({ selectedShape, setSelectedShape }) {
  const Btn = ({ type }) => (
    <button
      className={`tool-btn ${selectedShape === type ? 'selected' : ''}`}
      onClick={() => setSelectedShape(type)}
      aria-pressed={selectedShape === type}
      aria-label={type}
    >
      <span className={`icon ${type}`} />
    </button>
  )

  return (
    <aside className="sidebar">
      <div className="tools-title">Tools</div>
      <div className="tools-grid">
        <Btn type="circle" />
        <Btn type="square" />
        <Btn type="triangle" />
      </div>
    </aside>
  )
}
