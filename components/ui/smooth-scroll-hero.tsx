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
  scrollHeight = 1200,
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
  const clipStart = useTransform(scrollYProgress, [0, 0.5], [initialClipPercentage, 0])
  const clipEnd = useTransform(scrollYProgress, [0, 0.5], [finalClipPercentage, 100])
  const clipPath = useMotionTemplate`polygon(${clipStart}% ${clipStart}%, ${clipEnd}% ${clipStart}%, ${clipEnd}% ${clipEnd}%, ${clipStart}% ${clipEnd}%)`

  // Background size animation - completes when image is fully revealed
  const backgroundSize = useTransform(scrollYProgress, [0, 0.5], ["170%", "100%"])

  // Scale animation - completes when image is fully revealed
  const scale = useTransform(scrollYProgress, [0, 0.5], [1.2, 1])

  // CTA overlay animations - appears earlier and completes by 50%
  const ctaOpacity = useTransform(scrollYProgress, [0.2, 0.4], [0, 1])
  const ctaY = useTransform(scrollYProgress, [0.2, 0.4], [50, 0])

  useEffect(() => {
    const unsubscribe = ctaOpacity.on("change", (latest) => {
      if (latest > 0.6 && !shouldPlayVideo) {
        setShouldPlayVideo(true)
        if (videoRef.current) {
          videoRef.current.play().catch(console.error)
        }
      } else if (latest <= 0.2 && shouldPlayVideo) {
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
          className="absolute inset-4 border-2 border-gray-300 rounded-lg bg-white shadow-lg"
          style={{
            opacity: useTransform(ctaOpacity, [0, 0.4], [1, 0]),
            boxShadow: useTransform(ctaOpacity, [0, 0.4], ["0 8px 32px rgba(0,0,0,0.15)", "0 0px 0px rgba(0,0,0,0)"]),
            y: useTransform(ctaOpacity, [0, 0.4], [0, -20]),
            scale: useTransform(ctaOpacity, [0, 0.4], [1, 1.05]),
          }}
        />

        <div className="absolute inset-0 z-10">
          <div className="relative w-full h-full flex items-center justify-center">
            <motion.div
              className="absolute inset-0 flex flex-col items-center justify-center z-20"
              style={{
                opacity: useTransform(ctaOpacity, [0, 0.3, 0.7], [1, 0.5, 0]),
              }}
            >
              <img
                src="https://87autos.com/cdn/shop/files/logos-04_224ff7b9-c066-40d8-a14b-4ffa0f0a2efa.png?v=1727127568&width=200"
                alt="87 Autos"
                className="w-32 h-auto md:w-48 mb-8"
              />

              <motion.div
                className="flex flex-col items-center text-gray-500"
                animate={{ y: [0, 6, 0] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
              >
                <div className="w-5 h-8 border-2 border-gray-400 rounded-full flex justify-center relative">
                  <motion.div
                    className="w-0.5 h-2 bg-gray-400 rounded-full mt-1.5"
                    animate={{ y: [0, 8, 0] }}
                    transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                  />
                </div>
                <motion.div
                  className="mt-2 text-xs font-medium"
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                >
                  Scroll para ver más
                </motion.div>
              </motion.div>
            </motion.div>

            <motion.div
              className="absolute inset-0 flex items-center justify-center z-20"
              style={{
                opacity: useTransform(ctaOpacity, [0, 0.7], [0, 1]),
              }}
            >
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
            </motion.div>

            <motion.div
              className="absolute bottom-16 right-16 z-30"
              style={{
                opacity: useTransform(ctaOpacity, [0.5, 1], [0, 1]),
                y: useTransform(ctaOpacity, [0.5, 1], [20, 0]),
              }}
            >
              <motion.button
                className="relative bg-[#344acf] text-white px-8 py-4 font-semibold text-lg flex items-center gap-2 rounded-md overflow-hidden group"
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  window.location.href = "/stock"
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-[#2a3ba8] to-[#1e2d7a] transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out" />

                <span className="relative z-10">RESERVAR</span>
                <motion.span
                  className="text-xl relative z-10"
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
      </motion.div>
    </div>
  )
}

export default SmoothScrollHero
