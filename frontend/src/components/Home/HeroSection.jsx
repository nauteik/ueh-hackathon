import React, { useEffect, useState } from 'react'
import FeatureCard from './FeatureCard'
import { FEATURES } from '../../constants'

const HeroSection = ({ setActiveSection }) => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <section className="relative min-h-screen overflow-hidden w-full">
      {/* Animated Background - Sử dụng màu từ hình ảnh tham khảo */}
      <div className="absolute inset-0 bg-[#0B4B3A]"> {/* Xanh lá đậm */}
        {/* Pattern overlay */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='70' height='70' viewBox='0 0 70 70' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23F9B949' fill-opacity='0.2'%3E%3Cpath d='M20 38a12 12 0 0 1 12-12 12 12 0 0 1 12 12 12 12 0 0 1-12 12 12 12 0 0 1-12-12zm28 0a4 4 0 1 0 0-8 4 4 0 0 0 0 8zm12 4a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM8 36a4 4 0 1 0 0-8 4 4 0 0 0 0 8z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}></div>
        </div>
        
        {/* Floating Elements - Sử dụng màu từ hình ảnh tham khảo */}
        <div className="absolute top-20 left-10 w-96 h-96 bg-[#B91C1C] rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div> {/* Đỏ */}
        <div className="absolute top-40 right-10 w-96 h-96 bg-[#F9B949] rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div> {/* Vàng */}
        <div className="absolute -bottom-8 left-20 w-96 h-96 bg-[#B91C1C] rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div> {/* Đỏ */}
        
        {/* Thêm sóng nước đỏ ở dưới - giống trong hình */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-[#B91C1C] opacity-90" style={{
          maskImage: "url('data:image/svg+xml;utf8,<svg viewBox=\"0 0 1200 120\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z\" fill=\"%23B91C1C\"/></svg>')",
          maskSize: "cover",
          WebkitMaskImage: "url('data:image/svg+xml;utf8,<svg viewBox=\"0 0 1200 120\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z\" fill=\"%23B91C1C\"/></svg>')",
          WebkitMaskSize: "cover"
        }}></div>
        
        {/* Thêm đường viền vàng trên sóng đỏ */}
        <div className="absolute bottom-[124px] left-0 right-0 h-2 bg-[#F9B949]"></div>
      </div>

      <div className="relative z-10 pt-32 pb-20 w-full">
        <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Content */}
          <div className={`text-center transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="mb-8">
              <div className="inline-flex items-center px-6 py-3 bg-[#B91C1C]/20 backdrop-blur-sm rounded-full border-2 border-[#F9B949]/40 text-[#F9B949] text-sm font-medium mb-6">
                <span className="animate-pulse mr-2">✨</span>
                Nghệ thuật truyền thống gặp công nghệ hiện đại
              </div>
            </div>

            <div className="flex flex-col items-center justify-center mb-8">
              <div className="w-24 h-24 mb-6">
                <img src="/logo77.png" alt="Logo" className="w-full h-full object-contain animate-float" />
              </div>
              
              <h1 className="text-6xl md:text-8xl font-extrabold mb-4 leading-tight font-serif">
                <span className="text-[#F9B949]">LỊCH SỬ</span>
                <br />
                <span className="text-white/90 text-5xl md:text-7xl">Rối Nước Việt Nam</span>
              </h1>
              
              <div className="w-full max-w-2xl mx-auto h-1 bg-gradient-to-r from-transparent via-[#B91C1C] to-transparent my-8"></div>
            </div>

            <p className="text-xl md:text-2xl text-white/90 mb-12 max-w-4xl mx-auto leading-relaxed">
              Khám phá vẻ đẹp của nghệ thuật rối nước cổ truyền qua trải nghiệm 
              <span className="text-[#F9B949] font-semibold"> 3D tương tác </span>
              đầy mê hoặc
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-8 justify-center items-center mb-20">
              <button 
                onClick={() => setActiveSection('game')}
                className="group relative px-10 py-5 bg-[#B91C1C] text-white text-lg font-bold rounded-xl shadow-2xl hover:shadow-[#B91C1C]/50 transition-all duration-300 hover:scale-105 overflow-hidden border-2 border-[#F9B949]"
              >
                <div className="absolute inset-0 bg-[#B91C1C]/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <span className="relative flex items-center">
                  <span className="text-2xl mr-3">🎮</span>
                  Chơi ngay
                  <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path>
                  </svg>
                </span>
              </button>

              <button 
                onClick={() => setActiveSection('booking')}
                className="group px-10 py-5 bg-[#F9B949]/10 backdrop-blur-sm text-[#F9B949] text-lg font-bold rounded-xl border-2 border-[#F9B949] hover:bg-[#F9B949]/20 transition-all duration-300 hover:scale-105"
              >
                <span className="flex items-center">
                  <span className="text-2xl mr-3">📅</span>
                  Đặt lịch trải nghiệm
                </span>
              </button>
            </div>
          </div>

          {/* Feature Cards with Stagger Animation */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20">
            {FEATURES.map((feature, index) => (
              <div 
                key={index}
                className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                <FeatureCard
                  icon={feature.icon}
                  title={feature.title}
                  description={feature.description}
                />
              </div>
            ))}
          </div>

          {/* Scroll Indicator */}
          <div className="flex justify-center mt-20">
            <div className="animate-bounce">
              <svg className="w-6 h-6 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection