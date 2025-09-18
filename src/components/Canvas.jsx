import React from 'react'
import Shape from './Shape'

export default function Canvas({ shapes, setShapes, selectedShape }) {
  const handleClick = (e) => {
    if (e.target.closest('[data-shape]')) return
    if (!selectedShape) return

    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const id = (typeof crypto !== 'undefined' && crypto.randomUUID)
      ? crypto.randomUUID()
      : Date.now()

    setShapes([...shapes, { type: selectedShape, x, y, id }])
  }

  const removeShape = (id) => {
    setShapes(shapes.filter(s => s.id !== id))
  }

  return (
    <div className="canvas" onClick={handleClick}>
      {shapes.map(shape => (
        <Shape key={shape.id} {...shape} onRemove={() => removeShape(shape.id)} />
      ))}
    </div>
  )
}
