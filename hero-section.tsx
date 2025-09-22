"use client"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Navbar from "./components/navbar"

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isScrollLocked, setIsScrollLocked] = useState(true)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [lastScrollTime, setLastScrollTime] = useState(0)
  const [scrollDirection, setScrollDirection] = useState<"up" | "down" | null>(null)
  const [motoHasMoved, setMotoHasMoved] = useState(false)

  const slides = [
    {
      type: "hero",
      background:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/2025-05-03-iUIbYaI4LbkqA6ngdjsOtD5ZndAhXc.webp", // Changed to the new 87 Autos dealership facade image
      content: {
        title: "El lugar donde subes de nivel", // Simplified to just the tagline
        subtitle: "",
        description: "",
      },
    },
    {
      type: "about",
      background: "#344acf",
      content: {
        title: "SOBRE 87 AUTOS",
        subtitle: "Excelencia en Vehículos Premium",
        description:
          "Somos especialistas en BMW y Mini Cooper con más de 10 años de experiencia en el mercado automotriz premium. Ofrecemos vehículos de la más alta calidad con garantía y servicio postventa excepcional.",
      },
    },
    {
      type: "brands",
      background: "#ffffff",
      content: {
        title: "NUESTRAS MARCAS",
        subtitle: "BMW • MINI COOPER • MOTOS",
        description:
          "Representamos las marcas más prestigiosas del mercado automotriz alemán, ofreciendo desde sedanes de lujo hasta deportivos de alto rendimiento y motocicletas premium.",
      },
    },
  ]


  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (!isScrollLocked) {
        return // Allow normal scroll when unlocked
      }

      e.preventDefault()

      const now = Date.now()
      if (now - lastScrollTime < 1200 || isTransitioning) {
        return
      }

      setLastScrollTime(now)
      setIsTransitioning(true)

      if (e.deltaY > 0) {
        // Scrolling down
        setScrollDirection("down")
        if (currentSlide === 0) {
          setCurrentSlide(1) // Must go to slide 1 first
        } else if (currentSlide === 1) {
          setCurrentSlide(2) // Allow advancing to slide 2
        } else if (currentSlide === 2) {
          // Unlock scroll when reaching last slide
          setIsScrollLocked(false)
          document.body.style.overflow = "auto"
        }
      } else {
        // Scrolling up
        setScrollDirection("up")
        if (currentSlide === 2) {
          setCurrentSlide(1) // Must go to slide 1 first
        } else if (currentSlide === 1) {
          setCurrentSlide(0) // Then to slide 0
        }
        // Can't go up from slide 0
      }

      // Reset transition state after animation completes
      setTimeout(() => {
        setIsTransitioning(false)
        setScrollDirection(null)
      }, 1000)
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isScrollLocked || isTransitioning) return

      if (e.key === "ArrowDown" || e.key === " ") {
        e.preventDefault()
        setIsTransitioning(true)

        if (currentSlide === 0) {
          setCurrentSlide(1) // Must go to slide 1 first
        } else if (currentSlide === 1) {
          setCurrentSlide(2) // Allow advancing to slide 2
        } else if (currentSlide === 2) {
          setIsScrollLocked(false)
          document.body.style.overflow = "auto"
        }

        setTimeout(() => {
          setIsTransitioning(false)
        }, 1000)
      } else if (e.key === "ArrowUp") {
        e.preventDefault()
        setIsTransitioning(true)

        if (currentSlide === 2) {
          setCurrentSlide(1) // Must go to slide 1 first
        } else if (currentSlide === 1) {
          setCurrentSlide(0) // Then to slide 0
        }

        setTimeout(() => {
          setIsTransitioning(false)
        }, 1000)
      }
    }

    if (isScrollLocked) {
      document.body.style.overflow = "hidden"
      window.addEventListener("wheel", handleWheel, { passive: false })
      window.addEventListener("keydown", handleKeyDown)
    } else {
      document.body.style.overflow = "auto"
    }

    return () => {
      window.removeEventListener("wheel", handleWheel)
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [currentSlide, isScrollLocked, isTransitioning, slides.length, lastScrollTime])

  useEffect(() => {
    const handleScroll = () => {
      if (!isScrollLocked && window.scrollY === 0) {
        setIsScrollLocked(true)
        setCurrentSlide(0)
        document.body.style.overflow = "hidden"
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [isScrollLocked])

  useEffect(() => {
    return () => {
      document.body.style.overflow = "auto"
    }
  }, [])

  // Control moto animation - move immediately when page loads
  useEffect(() => {
    if (currentSlide === 1) {
      setMotoHasMoved(true)
    } else if (currentSlide === 0) {
      setMotoHasMoved(false)
    }
  }, [currentSlide])


  const getSlideAnimation = (index: number) => {
    if (index === currentSlide) {
      return "translate-y-0 translate-x-0 opacity-100 z-10"
    }

    // Slide 0 (hero) - always slides up when not active
    if (index === 0 && currentSlide > 0) {
      return "-translate-y-full opacity-100 z-0"
    }

    // Slide 1 (about) - enters from bottom, exits to top
    if (index === 1) {
      if (currentSlide === 0) {
        return "translate-y-full opacity-100 z-0" // Below, ready to come up
      } else if (currentSlide === 2) {
        return "-translate-y-full opacity-100 z-0" // Above, pushed up by slide 2
      }
    }

    // Slide 2 (brands) - enters from right, exits to right
    if (index === 2) {
      if (currentSlide < 2) {
        return "translate-x-full opacity-100 z-0" // To the right, ready to come in
      }
    }

    return "opacity-0 z-0"
  }



  return (
    <div id="hero" className="relative h-screen w-full overflow-hidden">
      {/* Slides Container */}
      <div className="relative h-full w-full">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-all duration-1000 ease-in-out ${getSlideAnimation(index)}`}
            style={{
              backgroundColor: slide.type === "hero" ? "transparent" : slide.background,
            }}
          >
            {/* Video background for hero slide */}
            {slide.type === "hero" && (
              <video
                className="absolute inset-0 w-full h-full object-cover"
                autoPlay
                loop
                muted
                playsInline
              >
                <source src="https://cdn.beacons.ai/user_content/ThQS4FFE6fUzcu0A0QJWDo6j2cx2/backgrounds/home/video_background_87autos.mp4?t=1750450229075-profile" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            )}

            {/* Background image for non-hero slides */}
            {slide.type !== "hero" && (
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage: `url('${slide.background}')`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                }}
              />
            )}

            {/* Dark overlay for hero slide */}
            {slide.type === "hero" && <div className="absolute inset-0 bg-black/40" />}

            {/* Content */}
            {slide.type === "hero" ? (
              <div className="relative z-10 flex h-full items-center justify-center px-24">
                <div className="text-left max-w-6xl mx-auto">
                  {/* Main Tagline - Left aligned */}
                  <motion.div
                    className="mb-12"
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.5, ease: "easeOut", delay: 0.3 }}
                  >
                    <motion.h1
                      className="text-4xl md:text-6xl lg:text-7xl font-luxury-display tracking-luxury-tight text-white leading-relaxed"
                      style={{ 
                        textShadow: "0 0 30px rgba(255, 255, 255, 0.3), 0 0 60px rgba(255, 255, 255, 0.2), 0 0 90px rgba(255, 255, 255, 0.1)"
                      }}
                      animate={{ 
                        textShadow: [
                          "0 0 30px rgba(255, 255, 255, 0.3), 0 0 60px rgba(255, 255, 255, 0.2), 0 0 90px rgba(255, 255, 255, 0.1)",
                          "0 0 40px rgba(255, 255, 255, 0.5), 0 0 80px rgba(255, 255, 255, 0.3), 0 0 120px rgba(255, 255, 255, 0.2)",
                          "0 0 30px rgba(255, 255, 255, 0.3), 0 0 60px rgba(255, 255, 255, 0.2), 0 0 90px rgba(255, 255, 255, 0.1)"
                        ]
                      }}
                      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    >
                      {slide.content.title}
                    </motion.h1>
                  </motion.div>

                  {/* Enhanced CTA Button */}
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: "easeOut", delay: 0.9 }}
                  >
                    <motion.button
                      className="group relative px-12 py-4 border-2 border-white text-white font-luxury-button tracking-luxury-wide text-lg hover:bg-white hover:text-black transition-all duration-700 ease-in-out overflow-hidden"
                      whileHover={{ 
                        scale: 1.05,
                        boxShadow: "0 0 30px rgba(255, 255, 255, 0.3)"
                      }}
                      whileTap={{ scale: 0.95 }}
                      animate={{
                        boxShadow: [
                          "0 0 0px rgba(255, 255, 255, 0)",
                          "0 0 20px rgba(255, 255, 255, 0.2)",
                          "0 0 0px rgba(255, 255, 255, 0)"
                        ]
                      }}
                      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    >
                      <span className="relative z-10">EXPLORAR VEHÍCULOS</span>
                      <div className="absolute inset-0 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 ease-in-out origin-left"></div>
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out"></div>
                    </motion.button>
                  </motion.div>

                  {/* Floating Elements */}
                  <motion.div
                    className="absolute top-20 left-10 w-2 h-2 bg-white/60 rounded-full"
                    animate={{
                      y: [0, -20, 0],
                      opacity: [0.6, 1, 0.6]
                    }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  />
                  <motion.div
                    className="absolute top-40 right-16 w-1 h-1 bg-white/40 rounded-full"
                    animate={{
                      y: [0, -15, 0],
                      opacity: [0.4, 0.8, 0.4]
                    }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                  />
                  <motion.div
                    className="absolute bottom-32 left-20 w-1.5 h-1.5 bg-white/50 rounded-full"
                    animate={{
                      y: [0, -25, 0],
                      opacity: [0.5, 1, 0.5]
                    }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                  />
                </div>
              </div>
            ) : slide.type === "about" ? (
              <div className="relative z-10 flex h-full items-center justify-between px-24">
                <div className="text-left max-w-xl text-white relative z-10">
                  <h1 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-wider mb-4 leading-none">
                    {slide.content.title}
                    <br />
                    <span className="text-2xl md:text-3xl lg:text-4xl">{slide.content.subtitle}</span>
                  </h1>
                  {slide.content.description && (
                    <p className="text-lg md:text-xl font-light tracking-wide mb-8 text-gray-200">
                      {slide.content.description}
                    </p>
                  )}
                </div>
                <motion.div
                  className="hidden lg:block absolute top-1/2 transform -translate-y-1/2"
                  style={{ zIndex: 5 }}
                  initial={{ left: "-400px" }}
                  animate={{ left: motoHasMoved ? "calc(100vw - 768px)" : "-400px" }}
                  transition={{ duration: 1, ease: "easeInOut", delay: 0.5 }}
                >
                  <img
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/motocicleta-bmw-s-1000-rr-plano-general-lateral__1_-removebg-preview-9YiERalvKJpV5ms1RrOMgc76pnTRYj.png"
                    alt="BMW S 1000 RR Motorcycle"
                    className="w-[768px] h-auto object-contain"
                  />
                </motion.div>
              </div>
            ) : slide.type === "brands" ? (
              <div className="relative z-10 flex h-full items-center justify-between px-24">
                <div className="w-1/2 flex justify-center">
                  <img
                    src="/bmw-3-series-luxury-dashboard.png"
                    alt="BMW 3 Series Luxury Dashboard"
                    className="w-full max-w-[650px] h-auto object-contain"
                  />
                </div>
                <div className="w-1/2 text-right max-w-2xl text-gray-900">
                  <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-wider mb-4 leading-none">
                    {slide.content.title}
                    <br />
                    <span className="text-3xl md:text-4xl lg:text-5xl">{slide.content.subtitle}</span>
                  </h1>
                  {slide.content.description && (
                    <p className="text-xl md:text-2xl font-light tracking-wide mb-8 text-gray-700">
                      {slide.content.description}
                    </p>
                  )}
                </div>
              </div>
            ) : null}
          </div>
        ))}
      </div>

      {/* Navigation */}
      <Navbar />

      {isScrollLocked && (
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
          <div className="flex flex-col items-center space-y-2">
            <div className={`text-sm font-medium ${currentSlide === 2 ? "text-gray-900" : "text-white"}`}>
              {currentSlide + 1} / {slides.length}
            </div>
            <div className="w-1 h-8 bg-white/20 rounded-full overflow-hidden">
              <div
                className="w-full bg-blue-500 transition-all duration-300 ease-out"
                style={{ height: `${((currentSlide + 1) / slides.length) * 100}%` }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
