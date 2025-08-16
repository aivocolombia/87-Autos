"use client"

import type * as React from "react"
import { useRef, useState, useEffect } from "react"
import { motion, useMotionTemplate, useScroll, useTransform } from "framer-motion"

interface SmoothScrollHeroProps {
  scrollHeight?: number
  desktopImage: string
  mobileImage: string
  initialClipPercentage?: number
  finalClipPercentage?: number
}

const SmoothScrollHero: React.FC<SmoothScrollHeroProps> = ({
  scrollHeight = 1875,
  desktopImage,
  mobileImage,
  initialClipPercentage = 25,
  finalClipPercentage = 75,
}) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isVideoExpanded, setIsVideoExpanded] = useState(false)
  const [shouldPlayVideo, setShouldPlayVideo] = useState(false)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  })

  // Clip path animation - image fully reveals by 70% scroll progress
  const clipStart = useTransform(scrollYProgress, [0, 0.7], [initialClipPercentage, 0])
  const clipEnd = useTransform(scrollYProgress, [0, 0.7], [finalClipPercentage, 100])
  const clipPath = useMotionTemplate`polygon(${clipStart}% ${clipStart}%, ${clipEnd}% ${clipStart}%, ${clipEnd}% ${clipEnd}%, ${clipStart}% ${clipEnd}%)`

  // Background size animation - completes when image is fully revealed
  const backgroundSize = useTransform(scrollYProgress, [0, 0.7], ["170%", "100%"])

  // Scale animation - completes when image is fully revealed
  const scale = useTransform(scrollYProgress, [0, 0.7], [1.2, 1])

  // CTA overlay animations - appears earlier and completes by 50%
  const ctaOpacity = useTransform(scrollYProgress, [0.3, 0.5], [0, 1])
  const ctaY = useTransform(scrollYProgress, [0.3, 0.5], [50, 0])

  useEffect(() => {
    const unsubscribe = ctaOpacity.on("change", (latest) => {
      if (latest > 0.8 && !shouldPlayVideo) {
        setShouldPlayVideo(true)
        if (videoRef.current) {
          videoRef.current.play().catch(console.error)
        }
      } else if (latest <= 0.3 && shouldPlayVideo) {
        setShouldPlayVideo(false)
        if (videoRef.current) {
          videoRef.current.pause()
          videoRef.current.currentTime = 0
        }
      }
    })
    return unsubscribe
  }, [ctaOpacity, shouldPlayVideo])

  const handleExpandVideo = () => {
    setIsVideoExpanded(true)
  }

  return (
    <div ref={containerRef} style={{ height: `${scrollHeight}px` }} className="relative w-full">
      <motion.div
        className="sticky top-0 h-screen w-full bg-white overflow-hidden"
        style={{
          clipPath,
          willChange: "transform",
        }}
      >
        <motion.div
          className="absolute inset-4 border-2 border-gray-300 rounded-lg z-5"
          style={{
            opacity: useTransform(ctaOpacity, [0, 0.3], [1, 0]),
          }}
        />

        <div className="absolute inset-0 z-10">
          <div className="relative w-full h-full flex items-center justify-center">
            <motion.div
              className="absolute inset-0 flex items-center justify-center z-20"
              style={{
                opacity: useTransform(ctaOpacity, [0, 0.3, 0.7], [1, 0.5, 0]),
              }}
            >
              <img
                src="https://87autos.com/cdn/shop/files/logos-04_224ff7b9-c066-40d8-a14b-4ffa0f0a2efa.png?v=1727127568&width=200"
                alt="87 Autos"
                className="w-32 h-auto md:w-48"
              />
            </motion.div>

            <motion.video
              ref={videoRef}
              muted
              loop
              playsInline
              className="w-full h-full object-cover"
              style={{
                opacity: useTransform(ctaOpacity, [0.3, 0.7, 1], [0, 0.5, 1]),
                scale: useTransform(ctaOpacity, [0, 1], [1.1, 1]),
              }}
              onLoadStart={() => console.log("[v0] Video loading started")}
              onCanPlay={() => console.log("[v0] Video can play")}
              onLoadedData={() => console.log("[v0] Video loaded data")}
            >
              <source
                src="https://cdn.shopify.com/videos/c/o/v/d68fe2922a8a4bb2aa1135c773587153.mp4"
                type="video/mp4"
              />
              Tu navegador no soporta el elemento de video.
            </motion.video>

            <motion.div
              className="absolute bottom-8 right-16 z-30"
              style={{
                opacity: useTransform(ctaOpacity, [0.7, 1], [0, 1]),
                y: useTransform(ctaOpacity, [0.7, 1], [20, 0]),
              }}
            >
              <motion.button
                className="bg-[#344acf] text-white px-8 py-4 font-semibold text-lg flex items-center gap-2 transition-all duration-300 hover:bg-[#2a3ba8] hover:shadow-lg hover:shadow-blue-500/25 rounded-md"
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 0 20px rgba(52, 74, 207, 0.4)",
                }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  // Navigate to stock or contact page
                  window.location.href = "/stock"
                }}
              >
                RESERVAR
                <motion.span
                  className="text-xl"
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  →
                </motion.span>
              </motion.button>
            </motion.div>

            <motion.div
              className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60"
              style={{
                opacity: useTransform(ctaOpacity, [0.3, 0.8], [0, 1]),
              }}
            />
          </div>
        </div>

        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30"
          style={{
            opacity: useTransform(ctaOpacity, [0, 0.3], [1, 0]),
          }}
        >
          <motion.div
            className="flex flex-col items-center text-gray-600"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          >
            <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center">
              <motion.div
                className="w-1 h-3 bg-gray-400 rounded-full mt-2"
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
              />
            </div>
            <span className="text-sm mt-2 font-medium">Scroll</span>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default SmoothScrollHero
