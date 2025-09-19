"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface Loader87Props {
  onComplete: () => void
}

export default function Loader87({ onComplete }: Loader87Props) {
  const [counter, setCounter] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      setCounter((prev) => {
        if (prev >= 87) {
          clearInterval(interval)
          setTimeout(() => {
            setIsLoading(false)
            setTimeout(() => onComplete(), 300) // Reduced delay for smoother transition
          }, 100) // Reduced delay
          return 87
        }
        return prev + 2
      })
    }, 15)

    return () => clearInterval(interval)
  }, [onComplete])

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center"
          style={{
            background: 'linear-gradient(135deg, #000000, #111111)'
          }}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.1 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        >
          {/* Background gradient effect */}
          <motion.div
            className="absolute inset-0"
            style={{
              background: 'radial-gradient(circle at center, rgba(53, 71, 213, 0.1) 0%, transparent 70%)'
            }}
            animate={{
              opacity: [0.3, 0.6, 0.3],
              scale: [1, 1.1, 1]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />

          {/* Main 87 number with gradient effect */}
          <motion.div
            className="relative flex items-center justify-center"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.h1
              className="font-luxury-display text-[30vh] select-none relative text-luxury-gradient text-luxury-glow"
              style={{
                textShadow: '0 0 30px rgba(53, 71, 213, 0.5), 0 0 60px rgba(53, 71, 213, 0.3), 0 0 90px rgba(53, 71, 213, 0.1)'
              }}
              animate={{
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              {counter}
            </motion.h1>

            {/* Glow effect behind the number */}
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              style={{
                background: 'linear-gradient(135deg, #3547D5, #ffffff)',
                filter: 'blur(20px)',
                opacity: 0.3
              }}
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.6, 0.3]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <span className="font-black text-[30vh]" style={{ fontFamily: "Montserrat, sans-serif" }}>
                87
              </span>
            </motion.div>

            {/* Progress indicator */}
            <motion.div
              className="absolute bottom-[-60px] left-1/2 transform -translate-x-1/2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <div className="w-32 h-1 bg-gray-800 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-blue-500 to-white rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${(counter / 87) * 100}%` }}
                  transition={{ duration: 0.1 }}
                />
              </div>
            </motion.div>
          </motion.div>

          {/* Floating particles */}
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 rounded-full"
              style={{
                background: 'linear-gradient(135deg, #3547D5, #ffffff)',
                left: `${20 + i * 15}%`,
                top: `${30 + (i % 3) * 20}%`
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0.3, 1, 0.3],
                scale: [0.8, 1.2, 0.8]
              }}
              transition={{
                duration: 2 + i * 0.3,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.2
              }}
            />
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
