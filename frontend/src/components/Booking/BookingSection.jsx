import React from 'react'
import BookingForm from './BookingForm'
import ExperiencePackages from './ExperiencePackages'

const BookingSection = () => {
  return (
    <section className="relative min-h-screen w-full overflow-hidden pt-16">
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
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-[#B91C1C] opacity-90 wave-mask"></div>
        
        {/* Thêm đường viền vàng trên sóng đỏ */}
        <div className="absolute bottom-[124px] left-0 right-0 h-2 bg-[#F9B949]"></div>
      </div>

      <div className="relative z-10 w-full pt-32 pb-20">
        <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-6 py-3 bg-[#B91C1C]/20 backdrop-blur-sm rounded-full border-2 border-[#F9B949]/40 text-[#F9B949] text-sm font-medium mb-6">
              <span className="animate-pulse mr-2">📅</span>
              Đặt lịch trải nghiệm
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold text-[#F9B949] mb-6 font-serif">
              Đặt lịch trải nghiệm
            </h2>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              Tham gia các buổi biểu diễn rối nước trực tiếp và workshop học nghệ thuật truyền thống
            </p>
            
            <div className="w-full max-w-2xl mx-auto h-1 bg-gradient-to-r from-transparent via-[#B91C1C] to-transparent my-8"></div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <BookingForm />
            <ExperiencePackages />
          </div>
        </div>
      </div>
    </section>
  )
}

export default BookingSection