import React, { useState } from 'react'
import { Navigation, HeroSection, BookingSection, GameSection } from './components'
import './App.css'

function App() {
  const [activeSection, setActiveSection] = useState('home')

  const renderSection = () => {
    switch(activeSection) {
      case 'home':
        return <HeroSection setActiveSection={setActiveSection} />
      case 'booking':
        return <BookingSection />
      case 'game':
        return <GameSection />
      default:
        return <HeroSection setActiveSection={setActiveSection} />
    }
  }

  return (
    <div className="min-h-screen w-full bg-[#0B4B3A] overflow-x-hidden">
      <Navigation activeSection={activeSection} setActiveSection={setActiveSection} />
      {renderSection()}
    </div>
  )
}

export default App