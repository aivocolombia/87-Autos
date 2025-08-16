"use client"
import { Menu, X } from "lucide-react"
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

  const navItems = [
    { name: "Inicio", href: "#hero", type: "scroll" },
    { name: "Vehículos", href: "/stock", type: "navigate" }, // Changed "Stock" to "Vehículos"
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
                <div className="text-center">
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
                <div className="hidden lg:block flex-shrink-0 -ml-4 mr-4">
                  <img
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/motocicleta-bmw-s-1000-rr-plano-general-lateral__1_-removebg-preview-9YiERalvKJpV5ms1RrOMgc76pnTRYj.png"
                    alt="BMW S 1000 RR Motorcycle"
                    className="w-96 h-auto object-contain"
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
          <img
            src={getCurrentLogo() || "/placeholder.svg"}
            alt="87 Autos Logo"
            className="h-12 w-auto transition-all duration-500 ease-in-out"
          />
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

          <a
            href="https://wa.me/573195792747"
            target="_blank"
            rel="noopener noreferrer"
            className={`p-2 rounded-full transition-all duration-300 hover:scale-110 ${
              currentSlide === 2 ? "text-gray-900 hover:bg-green-50" : "text-white hover:bg-green-500/20 drop-shadow-lg"
            }`}
            aria-label="Contactar por WhatsApp"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="transition-colors duration-300"
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.893 3.386" />
            </svg>
          </a>
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
            <a
              href="https://wa.me/573195792747"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white text-2xl font-bold tracking-wider hover:text-green-400 transition-colors duration-300 flex items-center space-x-2"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.893 3.386" />
              </svg>
              <span>WhatsApp</span>
            </a>
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
