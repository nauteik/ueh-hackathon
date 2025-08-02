import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './ChatBot.css'

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Xin chào! Tôi là trợ lý ảo về nghệ thuật Rối nước Việt Nam. Tôi có thể giúp bạn tìm hiểu về lịch sử, kỹ thuật biểu diễn và văn hóa truyền thống này.",
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
    
    if (message.includes('lịch sử') || message.includes('history') || message.includes('nguồn gốc')) {
      return "Rối nước là nghệ thuật biểu diễn dân gian truyền thống của Việt Nam, xuất hiện từ thế kỷ 11-12. Nghệ thuật này phát triển mạnh ở miền Bắc, đặc biệt là vùng đồng bằng sông Hồng với các làng nghề như Đào Thục (Nam Định)."
    } else if (message.includes('kỹ thuật') || message.includes('biểu diễn') || message.includes('làm sao')) {
      return "Rối nước được biểu diễn trên mặt nước, các nghệ nhân đứng trong nước điều khiển con rối bằng cần tre dài. Mặt nước vừa là sân khấu vừa che giấu bí mật của nghệ thuật này. Các con rối được làm từ gỗ sung, tô vẽ sặc sỡ."
    } else if (message.includes('câu chuyện') || message.includes('nội dung') || message.includes('kịch bản')) {
      return "Các vở rối nước thường kể về đời sống nông nghiệp, lịch sử anh hùng dân tộc như Thánh Gióng, Lê Lợi, hay những câu chuyện dân gian như Tấm Cám, cảnh sinh hoạt làng quê với múa rồng, lội nước, câu cá..."
    } else if (message.includes('ở đâu') || message.includes('xem') || message.includes('địa điểm')) {
      return "Bạn có thể xem rối nước tại Nhà hát Rối nước Thăng Long (Hà Nội), Bảo tàng Dân tộc học Việt Nam, các làng nghề truyền thống như Đào Thục (Nam Định), hoặc trong các lễ hội văn hóa."
    } else if (message.includes('nhạc cụ') || message.includes('âm nhạc') || message.includes('dàn nhạc')) {
      return "Rối nước được đệm bằng dàn nhạc cổ truyền gồm trống, chiêng, kèn bầu, đàn nguyệt, sáo trúc... Các nghệ nhân vừa điều khiển rối vừa hát chèo, tạo nên bầu không khí sôi động."
    } else if (message.includes('cảm ơn') || message.includes('thank')) {
      return "Rất vui được giúp bạn tìm hiểu về nghệ thuật rối nước Việt Nam! Chúc bạn có những trải nghiệm thú vị với di sản văn hóa truyền thống này! 🎭"
    } else {
      return "Tôi hiểu bạn muốn biết thêm về nghệ thuật rối nước Việt Nam. Bạn có thể hỏi tôi về lịch sử, kỹ thuật biểu diễn, nội dung các vở diễn, địa điểm xem hoặc nhạc cụ đệm nhé!"
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
            Xin chào! Muốn tìm hiểu về rối nước không?
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
                  <h3>Trợ lý Rối nước Việt Nam</h3>
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