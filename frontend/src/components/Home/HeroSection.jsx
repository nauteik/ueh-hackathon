import React, { useEffect, useState } from 'react'
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Button,
  Grid,
  LinearProgress,
  Chip,
  Avatar,
  Paper,
  Fade,
  Grow
} from '@mui/material'
import { styled } from '@mui/material/styles'
import {
  PlayArrow,
  CalendarToday,
  Timeline as TimelineIcon,
  Home as HomeIcon,
  Public as PublicIcon,
  TheaterComedy as TheaterIcon
} from '@mui/icons-material'

// Styled Components với theme colors
const StyledSection = styled(Box)(({ theme }) => ({
  minHeight: '100vh',
  background: 'linear-gradient(135deg, #1a4d3a 0%, #0f3d2a 100%)',
  position: 'relative',
  overflow: 'hidden',
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

const TimelineCard = styled(Card)(({ theme }) => ({
  background: 'linear-gradient(135deg, rgba(185, 28, 28, 0.95) 0%, rgba(139, 0, 0, 0.95) 100%)',
  backdropFilter: 'blur(10px)',
  border: '2px solid rgba(249, 185, 73, 0.4)',
  borderRadius: '16px',
  padding: '1.5rem',
  position: 'relative',
  transition: 'all 0.3s ease',
  cursor: 'pointer',
  maxWidth: '380px',
  width: '100%',
  '&:hover': {
    transform: 'scale(1.05) translateY(-8px)',
    boxShadow: '0 15px 35px rgba(249, 185, 73, 0.3)',
    borderColor: '#F9B949',
    zIndex: 10
  }
}))

const StatCard = styled(Paper)(({ theme }) => ({
  background: 'linear-gradient(135deg, rgba(249, 185, 73, 0.2) 0%, rgba(234, 179, 8, 0.2) 100%)',
  backdropFilter: 'blur(10px)',
  border: '2px solid rgba(249, 185, 73, 0.3)',
  borderRadius: '16px',
  padding: '1.5rem',
  textAlign: 'center',
  transition: 'all 0.3s ease',
  height: 'auto',
  minHeight: '200px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  '&:hover': {
    transform: 'scale(1.05)',
    borderColor: '#F9B949',
    boxShadow: '0 8px 25px rgba(249, 185, 73, 0.2)'
  }
}))

const StyledButton = styled(Button)(({ theme, variant }) => ({
  padding: '16px 48px',
  fontSize: '1.25rem',
  fontWeight: 'bold',
  borderRadius: '16px',
  textTransform: 'none',
  transition: 'all 0.3s ease',
  border: '3px solid #F9B949',
  '&:hover': {
    transform: 'scale(1.05) translateY(-4px)'
  },
  ...(variant === 'primary' && {
    background: 'linear-gradient(135deg, #B91C1C 0%, #8B0000 100%)',
    color: 'white',
    '&:hover': {
      background: 'linear-gradient(135deg, #DC2626 0%, #B91C1C 100%)',
      boxShadow: '0 10px 30px rgba(185, 28, 28, 0.5)'
    }
  }),
  ...(variant === 'secondary' && {
    background: 'linear-gradient(135deg, rgba(249, 185, 73, 0.2) 0%, rgba(234, 179, 8, 0.2) 100%)',
    color: '#F9B949',
    '&:hover': {
      background: 'linear-gradient(135deg, rgba(249, 185, 73, 0.3) 0%, rgba(234, 179, 8, 0.3) 100%)',
      boxShadow: '0 10px 30px rgba(249, 185, 73, 0.3)'
    }
  })
}))

const HeroSection = ({ setActiveSection }) => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  // Timeline data - simplified without icons and positions
  const timelineData = [
    {
      year: "Thế kỷ XI - XIV",
      title: "Khởi nguồn và phát triển",
      description: "Nghệ thuật rối nước phát triển mạnh, được biểu diễn trong cung đình tâm phương tiện giải trí cho vua chúa cũng như các sứ giả của nước ngoài."
    },
    {
      year: "Thế kỷ XV - XIX",
      title: "Thời kỳ hoàng kim",
      description: "Tuy không còn biểu diễn trong cung đình nhưng tiếp tục phát triển với nhiều sáng tạo độc đáo và kỹ thuật tinh tế trong đời sống, các hoạt động văn hoá, xã hội. Tiếp thu từ Chèo, Tuồng và thêm nhiều tối ca, tối thoại."
    },
    {
      year: "1945 - 1954",
      title: "Thời kỳ khó khăn",
      description: "Rối nước có sự mai một khi kẻ thù xâm lược tàn phá các di sản văn hoá, cuộc sống hoà bình tan rã, nhân dân cả nước nổi dậy đấu tranh giành độc lập dân tộc."
    },
    {
      year: "1955 - 1975",
      title: "Phục hồi và bảo tồn",
      description: "Kháng chiến chống Mỹ: Cả nước rộn ràng giải phóng miền Nam đấu khó khăn, sự phát triển của rối nước tại chỗ chậm lại nhưng vẫn được tiếp tục."
    },
    {
      year: "Từ năm 1984",
      title: "Thời kỳ phát triển mới",
      description: "Nghệ thuật múa rối nước Việt Nam được biết đến ở nhiều nơi trên thế giới và ngày càng được công bố rộng rãi cho đến ngày nay, những tình giá trị truyền thống và văn bản sáng tạo."
    },
    {
      year: "Tháng 3/1956",
      title: "Công nhận chính thức",
      description: "Bác Hồ ra chỉ thị thành lập ngành Rối chuyên nghiệp của Việt Nam. Múa Rối Nước cũng từ đó mà phát triển, thoát ra khỏi các làng xã và được phổ cập rộng rãi trong nhân dân cả nước."
    }
  ]

  // Statistics data from the image
  const statistics = [
    {
      number: "14",
      label: "phường múa",
      sublabel: "trải dài từ Bắc tới Nam trong đó mỗi số phường rối nước vẫn còn giữ được tổ nghề",
      icon: "🏘️"
    },
    {
      number: "30",
      label: "tiết mục",
      sublabel: "có truyền và hàng trăm tiết mục hiện đại kể về sự tích dân gian và cuộc sống hàng ngày của người dân Việt",
      icon: "🎪"
    },
    {
      number: "40",
      label: "quốc gia",
      sublabel: "nơi tổ chức hàng trăm chuyên lưu diễn nước ngoài, tham dự các liên hoan sân khấu quốc tế",
      icon: "🌍"
    }
  ]

  // Solutions data from the image
  const solutions = [
    { title: "Sưu tầm thêm sân khấu Múa rối nước", icon: "📚" },
    { title: "Đẩy mạnh và thông nhất công tác đào tạo", icon: "📈" },
    { title: "Nhà nước quan tâm, đầu tư về tài chính", icon: "💰" },
    { title: "Phục hồi được những trò diễn độc đáo", icon: "🎯" },
    { title: "Xây dựng thêm tiết mục hoàn toàn mới", icon: "🔧" }
  ]

  return (
    <StyledSection>
      <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 3, pt: 12, pb: 8 }}>

        {/* Header Section với Material-UI */}
        <Fade in={isVisible} timeout={1000}>
          <Box textAlign="center" mb={12}>
            <Box mb={4}>
              <Avatar
                src="/comerpital.png"
                alt="Logo"
                sx={{
                  width: 96,
                  height: 96,
                  mx: 'auto',
                  mb: 3,
                  animation: 'float 6s ease-in-out infinite'
                }}
              />
            </Box>

            <Typography
              variant="h1"
              component="h1"
              sx={{
                fontSize: { xs: '3rem', md: '5rem' },
                fontWeight: 'bold',
                mb: 3,
                fontFamily: 'Playfair Display, serif'
              }}
            >
              <Box component="span" sx={{ color: '#F9B949', display: 'block' }}>
                LỊCH SỬ
              </Box>
              <Box component="span" sx={{ color: 'white', fontSize: { xs: '2.5rem', md: '4rem' } }}>
                Nghệ thuật múa rối nước Việt Nam
              </Box>
            </Typography>

            <Typography
              variant="h5"
              sx={{
                color: 'rgba(255,255,255,0.9)',
                maxWidth: '800px',
                mx: 'auto',
                lineHeight: 1.6
              }}
            >
              Nghệ thuật truyền thống ngàn năm - Kho tàng văn hóa dân tộc
            </Typography>
          </Box>
        </Fade>

        {/* Timeline Section với Material-UI */}
        <Box maxWidth="1200px" mx="auto" mb={12} position="relative" className="timeline-container">
          {/* Central timeline line */}
          <Box
            sx={{
              display: { xs: 'none', md: 'block' },
              position: 'absolute',
              left: '50%',
              top: 0,
              bottom: 0,
              width: '4px',
              background: 'linear-gradient(to bottom, #F9B949, #B91C1C, #F9B949)',
              borderRadius: '2px',
              transform: 'translateX(-50%)',
              zIndex: 1
            }}
          />

          {timelineData.slice().reverse().map((item, index) => {
  // Determine position: even index = left, odd index = right
  const isLeft = index % 2 === 0;

  return (
    <Grow
      key={index}
      in={isVisible}
      timeout={1000}
      style={{ transitionDelay: `${index * 200}ms` }}
    >
      <Box
        sx={{
          position: 'relative',
          mb: { xs: 4, md: 6 },
          '&:hover .timeline-connector': {
            opacity: 1,
            transform: 'translateY(-50%) scaleX(-0.75)'
          }
        }}
      >
        <Grid
          container
          spacing={2}
          alignItems="center"
          sx={{
            position: 'relative',
            justifyContent: {
              xs: 'center',
              md: isLeft ? 'flex-start' : 'flex-end'
            }
          }}
        >
          {/* Timeline Dot */}
          <Box
            sx={{
              position: 'absolute',
              left: '50%',
              top: '50%',
              transform: 'translate(-50%, -50%)',
              zIndex: 3,
              display: { xs: 'none', md: 'block' }
            }}
          >
            <Box
              sx={{
                width: 16,
                height: 16,
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #F9B949, #EAB308)',
                border: '3px solid #1a4d3a',
                boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
                animation: 'pulse-dot 2s infinite'
              }}
            />
          </Box>

          {/* Timeline Connector Line */}
          <Box
            className="timeline-connector"
            sx={{
              position: 'absolute',
              top: '50%',
              left: isLeft ? '50%' : 'calc(50% - 200px)',
              right: isLeft ? 'calc(50% - 200px)' : '50%',
              width: '200px',
              height: '2px',
              background: 'linear-gradient(90deg, #F9B949, rgba(249, 185, 73, 0.5))',
              transform: 'translateY(-50%) scaleX(0)',
              transformOrigin: isLeft ? 'left' : 'right',
              opacity: 0,
              transition: 'all 0.3s ease',
              zIndex: 2,
              display: { xs: 'none', md: 'block' }
            }}
          />

          {/* Timeline Content */}
          <Grid
            item
            xs={12}
            md={5.5}
            sx={{
              display: 'flex',
              justifyContent: {
                xs: 'center',
                md: isLeft ? 'flex-start' : 'flex-end'
              },
              pl: { md: isLeft ? 8 : 0 },
              pr: { md: isLeft ? 0 : 8 }
            }}
          >
                      <TimelineCard className="timeline-card">
                        <CardContent sx={{ p: 0 }}>
                          <Chip
                            label={item.year}
                            size="small"
                            sx={{
                              background: 'linear-gradient(135deg, #F9B949, #EAB308)',
                              color: '#1a4d3a',
                              fontWeight: 'bold',
                              fontSize: '0.85rem',
                              mb: 1.5,
                              display: 'block',
                              width: 'fit-content',
                              mx: 'auto'
                            }}
                          />
                          <Typography
                            variant="h6"
                            component="h3"
                            color="white"
                            fontWeight="bold"
                            mb={1}
                            textAlign="center"
                            sx={{ fontSize: { xs: '1rem', md: '1.1rem' } }}
                          >
                            {item.title}
                          </Typography>
                          <Typography
                            variant="body2"
                            color="rgba(255,255,255,0.9)"
                            lineHeight={1.5}
                            textAlign="center"
                            sx={{ fontSize: { xs: '0.85rem', md: '0.9rem' } }}
                          >
                            {item.description}
                          </Typography>
                        </CardContent>
                      </TimelineCard>
                    </Grid>
                  </Grid>
                </Box>
              </Grow>
            );
          })}
        </Box>

        {/* Statistics Section với Material-UI */}
        <Paper
          sx={{
            background: 'linear-gradient(135deg, rgba(185, 28, 28, 0.3) 0%, rgba(139, 0, 0, 0.3) 100%)',
            backdropFilter: 'blur(10px)',
            border: '2px solid rgba(249, 185, 73, 0.4)',
            borderRadius: '24px',
            p: 6,
            mb: 10,
            position: 'relative',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: '-24px',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '128px',
              height: '32px',
              background: '#F9B949',
              borderRadius: '12px 12px 0 0'
            }
          }}
        >
          <Typography
            variant="h3"
            component="h2"
            textAlign="center"
            color="#F9B949"
            fontWeight="bold"
            fontFamily="Playfair Display, serif"
            mb={6}
            pt={2}
          >
            Giải pháp bảo tồn & phát triển
          </Typography>

          <Grid container spacing={3} justifyContent="center">
            {statistics.map((stat, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <StatCard elevation={4}>
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
                    {stat.icon}
                  </Avatar>
                  <Typography variant="h3" component="div" color="#F9B949" fontWeight="bold" mb={1}>
                    {stat.number}
                  </Typography>
                  <Typography variant="h6" component="div" color="white" fontWeight="600" mb={1.5}>
                    {stat.label}
                  </Typography>
                  <Typography variant="body2" color="rgba(255,255,255,0.8)" lineHeight={1.4} fontSize="0.875rem">
                    {stat.sublabel}
                  </Typography>
                </StatCard>
              </Grid>
            ))}
          </Grid>

          {/* Solutions */}
          <Box mt={6} pt={4} borderTop="1px solid rgba(249, 185, 73, 0.3)">
            <Grid container spacing={2} justifyContent="center" alignItems="center">
              {solutions.map((solution, index) => (
                <Grid item xs={6} sm={4} md={2.4} key={index}>
                  <Box
                    textAlign="center"
                    sx={{
                      cursor: 'pointer',
                      '&:hover': { transform: 'scale(1.1)' },
                      transition: 'all 0.3s',
                      p: 1
                    }}
                  >
                    <Avatar
                      sx={{
                        width: 48,
                        height: 48,
                        mx: 'auto',
                        mb: 1.5,
                        background: 'linear-gradient(135deg, rgba(249, 185, 73, 0.2), rgba(185, 28, 28, 0.2))',
                        border: '2px solid rgba(249, 185, 73, 0.3)',
                        fontSize: '1.2rem',
                        '&:hover': { borderColor: '#F9B949' }
                      }}
                    >
                      {solution.icon}
                    </Avatar>
                    <Typography
                      variant="caption"
                      color="rgba(255,255,255,0.8)"
                      lineHeight={1.2}
                      display="block"
                      sx={{ fontSize: '0.75rem' }}
                    >
                      {solution.title}
                    </Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Paper>

        {/* Chart Section với Material-UI */}
        <Paper
          sx={{
            background: 'linear-gradient(135deg, rgba(26, 77, 58, 0.9) 0%, rgba(15, 61, 42, 0.9) 100%)',
            backdropFilter: 'blur(10px)',
            border: '2px solid rgba(249, 185, 73, 0.4)',
            borderRadius: '24px',
            p: 6,
            mb: 10,
            maxWidth: '800px',
            mx: 'auto',
            position: 'relative',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: '-24px',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '160px',
              height: '32px',
              background: '#F9B949',
              borderRadius: '12px 12px 0 0'
            }
          }}
        >
          <Typography
            variant="h4"
            component="h3"
            textAlign="center"
            color="#F9B949"
            fontWeight="bold"
            mb={6}
            pt={2}
            lineHeight={1.3}
          >
            Đánh giá mức độ hài lòng về Hoạt động tổ chức biểu diễn múa rối
            <br />
            <Typography component="span" variant="h5">
              tại Nhà hát múa rối Thăng Long
            </Typography>
          </Typography>

          <Box maxWidth="600px" mx="auto">
            {[
              { label: "Không hài lòng", percentage: 5, color: "#B91C1C" },
              { label: "Bình thường", percentage: 15, color: "#6B7280" },
              { label: "Hài lòng", percentage: 35, color: "#F9B949" },
              { label: "Rất hài lòng", percentage: 45, color: "#059669" }
            ].map((item, index) => (
              <Box key={index} mb={4}>
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                  <Box display="flex" alignItems="center" gap={2}>
                    <Box
                      sx={{
                        width: 16,
                        height: 16,
                        borderRadius: '50%',
                        backgroundColor: item.color,
                        boxShadow: `0 0 10px ${item.color}40`
                      }}
                    />
                    <Typography variant="h6" color="white" fontWeight="600">
                      {item.label}
                    </Typography>
                  </Box>
                  <Typography variant="h6" color="rgba(255,255,255,0.9)" fontWeight="bold">
                    {item.percentage}%
                  </Typography>
                </Box>
                <LinearProgress
                  variant="determinate"
                  value={item.percentage}
                  sx={{
                    height: 16,
                    borderRadius: 8,
                    backgroundColor: 'rgba(107, 114, 128, 0.5)',
                    '& .MuiLinearProgress-bar': {
                      backgroundColor: item.color,
                      borderRadius: 8,
                      boxShadow: `0 0 10px ${item.color}40`
                    }
                  }}
                />
              </Box>
            ))}
          </Box>
        </Paper>

        {/* CTA Buttons với Material-UI */}
        <Box display="flex" flexDirection={{ xs: 'column', sm: 'row' }} gap={4} justifyContent="center" alignItems="center">
          <StyledButton
            variant="primary"
            size="large"
            startIcon={<PlayArrow sx={{ fontSize: '2rem' }} />}
            endIcon={<PlayArrow />}
            onClick={() => setActiveSection('game')}
          >
            Trải nghiệm 3D
          </StyledButton>

          <StyledButton
            variant="secondary"
            size="large"
            startIcon={<CalendarToday sx={{ fontSize: '2rem' }} />}
            onClick={() => setActiveSection('booking')}
          >
            Đặt lịch trải nghiệm
          </StyledButton>
        </Box>

      </Container>
    </StyledSection>
  )
}

export default HeroSection