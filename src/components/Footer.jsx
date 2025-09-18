import React from 'react'

export default function Footer({ shapes }) {
  const counts = { circle: 0, square: 0, triangle: 0 }
  shapes.forEach(s => counts[s.type]++)
  
  return (
    <footer className="footer">
      Circle: {counts.circle} | Square: {counts.square} | Triangle: {counts.triangle}
    </footer>
  )
}
