import React, { useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import './Timeline.css'

const Timeline = () => {
  const timelineRef = useRef(null)
  const timelineScrollRef = useRef(null)

  // Enable horizontal scrolling with mouse wheel only for timeline section
  useEffect(() => {
    const timelineScrollElement = timelineScrollRef.current
    if (!timelineScrollElement) return

    const handleWheel = (e) => {
      // Prevent default vertical scrolling
      e.preventDefault()
      
      // Scroll horizontally instead with increased speed
      timelineScrollElement.scrollLeft += e.deltaY * 3
    }

    timelineScrollElement.addEventListener('wheel', handleWheel, { passive: false })
    
    return () => {
      timelineScrollElement.removeEventListener('wheel', handleWheel)
    }
  }, [])

  const timelineData = [
    {
      year: "1859",
      title: "Khởi đầu",
      description: "Chợ Bến Thành được xây dựng lần đầu tiên bởi thực dân Pháp tại vị trí hiện tại.",
      icon: "🏗️"
    },
    {
      year: "1912-1914",
      title: "Xây dựng lại",
      description: "Chợ được xây dựng lại với kiến trúc mới, tạo nên diện mạo cơ bản như ngày nay.",
      icon: "🏛️"
    },
    {
      year: "1975",
      title: "Thống nhất đất nước",
      description: "Sau thống nhất, chợ Bến Thành trở thành biểu tượng của Thành phố Hồ Chí Minh.",
      icon: "🇻🇳"
    },
    {
      year: "1986",
      title: "Đổi mới",
      description: "Chính sách Đổi mới mở ra kỷ nguyên mới cho thương mại tại chợ Bến Thành.",
      icon: "💼"
    },
    {
      year: "1995",
      title: "Di tích quốc gia",
      description: "Chợ Bến Thành được công nhận là di tích kiến trúc nghệ thuật quốc gia.",
      icon: "🏆"
    },
    {
      year: "2000s",
      title: "Phát triển du lịch",
      description: "Trở thành điểm đến du lịch nổi tiếng, thu hút hàng triệu lượt khách mỗi năm.",
      icon: "🌍"
    },
    {
      year: "2010",
      title: "Hiện đại hóa",
      description: "Cải tạo, nâng cấp cơ sở hạ tầng để phục vụ tốt hơn nhu cầu mua sắm hiện đại.",
      icon: "🔧"
    },
    {
      year: "2024",
      title: "Ngày nay",
      description: "Chợ Bến Thành vẫn là trái tim thương mại và văn hóa của Thành phố Hồ Chí Minh.",
      icon: "✨"
    }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  }

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      x: -50,
      scale: 0.8
    },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  }

  return (
    <div className="timeline-container" ref={timelineRef}>
      <motion.div 
        className="timeline-header"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1>Lịch sử Chợ Bến Thành</h1>
        <p>Hành trình phát triển của biểu tượng Sài Gòn qua các thời kỳ</p>
      </motion.div>

      <motion.div 
        className="timeline"
        ref={timelineScrollRef}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {timelineData.map((item, index) => (
          <motion.div 
            key={index}
            className="timeline-item"
            variants={itemVariants}
          >
            <div className="timeline-content">
              <div className="timeline-icon">
                {item.icon}
              </div>
              <div className="timeline-year">{item.year}</div>
              <h3 className="timeline-title">{item.title}</h3>
              <p className="timeline-description">{item.description}</p>
            </div>
            <div className="timeline-dot"></div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}

export default Timeline