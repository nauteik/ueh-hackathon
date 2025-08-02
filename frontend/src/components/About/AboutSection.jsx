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
  minHeight: '80vh',
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
  transition: 'all 0.8s ease-in-out',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'linear-gradient(135deg, rgba(26, 77, 58, 0.7) 0%, rgba(15, 61, 42, 0.8) 100%)',
    zIndex: 1,
    transition: 'all 0.8s ease-in-out'
  }
}))

const ContentOverlay = styled(Container)(({ theme }) => ({
  position: 'relative',
  zIndex: 2,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  minHeight: '80vh',
  padding: theme.spacing(6, 2)
}))

const AnimatedImage = styled('img')(({ theme }) => ({
  // width: '600px',
  // height: '400px',
  objectFit: 'cover',
  borderRadius: '0px',
  border: 'none',
  boxShadow: 'none',
  transition: 'all 0.5s ease',
  '&:hover': {
    transform: 'scale(1.05)',
  }
}))

const LeftAlignedSection = styled(Box)(({ theme }) => ({
  textAlign: 'left',
  '& .image-container': {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center'
  }
}))

const RightAlignedSection = styled(Box)(({ theme }) => ({
  textAlign: 'right',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-end',
  '& .image-container': {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center'
  }
}))

const ValueColumn = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  height: '100%',
  display: 'flex',
  flexDirection: 'column'
}))

const ValueCard = styled(Box)(({ theme }) => ({
  background: 'rgba(255, 255, 255, 0.08)',
  backdropFilter: 'blur(15px)',
  border: '1px solid rgba(249, 185, 73, 0.2)',
  borderRadius: '16px',
  padding: theme.spacing(4, 3),
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  position: 'relative',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-8px)',
    borderColor: 'rgba(249, 185, 73, 0.6)',
    background: 'rgba(255, 255, 255, 0.12)',
    boxShadow: '0 20px 40px rgba(249, 185, 73, 0.15)'
  },
  '&:not(:last-child)::after': {
    content: '""',
    position: 'absolute',
    right: '-16px',
    top: '20%',
    bottom: '20%',
    width: '2px',
    background: 'linear-gradient(to bottom, transparent, rgba(249, 185, 73, 0.8), transparent)',
    borderRadius: '1px',
    zIndex: 1
  }
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
      id: 'vision',
      backgroundImage: '/background1.jpg',
      title: 'Tầm nhìn',
      image: '/sec4.png',
      content: {
        mainText: 'Phát triển thành nền tảng dẫn đầu trong việc bảo tồn, đổi mới và lan tỏa nghệ thuật múa rối nước đến thế hệ trẻ.'
      }
    },
    {
      id: 'mission',
      backgroundImage: '/background2.jpg',
      title: 'Sứ mệnh',
      image: '/sec5.png',
      subtitle: 'Cam kết và trách nhiệm',
      content: {
        mainText: 'Chúng tôi xây dựng cầu nối giữa nghệ nhân, cộng đồng và công nghệ để giữ gìn di sản và mở ra cơ hội phát triển bền vững cho nghệ thuật múa rối nước.',
        icon: '🤝',
        description: 'Thông qua việc kết nối các yếu tố truyền thống với công nghệ hiện đại, chúng tôi tạo ra những trải nghiệm mới mẻ và hấp dẫn, đồng thời mở ra những cơ hội phát triển kinh tế bền vững cho cộng đồng nghệ nhân.'
      }
    },
    {
      id: 'values',
      backgroundImage: '/muaroi.jpg',
      title: 'Giá trị cốt lõi',
      image: '/sec6.png',
      subtitle: 'Những nguyên tắc định hướng',
      content: {
        mainText: 'Ba giá trị cốt lõi định hướng mọi hoạt động của chúng tôi trong việc bảo tồn và phát triển nghệ thuật múa rối nước.',
        values: [
          {
            icon: '🎭',
            title: 'Bản sắc',
            description: 'Gìn giữ nguyên vẹn giá trị văn hóa, kỹ thuật và tinh thần dân gian đặc trưng của múa rối nước.'
          },
          {
            icon: '👥',
            title: 'Cộng đồng',
            description: 'Đặt cộng đồng làm trung tâm – để mỗi người đều có thể khám phá, học hỏi và đóng góp vào hành trình bảo tồn.'
          },
          {
            icon: '�',
            title: 'Bền vững',
            description: 'Phát triển mô hình thương mại hóa di sản một cách văn minh, bền vững và có trách nhiệm với di sản và con người.'
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
                {/* Section Header and Content */}
                {section.id === 'values' ? (
                  // Special layout for values section
                  <Box sx={{ width: '100%', textAlign: 'center' }}>
                    {/* Title */}
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
                    
                    {/* Main Text */}
                    <Typography
                      variant="h5"
                      component="p"
                      sx={{
                        color: 'white',
                        lineHeight: 1.8,
                        fontSize: { xs: '1.2rem', md: '1.4rem' },
                        fontWeight: 'bold',
                        textShadow: '1px 1px 2px rgba(0,0,0,0.5)',
                        mb: 6,
                        maxWidth: '900px',
                        mx: 'auto'
                      }}
                    >
                      {section.content.mainText}
                    </Typography>

                    {/* Three Value Cards */}
                    <Grid 
                      container 
                      spacing={3} 
                      sx={{ 
                        mt: 4,
                        display: 'flex',
                        flexWrap: 'nowrap',
                        justifyContent: 'space-between'
                      }}
                    >
                      {section.content.values.map((value, idx) => (
                        <Grid 
                          item 
                          xs={4} 
                          key={idx} 
                          sx={{ 
                            display: 'flex',
                            flex: '1 1 0',
                            minWidth: 0
                          }}
                        >
                          <ValueCard sx={{ 
                            minHeight: '300px',
                            width: '100%',
                            margin: '0 8px'
                          }}>
                            <Typography
                              variant="h4"
                              sx={{
                                color: '#F9B949',
                                fontWeight: 'bold',
                                mb: 3,
                                fontSize: { xs: '1.2rem', md: '1.8rem' },
                                fontFamily: 'Playfair Display, serif'
                              }}
                            >
                              {value.title}
                            </Typography>
                            <Typography
                              variant="body1"
                              sx={{
                                color: 'rgba(255,255,255,0.9)',
                                lineHeight: 1.6,
                                fontSize: { xs: '0.9rem', md: '1rem' },
                                textAlign: 'center'
                              }}
                            >
                              {value.description}
                            </Typography>
                          </ValueCard>
                        </Grid>
                      ))}
                    </Grid>
                  </Box>
                ) : (
                  // Original layout for vision and mission sections
                  <Grid 
                    container 
                    spacing={2} 
                    alignItems="center" 
                    justifyContent="space-between"
                    sx={{ minHeight: '60vh' }}
                  >
                    {/* Text Content */}
                    <Grid item xs={12} md={6} order={{ xs: 1, md: index === 1 ? 2 : 1 }}>
                      {index === 1 ? (
                        <RightAlignedSection>
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
                            variant="h5"
                            component="p"
                            sx={{
                              color: 'white',
                              lineHeight: 1.8,
                              fontSize: { xs: '1.2rem', md: '1.4rem' },
                              fontWeight: 'bold',
                              textShadow: '1px 1px 2px rgba(0,0,0,0.5)',
                              maxWidth: '600px',
                              textAlign: 'right'
                            }}
                          >
                            {section.content.mainText}
                          </Typography>
                        </RightAlignedSection>
                      ) : (
                        <LeftAlignedSection>
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
                            variant="h5"
                            component="p"
                            sx={{
                              color: 'white',
                              lineHeight: 1.8,
                              fontSize: { xs: '1.2rem', md: '1.4rem' },
                              fontWeight: 'bold',
                              textShadow: '1px 1px 2px rgba(0,0,0,0.5)',
                              maxWidth: '600px'
                            }}
                          >
                            {section.content.mainText}
                          </Typography>
                        </LeftAlignedSection>
                      )}
                    </Grid>
                    
                    {/* Image Content */}
                    <Grid item xs={12} md={6} order={{ xs: 2, md: index === 1 ? 1 : 2 }}>
                      <Box className="image-container">
                        <Grow in={isVisible} timeout={1500 + index * 300}>
                          <Box>
                            <AnimatedImage 
                              src={section.image}
                              alt={section.title}
                              sx={{
                                animation: `float${index + 1} 3s ease-in-out infinite`,
                                '@keyframes float1': {
                                  '0%, 100%': { transform: 'translateY(0px)' },
                                  '50%': { transform: 'translateY(-10px)' }
                                },
                                '@keyframes float2': {
                                  '0%, 100%': { transform: 'translateY(0px)' },
                                  '50%': { transform: 'translateY(-15px)' }
                                },
                                '@keyframes float3': {
                                  '0%, 100%': { transform: 'translateY(0px)' },
                                  '50%': { transform: 'translateY(-12px)' }
                                }
                              }}
                            />
                          </Box>
                        </Grow>
                      </Box>
                    </Grid>
                  </Grid>
                )}

                {/* Section Content - Remove card wrappers */}
              </Box>
            </Fade>
          </ContentOverlay>
        </FullWidthSection>
      ))}
    </Box>
  )
}

export default AboutSection
