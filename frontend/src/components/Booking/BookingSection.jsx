import React, { useState } from 'react'
import BookingForm from './BookingForm'
import ExperiencePackages from './ExperiencePackages'
import './BookingPage.css'

const BookingSection = () => {
  const [selectedShow, setSelectedShow] = useState('')

  const handleShowSelect = (showId) => {
    setSelectedShow(showId)
  }

  return (
    <section className="booking-section min-h-screen relative overflow-hidden w-full">
      {/* Animated Background - Same as HeroSection */}
      <div className="absolute inset-0 bg-[#0B4B3A]"> {/* Xanh lá đậm */}
        {/* Pattern overlay */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='70' height='70' viewBox='0 0 70 70' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23F9B949' fill-opacity='0.2'%3E%3Cpath d='M20 38a12 12 0 0 1 12-12 12 12 0 0 1 12 12 12 12 0 0 1-12 12 12 12 0 0 1-12-12zm28 0a4 4 0 1 0 0-8 4 4 0 0 0 0 8zm12 4a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM8 36a4 4 0 1 0 0-8 4 4 0 0 0 0 8z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}></div>
        </div>
        
        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-96 h-96 bg-[#B91C1C] rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute top-40 right-10 w-96 h-96 bg-[#F9B949] rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-96 h-96 bg-[#B91C1C] rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative z-10 section-spacing">
        <div className="container-spacing">
          <div className="booking-header text-center mb-16 animate-fade-in-up">
            <div className="mb-8">
            </div>
            
            <h2 className="booking-title text-2xl md:text-3xl font-bold text-[#F9B949] mb-5">
              Đặt lịch trải nghiệm
            </h2>
            <p className="booking-subtitle text-xl text-white/90 max-w-3xl mx-auto">
              Tham gia các buổi biểu diễn rối nước trực tiếp và workshop
            </p>
            
            <div className="w-full max-w-2xl mx-auto h-1 bg-gradient-to-r from-transparent via-[#B91C1C] to-transparent my-8"></div>
          </div>

          <div className="booking-content-grid">
            <div className="animate-fade-in-left">
              <BookingForm 
                selectedShow={selectedShow}
                onShowSelect={handleShowSelect}
              />
            </div>
            <div className="animate-fade-in-right">
              <ExperiencePackages 
                selectedShow={selectedShow}
                onShowSelect={handleShowSelect}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default BookingSection