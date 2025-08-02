import React, { useState } from 'react'
import './BookingForm.css'

const BookingForm = ({ selectedShow, onShowSelect }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    city: '',
    theater: '',
    experience: 'show',
    show: selectedShow || '',
    date: '',
    time: ''
  })

  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState('')

  // Dữ liệu thành phố và rạp
  const citiesAndTheaters = {
    'hanoi': {
      name: 'Hà Nội',
      theaters: [
        { id: 'thang-long', name: 'Nhà hát Rối nước Thăng Long' },
        { id: 'kim-dong', name: 'Nhà hát Rối nước Kim Đồng' },
        { id: 'hong-ha', name: 'Trung tâm Văn hóa Hồng Hà' },
        { id: 'temple-literature', name: 'Văn Miếu - Quốc Tử Giám' }
      ]
    },
    'hcm': {
      name: 'TP. Hồ Chí Minh',
      theaters: [
        { id: 'golden-dragon', name: 'Nhà hát Rối nước Rồng Vàng' },
        { id: 'saigon-opera', name: 'Nhà hát Thành phố' },
        { id: 'history-museum', name: 'Bảo tàng Lịch sử TP.HCM' },
        { id: 'ben-thanh', name: 'Trung tâm Văn hóa Bến Thành' }
      ]
    },
    'hue': {
      name: 'Huế',
      theaters: [
        { id: 'hue-royal', name: 'Nhà hát Hoàng Gia Huế' },
        { id: 'perfume-river', name: 'Sân khấu Sông Hương' },
        { id: 'imperial-city', name: 'Hoàng Thành Huế' }
      ]
    },
    'danang': {
      name: 'Đà Nẵng',
      theaters: [
        { id: 'danang-opera', name: 'Nhà hát Trung Vương' },
        { id: 'han-market', name: 'Trung tâm Văn hóa Chợ Hàn' },
        { id: 'dragon-bridge', name: 'Khu vực Cầu Rồng' }
      ]
    },
    'cantho': {
      name: 'Cần Thơ',
      theaters: [
        { id: 'cantho-theater', name: 'Nhà hát Cần Thơ' },
        { id: 'mekong-cultural', name: 'Trung tâm Văn hóa Mekong' },
        { id: 'ninh-kieu', name: 'Bến Ninh Kiều' }
      ]
    }
  }

  // Danh sách thời gian biểu diễn
  const showTimes = [
    { value: '14:00', label: '14:00 - Buổi chiều', icon: '🌅' },
    { value: '20:00', label: '20:00 - Buổi tối', icon: '🌙' }
  ]

  // Danh sách chương trình biểu diễn
  const shows = [
    { id: 'legend-of-lake', name: '🏮 Huyền thoại Hồ Gươm', duration: '45 phút' },
    { id: 'four-sacred-animals', name: '🐉 Tứ Linh Thiêng', duration: '60 phút' },
    { id: 'village-festival', name: '🎪 Lễ Hội Làng Quê', duration: '75 phút' }
  ]

  // Update formData when selectedShow changes
  React.useEffect(() => {
    if (selectedShow && selectedShow !== formData.show) {
      setFormData(prev => ({
        ...prev,
        show: selectedShow
      }))
    }
  }, [selectedShow, formData.show])

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

    if (!formData.city) {
      newErrors.city = 'Vui lòng chọn thành phố'
    }

    if (!formData.theater) {
      newErrors.theater = 'Vui lòng chọn địa điểm'
    }

    if (!formData.show) {
      newErrors.show = 'Vui lòng chọn chương trình biểu diễn'
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

    if (!formData.time) {
      newErrors.time = 'Vui lòng chọn thời gian'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    
    // Nếu thay đổi thành phố, reset theater
    if (name === 'city') {
      setFormData(prev => ({
        ...prev,
        [name]: value,
        theater: '' // Reset theater khi đổi city
      }))
    } else if (name === 'show') {
      // Sync with parent component
      setFormData(prev => ({
        ...prev,
        [name]: value
      }))
      if (onShowSelect) {
        onShowSelect(value)
      }
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }))
    }

    // Clear error when user starts typing/selecting
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }

    // Clear theater error when city changes
    if (name === 'city' && errors.theater) {
      setErrors(prev => ({
        ...prev,
        theater: ''
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
          city: '',
          theater: '',
          experience: 'show',
          show: '',
          date: '',
          time: ''
        })
        setSubmitStatus('')
        if (onShowSelect) {
          onShowSelect('')
        }
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

  // Get available theaters based on selected city
  const getAvailableTheaters = () => {
    if (!formData.city || !citiesAndTheaters[formData.city]) {
      return []
    }
    return citiesAndTheaters[formData.city].theaters
  }

  return (
    <div className="booking-form">
      <h3>Đặt lịch ngay</h3>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="booking-label">Họ và tên</label>
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
          <label className="booking-label">Email</label>
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
          <label className="booking-label">Số điện thoại</label>
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
          <label className="booking-label">Thành phố</label>
          <select 
            name="city"
            value={formData.city}
            onChange={handleInputChange}
            className={getInputClassName('city')}
            required
          >
            <option value="" className="bg-[#0B4B3A] text-white">Chọn thành phố</option>
            {Object.entries(citiesAndTheaters).map(([key, cityData]) => (
              <option key={key} value={key} className="bg-[#0B4B3A] text-white">
                🏙️ {cityData.name}
              </option>
            ))}
          </select>
          {errors.city && <div className="error-message">{errors.city}</div>}
        </div>

        <div>
          <label className="booking-label">Địa điểm biểu diễn</label>
          <select 
            name="theater"
            value={formData.theater}
            onChange={handleInputChange}
            className={getInputClassName('theater')}
            disabled={!formData.city}
            required
          >
            <option value="" className="bg-[#0B4B3A] text-white">
              {!formData.city ? 'Vui lòng chọn thành phố trước' : 'Chọn địa điểm'}
            </option>
            {getAvailableTheaters().map((theater) => (
              <option key={theater.id} value={theater.id} className="bg-[#0B4B3A] text-white">
                🎭 {theater.name}
              </option>
            ))}
          </select>
          {errors.theater && <div className="error-message">{errors.theater}</div>}
        </div>

        <div>
          <label className="booking-label">Chương trình biểu diễn</label>
          <select 
            name="show"
            value={formData.show}
            onChange={handleInputChange}
            className={getInputClassName('show')}
            required
          >
            <option value="" className="bg-[#0B4B3A] text-white">
              Chọn chương trình
            </option>
            {shows.map((show) => (
              <option key={show.id} value={show.id} className="bg-[#0B4B3A] text-white">
                {show.name} ({show.duration})
              </option>
            ))}
          </select>
          {errors.show && <div className="error-message">{errors.show}</div>}
        </div>
        
        <div>
          <label className="booking-label">Loại trải nghiệm</label>
          <select 
            name="experience"
            value={formData.experience}
            onChange={handleInputChange}
            className="booking-input"
          >
            <option value="show" className="bg-[#0B4B3A] text-white">🎪 Biểu diễn rối nước (60 phút)</option>
            <option value="workshop" className="bg-[#0B4B3A] text-white">🛠️ Workshop học múa rối (120 phút)</option>
            <option value="vip" className="bg-[#0B4B3A] text-white">⭐ Trải nghiệm VIP (180 phút)</option>
          </select>
        </div>
        
        <div>
          <label className="booking-label">Ngày mong muốn</label>
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

        <div>
          <label className="booking-label">Thời gian biểu diễn</label>
          <select 
            name="time"
            value={formData.time}
            onChange={handleInputChange}
            className={getInputClassName('time')}
            required
          >
            <option value="" className="bg-[#0B4B3A] text-white">
              Chọn thời gian
            </option>
            {showTimes.map((timeSlot) => (
              <option 
                key={timeSlot.value} 
                value={timeSlot.value} 
                className="bg-[#0B4B3A] text-white"
              >
                {timeSlot.icon} {timeSlot.label}
              </option>
            ))}
          </select>
          {errors.time && <div className="error-message">{errors.time}</div>}
        </div>
        
        <button 
          type="submit"
          disabled={isSubmitting || submitStatus === 'success'}
          className={getSubmitButtonClass()}
        >
          {getSubmitButtonText()}
        </button>
        
        {submitStatus === 'success' && (
          <div className="success-message text-center">
            🎉 Đặt lịch thành công! Chúng tôi sẽ liên hệ với bạn sớm nhất.
          </div>
        )}
        
        {submitStatus === 'error' && (
          <div className="error-message text-center">
            ❌ Có lỗi xảy ra. Vui lòng thử lại!
          </div>
        )}
      </form>
    </div>
  )
}

export default BookingForm