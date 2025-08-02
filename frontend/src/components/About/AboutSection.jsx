import React, { useEffect, useState } from 'react'
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Grid,
  Fade,
  Grow,
  Avatar,
  Paper
} from '@mui/material'
import { styled } from '@mui/material/styles'

// Styled Components
const FullWidthSection = styled(Box)(({ backgroundImage }) => ({
  minHeight: '100vh',
  width: '100vw',
  position: 'relative',
  backgroundImage: `url("${backgroundImage}")`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  backgroundAttachment: 'fixed',
  display: 'flex',
  alignItems: 'center',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'linear-gradient(135deg, rgba(26, 77, 58, 0.8) 0%, rgba(15, 61, 42, 0.9) 100%)',
    zIndex: 1
  }
}))

const ContentOverlay = styled(Container)(({ theme }) => ({
  position: 'relative',
  zIndex: 2,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  minHeight: '100vh',
  padding: theme.spacing(8, 2)
}))

const GlassCard = styled(Card)(({ theme }) => ({
  background: 'rgba(255, 255, 255, 0.1)',
  backdropFilter: 'blur(20px)',
  border: '2px solid rgba(249, 185, 73, 0.3)',
  borderRadius: '24px',
  padding: theme.spacing(4),
  margin: theme.spacing(2, 0),
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'scale(1.02)',
    borderColor: '#F9B949',
    boxShadow: '0 20px 40px rgba(249, 185, 73, 0.2)'
  }
}))

const StatBox = styled(Paper)(({ theme }) => ({
  background: 'linear-gradient(135deg, rgba(185, 28, 28, 0.9) 0%, rgba(139, 0, 0, 0.9) 100%)',
  backdropFilter: 'blur(10px)',
  border: '2px solid rgba(249, 185, 73, 0.4)',
  borderRadius: '16px',
  padding: theme.spacing(3),
  textAlign: 'center',
  transition: 'all 0.3s ease',
  height: '100%',
  '&:hover': {
    transform: 'translateY(-8px)',
    borderColor: '#F9B949',
    boxShadow: '0 15px 30px rgba(249, 185, 73, 0.3)'
  }
}))

const AboutSection = () => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  // Section data
  const sections = [
    {
      id: 'heritage',
      backgroundImage: '/background1.jpg',
      title: 'Di sản văn hóa ngàn năm',
      subtitle: 'Rối nước - Nghệ thuật độc đáo của Việt Nam',
      content: {
        mainText: 'Nghệ thuật múa rối nước Việt Nam là một trong những hình thức biểu diễn nghệ thuật độc đáo và cổ xưa nhất trên thế giới. Với lịch sử hơn 1000 năm, nghệ thuật này đã trở thành biểu tượng văn hóa đặc trưng của dân tộc Việt Nam.',
        highlights: [
          { number: '1000+', label: 'Năm lịch sử', description: 'Được ghi nhận từ thế kỷ XI' },
          { number: '30+', label: 'Tiết mục truyền thống', description: 'Đa dạng câu chuyện dân gian' },
          { number: '40+', label: 'Quốc gia biểu diễn', description: 'Được yêu thích trên toàn thế giới' }
        ]
      }
    },
    {
      id: 'tradition',
      backgroundImage: '/background2.jpg',
      title: 'Truyền thống và kỹ thuật',
      subtitle: 'Bảo tồn và phát triển nghệ thuật',
      content: {
        mainText: 'Nghệ thuật rối nước không chỉ là màn biểu diễn giải trí mà còn là kho tàng tri thức về lịch sử, văn hóa và đời sống của người Việt. Mỗi tiết mục đều mang trong mình những câu chuyện ý nghĩa về cuộc sống nông thôn, tình yêu quê hương và truyền thống văn hóa dân tộc.',
        features: [
          {
            title: 'Kỹ thuật điều khiển tinh xảo',
            description: 'Nghệ nhân sử dụng hệ thống dây và cần câu phức tạp để điều khiển các con rối trên mặt nước, tạo ra những động tác mượt mà và sống động.'
          },
          {
            title: 'Âm nhạc truyền thống',
            description: 'Kết hợp với các nhạc cụ dân tộc như trống, chiêng, đàn bầu, sáo trúc để tạo nên bản giao hưởng văn hóa đầy cảm xúc.'
          },
          {
            title: 'Trang phục và đạo cụ',
            description: 'Mỗi con rối đều được chế tác tỉ mỉ với trang phục màu sắc rực rỡ, thể hiện đặc trưng văn hóa và tính cách của từng nhân vật.'
          }
        ]
      }
    },
    {
      id: 'mission',
      backgroundImage: '/muaroi.jpg',
      title: 'Sứ mệnh và tầm nhìn',
      subtitle: 'Kết nối quá khứ với tương lai',
      content: {
        mainText: 'Chúng tôi cam kết bảo tồn và phát triển nghệ thuật rối nước truyền thống, đồng thời ứng dụng công nghệ hiện đại để tạo ra những trải nghiệm mới mẻ và hấp dẫn cho thế hệ trẻ.',
        mission: [
          {
            icon: '🎭',
            title: 'Bảo tồn di sản',
            description: 'Gìn giữ và truyền lại nghệ thuật rối nước cho thế hệ tương lai'
          },
          {
            icon: '🌟',
            title: 'Đổi mới sáng tạo',
            description: 'Kết hợp truyền thống với công nghệ để tạo ra trải nghiệm mới'
          },
          {
            icon: '🌍',
            title: 'Quảng bá văn hóa',
            description: 'Giới thiệu nghệ thuật Việt Nam ra thế giới'
          },
          {
            icon: '👥',
            title: 'Giáo dục cộng đồng',
            description: 'Nâng cao nhận thức về giá trị văn hóa truyền thống'
          }
        ]
      }
    }
  ]

  return (
    <Box sx={{ width: '100vw', overflow: 'hidden' }}>
      {sections.map((section, index) => (
        <FullWidthSection
          key={section.id}
          backgroundImage={section.backgroundImage}
        >
          <ContentOverlay maxWidth="xl">
            <Fade in={isVisible} timeout={1000 + index * 500}>
              <Box>
                {/* Section Header */}
                <Box textAlign="center" mb={8}>
                  <Typography
                    variant="h2"
                    component="h1"
                    sx={{
                      fontSize: { xs: '2.5rem', md: '4rem' },
                      fontWeight: 'bold',
                      mb: 2,
                      fontFamily: 'Playfair Display, serif',
                      color: '#F9B949',
                      textShadow: '2px 2px 4px rgba(0,0,0,0.5)'
                    }}
                  >
                    {section.title}
                  </Typography>
                  <Typography
                    variant="h4"
                    sx={{
                      color: 'white',
                      fontWeight: 300,
                      textShadow: '1px 1px 2px rgba(0,0,0,0.5)'
                    }}
                  >
                    {section.subtitle}
                  </Typography>
                </Box>

                {/* Section Content */}
                {section.id === 'heritage' && (
                  <Grid container spacing={4} alignItems="center">
                    <Grid item xs={12} md={6}>
                      <GlassCard>
                        <CardContent>
                          <Typography
                            variant="h5"
                            component="p"
                            sx={{
                              color: 'white',
                              lineHeight: 1.8,
                              fontSize: { xs: '1.1rem', md: '1.3rem' }
                            }}
                          >
                            {section.content.mainText}
                          </Typography>
                        </CardContent>
                      </GlassCard>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Grid container spacing={3}>
                        {section.content.highlights.map((stat, idx) => (
                          <Grid item xs={12} sm={4} md={12} key={idx}>
                            <Grow in={isVisible} timeout={1500 + idx * 300}>
                              <StatBox>
                                <Typography
                                  variant="h3"
                                  sx={{ color: '#F9B949', fontWeight: 'bold', mb: 1 }}
                                >
                                  {stat.number}
                                </Typography>
                                <Typography
                                  variant="h6"
                                  sx={{ color: 'white', fontWeight: 600, mb: 1 }}
                                >
                                  {stat.label}
                                </Typography>
                                <Typography
                                  variant="body2"
                                  sx={{ color: 'rgba(255,255,255,0.8)' }}
                                >
                                  {stat.description}
                                </Typography>
                              </StatBox>
                            </Grow>
                          </Grid>
                        ))}
                      </Grid>
                    </Grid>
                  </Grid>
                )}

                {section.id === 'tradition' && (
                  <Grid container spacing={4}>
                    <Grid item xs={12} md={6}>
                      <GlassCard>
                        <CardContent>
                          <Typography
                            variant="h5"
                            component="p"
                            sx={{
                              color: 'white',
                              lineHeight: 1.8,
                              fontSize: { xs: '1.1rem', md: '1.3rem' },
                              mb: 3
                            }}
                          >
                            {section.content.mainText}
                          </Typography>
                        </CardContent>
                      </GlassCard>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Grid container spacing={3}>
                        {section.content.features.map((feature, idx) => (
                          <Grid item xs={12} key={idx}>
                            <Grow in={isVisible} timeout={1500 + idx * 300}>
                              <GlassCard>
                                <CardContent>
                                  <Typography
                                    variant="h6"
                                    sx={{ color: '#F9B949', fontWeight: 'bold', mb: 2 }}
                                  >
                                    {feature.title}
                                  </Typography>
                                  <Typography
                                    variant="body1"
                                    sx={{ color: 'rgba(255,255,255,0.9)', lineHeight: 1.6 }}
                                  >
                                    {feature.description}
                                  </Typography>
                                </CardContent>
                              </GlassCard>
                            </Grow>
                          </Grid>
                        ))}
                      </Grid>
                    </Grid>
                  </Grid>
                )}

                {section.id === 'mission' && (
                  <Grid container spacing={4}>
                    <Grid item xs={12} md={6}>
                      <GlassCard>
                        <CardContent>
                          <Typography
                            variant="h5"
                            component="p"
                            sx={{
                              color: 'white',
                              lineHeight: 1.8,
                              fontSize: { xs: '1.1rem', md: '1.3rem' }
                            }}
                          >
                            {section.content.mainText}
                          </Typography>
                        </CardContent>
                      </GlassCard>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Grid container spacing={3}>
                        {section.content.mission.map((item, idx) => (
                          <Grid item xs={12} sm={6} key={idx}>
                            <Grow in={isVisible} timeout={1500 + idx * 200}>
                              <GlassCard sx={{ height: '100%' }}>
                                <CardContent sx={{ textAlign: 'center' }}>
                                  <Avatar
                                    sx={{
                                      width: 60,
                                      height: 60,
                                      mx: 'auto',
                                      mb: 2,
                                      background: 'linear-gradient(135deg, #F9B949, #EAB308)',
                                      fontSize: '1.5rem'
                                    }}
                                  >
                                    {item.icon}
                                  </Avatar>
                                  <Typography
                                    variant="h6"
                                    sx={{ color: '#F9B949', fontWeight: 'bold', mb: 1 }}
                                  >
                                    {item.title}
                                  </Typography>
                                  <Typography
                                    variant="body2"
                                    sx={{ color: 'rgba(255,255,255,0.9)', lineHeight: 1.5 }}
                                  >
                                    {item.description}
                                  </Typography>
                                </CardContent>
                              </GlassCard>
                            </Grow>
                          </Grid>
                        ))}
                      </Grid>
                    </Grid>
                  </Grid>
                )}
              </Box>
            </Fade>
          </ContentOverlay>
        </FullWidthSection>
      ))}
    </Box>
  )
}

export default AboutSection
