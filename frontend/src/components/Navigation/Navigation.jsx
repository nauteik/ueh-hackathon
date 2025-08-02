import React, { useState, useEffect } from 'react'
import { NAV_ITEMS } from '../../constants'

const Navigation = ({ activeSection, setActiveSection }) => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 w-full ${
      isScrolled 
        ? 'bg-[#0B4B3A]/95 backdrop-blur-xl border-b-2 border-[#F9B949] shadow-2xl' 
        : 'bg-transparent'
    }`}>
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex items-center space-x-4 group cursor-pointer">
            <div className="relative">
              <img src="/logo77.png" alt="Logo" className="h-12 w-12 rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#F9B949] to-[#B91C1C] rounded-xl opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
            </div>
            <div className="hidden sm:block">
              <span className="text-2xl font-bold bg-gradient-to-r from-[#FFD700] via-[#F9B949] to-[#FF6B35] bg-clip-text text-transparent drop-shadow-lg">
                Rối Nước Việt Nam
              </span>
            </div>
          </div>
          
          {/* Navigation Items - Centered */}
          <div className="hidden md:flex items-center justify-center gap-20 flex-1">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={`group relative flex items-center space-x-2 rounded-xl text-xl font-bold transition-all duration-300 ${
                  activeSection === item.id
                    ? 'bg-[#B91C1C] text-white shadow-lg border-2 border-[#F9B949] scale-105'
                    : 'text-[#F9B949] hover:text-white hover:bg-[#B91C1C]/30 border-2 border-transparent hover:border-[#F9B949]/50 hover:scale-105'
                }`}
                style={{ padding: '6px 8px' }}
              >
                <span className="font-bold">{item.label}</span>
                
                {/* Active Indicator */}
                {activeSection === item.id && (
                  <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-[#F9B949] rounded-full animate-pulse"></div>
                )}
              </button>
            ))}
          </div>

          {/* Empty div to balance the layout */}
          <div className="hidden md:block w-auto"></div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-3 rounded-xl text-[#F9B949] hover:bg-[#B91C1C]/20 border-2 border-[#F9B949]/50 transition-all duration-200"
            >
              <svg className={`h-6 w-6 transition-transform duration-300 ${isMobileMenuOpen ? 'rotate-90' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden transition-all duration-300 overflow-hidden ${
          isMobileMenuOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <div className="py-4 space-y-2 bg-[#0B4B3A]/90 backdrop-blur-xl rounded-b-xl border-x-2 border-b-2 border-[#F9B949]/50">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveSection(item.id)
                  setIsMobileMenuOpen(false)
                }}
                className={`w-full flex items-center space-x-3 px-6 py-3 rounded-xl font-semibold transition-all duration-200 ${
                  activeSection === item.id
                    ? 'bg-[#B91C1C] text-white border-l-4 border-[#F9B949]'
                    : 'text-[#F9B949] hover:text-white hover:bg-[#B91C1C]/30 border-l-4 border-transparent'
                }`}
              >
                <span>{item.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navigation