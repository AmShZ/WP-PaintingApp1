import React, { useState } from 'react'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import Canvas from './components/Canvas'
import Footer from './components/Footer'

export default function App() {
  const [shapes, setShapes] = useState([])
  const [selectedShape, setSelectedShape] = useState(null)
  const [title, setTitle] = useState("Untitled")

  return (
    <div className="app">
      <Header title={title} setTitle={setTitle} shapes={shapes} setShapes={setShapes}/>
      <div className="main">
        <Sidebar selectedShape={selectedShape} setSelectedShape={setSelectedShape}/>
        <Canvas shapes={shapes} setShapes={setShapes} selectedShape={selectedShape}/>
      </div>
      <Footer shapes={shapes}/>
    </div>
  )
}
