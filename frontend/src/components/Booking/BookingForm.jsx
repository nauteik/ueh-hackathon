import React, { useState } from 'react'
import './BookingForm.css'

const BookingForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    experience: 'show',
    date: ''
  })

  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState('')

  const validateForm = () => {
    const newErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = 'Vui lòng nhập họ và tên'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Vui lòng nhập email'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email không hợp lệ'
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Vui lòng nhập số điện thoại'
    } else if (!/^[0-9]{10,11}$/.test(formData.phone.replace(/\s/g, ''))) {
      newErrors.phone = 'Số điện thoại không hợp lệ'
    }

    if (!formData.date) {
      newErrors.date = 'Vui lòng chọn ngày'
    } else {
      const selectedDate = new Date(formData.date)
      const today = new Date()
      today.setHours(0, 0, 0, 0)
      if (selectedDate < today) {
        newErrors.date = 'Vui lòng chọn ngày trong tương lai'
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)
    setSubmitStatus('')

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      console.log('Booking data:', formData)
      setSubmitStatus('success')
      
      // Reset form after successful submission
      setTimeout(() => {
        setFormData({
          name: '',
          email: '',
          phone: '',
          experience: 'show',
          date: ''
        })
        setSubmitStatus('')
      }, 3000)
      
    } catch (error) {
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  const getInputClassName = (fieldName) => {
    let baseClass = "booking-input"
    
    if (errors[fieldName]) {
      baseClass += " error"
    } else if (formData[fieldName] && !errors[fieldName]) {
      baseClass += " success"
    }
    
    return baseClass
  }

  const getSubmitButtonClass = () => {
    let baseClass = "booking-submit"
    
    if (isSubmitting) {
      baseClass += " loading"
    } else if (submitStatus === 'success') {
      baseClass += " success"
    }
    
    return baseClass
  }

  const getSubmitButtonText = () => {
    if (isSubmitting) return 'Đang xử lý...'
    if (submitStatus === 'success') return '✓ Đặt lịch thành công!'
    return 'Đặt lịch ngay'
  }

  return (
    <div className="booking-form">
      <h3>Đặt lịch ngay</h3>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="booking-label block text-sm font-medium text-gray-700 mb-2">Họ và tên</label>
          <input 
            type="text" 
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className={getInputClassName('name')}
            placeholder="Nhập họ và tên của bạn"
            required
          />
          {errors.name && <div className="error-message">{errors.name}</div>}
        </div>
        
        <div>
          <label className="booking-label block text-sm font-medium text-gray-700 mb-2">Email</label>
          <input 
            type="email" 
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className={getInputClassName('email')}
            placeholder="example@email.com"
            required
          />
          {errors.email && <div className="error-message">{errors.email}</div>}
        </div>
        
        <div>
          <label className="booking-label block text-sm font-medium text-gray-700 mb-2">Số điện thoại</label>
          <input 
            type="tel" 
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            className={getInputClassName('phone')}
            placeholder="0123 456 789"
            required
          />
          {errors.phone && <div className="error-message">{errors.phone}</div>}
        </div>
        
        <div>
          <label className="booking-label">Loại trải nghiệm</label>
          <select 
            name="experience"
            value={formData.experience}
            onChange={handleInputChange}
            className="booking-input"
          >
            <option value="show">Biểu diễn rối nước (60 phút)</option>
            <option value="workshop">Workshop học múa rối (120 phút)</option>
            <option value="vip">Trải nghiệm VIP (180 phút)</option>
          </select>
        </div>
        
        <div>
          <label className="booking-label block text-sm font-medium text-gray-700 mb-2">Ngày mong muốn</label>
          <input 
            type="date" 
            name="date"
            value={formData.date}
            onChange={handleInputChange}
            className={getInputClassName('date')}
            min={new Date().toISOString().split('T')[0]}
            required
          />
          {errors.date && <div className="error-message">{errors.date}</div>}
        </div>
        
        <button 
          type="submit"
          disabled={isSubmitting || submitStatus === 'success'}
          className={getSubmitButtonClass()}
        >
          {getSubmitButtonText()}
        </button>
        
        {submitStatus === 'error' && (
          <div className="error-message text-center">
            Có lỗi xảy ra. Vui lòng thử lại!
          </div>
        )}
      </form>
    </div>
  )
}

export default BookingForm