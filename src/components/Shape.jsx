import React from 'react'

export default function Shape({ type, x, y, onRemove }) {
  const size = 48
  const baseStyle = {
    position: "absolute",
    left: x - size / 2,
    top: y - size / 2,
    cursor: "pointer",
    userSelect: "none"
  }

  const stop = (e) => e.stopPropagation()
  const handleDoubleClick = (e) => {
    e.stopPropagation()
    onRemove()
  }

  if (type === "circle") {
    return (
      <div
        data-shape
        onClick={stop}
        onDoubleClick={handleDoubleClick}
        style={{
          ...baseStyle,
          width: size,
          height: size,
          borderRadius: "50%",
          background: "#60a5fa"
        }}
      />
    )
  }

  if (type === "square") {
    return (
      <div
        data-shape
        onClick={stop}
        onDoubleClick={handleDoubleClick}
        style={{
          ...baseStyle,
          width: size,
          height: size,
          background: "#34d399"
        }}
      />
    )
  }

  if (type === "triangle") {
    return (
      <div
        data-shape
        onClick={stop}
        onDoubleClick={handleDoubleClick}
        style={{
          position: "absolute",
          left: x - size / 2,
          top: y - size / 2,
          width: 0,
          height: 0,
          borderLeft: `${size/2}px solid transparent`,
          borderRight: `${size/2}px solid transparent`,
          borderBottom: `${size}px solid #f472b6`,
          cursor: "pointer",
          userSelect: "none"
        }}
      />
    )
  }

  return null
}
