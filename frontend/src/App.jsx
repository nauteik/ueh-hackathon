import React from 'react'
import ChatBot from './components/ChatBot'
import Timeline from './components/Timeline'
import './App.css'

function App() {
  return (
    <div className="app">
      {/* Navigation */}
      <nav className="app-navigation">
        <div className="nav-brand">
          <img src="/logo77.png" style={{width: '300px', height: '300px'}} alt="Logo" className="nav-logo" />
        </div>
        <div className="nav-slogan">
          <span>Khám phá di sản văn hóa Sài Gòn</span>
        </div>
      </nav>

      {/* Main Content */}
      <div className="main-content">
        <Timeline />
      </div>
      
      {/* ChatBot */}
      <ChatBot />
    </div>
  )
}

export default App