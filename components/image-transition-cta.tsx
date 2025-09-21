"use client"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"

interface ImageTransitionCTAProps {
  onCTAClick?: () => void
}

export default function ImageTransitionCTA({ onCTAClick }: ImageTransitionCTAProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [showFinalText, setShowFinalText] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)
  const imageRefs = useRef<(HTMLImageElement | null)[]>([])

  // Array de imágenes en orden de transición
  const images = [
    "/images/transition/1. luz apagada.png",
    "/images/transition/2. luz prendida intermedia.png", 
    "/images/transition/3. luces prendidas altas un poco mas.png",
    "/images/transition/4. luces bien altas.png",
    "/images/transition/5. cegador.png"
  ]

  // Puntos de transición para scroll normal (0 a 1)
  const transitionPoints = [0, 0.15, 0.35, 0.55, 0.75]

  useEffect(() => {
    if (!isLoaded) return

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
        if (!sectionRef.current) return

        const section = sectionRef.current
        const rect = section.getBoundingClientRect()
        const windowHeight = window.innerHeight
        
        // Check if section is in viewport
        if (rect.top < windowHeight && rect.bottom > 0) {
          // Calculate scroll progress based on how much the section has been scrolled through
          const sectionTop = rect.top
          const sectionBottom = rect.bottom
          
          // Calculate progress based on section position in viewport
          // When section is at top of viewport = 0%, when section is at bottom = 100%
          const totalScrollableHeight = windowHeight + rect.height
          const scrolledThrough = windowHeight - sectionTop
          const scrollProgress = Math.min(1, Math.max(0, scrolledThrough / totalScrollableHeight))
          
          // Smooth transition between images based on scroll progress
          let targetImageIndex = 0
          let imageOpacity = 1
          
          // Find the current image and calculate smooth transition
          for (let i = 0; i < transitionPoints.length; i++) {
            if (scrollProgress >= transitionPoints[i]) {
              targetImageIndex = i
              
              // Calculate opacity for smooth crossfade
              if (i < transitionPoints.length - 1) {
                const currentPoint = transitionPoints[i]
                const nextPoint = transitionPoints[i + 1]
                const progressInRange = (scrollProgress - currentPoint) / (nextPoint - currentPoint)
                imageOpacity = 1 - Math.min(1, Math.max(0, progressInRange))
              }
            }
          }
          
          setCurrentImageIndex(targetImageIndex)
          
          // Show final text when reaching 80% of scroll (last image fully visible)
          if (scrollProgress >= 0.8) {
            setShowFinalText(true)
          } else {
            setShowFinalText(false)
          }
        }
      })
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll() // Initial call

    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (rafId) {
        cancelAnimationFrame(rafId)
      }
    }
  }, [isLoaded])

  const handleImageLoad = () => {
    setIsLoaded(true)
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

  return (
    <section 
      ref={sectionRef}
      className="relative h-screen flex items-center justify-center overflow-hidden bg-black"
    >
      {/* Image Container */}
      <div className="absolute inset-0 w-full h-full">
        {images.map((imageSrc, index) => {
          const isActive = currentImageIndex === index
          const isNext = currentImageIndex === index - 1
          const isPrev = currentImageIndex === index + 1
          
          return (
            <motion.img
              key={index}
              ref={(el) => (imageRefs.current[index] = el)}
              src={imageSrc}
              alt={`BMW Lights Transition ${index + 1}`}
              className="absolute inset-0 w-full h-full object-cover"
              onLoad={handleImageLoad}
              initial={{ opacity: 0, scale: 1.02 }}
              animate={{ 
                opacity: isActive ? 1 : (isNext || isPrev ? 0.3 : 0),
                scale: isActive ? 1 : 1.02
              }}
              transition={{ 
                duration: 0.8, 
                ease: [0.16, 1, 0.3, 1]
              }}
              style={{
                zIndex: isActive ? 3 : (isNext || isPrev ? 2 : 1)
              }}
            />
          )
        })}
        
        
        {/* Subtle progress indicator */}
        <div className="absolute top-8 left-1/2 transform -translate-x-1/2 z-20">
          <div className="bg-black/30 backdrop-blur-sm rounded-full px-3 py-1.5 border border-white/10">
            <div className="flex space-x-1.5">
              {images.map((_, index) => (
                <div
                  key={index}
                  className={`w-1.5 h-1.5 rounded-full transition-all duration-500 ${
                    currentImageIndex >= index 
                      ? 'bg-white scale-110' 
                      : 'bg-white/40'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Final Text - Only appears on last image */}
      <motion.div
        className="relative z-20 text-center px-6 max-w-4xl mx-auto"
        initial={{ opacity: 0, y: 30, scale: 0.9 }}
        animate={{ 
          opacity: showFinalText ? 1 : 0, 
          y: showFinalText ? 0 : 30,
          scale: showFinalText ? 1 : 0.9
        }}
        transition={{ 
          duration: 0.8, 
          ease: [0.16, 1, 0.3, 1],
          delay: showFinalText ? 0.3 : 0
        }}
      >
        <motion.h2 
          className="text-4xl md:text-6xl lg:text-7xl text-white mb-8 font-black tracking-wider leading-tight"
          initial={{ y: 20, opacity: 0 }}
          animate={{ 
            y: showFinalText ? 0 : 20, 
            opacity: showFinalText ? 1 : 0 
          }}
          transition={{ 
            duration: 0.8, 
            delay: showFinalText ? 0.5 : 0,
            ease: [0.16, 1, 0.3, 1]
          }}
          style={{
            textShadow: '0 0 20px rgba(255, 255, 255, 0.3), 0 0 40px rgba(59, 130, 246, 0.2)'
          }}
        >
          ¡POTENCIA ENCIENDE TU CAMINO!
        </motion.h2>
        
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ 
            y: showFinalText ? 0 : 20, 
            opacity: showFinalText ? 1 : 0 
          }}
          transition={{ 
            duration: 0.8, 
            delay: showFinalText ? 0.7 : 0,
            ease: [0.16, 1, 0.3, 1]
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

      {/* Loading State */}
      {!isLoaded && (
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
