"use client"

import { useState, useEffect, useCallback, useMemo } from "react"
import { useRouter, usePathname } from "next/navigation"
// Removed Framer Motion imports to fix hydration errors
import { Menu, X } from "lucide-react"

interface NavItem {
  name: string
  href: string
  type: "scroll" | "navigate"
}

// Memoize nav items to prevent unnecessary re-renders
const navItems: NavItem[] = [
  { name: "Inicio", href: "/", type: "navigate" },
  { name: "Vehículos", href: "/stock", type: "navigate" },
  { name: "Vehículos 2.0", href: "/vehiculos", type: "navigate" },
  { name: "Nosotros", href: "/nosotros", type: "navigate" },
  { name: "Expertos", href: "/expertos", type: "navigate" },
  { name: "Contacto", href: "/contacto", type: "navigate" },
]

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isNavbarVisible, setIsNavbarVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [currentSlide, setCurrentSlide] = useState(0)
  const router = useRouter()
  const pathname = usePathname()

  // Memoized scroll handler to prevent unnecessary re-renders
  const handleScroll = useCallback(() => {
    const currentScrollY = window.scrollY
    const firstSectionHeight = window.innerHeight

    if (currentScrollY > lastScrollY && currentScrollY > firstSectionHeight) {
      setIsNavbarVisible(false)
    } else if (currentScrollY < lastScrollY) {
      setIsNavbarVisible(true)
    }

    setLastScrollY(currentScrollY)
  }, [lastScrollY])

  // Auto-hide navbar on scroll
  useEffect(() => {
    if (typeof window === 'undefined') return

    window.addEventListener("scroll", handleScroll, { passive: true })

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [handleScroll])

  // Track current slide for color changes (only on home page)
  useEffect(() => {
    if (pathname !== "/" || typeof window === 'undefined') return

    const handleSlideChange = () => {
      // This would be connected to the hero section's slide state
      // For now, we'll use a simple scroll-based detection
      const scrollY = window.scrollY
      const windowHeight = window.innerHeight

      if (scrollY < windowHeight * 0.5) {
        setCurrentSlide(0)
      } else if (scrollY < windowHeight * 1.5) {
        setCurrentSlide(1)
      } else {
        setCurrentSlide(2)
      }
    }

    window.addEventListener("scroll", handleSlideChange)
    return () => window.removeEventListener("scroll", handleSlideChange)
  }, [pathname])

  const handleNavigation = useCallback((item: NavItem) => {
    if (item.type === "navigate") {
      router.push(item.href)
    } else {
      // Handle scroll navigation - always navigate to home page with hash
      if (pathname === "/") {
        // If already on home page, just scroll
        if (typeof document !== 'undefined') {
          const element = document.querySelector(item.href)
          if (element) {
            element.scrollIntoView({ behavior: "smooth" })
          }
        }
      } else {
        // If on any other page, navigate to home with hash
        router.push(item.href) // Changed from `router.push(`/${item.href}`)`
      }
    }
    setIsMenuOpen(false)
  }, [router, pathname])

  // Memoize functions to prevent unnecessary re-renders
  const getCurrentLogo = useCallback(() => {
    // Always use white logo for consistency
    return "https://87autos.com/cdn/shop/files/LOGO_EN_BLANCO.png?v=1727875586&width=200"
  }, [])

  const getTextColor = useCallback(() => {
    // Always white text for all pages and slides
    return "text-white"
  }, [])

  const getHoverColor = useCallback(() => {
    // Always white hover for all pages and slides
    return "hover:text-gray-200"
  }, [])

  const isActivePage = useCallback((href: string) => {
    if (href === "/") {
      return pathname === "/"
    }
    // For scroll links, they're only active on the home page
    if (href.startsWith("#")) {
      return pathname === "/" // Removed `&& window.location.hash === href`
    }
    return pathname === href
  }, [pathname])

  return (
    <>
      {/* Fixed Navbar */}
            <nav
              className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between p-3 md:p-4 transition-transform duration-300 ease-in-out ${
                isNavbarVisible ? 'translate-y-0' : '-translate-y-full'
              }`}
        style={{
          background: 'rgba(0, 0, 0, 0.9)',
          backdropFilter: 'blur(10px)',
          borderBottom: '1px solid rgba(53, 71, 213, 0.1)'
        }}
      >
          {/* Logo */}
          <div className="flex items-center hover:scale-105 transition-transform duration-200">
            <div className="relative">
              <img
                src="/svg/LOGO_EN_BLANCO 1.svg"
                alt="87 Autos Logo"
                className="h-6 md:h-8 w-auto transition-all duration-500 ease-in-out relative z-10"
              />
            </div>
          </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          {navItems.map((item, index) => (
            <button
              key={item.name}
              onClick={() => handleNavigation(item)}
              className={`relative font-medium tracking-wide pb-1 group transition-all duration-300 hover:scale-105 ${
                isActivePage(item.href)
                  ? "text-white"
                  : `${getTextColor()} ${getHoverColor()}`
              }`}
            >
              <span className="relative z-10">{item.name}</span>
              
              {/* Hover underline */}
              <span className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-transparent via-blue-500 to-transparent w-0 group-hover:w-full transition-all duration-300 ease-out" />
              
              {/* Active state underline */}
              <span
                className={`absolute bottom-0 left-0 h-0.5 bg-white transition-all duration-300 ${
                  isActivePage(item.href) ? 'w-full' : 'w-0'
                }`}
              />
              
              {/* Hover glow effect */}
              <div
                className="absolute inset-0 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                style={{
                  background: 'linear-gradient(135deg, rgba(53, 71, 213, 0.1), rgba(53, 71, 213, 0.05))'
                }}
              />
            </button>
          ))}

          {/* WhatsApp Button */}
          <a
            href="https://wa.me/573195792747"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-full transition-all duration-300 hover:scale-110 text-white hover:bg-green-500/20"
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
          className="md:hidden relative p-2 rounded-lg transition-all duration-300 text-white hover:bg-blue-500/20 hover:scale-105 active:scale-95"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? (
            <X size={24} />
          ) : (
            <Menu size={24} />
          )}
          <span className="sr-only">Toggle menu</span>
        </button>
      </nav>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div
            className="fixed top-0 left-0 w-full h-full z-40 md:hidden transition-opacity duration-300"
            style={{
              background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.95), rgba(0, 0, 0, 0.8))',
              backdropFilter: 'blur(10px)'
            }}
          >
            {/* Mobile Logo */}
            <div className="absolute top-4 left-4">
              <img
                src="/svg/LOGO_EN_BLANCO 1.svg"
                alt="87 Autos Logo"
                className="h-8 w-auto"
              />
            </div>
            <div className="flex flex-col items-center justify-center h-full space-y-8 px-6">
            {navItems.map((item, index) => (
              <button
                key={item.name}
                onClick={() => handleNavigation(item)}
                className={`relative text-2xl font-bold tracking-wider transition-all duration-300 text-white group hover:scale-105 active:scale-95 ${
                  isActivePage(item.href) ? "text-blue-400" : "hover:text-blue-400"
                }`}
              >
                <span className="relative z-10">{item.name}</span>
                
                {/* Hover underline for mobile */}
                <span className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent w-0 group-hover:w-full transition-all duration-300" />
                
                {/* Active state underline */}
                <span
                  className={`absolute bottom-0 left-0 h-1 bg-blue-400 transition-all duration-300 ${
                    isActivePage(item.href) ? 'w-full' : 'w-0'
                  }`}
                />
                
                {/* Hover glow effect */}
                <div
                  className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                  style={{
                    background: 'linear-gradient(135deg, rgba(53, 71, 213, 0.1), rgba(53, 71, 213, 0.05))'
                  }}
                />
              </button>
            ))}
            
            <a
              href="https://wa.me/573195792747"
              target="_blank"
              rel="noopener noreferrer"
              className="text-2xl font-bold tracking-wider transition-colors duration-300 flex items-center space-x-2 text-white hover:text-green-400"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.893 3.386" />
              </svg>
              <span>WhatsApp</span>
            </a>
          </div>
        </div>
      )}
    </>
  )
}