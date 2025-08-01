import React, { useState } from 'react'

const BookingForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    experience: 'show',
    date: ''
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Booking data:', formData)
    // Handle form submission logic here
  }

  return (
    <div className="relative backdrop-blur-sm rounded-xl p-8 bg-[#0B4B3A]/30 border-2 border-[#F9B949]/40">
      {/* Temple roof decoration on top */}
      <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-24 h-6 bg-[#F9B949] rounded-t-md"></div>
      <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-16 h-3 bg-[#B91C1C] rounded-t-md"></div>
      
      {/* Decorative Corners - Vietnamese style */}
      <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-[#F9B949] opacity-50"></div>
      <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-[#F9B949] opacity-50"></div>
      
      <h3 className="text-2xl font-semibold mb-6 text-[#F9B949] text-center pt-4">Đặt lịch ngay</h3>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-white/80 mb-2">Họ và tên</label>
          <input 
            type="text" 
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="w-full px-4 py-3 bg-white/10 border border-[#F9B949]/30 rounded-lg focus:ring-2 focus:ring-[#F9B949] focus:border-[#F9B949] text-white placeholder-white/50"
            placeholder="Nhập họ và tên của bạn"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-white/80 mb-2">Email</label>
          <input 
            type="email" 
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full px-4 py-3 bg-white/10 border border-[#F9B949]/30 rounded-lg focus:ring-2 focus:ring-[#F9B949] focus:border-[#F9B949] text-white placeholder-white/50"
            placeholder="example@email.com"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-white/80 mb-2">Số điện thoại</label>
          <input 
            type="tel" 
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            className="w-full px-4 py-3 bg-white/10 border border-[#F9B949]/30 rounded-lg focus:ring-2 focus:ring-[#F9B949] focus:border-[#F9B949] text-white placeholder-white/50"
            placeholder="0123 456 789"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-white/80 mb-2">Loại trải nghiệm</label>
          <select 
            name="experience"
            value={formData.experience}
            onChange={handleInputChange}
            className="w-full px-4 py-3 bg-white/10 border border-[#F9B949]/30 rounded-lg focus:ring-2 focus:ring-[#F9B949] focus:border-[#F9B949] text-white"
          >
            <option value="show" className="bg-[#0B4B3A] text-white">Biểu diễn rối nước (60 phút)</option>
            <option value="workshop" className="bg-[#0B4B3A] text-white">Workshop học múa rối (120 phút)</option>
            <option value="vip" className="bg-[#0B4B3A] text-white">Trải nghiệm VIP (180 phút)</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-white/80 mb-2">Ngày mong muốn</label>
          <input 
            type="date" 
            name="date"
            value={formData.date}
            onChange={handleInputChange}
            className="w-full px-4 py-3 bg-white/10 border border-[#F9B949]/30 rounded-lg focus:ring-2 focus:ring-[#F9B949] focus:border-[#F9B949] text-white"
            required
          />
        </div>
        
        <button 
          type="submit"
          className="w-full bg-[#B91C1C] hover:bg-[#B91C1C]/80 text-white py-4 rounded-lg font-semibold transition-all duration-300 border-2 border-[#F9B949] hover:scale-105"
        >
          Đặt lịch ngay
        </button>
      </form>
    </div>
  )
}

export default BookingForm