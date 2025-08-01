import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './ChatBot.css'

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Xin chào! Tôi là trợ lý ảo của Chợ Bến Thành. Tôi có thể giúp bạn tìm hiểu về lịch sử và thông tin của chợ.",
      isBot: true,
      timestamp: new Date()
    }
  ])
  const [inputValue, setInputValue] = useState('')
  const videoRef = useRef(null)
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(e => {
        console.log("Video autoplay failed:", e)
        // Show fallback if autoplay fails
        const fallback = document.querySelector('.avatar-fallback')
        if (fallback) {
          fallback.style.opacity = '1'
        }
      })
    }
  }, [])

  const handleSendMessage = () => {
    if (inputValue.trim() === '') return

    const newMessage = {
      id: messages.length + 1,
      text: inputValue,
      isBot: false,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, newMessage])
    setInputValue('')

    // Simulate bot response
    setTimeout(() => {
      const botResponse = getBotResponse(inputValue)
      const botMessage = {
        id: messages.length + 2,
        text: botResponse,
        isBot: true,
        timestamp: new Date()
      }
      setMessages(prev => [...prev, botMessage])
    }, 1000)
  }

  const getBotResponse = (userMessage) => {
    const message = userMessage.toLowerCase()
    
    if (message.includes('lịch sử') || message.includes('history')) {
      return "Chợ Bến Thành được xây dựng từ năm 1859 và hoàn thành vào năm 1912. Đây là một trong những công trình kiến trúc Đông Dương nổi tiếng nhất của Sài Gòn."
    } else if (message.includes('giờ') || message.includes('time') || message.includes('mở cửa')) {
      return "Chợ Bến Thành mở cửa từ 6:00 sáng đến 18:00 chiều hàng ngày. Chợ đêm hoạt động từ 18:00 đến 23:00."
    } else if (message.includes('mua') || message.includes('shopping') || message.includes('gì')) {
      return "Tại chợ Bến Thành, bạn có thể mua đồ ăn, quần áo, đồ lưu niệm, thủ công mỹ nghệ và nhiều sản phẩm đặc trưng của Việt Nam."
    } else if (message.includes('đường') || message.includes('address') || message.includes('ở đâu')) {
      return "Chợ Bến Thành tọa lạc tại ngã tư Lê Lợi - Phan Bội Châu - Lê Thánh Tôn - Phan Chu Trinh, Quận 1, TP.HCM."
    } else if (message.includes('cảm ơn') || message.includes('thank')) {
      return "Rất vui được giúp bạn! Chúc bạn có chuyến thăm quan Chợ Bến Thành thú vị! 😊"
    } else {
      return "Tôi hiểu bạn muốn biết thêm về Chợ Bến Thành. Bạn có thể hỏi tôi về lịch sử, giờ mở cửa, sản phẩm bán tại chợ, hoặc địa chỉ nhé!"
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage()
    }
  }

  return (
    <>
      {/* Chat Icon */}
      <motion.div
        className="chatbot-icon"
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        animate={isOpen ? { scale: 0.9 } : { scale: 1 }}
      >
        <div className="avatar-container">
          <video
            ref={videoRef}
            className="avatar-video"
            loop
            muted
            playsInline
            autoPlay
            onError={(e) => {
              console.log("Video failed to load:", e)
              // Hide video and show fallback if video fails to load
              if (videoRef.current) {
                videoRef.current.style.display = 'none'
              }
              const fallback = e.target.parentElement.querySelector('.avatar-fallback')
              if (fallback) {
                fallback.style.opacity = '1'
              }
            }}
            onLoadedData={() => {
              // Hide fallback when video loads successfully
              const fallback = videoRef.current?.parentElement.querySelector('.avatar-fallback')
              if (fallback) {
                fallback.style.opacity = '0'
              }
            }}
          >
            <source src="/avatar-video.mp4" type="video/mp4" />
            <source src="/avatar-video.webm" type="video/webm" />
          </video>
          {/* Fallback avatar if video doesn't load */}
          <div className="avatar-fallback">🤖</div>
          <div className="online-indicator"></div>
        </div>
        {!isOpen && (
          <motion.div
            className="chat-bubble"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 2 }}
          >
            Xin chào! Cần hỗ trợ gì không?
          </motion.div>
        )}
      </motion.div>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="chatbot-window glass"
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.3 }}
          >
            {/* Header */}
            <div className="chat-header">
              <div className="chat-header-info">
                <div className="header-avatar">
                  <video
                    className="header-avatar-video"
                    loop
                    muted
                    playsInline
                    autoPlay
                  >
                    <source src="/avatar-video.mp4" type="video/mp4" />
                    <div className="avatar-fallback-small">🤖</div>
                  </video>
                </div>
                <div className="header-text">
                  <h3>Trợ lý Chợ Bến Thành</h3>
                  <span className="status">🟢 Đang hoạt động</span>
                </div>
              </div>
              <button 
                className="close-chat-btn"
                onClick={() => setIsOpen(false)}
              >
                ✕
              </button>
            </div>

            {/* Messages */}
            <div className="chat-messages">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  className={`message ${message.isBot ? 'bot-message' : 'user-message'}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {message.isBot && (
                    <div className="message-avatar">
                      <video
                        className="message-avatar-video"
                        loop
                        muted
                        playsInline
                        autoPlay
                      >
                        <source src="/avatar-video.mp4" type="video/mp4" />
                        <div className="avatar-fallback-tiny">🤖</div>
                      </video>
                    </div>
                  )}
                  <div className="message-content">
                    <p>{message.text}</p>
                    <span className="message-time">
                      {message.timestamp.toLocaleTimeString('vi-VN', { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                    </span>
                  </div>
                </motion.div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="chat-input-container">
              <input
                type="text"
                className="chat-input"
                placeholder="Nhập tin nhắn..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
              />
              <button 
                className="send-btn"
                onClick={handleSendMessage}
                disabled={inputValue.trim() === ''}
              >
                <span className="send-icon">📤</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default ChatBot