"use client"

import { useState, useEffect, useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"

interface VideoScrollCTAProps {
  videoUrl: string
  onCTAClick?: () => void
}

export default function VideoScrollCTA({ videoUrl, onCTAClick }: VideoScrollCTAProps) {
  const [videoProgress, setVideoProgress] = useState(0)
  const [showCTA, setShowCTA] = useState(false)
  const [isVideoLoaded, setIsVideoLoaded] = useState(false)
  const [videoError, setVideoError] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [volume, setVolume] = useState(0.3)
  const [showControls, setShowControls] = useState(false)
  const [isScrolling, setIsScrolling] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const lastVideoTimeRef = useRef(0)

  // Framer Motion scroll hooks for advanced animations
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  })

  // Transform scroll progress to video progress
  const videoTime = useTransform(scrollYProgress, [0, 1], [0, 1])
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.1, 1, 0.9])
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.3, 0.8, 1, 0.3])

  // Video duration and CTA trigger point
  const CTA_TRIGGER_POINT = 0.7

  useEffect(() => {
    if (!isVideoLoaded) return

    let rafId: number
    let lastScrollTime = 0
    const scrollThrottle = 16 // ~60fps

    const handleScroll = () => {
      const now = Date.now()
      if (now - lastScrollTime < scrollThrottle) return
      lastScrollTime = now

      if (rafId) {
        cancelAnimationFrame(rafId)
      }

      rafId = requestAnimationFrame(() => {
        if (!sectionRef.current || !videoRef.current) return

        const section = sectionRef.current
        const rect = section.getBoundingClientRect()
        const windowHeight = window.innerHeight
        
        // Enhanced viewport detection
        if (rect.top < windowHeight && rect.bottom > 0) {
          // Ultra-smooth scroll progress calculation
          const sectionTop = rect.top
          const sectionBottom = rect.bottom
          const viewportCenter = windowHeight / 2
          
          // Calculate how much of the section is visible
          const visibleTop = Math.max(0, -sectionTop)
          const visibleBottom = Math.min(rect.height, windowHeight - sectionTop)
          const visibleHeight = Math.max(0, visibleBottom - visibleTop)
          
          // Smooth progress calculation with easing
          let scrollProgress = 0
          if (rect.height > 0) {
            scrollProgress = Math.min(1, Math.max(0, visibleHeight / rect.height))
            
            // Apply easing for smoother transitions
            scrollProgress = easeInOutCubic(scrollProgress)
          }
          
          setVideoProgress(scrollProgress)
          
          // Ultra-smooth video sync with advanced interpolation
          if (videoRef.current) {
            const videoDuration = videoRef.current.duration
            if (videoDuration && !isNaN(videoDuration)) {
              const targetTime = scrollProgress * videoDuration
              const currentTime = videoRef.current.currentTime
              const timeDiff = Math.abs(targetTime - currentTime)
              
              // Enhanced interpolation for ultra-smooth transitions
              if (timeDiff > 0.02) {
                // Use exponential smoothing for ultra-smooth video sync
                const smoothingFactor = 0.15
                const smoothTime = currentTime + (targetTime - currentTime) * smoothingFactor
                
                // Clamp to valid range
                const clampedTime = Math.max(0, Math.min(videoDuration, smoothTime))
                videoRef.current.currentTime = clampedTime
                lastVideoTimeRef.current = clampedTime
              }
            }
          }
          
          // Smooth CTA trigger with hysteresis
          const ctaThreshold = CTA_TRIGGER_POINT
          const ctaHysteresis = 0.05 // Prevents flickering
          
          if (scrollProgress >= ctaThreshold + ctaHysteresis) {
            setShowCTA(true)
          } else if (scrollProgress < ctaThreshold - ctaHysteresis) {
            setShowCTA(false)
          }
        }
      })
    }

    // Add passive scroll listener for better performance
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll() // Initial call

    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (rafId) {
        cancelAnimationFrame(rafId)
      }
    }
  }, [isVideoLoaded])

  // Easing function for smooth transitions
  const easeInOutCubic = (t: number): number => {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
  }

  const handleVideoLoad = () => {
    console.log('Video loaded successfully')
    setIsVideoLoaded(true)
    setVideoError(false)
  }

  const handleVideoError = () => {
    console.warn('Error loading video, using fallback')
    setVideoError(true)
    setIsVideoLoaded(true)
  }

  const handleCTAClick = () => {
    if (onCTAClick) {
      onCTAClick()
    } else {
      const vehiclesSection = document.getElementById('vehicles')
      if (vehiclesSection) {
        vehiclesSection.scrollIntoView({ behavior: 'smooth' })
      } else {
        window.location.href = '/stock'
      }
    }
  }

  const togglePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
        setIsPlaying(false)
      } else {
        videoRef.current.play()
        setIsPlaying(true)
      }
    }
  }

  const handleVolumeChange = (newVolume: number) => {
    setVolume(newVolume)
    if (videoRef.current) {
      videoRef.current.volume = newVolume
    }
  }

  return (
    <section 
      ref={sectionRef}
      className="relative h-screen flex items-center justify-center overflow-hidden bg-black"
    >
      {/* Video Background with Enhanced Effects */}
      <div className="absolute inset-0 w-full h-full">
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          muted={false}
          playsInline
          onLoadedData={handleVideoLoad}
          onError={handleVideoError}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          preload="metadata"
        >
          <source src={videoUrl} type="video/mp4" />
        </video>
        
        {/* Simple Overlay */}
        <div 
          className="absolute inset-0 bg-black/40"
        />
      </div>


      {/* Video Controls - Only in this section */}
      <motion.div 
        className="absolute bottom-8 right-8 z-30"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: showControls ? 1 : 0.7, x: 0 }}
        onMouseEnter={() => setShowControls(true)}
        onMouseLeave={() => setShowControls(false)}
      >
        <div className="bg-black/70 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
          <div className="flex items-center space-x-4">
            <button
              onClick={togglePlayPause}
              className="w-12 h-12 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-all duration-300"
            >
              {isPlaying ? (
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/>
                </svg>
              ) : (
                <svg className="w-6 h-6 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z"/>
                </svg>
              )}
            </button>
            
            <div className="flex items-center space-x-2">
              <svg className="w-5 h-5 text-white/70" fill="currentColor" viewBox="0 0 24 24">
                <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
              </svg>
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={volume}
                onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
                className="w-20 h-2 bg-white/20 rounded-lg appearance-none cursor-pointer"
              />
            </div>
          </div>
        </div>
      </motion.div>

      {/* Ultra-Smooth CTA Content */}
      <motion.div
        className="relative z-10 text-center px-6 max-w-4xl mx-auto"
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ 
          opacity: showCTA ? 1 : 0, 
          y: showCTA ? 0 : 20,
          scale: showCTA ? 1 : 0.95
        }}
        transition={{ 
          duration: 0.8, 
          ease: [0.16, 1, 0.3, 1], // Custom cubic-bezier for ultra-smooth
          type: "spring",
          stiffness: 100,
          damping: 20
        }}
      >
        <motion.h2 
          className="text-4xl md:text-6xl lg:text-7xl text-white mb-8 font-black tracking-wider leading-tight"
          initial={{ y: 15, opacity: 0, scale: 0.98 }}
          animate={{ 
            y: showCTA ? 0 : 15, 
            opacity: showCTA ? 1 : 0,
            scale: showCTA ? 1 : 0.98
          }}
          transition={{ 
            duration: 0.8, 
            delay: showCTA ? 0.1 : 0,
            ease: [0.16, 1, 0.3, 1],
            type: "spring",
            stiffness: 120,
            damping: 25
          }}
        >
          ¿QUÉ ESPERAS PARA COMPRAR?
        </motion.h2>
        
        <motion.div
          initial={{ y: 15, opacity: 0, scale: 0.98 }}
          animate={{ 
            y: showCTA ? 0 : 15, 
            opacity: showCTA ? 1 : 0,
            scale: showCTA ? 1 : 0.98
          }}
          transition={{ 
            duration: 0.8, 
            delay: showCTA ? 0.3 : 0,
            ease: [0.16, 1, 0.3, 1],
            type: "spring",
            stiffness: 120,
            damping: 25
          }}
        >
          <motion.button
            onClick={handleCTAClick}
            className="group relative px-10 py-5 bg-gradient-to-r from-blue-600 to-blue-700 text-white text-lg font-bold tracking-wide rounded-2xl hover:shadow-xl transition-all duration-500 overflow-hidden"
            whileHover={{ 
              scale: 1.05, 
              y: -3,
              boxShadow: "0 20px 40px rgba(59, 130, 246, 0.3)"
            }}
            whileTap={{ scale: 0.95 }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 20
            }}
          >
            <span className="relative z-10">
              VER VEHÍCULOS DISPONIBLES
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out"></div>
          </motion.button>
        </motion.div>
      </motion.div>

      {/* Loading State with Animation */}
      {!isVideoLoaded && (
        <motion.div 
          className="absolute inset-0 flex items-center justify-center bg-black z-30"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="text-center">
            <motion.div 
              className="w-20 h-20 border-4 border-white/20 border-t-white rounded-full mx-auto mb-6"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />
            <motion.p 
              className="text-white text-xl font-medium"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              Cargando experiencia...
            </motion.p>
          </div>
        </motion.div>
      )}

    </section>
  )
}