"use client"

import { useScroll, useTransform, motion } from "framer-motion"
import { useRef, useEffect, useState } from "react"
import { cn } from "@/lib/utils"

interface TimelineEntry {
  id: number
  image?: string
  video?: string
  alt: string
  title: string
  description: string
  layout: "left" | "right"
}

interface TimelineProps {
  entries: TimelineEntry[]
  className?: string
}

export function Timeline({ entries, className }: TimelineProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  return (
    <div ref={containerRef} className={cn("relative", className)}>
      {/* Central Timeline Line */}
      <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gray-300 transform -translate-x-1/2 hidden md:block" />

      {entries.map((entry, index) => (
        <TimelineItem key={entry.id} entry={entry} index={index} scrollProgress={scrollYProgress} />
      ))}
    </div>
  )
}

interface TimelineItemProps {
  entry: TimelineEntry
  index: number
  scrollProgress: any
}

function TimelineItem({ entry, index, scrollProgress }: TimelineItemProps) {
  const itemRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isVideoLoaded, setIsVideoLoaded] = useState(false)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [isScrollingUp, setIsScrollingUp] = useState(false)
  
  const { scrollYProgress: itemProgress } = useScroll({
    target: itemRef,
    offset: ["start center", "end center"],
  })

  const opacity = useTransform(itemProgress, [0, 0.3, 0.7, 1], [0.3, 1, 1, 0.3])
  const scale = useTransform(itemProgress, [0, 0.3, 0.7, 1], [0.8, 1, 1, 0.8])

  const isLeft = entry.layout === "left"

  // Scroll-telling: smooth video sync with scroll position
  useEffect(() => {
    if (!entry.video || !isVideoLoaded || !videoRef.current) return

    let rafId: number
    let lastScrollTime = 0
    const scrollThrottle = 8 // ~120fps for ultra-smooth sync

    const handleScroll = () => {
      const now = Date.now()
      if (now - lastScrollTime < scrollThrottle) return
      lastScrollTime = now

      if (rafId) {
        cancelAnimationFrame(rafId)
      }

      rafId = requestAnimationFrame(() => {
        if (!itemRef.current || !videoRef.current) return

        const currentScrollY = window.scrollY
        const scrollDirection = currentScrollY > lastScrollY ? 'down' : 'up'
        setIsScrollingUp(scrollDirection === 'up')
        setLastScrollY(currentScrollY)

        const rect = itemRef.current.getBoundingClientRect()
        const windowHeight = window.innerHeight
        
        // Check if item is in viewport
        if (rect.top < windowHeight && rect.bottom > 0) {
          // Calculate scroll progress through the item (0 to 1)
          const itemTop = rect.top
          const itemBottom = rect.bottom
          const itemHeight = rect.height
          
          // Calculate how much of the item has been scrolled through
          const scrolledThrough = Math.max(0, windowHeight - itemTop)
          const totalScrollableHeight = windowHeight + itemHeight
          const scrollProgress = Math.min(1, Math.max(0, scrolledThrough / totalScrollableHeight))
          
          // Map scroll progress to video time (0 to 5 seconds)
          const targetTime = scrollProgress * 5
          
          // Smooth interpolation to target time
          const currentTime = videoRef.current.currentTime
          const timeDifference = targetTime - currentTime
          
          // Apply smooth easing for natural movement
          const easingFactor = 0.15 // Higher = more responsive, lower = smoother
          const newTime = currentTime + (timeDifference * easingFactor)
          
          // Clamp to 0-5 seconds range
          videoRef.current.currentTime = Math.max(0, Math.min(5, newTime))
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
  }, [isVideoLoaded, entry.video])

  const handleVideoLoad = () => {
    setIsVideoLoaded(true)
  }

  return (
    <motion.div ref={itemRef} style={{ opacity, scale }} className="relative mb-20 md:mb-32">
      {/* Timeline Dot */}
      <div className="absolute left-1/2 top-1/2 w-4 h-4 bg-gray-900 rounded-full transform -translate-x-1/2 -translate-y-1/2 z-10 hidden md:block" />

      <div className="container mx-auto px-6">
        <div
          className={cn("grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center", {
            "md:text-right": isLeft,
          })}
        >
          {/* Image */}
          <div
            className={cn("relative", {
              "md:order-2": isLeft,
              "md:order-1": !isLeft,
            })}
          >
            <div className="sticky top-20">
              <div className="relative overflow-hidden rounded-2xl aspect-[3/4] bg-gray-100">
                {entry.video ? (
                  <video
                    ref={videoRef}
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                    muted
                    playsInline
                    preload="auto"
                    onLoadedData={handleVideoLoad}
                  >
                    <source src={entry.video} type="video/mp4" />
                  </video>
                ) : (
                  <img
                    src={entry.image || "/placeholder.svg"}
                    alt={entry.alt}
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                  />
                )}
                <div className="absolute inset-0 bg-black/10" />
              </div>
            </div>
          </div>

          {/* Content */}
          <div
            className={cn("relative", {
              "md:order-1": isLeft,
              "md:order-2": !isLeft,
            })}
          >
            <div className="sticky top-32">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="space-y-6"
              >
                <h3 className="text-3xl md:text-4xl lg:text-5xl font-black tracking-wide text-gray-900">
                  {entry.title}
                </h3>
                <p className="text-lg md:text-xl leading-relaxed text-gray-700 max-w-lg">{entry.description}</p>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
