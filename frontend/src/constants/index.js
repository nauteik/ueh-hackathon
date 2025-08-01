// Navigation items
export const NAV_ITEMS = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About Us' },
  { id: 'forum', label: 'Forum' },
  { id: 'booking', label: 'Booking' },
  { id: 'game', label: 'Game' }
]

// Feature cards data
export const FEATURES = [
  {
    icon: '🌊',
    title: 'Nghệ thuật truyền thống',
    description: 'Khám phá vẻ đẹp của nghệ thuật rối nước cổ truyền với hơn 1000 năm lịch sử'
  },
  {
    icon: '🎯',
    title: 'Tương tác 3D',
    description: 'Trải nghiệm game 3D tương tác với đồ họa sống động và âm thanh chân thực'
  },
  {
    icon: '🏆',
    title: 'Thử thách kỹ năng',
    description: 'Rèn luyện khả năng điều khiển và thăng bằng qua các thử thách hấp dẫn'
  }
]

// Experience packages
export const EXPERIENCE_PACKAGES = [
  {
    title: '🎭 Biểu diễn rối nước',
    description: 'Thưởng thức màn biểu diễn rối nước truyền thống với các câu chuyện dân gian Việt Nam',
    price: '200.000đ',
    duration: '60 phút',
    borderColor: 'border-blue-500',
    priceColor: 'text-blue-600'
  },
  {
    title: '🎨 Workshop học múa rối',
    description: 'Học cách điều khiển rối nước từ các nghệ nhân có kinh nghiệm',
    price: '400.000đ',
    duration: '120 phút',
    borderColor: 'border-green-500',
    priceColor: 'text-green-600'
  }
]

// Game constants
export const GAME_CONSTANTS = {
  BALANCE_STEP: 0.1,
  BALANCE_DRIFT_RATE: 0.05,
  SCORE_THRESHOLD: 0.5,
  DRIFT_INTERVAL: 100,
  SCORE_INTERVAL: 100
}