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
  Badge
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
  Person as PersonIcon
} from '@mui/icons-material'

// Styled Components
const StyledSection = styled(Box)(({ theme }) => ({
  minHeight: '100vh',
  background: 'linear-gradient(135deg, #1a4d3a 0%, #0f3d2a 100%)',
  position: 'relative',
  overflow: 'hidden',
  paddingTop: '80px',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundImage: 'url("/muaroi.jpg")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    filter: 'blur(3px)',
    opacity: 0.3,
    zIndex: 1
  },
  '&::after': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'linear-gradient(135deg, rgba(26, 77, 58, 0.85) 0%, rgba(15, 61, 42, 0.9) 100%)',
    zIndex: 2
  }
}))

const ForumCard = styled(Card)(({ theme }) => ({
  background: 'rgba(255, 255, 255, 0.1)',
  backdropFilter: 'blur(15px)',
  border: '1px solid rgba(249, 185, 73, 0.3)',
  borderRadius: '16px',
  padding: theme.spacing(2),
  margin: theme.spacing(1, 0),
  transition: 'all 0.3s ease',
  cursor: 'pointer',
  '&:hover': {
    transform: 'translateY(-4px)',
    borderColor: '#F9B949',
    boxShadow: '0 12px 30px rgba(249, 185, 73, 0.2)'
  }
}))

const StatsCard = styled(Paper)(({ theme }) => ({
  background: 'linear-gradient(135deg, rgba(185, 28, 28, 0.8) 0%, rgba(139, 0, 0, 0.8) 100%)',
  backdropFilter: 'blur(10px)',
  border: '2px solid rgba(249, 185, 73, 0.4)',
  borderRadius: '16px',
  padding: theme.spacing(2),
  textAlign: 'center',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'scale(1.05)',
    borderColor: '#F9B949'
  }
}))

const CategoryChip = styled(Chip)(({ theme, selected }) => ({
  margin: theme.spacing(0.5),
  borderRadius: '20px',
  background: selected 
    ? 'linear-gradient(135deg, #F9B949, #EAB308)' 
    : 'rgba(255, 255, 255, 0.1)',
  color: selected ? '#1a4d3a' : 'white',
  border: `1px solid ${selected ? '#F9B949' : 'rgba(249, 185, 73, 0.3)'}`,
  '&:hover': {
    background: selected 
      ? 'linear-gradient(135deg, #EAB308, #F9B949)' 
      : 'rgba(249, 185, 73, 0.2)',
    borderColor: '#F9B949'
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

  // Forum categories
  const categories = [
    { id: 'all', label: 'Tất cả', count: 45 },
    { id: 'general', label: 'Thảo luận chung', count: 15 },
    { id: 'techniques', label: 'Kỹ thuật múa rối', count: 12 },
    { id: 'history', label: 'Lịch sử & văn hóa', count: 8 },
    { id: 'events', label: 'Sự kiện', count: 6 },
    { id: 'qa', label: 'Hỏi đáp', count: 4 }
  ]

  // Sample forum posts
  const forumPosts = [
    {
      id: 1,
      title: 'Kỹ thuật điều khiển rối nước cơ bản cho người mới bắt đầu',
      content: 'Xin chào mọi người! Mình là người mới tìm hiểu về nghệ thuật rối nước. Có ai có thể chia sẻ những kỹ thuật cơ bản...',
      author: 'Nguyễn Văn An',
      avatar: '/logo1.png',
      category: 'techniques',
      timestamp: '2 giờ trước',
      likes: 24,
      dislikes: 1,
      comments: 8,
      isHot: true,
      tags: ['cơ bản', 'kỹ thuật', 'người mới']
    },
    {
      id: 2,
      title: 'Lịch sử phát triển của nghệ thuật rối nước tại các làng nghề',
      content: 'Nghệ thuật múa rối nước Việt Nam có lịch sử lâu đời và phát triển mạnh tại nhiều làng nghề. Bài viết này sẽ tìm hiểu...',
      author: 'Trần Thị Bình',
      avatar: '/logo2.png',
      category: 'history',
      timestamp: '5 giờ trước',
      likes: 31,
      dislikes: 0,
      comments: 12,
      isHot: true,
      tags: ['lịch sử', 'làng nghề', 'truyền thống']
    },
    {
      id: 3,
      title: 'Sự kiện biểu diễn rối nước tại Nhà hát Thăng Long tháng này',
      content: 'Các bạn có ai đã xem chương trình biểu diễn rối nước tại Nhà hát Thăng Long chưa? Mình nghe nói...',
      author: 'Lê Minh Cường',
      avatar: '/logo3.png',
      category: 'events',
      timestamp: '1 ngày trước',
      likes: 18,
      dislikes: 2,
      comments: 6,
      isHot: false,
      tags: ['sự kiện', 'biểu diễn', 'thăng long']
    },
    {
      id: 4,
      title: 'Làm thế nào để tự chế tạo con rối nước tại nhà?',
      content: 'Mình muốn thử làm một con rối nước đơn giản tại nhà để thực hành. Có ai biết cách làm không...',
      author: 'Phạm Thu Hà',
      avatar: '/logo4.585Z.png',
      category: 'qa',
      timestamp: '2 ngày trước',
      likes: 15,
      dislikes: 0,
      comments: 9,
      isHot: false,
      tags: ['DIY', 'chế tạo', 'hỏi đáp']
    },
    {
      id: 5,
      title: 'Chia sẻ kinh nghiệm học múa rối nước tại trường nghệ thuật',
      content: 'Mình vừa hoàn thành khóa học múa rối nước 3 tháng. Muốn chia sẻ một số kinh nghiệm với mọi người...',
      author: 'Hoàng Văn Đức',
      avatar: '/logo5.386Z.png',
      category: 'general',
      timestamp: '3 ngày trước',
      likes: 22,
      dislikes: 1,
      comments: 11,
      isHot: false,
      tags: ['kinh nghiệm', 'học tập', 'chia sẻ']
    }
  ]

  // Forum statistics
  const forumStats = [
    { label: 'Thành viên', value: '1,234', icon: <PersonIcon /> },
    { label: 'Bài viết', value: '456', icon: <CommentIcon /> },
    { label: 'Chủ đề hot', value: '12', icon: <TrendingIcon /> },
    { label: 'Hoạt động hôm nay', value: '89', icon: <TimeIcon /> }
  ]

  const handleCreatePost = () => {
    // Handle post creation logic here
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
      <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 3, py: 4 }}>
        
        {/* Header */}
        <Fade in={isVisible} timeout={1000}>
          <Box textAlign="center" mb={6}>
            <Typography
              variant="h2"
              component="h1"
              sx={{
                fontSize: { xs: '2.5rem', md: '3.5rem' },
                fontWeight: 'bold',
                mb: 2,
                fontFamily: 'Playfair Display, serif',
                color: '#F9B949'
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
                lineHeight: 1.6
              }}
            >
              Kết nối cộng đồng yêu thích nghệ thuật rối nước
            </Typography>
          </Box>
        </Fade>

        {/* Statistics */}
        <Grow in={isVisible} timeout={1000}>
          <Grid container spacing={3} mb={4}>
            {forumStats.map((stat, index) => (
              <Grid item xs={6} md={3} key={index}>
                <StatsCard>
                  <Box display="flex" alignItems="center" justifyContent="center" mb={1}>
                    <Avatar sx={{ bgcolor: '#F9B949', color: '#1a4d3a', mr: 1 }}>
                      {stat.icon}
                    </Avatar>
                  </Box>
                  <Typography variant="h4" sx={{ color: '#F9B949', fontWeight: 'bold' }}>
                    {stat.value}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'white', opacity: 0.9 }}>
                    {stat.label}
                  </Typography>
                </StatsCard>
              </Grid>
            ))}
          </Grid>
        </Grow>

        <Grid container spacing={4}>
          {/* Sidebar */}
          <Grid item xs={12} md={3}>
            <Grow in={isVisible} timeout={1200}>
              <Box>
                {/* New Post Button */}
                <Button
                  variant="contained"
                  fullWidth
                  startIcon={<AddIcon />}
                  onClick={() => setOpenNewPost(true)}
                  sx={{
                    mb: 3,
                    py: 2,
                    background: 'linear-gradient(135deg, #B91C1C 0%, #8B0000 100%)',
                    border: '2px solid #F9B949',
                    borderRadius: '12px',
                    fontSize: '1.1rem',
                    fontWeight: 'bold',
                    '&:hover': {
                      background: 'linear-gradient(135deg, #DC2626 0%, #B91C1C 100%)',
                      transform: 'scale(1.02)'
                    }
                  }}
                >
                  Tạo bài viết mới
                </Button>

                {/* Search */}
                <TextField
                  fullWidth
                  placeholder="Tìm kiếm bài viết..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  InputProps={{
                    startAdornment: <SearchIcon sx={{ color: 'rgba(255,255,255,0.7)', mr: 1 }} />
                  }}
                  sx={{
                    mb: 3,
                    '& .MuiOutlinedInput-root': {
                      background: 'rgba(255, 255, 255, 0.1)',
                      borderRadius: '12px',
                      '& fieldset': { borderColor: 'rgba(249, 185, 73, 0.3)' },
                      '&:hover fieldset': { borderColor: '#F9B949' },
                      '&.Mui-focused fieldset': { borderColor: '#F9B949' }
                    },
                    '& .MuiInputBase-input': { color: 'white' }
                  }}
                />

                {/* Categories */}
                <Paper
                  sx={{
                    background: 'rgba(255, 255, 255, 0.1)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(249, 185, 73, 0.3)',
                    borderRadius: '16px',
                    p: 2
                  }}
                >
                  <Typography variant="h6" sx={{ color: '#F9B949', mb: 2, fontWeight: 'bold' }}>
                    Danh mục
                  </Typography>
                  {categories.map((category) => (
                    <CategoryChip
                      key={category.id}
                      label={`${category.label} (${category.count})`}
                      selected={selectedCategory === category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      sx={{ width: '100%', mb: 1, justifyContent: 'space-between' }}
                    />
                  ))}
                </Paper>
              </Box>
            </Grow>
          </Grid>

          {/* Main Content */}
          <Grid item xs={12} md={9}>
            <Grow in={isVisible} timeout={1400}>
              <Box>
                {filteredPosts.map((post, index) => (
                  <ForumCard key={post.id}>
                    <CardContent>
                      <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={2}>
                        <Box display="flex" alignItems="center" gap={2}>
                          <Avatar src={post.avatar} sx={{ width: 48, height: 48 }} />
                          <Box>
                            <Typography variant="h6" sx={{ color: 'white', fontWeight: 'bold' }}>
                              {post.author}
                            </Typography>
                            <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)' }}>
                              {post.timestamp}
                            </Typography>
                          </Box>
                        </Box>
                        {post.isHot && (
                          <Chip
                            label="HOT"
                            size="small"
                            sx={{
                              background: 'linear-gradient(135deg, #F9B949, #EAB308)',
                              color: '#1a4d3a',
                              fontWeight: 'bold'
                            }}
                          />
                        )}
                      </Box>

                      <Typography
                        variant="h5"
                        sx={{
                          color: '#F9B949',
                          fontWeight: 'bold',
                          mb: 2,
                          cursor: 'pointer',
                          '&:hover': { textDecoration: 'underline' }
                        }}
                      >
                        {post.title}
                      </Typography>

                      <Typography
                        variant="body1"
                        sx={{
                          color: 'rgba(255,255,255,0.9)',
                          mb: 2,
                          lineHeight: 1.6
                        }}
                      >
                        {post.content}
                      </Typography>

                      {/* Tags */}
                      <Box mb={2}>
                        {post.tags.map((tag, tagIndex) => (
                          <Chip
                            key={tagIndex}
                            label={`#${tag}`}
                            size="small"
                            sx={{
                              mr: 1,
                              mb: 1,
                              background: 'rgba(185, 28, 28, 0.3)',
                              color: 'white',
                              border: '1px solid rgba(249, 185, 73, 0.3)'
                            }}
                          />
                        ))}
                      </Box>

                      <Divider sx={{ bgcolor: 'rgba(249, 185, 73, 0.3)', mb: 2 }} />

                      {/* Actions */}
                      <Box display="flex" justifyContent="space-between" alignItems="center">
                        <Box display="flex" gap={2}>
                          <Button
                            startIcon={<ThumbUpIcon />}
                            sx={{ color: 'rgba(255,255,255,0.8)' }}
                          >
                            {post.likes}
                          </Button>
                          <Button
                            startIcon={<ThumbDownIcon />}
                            sx={{ color: 'rgba(255,255,255,0.8)' }}
                          >
                            {post.dislikes}
                          </Button>
                          <Button
                            startIcon={<CommentIcon />}
                            sx={{ color: 'rgba(255,255,255,0.8)' }}
                          >
                            {post.comments} bình luận
                          </Button>
                        </Box>
                        <Button
                          startIcon={<ReplyIcon />}
                          sx={{ color: '#F9B949' }}
                        >
                          Trả lời
                        </Button>
                      </Box>
                    </CardContent>
                  </ForumCard>
                ))}
              </Box>
            </Grow>
          </Grid>
        </Grid>

        {/* New Post Dialog */}
        <Dialog
          open={openNewPost}
          onClose={() => setOpenNewPost(false)}
          maxWidth="md"
          fullWidth
          PaperProps={{
            sx: {
              background: 'linear-gradient(135deg, #1a4d3a 0%, #0f3d2a 100%)',
              border: '2px solid #F9B949',
              borderRadius: '16px'
            }
          }}
        >
          <DialogTitle sx={{ color: '#F9B949', fontWeight: 'bold', fontSize: '1.5rem' }}>
            Tạo bài viết mới
          </DialogTitle>
          <DialogContent>
            <TextField
              fullWidth
              label="Tiêu đề"
              value={newPostTitle}
              onChange={(e) => setNewPostTitle(e.target.value)}
              margin="normal"
              sx={{
                '& .MuiOutlinedInput-root': {
                  background: 'rgba(255, 255, 255, 0.1)',
                  '& fieldset': { borderColor: 'rgba(249, 185, 73, 0.3)' },
                  '&:hover fieldset': { borderColor: '#F9B949' },
                  '&.Mui-focused fieldset': { borderColor: '#F9B949' }
                },
                '& .MuiInputBase-input': { color: 'white' },
                '& .MuiInputLabel-root': { color: 'rgba(255,255,255,0.7)' }
              }}
            />
            <TextField
              fullWidth
              label="Nội dung"
              value={newPostContent}
              onChange={(e) => setNewPostContent(e.target.value)}
              margin="normal"
              multiline
              rows={6}
              sx={{
                '& .MuiOutlinedInput-root': {
                  background: 'rgba(255, 255, 255, 0.1)',
                  '& fieldset': { borderColor: 'rgba(249, 185, 73, 0.3)' },
                  '&:hover fieldset': { borderColor: '#F9B949' },
                  '&.Mui-focused fieldset': { borderColor: '#F9B949' }
                },
                '& .MuiInputBase-input': { color: 'white' },
                '& .MuiInputLabel-root': { color: 'rgba(255,255,255,0.7)' }
              }}
            />
          </DialogContent>
          <DialogActions sx={{ p: 3 }}>
            <Button
              onClick={() => setOpenNewPost(false)}
              sx={{ color: 'rgba(255,255,255,0.7)' }}
            >
              Hủy
            </Button>
            <Button
              onClick={handleCreatePost}
              variant="contained"
              sx={{
                background: 'linear-gradient(135deg, #B91C1C 0%, #8B0000 100%)',
                border: '1px solid #F9B949',
                '&:hover': {
                  background: 'linear-gradient(135deg, #DC2626 0%, #B91C1C 100%)'
                }
              }}
            >
              Đăng bài
            </Button>
          </DialogActions>
        </Dialog>

      </Container>
    </StyledSection>
  )
}

export default ForumSection
