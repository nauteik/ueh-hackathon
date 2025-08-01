import React, { useState } from 'react'
import { Navigation, HeroSection, AboutSection, ForumSection, BookingSection } from './components'
import Game from './components/Game/Game'
import './App.css'

function App() {
  const [activeSection, setActiveSection] = useState('home')

  const renderSection = () => {
    switch(activeSection) {
      case 'home':
        return <HeroSection setActiveSection={setActiveSection} />
      case 'about':
        return <AboutSection />
      case 'forum':
        return <ForumSection />
      case 'booking':
        return <BookingSection />
      case 'game':
        return <Game />
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