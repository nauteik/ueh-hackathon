import React from 'react'
import './ShowCards.css'

const ShowCards = ({ selectedShow, onShowSelect }) => {
  const shows = [
    {
      id: 'legend-of-lake',
      title: 'Huyền thoại Hồ Gươm',
      description: 'Câu chuyện cổ tích về thanh gươm thiêng và rùa thần, một trong những truyền thuyết nổi tiếng nhất của Việt Nam với những màn múa rối đặc sắc.',
      image: '🏮',
      borderColor: '#F9B949',
      bgGradient: 'linear-gradient(135deg, rgba(249, 185, 73, 0.15), rgba(249, 185, 73, 0.05))'
    },
    {
      id: 'four-sacred-animals',
      title: 'Tứ Linh Thiêng',
      description: 'Biểu diễn về bốn linh vật thiêng: Rồng, Lân, Quy, Phượng với những màn múa rối đặc sắc và ý nghĩa sâu sắc trong văn hóa Việt Nam.',
      image: '🐉',
      borderColor: '#B91C1C',
      bgGradient: 'linear-gradient(135deg, rgba(185, 28, 28, 0.15), rgba(185, 28, 28, 0.05))'
    },
    {
      id: 'village-festival',
      title: 'Lễ Hội Làng Quê',
      description: 'Tái hiện không khí sôi động của lễ hội truyền thống làng quê Việt Nam với múa lân, đám cưới, và các sinh hoạt dân gian đầy màu sắc.',
      image: '🎪',
      borderColor: '#10B981',
      bgGradient: 'linear-gradient(135deg, rgba(16, 185, 129, 0.15), rgba(16, 185, 129, 0.05))'
    }
  ]

  return (
    <div className="show-cards-container">
      
      <div className="show-cards-grid space-y-4">
        {shows.map((show) => (
          <div 
            key={show.id} 
            className={`show-card ${selectedShow === show.id ? 'selected' : ''}`}
            onClick={() => onShowSelect(show.id)}
            style={{
              '--border-color': show.borderColor,
              '--bg-gradient': show.bgGradient
            }}
          >
            <div className="show-card-header">
              <div className="show-icon">{show.image}</div>
              <div className="show-content">
                <h4 className="show-title">{show.title}</h4>
                {selectedShow === show.id && (
                  <div className="selected-indicator">✓</div>
                )}
              </div>
            </div>
            
            <p className="show-description">{show.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ShowCards