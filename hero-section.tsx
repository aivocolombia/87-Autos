"use client"
import { Menu, X, Sun, Moon } from "lucide-react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [isScrollLocked, setIsScrollLocked] = useState(true)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [lastScrollTime, setLastScrollTime] = useState(0)
  const [scrollDirection, setScrollDirection] = useState<"up" | "down" | null>(null)
  const router = useRouter()

  const slides = [
    {
      type: "hero",
      background:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/hero-video-placeholder.jpg-cEUXzuoLp9Bw2II34fko6MbS6TcC28.jpeg", // Using the BMW highway image as background
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

  const navItems = [
    { name: "Inicio", href: "#hero", type: "scroll" },
    { name: "Stock", href: "/stock", type: "navigate" },
    { name: "Vehículos", href: "#vehicles", type: "scroll" },
    { name: "Testimonios", href: "#testimonials", type: "scroll" },
    { name: "Contacto", href: "#contact", type: "scroll" },
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
          setCurrentSlide(2) // Then to slide 2
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
          setCurrentSlide(2) // Then to slide 2
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

  const handleNavigation = (item: { href: string; type: string }) => {
    if (item.type === "navigate") {
      router.push(item.href)
    } else {
      setIsScrollLocked(false)
      document.body.style.overflow = "auto"
      setTimeout(() => {
        const element = document.querySelector(item.href)
        if (element) {
          element.scrollIntoView({ behavior: "smooth" })
        }
      }, 100)
    }
    setIsMenuOpen(false)
  }

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
    document.documentElement.classList.toggle("dark")
  }

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

  const getCurrentLogo = () => {
    if (currentSlide === 1) {
      // Blue background slide - use white logo
      return "https://87autos.com/cdn/shop/files/LOGO_EN_BLANCO.png?v=1727875586&width=200"
    }
    // Default logo for slides 0 and 2
    return "https://87autos.com/cdn/shop/files/logos-04_224ff7b9-c066-40d8-a14b-4ffa0f0a2efa.png?v=1727127568&width=200"
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
              backgroundImage: slide.type === "hero" ? `url('${slide.background}')` : "none",
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          >
            {/* Dark overlay for hero slide */}
            {slide.type === "hero" && <div className="absolute inset-0 bg-black/40" />}

            {/* Content */}
            {slide.type === "hero" ? (
              <div className="relative z-10 flex h-full flex-col items-center justify-start px-6 pt-20">
                <div className="text-center mb-8">
                  <img
                    src={getCurrentLogo() || "/placeholder.svg"}
                    alt="87 Autos Logo"
                    className="h-20 w-auto mx-auto mb-6 transition-all duration-500 ease-in-out"
                  />
                  <h1
                    className="text-xl md:text-2xl lg:text-3xl font-light tracking-widest leading-tight text-white"
                    style={{ fontFamily: "Avenir, system-ui, sans-serif" }}
                  >
                    {slide.content.title}
                  </h1>
                </div>
              </div>
            ) : slide.type === "about" ? (
              <div className="relative z-10 flex h-full items-center justify-between px-6">
                <div className="text-left max-w-xl text-white">
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
                <div className="hidden lg:block flex-shrink-0 ml-2 mr-8">
                  <img
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/motocicleta-bmw-s-1000-rr-plano-general-lateral__1_-removebg-preview-9YiERalvKJpV5ms1RrOMgc76pnTRYj.png"
                    alt="BMW S 1000 RR Motorcycle"
                    className="w-80 h-auto object-contain"
                  />
                </div>
              </div>
            ) : (
              <div className="relative z-10 flex h-full items-start justify-start px-6 pt-32">
                <div className="text-left max-w-2xl text-gray-900">
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
            )}
          </div>
        ))}
      </div>

      {/* Navigation */}
      <nav className="absolute top-0 left-0 right-0 z-30 flex items-center justify-between p-6 md:p-8">
        {/* Logo/Brand */}
        <div className="flex items-center">
          {currentSlide !== 0 && (
            <img
              src={getCurrentLogo() || "/placeholder.svg"}
              alt="87 Autos Logo"
              className="h-12 w-auto transition-all duration-500 ease-in-out"
            />
          )}
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => (
            <button
              key={item.name}
              onClick={() => handleNavigation(item)}
              className={`relative hover:text-blue-300 transition-colors duration-300 font-medium tracking-wide pb-1 group ${
                currentSlide === 2 ? "text-gray-900" : "text-white drop-shadow-lg"
              }`}
            >
              {item.name}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-500 transition-all duration-300 ease-out group-hover:w-full"></span>
            </button>
          ))}

          <button
            onClick={toggleDarkMode}
            className={`p-2 rounded-full transition-colors duration-300 ${
              currentSlide === 2 ? "text-gray-900 hover:bg-gray-100" : "text-white hover:bg-white/10 drop-shadow-lg"
            }`}
            aria-label="Toggle dark mode"
          >
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className={`md:hidden transition-colors ${
            currentSlide === 2 ? "text-gray-900 hover:text-blue-600" : "text-white hover:text-blue-300 drop-shadow-lg"
          }`}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          <span className="sr-only">Toggle menu</span>
        </button>
      </nav>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className="absolute top-0 left-0 w-full h-full bg-black/90 z-30 md:hidden">
          <div className="flex flex-col items-center justify-center h-full space-y-8">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => handleNavigation(item)}
                className="text-white text-2xl font-bold tracking-wider hover:text-blue-300 transition-colors duration-300"
              >
                {item.name}
              </button>
            ))}
            <button
              onClick={toggleDarkMode}
              className="text-white text-2xl font-bold tracking-wider hover:text-blue-300 transition-colors duration-300 flex items-center space-x-2"
            >
              {isDarkMode ? <Sun size={24} /> : <Moon size={24} />}
              <span>{isDarkMode ? "Modo Claro" : "Modo Oscuro"}</span>
            </button>
          </div>
        </div>
      )}

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
