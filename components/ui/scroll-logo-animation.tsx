"use client"

import { useRef, useState, useEffect } from "react"
import { motion, useScroll, useTransform } from "framer-motion"

const ScrollLogoAnimation = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [counter, setCounter] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  })

  // Loader animation - counter from 0 to 87
  useEffect(() => {
    if (isLoading) {
      const interval = setInterval(() => {
        setCounter((prev) => {
          if (prev >= 87) {
            clearInterval(interval)
            setTimeout(() => setIsLoading(false), 200) // Reduced delay before showing content
            return 87
          }
          return prev + 2 // Increment by 2 for faster counting
        })
      }, 15) // Faster speed of counting

      return () => clearInterval(interval)
    }
  }, [isLoading])

  // Background fade animation based on counter progress
  const backgroundOpacity = isLoading ? Math.max(1 - (counter / 87) * 0.7, 0.3) : 0

  // Animaciones para el logo "87" (centrado desde el inicio)
  const logoScale = useTransform(scrollYProgress, [0, 0.5, 0.7], [6, 1.6, 1.6]) // Llega a 40vh al 50% y se mantiene hasta el 70%
  const logoBlur = useTransform(scrollYProgress, [0, 0.5], [40, 0]) // Blur llega a 0 al 50%
  const logoOpacity = useTransform(scrollYProgress, [0, 0.4, 0.5], [0.6, 1, 1]) // Opacidad completa al 50%
  const logoColor = useTransform(scrollYProgress, [0, 0.3, 0.5], ["#000000", "#333333", "#ffffff"]) // Blanco al 50%

  // Transformaciones adicionales para evitar llamadas dinámicas a useTransform
  const logoFilter = useTransform(logoBlur, (blur) => `blur(${blur}px)`)
  const logoTextShadow = useTransform(scrollYProgress, (progress) =>
    progress > 0.6
      ? "0 0 40px rgba(255,255,255,0.8)"
      : `0 0 ${20 + progress * 10}px rgba(0,0,0,${0.3 - progress * 0.2})`
  )
  const logoNumberOpacity = useTransform(scrollYProgress, [0.8, 0.9], [1, 0])
  const logoImageOpacity = useTransform(scrollYProgress, [0.8, 0.9], [0, 1])
  const logoImageScale = useTransform(scrollYProgress, [0.8, 0.9], [0.8, 1])
  const contentOpacity = useTransform(scrollYProgress, [0.5, 1], [0, 1])
  const contentY = useTransform(scrollYProgress, [0.5, 1], [50, 0])

  return (
    <div ref={containerRef} className="relative h-[200vh] w-full bg-white">
      {/* Loader Screen */}
      {isLoading && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center"
          style={{
            backgroundColor: `rgba(0, 0, 0, ${backgroundOpacity})`,
          }}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <motion.h1
              className="font-black text-[25vh] select-none text-white"
              style={{
                fontFamily: "Montserrat, sans-serif",
                textShadow: "0 0 40px rgba(255,255,255,0.5)",
              }}
            >
              {counter}
            </motion.h1>
            <motion.div
              className="mt-8"
              initial={{ width: 0 }}
              animate={{ width: `${(counter / 87) * 300}px` }}
              transition={{ duration: 0.1 }}
            >
              <div className="h-1 bg-white rounded-full"></div>
            </motion.div>
          </motion.div>
        </motion.div>
      )}

      {/* Main Content - Only show after loading */}
      {!isLoading && (
        <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
          <motion.div
            className="flex items-center justify-center"
            style={{
              scale: logoScale,
              filter: logoFilter,
              opacity: logoOpacity,
            }}
            transition={{
              scale: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] },
              filter: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] },
              opacity: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] },
            }}
          >
            <motion.div className="relative flex items-center justify-center">
              <motion.h1
                className="font-black text-[25vh] select-none absolute inset-0 flex items-center justify-center"
                style={{
                  fontFamily: "Montserrat, sans-serif",
                  color: logoColor,
                  textShadow: logoTextShadow,
                  opacity: logoNumberOpacity,
                }}
              >
                87
              </motion.h1>

              <motion.img
                src="https://87autos.com/cdn/shop/files/logos-04_224ff7b9-c066-40d8-a14b-4ffa0f0a2efa.png?v=1727127568&width=200"
                alt="87 Autos Logo"
                className="h-[40vh] w-auto transition-all duration-500 ease-in-out absolute inset-0 flex items-center justify-center"
                style={{
                  opacity: logoImageOpacity,
                  scale: logoImageScale,
                }}
              />
            </motion.div>
          </motion.div>

          {/* Contenido debajo del logo */}
          <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 z-10">
            <motion.div
              style={{
                opacity: contentOpacity,
                y: contentY,
              }}
            >
              <p className="text-gray-600 text-lg text-center">
                Descubre más sobre nuestros servicios
              </p>
            </motion.div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ScrollLogoAnimation