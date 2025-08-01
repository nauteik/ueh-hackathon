import React, { useState, useEffect } from 'react'
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Button,
  Grid,
  Avatar,
  Paper,
  Chip,
  IconButton,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Fade,
  Grow,
  Divider,
  Badge,
  Stack,
  InputAdornment
} from '@mui/material'
import { styled } from '@mui/material/styles'
import {
  Add as AddIcon,
  ThumbUp as ThumbUpIcon,
  ThumbDown as ThumbDownIcon,
  Comment as CommentIcon,
  Reply as ReplyIcon,
  Search as SearchIcon,
  TrendingUp as TrendingIcon,
  AccessTime as TimeIcon,
  Person as PersonIcon,
  Share as ShareIcon,
  Bookmark as BookmarkIcon,
  Visibility as ViewIcon,
  Star as StarIcon,
  MoreVert as MoreVertIcon
} from '@mui/icons-material'

// Enhanced Styled Components
const StyledSection = styled(Box)(({ theme }) => ({
  minHeight: '100vh',
  background: 'linear-gradient(135deg, #0B4B3A 0%, #064832 50%, #0B4B3A 100%)',
  position: 'relative',
  overflow: 'hidden',
  paddingTop: '60px',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundImage: 'radial-gradient(circle at 30% 40%, rgba(249, 185, 73, 0.08) 0%, transparent 50%), radial-gradient(circle at 70% 80%, rgba(185, 28, 28, 0.06) 0%, transparent 50%)',
    zIndex: 1
  }
}))

// Compact Post Card
const CompactCard = styled(Card)(({ theme }) => ({
  background: 'linear-gradient(145deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05))',
  backdropFilter: 'blur(20px)',
  border: '1px solid rgba(249, 185, 73, 0.2)',
  borderRadius: '16px',
  margin: theme.spacing(1, 0),
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  cursor: 'pointer',
  overflow: 'hidden',
  position: 'relative',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '2px',
    background: 'linear-gradient(90deg, transparent, #F9B949, transparent)',
    opacity: 0,
    transition: 'opacity 0.3s ease'
  },
  '&:hover': {
    transform: 'translateY(-4px) scale(1.01)',
    borderColor: '#F9B949',
    boxShadow: '0 12px 40px rgba(249, 185, 73, 0.15), 0 0 0 1px rgba(249, 185, 73, 0.1)',
    '&::before': {
      opacity: 1
    }
  }
}))

const StatsCard = styled(Paper)(({ theme }) => ({
  background: 'linear-gradient(145deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05))',
  backdropFilter: 'blur(20px)',
  border: '2px solid rgba(249, 185, 73, 0.3)',
  borderRadius: '20px',
  padding: theme.spacing(3),
  textAlign: 'center',
  transition: 'all 0.4s ease',
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'linear-gradient(45deg, rgba(249, 185, 73, 0.1), transparent)',
    opacity: 0,
    transition: 'opacity 0.4s ease'
  },
  '&:hover': {
    transform: 'translateY(-5px) scale(1.05)',
    borderColor: '#F9B949',
    boxShadow: '0 15px 40px rgba(249, 185, 73, 0.2)',
    '&::before': {
      opacity: 1
    }
  }
}))

const CategoryChip = styled(Chip)(({ theme, selected }) => ({
  margin: theme.spacing(0.5, 0.5, 0.5, 0),
  borderRadius: '25px',
  background: selected 
    ? 'linear-gradient(135deg, #F9B949, #EAB308)' 
    : 'rgba(255, 255, 255, 0.1)',
  color: selected ? '#1a4d3a' : 'white',
  border: `2px solid ${selected ? '#F9B949' : 'rgba(249, 185, 73, 0.2)'}`,
  backdropFilter: 'blur(10px)',
  fontWeight: '600',
  fontSize: '0.9rem',
  height: '40px',
  transition: 'all 0.3s ease',
  '&:hover': {
    background: selected 
      ? 'linear-gradient(135deg, #EAB308, #F9B949)' 
      : 'rgba(249, 185, 73, 0.2)',
    borderColor: '#F9B949',
    transform: 'scale(1.05)'
  }
}))

const SearchField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    background: 'linear-gradient(145deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05))',
    backdropFilter: 'blur(15px)',
    borderRadius: '20px',
    border: '2px solid rgba(249, 185, 73, 0.2)',
    transition: 'all 0.3s ease',
    '& fieldset': { 
      border: 'none'
    },
    '&:hover': {
      borderColor: 'rgba(249, 185, 73, 0.4)',
      transform: 'translateY(-2px)'
    },
    '&.Mui-focused': { 
      borderColor: '#F9B949',
      boxShadow: '0 0 20px rgba(249, 185, 73, 0.3)'
    }
  },
  '& .MuiInputBase-input': { 
    color: 'white',
    fontSize: '1rem',
    '&::placeholder': {
      color: 'rgba(255, 255, 255, 0.7)'
    }
  }
}))

const ActionButton = styled(Button)(({ variant = 'outlined', size = 'medium' }) => ({
  borderRadius: size === 'small' ? '8px' : '12px',
  textTransform: 'none',
  fontWeight: '600',
  padding: size === 'small' ? '4px 8px' : '8px 16px',
  minWidth: size === 'small' ? 'auto' : '64px',
  fontSize: size === 'small' ? '0.75rem' : '0.875rem',
  transition: 'all 0.3s ease',
  ...(variant === 'primary' && {
    background: 'linear-gradient(135deg, #B91C1C 0%, #8B0000 100%)',
    border: '2px solid #F9B949',
    color: 'white',
    '&:hover': {
      background: 'linear-gradient(135deg, #DC2626 0%, #B91C1C 100%)',
      transform: 'translateY(-2px)',
      boxShadow: '0 8px 25px rgba(185, 28, 28, 0.3)'
    }
  }),
  ...(variant === 'outlined' && {
    border: '1px solid rgba(255, 255, 255, 0.3)',
    color: 'rgba(255, 255, 255, 0.8)',
    background: 'rgba(255, 255, 255, 0.05)',
    backdropFilter: 'blur(10px)',
    '&:hover': {
      borderColor: '#F9B949',
      color: '#F9B949',
      background: 'rgba(249, 185, 73, 0.1)'
    }
  })
}))

const CompactIconButton = styled(IconButton)(({ theme }) => ({
  padding: '4px',
  color: 'rgba(255, 255, 255, 0.7)',
  transition: 'all 0.3s ease',
  '&:hover': {
    color: '#F9B949',
    transform: 'scale(1.1)',
    background: 'rgba(249, 185, 73, 0.1)'
  }
}))

const ForumSection = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [openNewPost, setOpenNewPost] = useState(false)
  const [newPostTitle, setNewPostTitle] = useState('')
  const [newPostContent, setNewPostContent] = useState('')
  const [newPostCategory, setNewPostCategory] = useState('general')

  useEffect(() => {
    setIsVisible(true)
  }, [])

  // Enhanced Forum categories
  const categories = [
    { id: 'all', label: 'Tất cả', count: 5, icon: '📋' },
    { id: 'general', label: 'Thảo luận chung', count: 1, icon: '💬' },
    { id: 'techniques', label: 'Kỹ thuật múa rối', count: 1, icon: '🎭' },
    { id: 'history', label: 'Lịch sử & văn hóa', count: 1, icon: '📚' },
    { id: 'events', label: 'Sự kiện', count: 1, icon: '🎪' },
    { id: 'qa', label: 'Hỏi đáp', count: 1, icon: '❓' }
  ]

  // Enhanced forum posts with additional data
  const forumPosts = [
    {
      id: 1,
      title: 'Kỹ thuật điều khiển rối nước cơ bản cho người mới bắt đầu',
      content: 'Xin chào mọi người! Mình là người mới tìm hiểu về nghệ thuật rối nước. Có ai có thể chia sẻ những kỹ thuật cơ bản để điều khiển con rối một cách mượt mà không?',
      author: 'Nguyễn Văn An',
      avatar: '/api/placeholder/40/40',
      category: 'techniques',
      timestamp: '2 giờ trước',
      likes: 24,
      dislikes: 1,
      comments: 8,
      views: 156,
      isHot: true,
      isPinned: false,
      tags: ['cơ bản', 'kỹ thuật', 'người mới']
    },
    {
      id: 2,
      title: 'Lịch sử phát triển của nghệ thuật rối nước tại các làng nghề',
      content: 'Rối nước Việt Nam có lịch sử lâu đời và phát triển mạnh tại nhiều làng nghề truyền thống. Bài viết này sẽ tìm hiểu về quá trình hình thành và phát triển...',
      author: 'Trần Thị Bình',
      avatar: '/api/placeholder/40/40',
      category: 'history',
      timestamp: '5 giờ trước',
      likes: 31,
      dislikes: 0,
      comments: 12,
      views: 234,
      isHot: true,
      isPinned: true,
      tags: ['lịch sử', 'làng nghề', 'truyền thống']
    },
    {
      id: 3,
      title: 'Sự kiện biểu diễn rối nước tại Nhà hát Thăng Long tháng này',
      content: 'Các bạn có ai đã xem chương trình biểu diễn rối nước tại Nhà hát Thăng Long chưa? Mình nghe nói chương trình này có nhiều tiết mục mới và rất đặc sắc.',
      author: 'Lê Minh Cường',
      avatar: '/api/placeholder/40/40',
      category: 'events',
      timestamp: '1 ngày trước',
      likes: 18,
      dislikes: 2,
      comments: 6,
      views: 89,
      isHot: false,
      isPinned: false,
      tags: ['sự kiện', 'biểu diễn', 'thăng long']
    },
    {
      id: 4,
      title: 'Hỏi về cách làm con rối gỗ tại nhà',
      content: 'Mình muốn tự làm con rối gỗ để thực hành. Có ai biết loại gỗ nào phù hợp và công cụ cần thiết không?',
      author: 'Phạm Văn Đức',
      avatar: '/api/placeholder/40/40',
      category: 'qa',
      timestamp: '2 ngày trước',
      likes: 15,
      dislikes: 0,
      comments: 9,
      views: 67,
      isHot: false,
      isPinned: false,
      tags: ['DIY', 'làm tay', 'gỗ']
    },
    {
      id: 5,
      title: 'Workshop học múa rối nước miễn phí cuối tuần',
      content: 'Nhà văn hóa quận 1 tổ chức workshop học múa rối nước miễn phí cho mọi lứa tuổi. Đăng ký ngay!',
      author: 'Hoàng Thị Mai',
      avatar: '/api/placeholder/40/40',
      category: 'general',
      timestamp: '3 ngày trước',
      likes: 42,
      dislikes: 1,
      comments: 15,
      views: 301,
      isHot: true,
      isPinned: false,
      tags: ['workshop', 'miễn phí', 'học tập']
    }
  ]

  const handleCreatePost = () => {
    console.log('Creating post:', { newPostTitle, newPostContent, newPostCategory })
    setOpenNewPost(false)
    setNewPostTitle('')
    setNewPostContent('')
    setNewPostCategory('general')
  }

  const filteredPosts = forumPosts.filter(post => {
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.content.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <StyledSection>
      <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 3, py: 6 }}>
        
        {/* Enhanced Header */}
        <Fade in={isVisible} timeout={1000}>
          <Box textAlign="center" mb={6}>
            <Box mb={2}>
              <Chip
                label="🎭 Cộng đồng rối nước"
                sx={{
                  background: 'linear-gradient(135deg, rgba(249, 185, 73, 0.2), rgba(185, 28, 28, 0.2))',
                  color: '#F9B949',
                  border: '2px solid rgba(249, 185, 73, 0.4)',
                  backdropFilter: 'blur(10px)',
                  fontSize: '1rem',
                  fontWeight: '600',
                  padding: '8px 16px',
                  height: 'auto'
                }}
              />
            </Box>
            <Typography
              variant="h1"
              component="h1"
              sx={{
                fontSize: { xs: '2.5rem', md: '3.5rem' },
                fontWeight: '900',
                mb: 2,
                background: 'linear-gradient(135deg, #F9B949 0%, #ffffff 25%, #B91C1C 50%, #ffffff 75%, #F9B949 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontFamily: 'Playfair Display, serif',
                lineHeight: 1.1
              }}
            >
              Diễn đàn thảo luận
            </Typography>
            <Typography
              variant="h5"
              sx={{
                color: 'rgba(255,255,255,0.9)',
                maxWidth: '600px',
                mx: 'auto',
                lineHeight: 1.6,
                fontSize: { xs: '1rem', md: '1.3rem' },
                fontWeight: 400
              }}
            >
              Kết nối cộng đồng đam mê nghệ thuật rối nước Việt Nam
            </Typography>
          </Box>
        </Fade>

        <Grid container spacing={3}>
          {/* Enhanced Sidebar */}
          <Grid item xs={12} md={3}>
            <Grow in={isVisible} timeout={1200}>
              <Box>
                {/* Enhanced New Post Button */}
                <ActionButton
                  variant="primary"
                  fullWidth
                  startIcon={<AddIcon />}
                  onClick={() => setOpenNewPost(true)}
                  sx={{
                    mb: 3,
                    py: 2,
                    fontSize: '1rem',
                    fontWeight: 'bold'
                  }}
                >
                  Tạo bài viết mới
                </ActionButton>

                {/* Enhanced Search */}
                <SearchField
                  fullWidth
                  placeholder="Tìm kiếm bài viết..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon sx={{ color: 'rgba(255,255,255,0.7)' }} />
                      </InputAdornment>
                    )
                  }}
                  sx={{ mb: 3 }}
                />

                {/* Enhanced Categories */}
                <Paper
                  sx={{
                    background: 'linear-gradient(145deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05))',
                    backdropFilter: 'blur(20px)',
                    border: '2px solid rgba(249, 185, 73, 0.2)',
                    borderRadius: '20px',
                    p: 2.5,
                    position: 'relative',
                    overflow: 'hidden',
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '2px',
                      background: 'linear-gradient(90deg, transparent, #F9B949, transparent)'
                    }
                  }}
                >
                  <Typography 
                    variant="h6" 
                    sx={{ 
                      color: '#F9B949', 
                      mb: 2, 
                      fontWeight: '800',
                      fontSize: '1.2rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1
                    }}
                  >
                    📂 Danh mục
                  </Typography>
                  <Stack spacing={0.5}>
                    {categories.map((category) => (
                      <CategoryChip
                        key={category.id}
                        label={
                          <Box display="flex" alignItems="center" justifyContent="space-between" width="100%">
                            <Box display="flex" alignItems="center" gap={1}>
                              <span>{category.icon}</span>
                              <span>{category.label}</span>
                            </Box>
                            <Chip 
                              label={category.count} 
                              size="small"
                              sx={{ 
                                bgcolor: 'rgba(255,255,255,0.2)', 
                                color: 'inherit',
                                minWidth: '20px',
                                height: '18px',
                                '& .MuiChip-label': { fontSize: '0.65rem', px: 0.5 }
                              }}
                            />
                          </Box>
                        }
                        selected={selectedCategory === category.id}
                        onClick={() => setSelectedCategory(category.id)}
                        sx={{ width: '100%', justifyContent: 'space-between', height: '40px' }}
                      />
                    ))}
                  </Stack>
                </Paper>
              </Box>
            </Grow>
          </Grid>

          {/* Enhanced Main Content */}
          <Grid item xs={12} md={9}>
            <Grow in={isVisible} timeout={1400}>
              <Box>
                {/* Results header */}
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                  <Typography variant="h6" sx={{ color: 'white', fontWeight: '600', fontSize: '1.1rem' }}>
                    {filteredPosts.length} bài viết
                  </Typography>
                  <Box display="flex" gap={1}>
                    <ActionButton variant="outlined" size="small">
                      Mới nhất
                    </ActionButton>
                    <ActionButton variant="outlined" size="small">
                      Phổ biến
                    </ActionButton>
                  </Box>
                </Box>

                {/* Compact Post Cards */}
                {filteredPosts.map((post, index) => (
                  <CompactCard key={post.id}>
                    <CardContent sx={{ p: 2.5 }}>
                      {/* Compact Post Header */}
                      <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={2}>
                        <Box display="flex" alignItems="center" gap={1.5}>
                          <Avatar 
                            src={post.avatar} 
                            sx={{ 
                              width: 40, 
                              height: 40,
                              border: '2px solid rgba(249, 185, 73, 0.3)',
                              boxShadow: '0 4px 15px rgba(0,0,0,0.2)'
                            }} 
                          />
                          <Box>
                            <Typography 
                              variant="subtitle1" 
                              sx={{ 
                                color: 'white', 
                                fontWeight: '600',
                                fontSize: '1rem',
                                lineHeight: 1.2
                              }}
                            >
                              {post.author}
                            </Typography>
                            <Typography 
                              variant="body2" 
                              sx={{ 
                                color: 'rgba(255,255,255,0.6)',
                                display: 'flex',
                                alignItems: 'center',
                                gap: 0.5,
                                fontSize: '0.8rem'
                              }}
                            >
                              <TimeIcon sx={{ fontSize: '12px' }} />
                              {post.timestamp}
                            </Typography>
                          </Box>
                        </Box>
                        <Box display="flex" gap={0.5} alignItems="center">
                          {post.isPinned && (
                            <Chip
                              label="📌"
                              size="small"
                              sx={{
                                background: 'linear-gradient(135deg, #10B981, #059669)',
                                color: 'white',
                                fontWeight: 'bold',
                                height: '20px',
                                minWidth: '30px',
                                '& .MuiChip-label': { px: 0.5, fontSize: '0.7rem' }
                              }}
                            />
                          )}
                          {post.isHot && (
                            <Chip
                              label="🔥"
                              size="small"
                              sx={{
                                background: 'linear-gradient(135deg, #F9B949, #EAB308)',
                                color: '#1a4d3a',
                                fontWeight: 'bold',
                                height: '20px',
                                minWidth: '30px',
                                '& .MuiChip-label': { px: 0.5, fontSize: '0.7rem' }
                              }}
                            />
                          )}
                          <CompactIconButton size="small">
                            <MoreVertIcon sx={{ fontSize: '16px' }} />
                          </CompactIconButton>
                        </Box>
                      </Box>

                      {/* Compact Post Title */}
                      <Typography
                        variant="h6"
                        sx={{
                          color: '#F9B949',
                          fontWeight: '700',
                          mb: 1.5,
                          cursor: 'pointer',
                          lineHeight: 1.3,
                          fontSize: '1.1rem',
                          transition: 'all 0.3s ease',
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden',
                          '&:hover': { 
                            textDecoration: 'underline',
                            color: '#FCD34D'
                          }
                        }}
                      >
                        {post.title}
                      </Typography>

                      {/* Compact Post Content */}
                      <Typography
                        variant="body2"
                        sx={{
                          color: 'rgba(255,255,255,0.8)',
                          mb: 2,
                          lineHeight: 1.5,
                          fontSize: '0.9rem',
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden'
                        }}
                      >
                        {post.content}
                      </Typography>

                      {/* Compact Tags */}
                      <Box mb={2}>
                        {post.tags.slice(0, 3).map((tag, tagIndex) => (
                          <Chip
                            key={tagIndex}
                            label={`#${tag}`}
                            size="small"
                            sx={{
                              mr: 0.5,
                              mb: 0.5,
                              background: 'rgba(185, 28, 28, 0.2)',
                              color: '#F9B949',
                              border: '1px solid rgba(249, 185, 73, 0.3)',
                              backdropFilter: 'blur(10px)',
                              fontWeight: '500',
                              fontSize: '0.7rem',
                              height: '22px',
                              '&:hover': {
                                background: 'rgba(249, 185, 73, 0.2)',
                                transform: 'scale(1.05)'
                              }
                            }}
                          />
                        ))}
                      </Box>

                      {/* Compact Actions */}
                      <Box display="flex" justifyContent="space-between" alignItems="center">
                        <Box display="flex" gap={0.5}>
                          <ActionButton
                            variant="outlined"
                            startIcon={<ThumbUpIcon sx={{ fontSize: '14px' }} />}
                            size="small"
                          >
                            {post.likes}
                          </ActionButton>
                          <ActionButton
                            variant="outlined"
                            startIcon={<CommentIcon sx={{ fontSize: '14px' }} />}
                            size="small"
                          >
                            {post.comments}
                          </ActionButton>
                          <ActionButton
                            variant="outlined"
                            startIcon={<ViewIcon sx={{ fontSize: '14px' }} />}
                            size="small"
                          >
                            {post.views}
                          </ActionButton>
                        </Box>
                        <Box display="flex" gap={0.5} alignItems="center">
                          <CompactIconButton size="small">
                            <BookmarkIcon sx={{ fontSize: '16px' }} />
                          </CompactIconButton>
                          <CompactIconButton size="small">
                            <ShareIcon sx={{ fontSize: '16px' }} />
                          </CompactIconButton>
                          <ActionButton
                            startIcon={<ReplyIcon sx={{ fontSize: '14px' }} />}
                            size="small"
                            sx={{ color: '#F9B949', fontSize: '0.75rem' }}
                          >
                            Trả lời
                          </ActionButton>
                        </Box>
                      </Box>
                    </CardContent>
                  </CompactCard>
                ))}
              </Box>
            </Grow>
          </Grid>
        </Grid>

        {/* Enhanced New Post Dialog */}
        <Dialog
          open={openNewPost}
          onClose={() => setOpenNewPost(false)}
          maxWidth="md"
          fullWidth
          PaperProps={{
            sx: {
              background: 'linear-gradient(145deg, rgba(11, 75, 58, 0.95), rgba(6, 72, 50, 0.95))',
              backdropFilter: 'blur(20px)',
              border: '2px solid #F9B949',
              borderRadius: '24px',
              boxShadow: '0 25px 50px rgba(0,0,0,0.3)'
            }
          }}
        >
          <DialogTitle 
            sx={{ 
              color: '#F9B949', 
              fontWeight: '800', 
              fontSize: '1.5rem',
              textAlign: 'center',
              pb: 1
            }}
          >
            ✍️ Tạo bài viết mới
          </DialogTitle>
          <DialogContent sx={{ px: 3 }}>
            <TextField
              fullWidth
              label="Tiêu đề bài viết"
              value={newPostTitle}
              onChange={(e) => setNewPostTitle(e.target.value)}
              margin="normal"
              sx={{
                '& .MuiOutlinedInput-root': {
                  background: 'rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(10px)',
                  borderRadius: '16px',
                  '& fieldset': { borderColor: 'rgba(249, 185, 73, 0.3)' },
                  '&:hover fieldset': { borderColor: '#F9B949' },
                  '&.Mui-focused fieldset': { borderColor: '#F9B949' }
                },
                '& .MuiInputBase-input': { color: 'white', fontSize: '1rem' },
                '& .MuiInputLabel-root': { color: 'rgba(255,255,255,0.7)' }
              }}
            />
            <TextField
              fullWidth
              label="Nội dung bài viết"
              value={newPostContent}
              onChange={(e) => setNewPostContent(e.target.value)}
              margin="normal"
              multiline
              rows={6}
              sx={{
                '& .MuiOutlinedInput-root': {
                  background: 'rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(10px)',
                  borderRadius: '16px',
                  '& fieldset': { borderColor: 'rgba(249, 185, 73, 0.3)' },
                  '&:hover fieldset': { borderColor: '#F9B949' },
                  '&.Mui-focused fieldset': { borderColor: '#F9B949' }
                },
                '& .MuiInputBase-input': { color: 'white', fontSize: '0.95rem' },
                '& .MuiInputLabel-root': { color: 'rgba(255,255,255,0.7)' }
              }}
            />
          </DialogContent>
          <DialogActions sx={{ p: 3, pt: 1 }}>
            <ActionButton
              onClick={() => setOpenNewPost(false)}
              variant="outlined"
            >
              Hủy bỏ
            </ActionButton>
            <ActionButton
              onClick={handleCreatePost}
              variant="primary"
              startIcon={<AddIcon />}
            >
              Đăng bài viết
            </ActionButton>
          </DialogActions>
        </Dialog>

      </Container>
    </StyledSection>
  )
}

export default ForumSection
