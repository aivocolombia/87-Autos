"use client"
import { Menu, ChevronLeft, ChevronRight, X } from "lucide-react"
import { useState } from "react"
import { useRouter } from "next/navigation"

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const router = useRouter()

  const slides = [
    {
      image: "/placeholder-1e0uo.png",
      alt: "BMW sedan de lujo",
    },
    {
      image: "/placeholder-b0kg7.png",
      alt: "Mini Cooper en entorno urbano",
    },
    {
      image: "/bmw_mini_dealership.png",
      alt: "BMW SUV y Mini Cooper en concesionario",
    },
  ]

  const navItems = [
    { name: "Inicio", href: "#hero", type: "scroll" },
    { name: "Stock", href: "/stock", type: "navigate" },
    { name: "Vehículos", href: "#vehicles", type: "scroll" },
    { name: "Testimonios", href: "#testimonials", type: "scroll" },
    { name: "Contacto", href: "#contact", type: "scroll" },
  ]

  // Navigation handlers
  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length)
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)

  const handleNavigation = (item: { href: string; type: string }) => {
    if (item.type === "navigate") {
      router.push(item.href)
    } else {
      const element = document.querySelector(item.href)
      if (element) {
        element.scrollIntoView({ behavior: "smooth" })
      }
    }
    setIsMenuOpen(false)
  }

  return (
    <div id="hero" className="relative h-screen w-full overflow-hidden bg-black">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-1000 ease-in-out"
        style={{
          backgroundImage: `url('${slides[currentSlide].image}')`,
        }}
      >
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Navigation */}
      <nav className="relative z-20 flex items-center justify-between p-6 md:p-8">
        {/* Logo/Brand */}
        <div className="flex items-center space-x-3">
          <img
            src="https://87autos.com/cdn/shop/files/logos-04_224ff7b9-c066-40d8-a14b-4ffa0f0a2efa.png?v=1727127568&width=200"
            alt="87 Autos Logo"
            className="h-8 w-auto"
          />
          <div className="text-white font-bold text-xl tracking-wider">87 AUTOS</div>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => (
            <button
              key={item.name}
              onClick={() => handleNavigation(item)}
              className="relative text-white hover:text-blue-300 transition-colors duration-300 font-medium tracking-wide pb-1 group"
            >
              {item.name}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-500 transition-all duration-300 ease-out group-hover:w-full"></span>
            </button>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white hover:text-blue-300 transition-colors"
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
          </div>
        </div>
      )}

      {/* Hero Content */}
      <div className="relative z-10 flex h-full items-center justify-center px-6">
        <div className="text-center text-white max-w-4xl">
          {/* Main Title */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-wider mb-4 leading-none">
            <span className="text-blue-500">87</span> AUTOS
            <br />
            <span className="text-3xl md:text-4xl lg:text-5xl">BMW & MINI COOPER</span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl font-light tracking-wide mb-8 text-gray-200">Ingeniería Alemana Premium</p>
        </div>
      </div>

      {/* Slider Navigation */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
        <div className="flex items-center space-x-4">
          {/* Previous Arrow */}
          <button
            onClick={prevSlide}
            className="text-white hover:text-gray-300 transition-colors p-2"
            aria-label="Previous slide"
          >
            <ChevronLeft size={24} />
          </button>

          {/* Slide Indicators */}
          <div className="flex space-x-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  currentSlide === index ? "bg-white" : "bg-white/40 hover:bg-white/60"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          {/* Next Arrow */}
          <button
            onClick={nextSlide}
            className="text-white hover:text-gray-300 transition-colors p-2"
            aria-label="Next slide"
          >
            <ChevronRight size={24} />
          </button>
        </div>
      </div>

      {/* Side Navigation Indicators */}
      <div className="absolute right-8 top-1/2 transform -translate-y-1/2 z-20 hidden md:block">
        <div className="flex flex-col space-y-3">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-1 h-8 transition-all duration-300 ${
                currentSlide === index ? "bg-white" : "bg-white/40 hover:bg-white/60"
              }`}
              aria-label={`Slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
