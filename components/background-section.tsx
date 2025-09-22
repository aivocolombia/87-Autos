"use client"

import { motion } from "framer-motion"

export default function BackgroundSection() {

  return (
    <section className="relative h-screen w-full overflow-hidden bg-black">
      {/* Background Image */}
      <img
        src="/images/transition/1. luz apagada.png"
        alt="Transición de luz apagada"
        className="absolute inset-0 w-full h-full object-cover md:object-contain object-center"
      />

      {/* Dark overlay for better text readability */}
      <div className="absolute inset-0 bg-black/20" />

      {/* Overlay CTA Content */}
      <div className="absolute inset-0 flex items-center justify-center z-10">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-2xl md:max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              viewport={{ once: true }}
              className="space-y-6 md:space-y-8"
            >
              <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black text-white mb-4 md:mb-6 drop-shadow-lg">
                ¿Listo para tu próxima aventura?
              </h2>
              <motion.button
                onClick={() => {
                  window.location.href = '/stock'
                }}
                className="group relative px-8 py-4 md:px-12 md:py-6 bg-gradient-to-r from-blue-600 to-blue-700 text-white text-lg md:text-xl font-bold tracking-wide rounded-2xl hover:shadow-2xl transition-all duration-300 overflow-hidden shadow-lg"
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="relative z-10">
                  VER VEHÍCULOS DISPONIBLES
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out"></div>
              </motion.button>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
