"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Navbar from "../../components/navbar"
import Footer from "../../components/footer"

export default function ExpertosPage() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true)
    }, 1500)
    return () => clearTimeout(timer)
  }, [])

  const experts = [
    {
      id: 1,
      name: "JORGE RODRÍGUEZ",
      role: "FOUNDER & CEO",
      experience: "4+ Años de Experiencia",
      quote: "OCHO/SIETE nace gracias a la pasión por los carros y en especial a las marcas BMW y MINI COOPER. Somos una empresa con 4 años de experiencia en el mercado que comercializa vehículos usados de alta gama.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
      specialty: "Fundador y Liderazgo"
    },
    {
      id: 2,
      name: "ALEJANDRA ZORRO",
      role: "GERENTE FINANCIERA Y CONTABLE",
      experience: "4+ Años de Experiencia",
      quote: "La excelencia es nuestro sello, y la demostramos a través de la alta calidad, atención personalizada y seguridad que ofrecemos a nuestros clientes.",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop&crop=face",
      specialty: "Gestión Financiera"
    },
    {
      id: 3,
      name: "JUAN MANUEL RODRÍGUEZ",
      role: "GERENTE COMERCIAL",
      experience: "4+ Años de Experiencia",
      quote: "No solo vendemos autos, construimos relaciones. Nos aseguramos de que cada cliente se sienta valorado y satisfecho en cada paso de su compra.",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
      specialty: "Estrategia Comercial"
    },
    {
      id: 4,
      name: "JUAN ORTEGA",
      role: "DIRECTOR COMERCIAL MOTOS",
      experience: "4+ Años de Experiencia",
      quote: "Los carros transmiten historias, sueños y metas, nosotros somos la mano que te ayuda a avanzar hacia ellas.",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face",
      specialty: "División Motos"
    },
    {
      id: 5,
      name: "MARTÍN SANTAMARÍA",
      role: "ASESOR COMERCIAL",
      experience: "4+ Años de Experiencia",
      quote: "Somos tu familia y haremos que tus sueños se hagan realidad con la mejor experiencia en movimiento.",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop&crop=face",
      specialty: "Asesoría Premium"
    },
    {
      id: 6,
      name: "JOHN RODRÍGUEZ",
      role: "ASESOR COMERCIAL",
      experience: "4+ Años de Experiencia",
      quote: "Cada vehículo cuenta una historia única. Mi misión es ayudarte a encontrar la tuya con BMW y Mini Cooper.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
      specialty: "Experiencia BMW"
    },
    {
      id: 7,
      name: "JUAN DIEGO DUARTE",
      role: "ASESOR COMERCIAL",
      experience: "4+ Años de Experiencia",
      quote: "La pasión por la excelencia se refleja en cada detalle. Te ayudo a encontrar el vehículo perfecto para tu estilo de vida.",
      image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop&crop=face",
      specialty: "Personalización"
    },
    {
      id: 8,
      name: "JUAN PABLO MARTÍNEZ",
      role: "ASESOR COMERCIAL",
      experience: "4+ Años de Experiencia",
      quote: "BMW y Mini Cooper no son solo marcas, son experiencias. Te guío hacia la mejor decisión automotriz.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
      specialty: "Tecnología Premium"
    },
    {
      id: 9,
      name: "YULIETH SERRANO",
      role: "ASESORA COMERCIAL",
      experience: "4+ Años de Experiencia",
      quote: "Cada cliente merece una atención personalizada. Mi compromiso es brindarte la mejor experiencia de compra.",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face",
      specialty: "Atención Personalizada"
    },
    {
      id: 10,
      name: "JOHN ABRIL",
      role: "ASESOR COMERCIAL",
      experience: "4+ Años de Experiencia",
      quote: "La calidad y la confianza son los pilares de nuestro servicio. Te ayudo a encontrar el vehículo ideal.",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
      specialty: "Calidad y Confianza"
    },
    {
      id: 11,
      name: "MARCO LOAIZA",
      role: "ASESOR COMERCIAL",
      experience: "4+ Años de Experiencia",
      quote: "Cada vehículo en nuestro showroom ha sido cuidadosamente seleccionado para brindar la máxima calidad y rendimiento.",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face",
      specialty: "Selección Premium"
    },
    {
      id: 12,
      name: "JUAN ESTEBAN VARGAS",
      role: "ASESOR COMERCIAL",
      experience: "4+ Años de Experiencia",
      quote: "Tu satisfacción es nuestra prioridad. Te acompaño en cada paso del proceso de compra de tu próximo vehículo.",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop&crop=face",
      specialty: "Satisfacción del Cliente"
    }
  ]

  const stats = [
    { number: "4+", label: "Años de Experiencia", icon: "🏆" },
    { number: "1000+", label: "Vehículos Entregados", icon: "🚗" },
    { number: "98%", label: "Satisfacción del Cliente", icon: "⭐" },
    { number: "12", label: "Miembros del Equipo", icon: "👥" }
  ]

  if (!isLoaded) {
    return (
      <div className="fixed inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-800 flex items-center justify-center z-[9999]">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-white/30"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white overflow-hidden">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Luxury Background */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-800"></div>
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-transparent to-black/50"></div>
          
          {/* Luxury Pattern Overlay */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              backgroundSize: '60px 60px'
            }}></div>
          </div>
        </div>

        {/* Floating Luxury Elements */}
        <motion.div
          className="absolute top-20 left-10 w-3 h-3 rounded-full bg-white/20"
          animate={{
            y: [0, -20, 0],
            opacity: [0.2, 0.8, 0.2]
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-40 right-16 w-2 h-2 rounded-full bg-white/30"
          animate={{
            y: [0, -15, 0],
            opacity: [0.3, 0.9, 0.3]
          }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
        <motion.div
          className="absolute bottom-32 left-20 w-2.5 h-2.5 rounded-full bg-white/25"
          animate={{
            y: [0, -25, 0],
            opacity: [0.25, 0.7, 0.25]
          }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />

        {/* Hero Content */}
        <div className="relative z-10 text-center max-w-6xl mx-auto px-12">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          >
            <motion.h1
              className="text-6xl md:text-8xl lg:text-9xl font-luxury-display tracking-luxury-tight text-white relative mb-8"
              style={{ 
                textShadow: "0 0 40px rgba(255, 255, 255, 0.3), 0 0 80px rgba(255, 255, 255, 0.1)"
              }}
              animate={{ 
                textShadow: [
                  "0 0 40px rgba(255, 255, 255, 0.3), 0 0 80px rgba(255, 255, 255, 0.1)",
                  "0 0 60px rgba(255, 255, 255, 0.5), 0 0 100px rgba(255, 255, 255, 0.2)",
                  "0 0 40px rgba(255, 255, 255, 0.3), 0 0 80px rgba(255, 255, 255, 0.1)"
                ]
              }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              EXPERTOS
            </motion.h1>
          </motion.div>

          <motion.div
            className="mb-12"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, ease: "easeOut", delay: 0.3 }}
          >
            <motion.h2
              className="text-2xl md:text-4xl lg:text-5xl font-luxury-heading text-white/90 tracking-luxury leading-relaxed"
            >
              Maestros de la Excelencia Automotriz
            </motion.h2>
          </motion.div>

          <motion.div
            className="mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: "easeOut", delay: 0.6 }}
          >
            <motion.p
              className="text-lg md:text-xl lg:text-2xl font-luxury-body text-white/80 tracking-luxury-wide"
              animate={{ 
                opacity: [0.8, 1, 0.8]
              }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              Detrás de cada BMW y Mini Cooper que entregamos, hay un equipo de profesionales apasionados por la excelencia automotriz.
            </motion.p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.9 }}
          >
            <motion.button
              className="group relative px-12 py-4 border-2 border-white text-white font-luxury-button tracking-luxury-wide text-lg transition-all duration-700 ease-in-out overflow-hidden"
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 0 30px rgba(255, 255, 255, 0.3)"
              }}
              whileTap={{ scale: 0.95 }}
              animate={{
                boxShadow: [
                  "0 0 0px rgba(255, 255, 255, 0)",
                  "0 0 20px rgba(255, 255, 255, 0.2)",
                  "0 0 0px rgba(255, 255, 255, 0)"
                ]
              }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <span className="relative z-10 group-hover:text-black transition-colors duration-300">CONOCER EQUIPO</span>
              <div className="absolute inset-0 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 ease-in-out origin-left"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out"></div>
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Team Section */}
      <section id="team" className="py-20 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-7xl mx-auto px-12">
          <motion.h2
            className="text-5xl md:text-6xl font-luxury-display text-center mb-16 text-white"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            NUESTRO EQUIPO
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {experts.map((expert, index) => (
              <motion.div
                key={expert.id}
                className="group relative bg-gradient-to-br from-gray-800/50 to-black/80 backdrop-blur-sm border border-gray-700/50 rounded-3xl overflow-hidden transition-all duration-700 hover:border-white/30"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut", delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10, scale: 1.02 }}
              >
                <div className="relative h-80 w-full">
                  <img
                    src={expert.image}
                    alt={expert.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent"></div>
                  
                  {/* Luxury Badge */}
                  <div className="absolute top-4 right-4">
                    <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-3 py-1">
                      <span className="text-xs font-luxury-caption text-white/90">{expert.specialty}</span>
                    </div>
                  </div>
                  
                  <div className="absolute bottom-6 left-6 right-6">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-2 h-2 rounded-full bg-white/60"></div>
                      <span className="text-sm font-luxury-caption text-white/80">{expert.experience}</span>
                    </div>
                    <h3 className="text-2xl font-luxury-heading text-white mb-2">
                      {expert.name}
                    </h3>
                    <p className="font-luxury-body text-white/70">{expert.role}</p>
                  </div>
                </div>
                
                <div className="p-8">
                  <div className="mb-6">
                    <svg className="w-8 h-8 text-white/40 mb-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M13 14.725c0-5.141 3.892-10.519 10-11.725l.984 2.126c-2.215.835-4.163 3.154-4.163 5.874 0 5.993-3.997 10.38-9.821 11.925l-.984-2.126c5.386-1.618 8.821-6.542 8.821-9.948zm-13 0c0-5.141 3.892-10.519 10-11.725l.984 2.126c-2.215.835-4.163 3.154-4.163 5.874 0 5.993-3.997 10.38-9.821 11.925l-.984-2.126c5.386-1.618 8.821-6.542 8.821-9.948z"/>
                    </svg>
                    <blockquote className="text-white/80 font-luxury-body italic leading-relaxed">
                      "{expert.quote}"
                    </blockquote>
                  </div>
                </div>

                {/* Luxury Hover Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-r from-gray-900 to-black">
        <div className="max-w-6xl mx-auto px-12">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-luxury-display text-white mb-4">
              NÚMEROS QUE HABLAN
            </h2>
            <p className="text-xl font-luxury-body text-white/70">
              La excelencia se mide en resultados
            </p>
          </motion.div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="text-center group"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, ease: "easeOut", delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="bg-gradient-to-br from-gray-800/50 to-black/80 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-8 group-hover:border-white/30 transition-all duration-500">
                  <div className="text-4xl mb-4">{stat.icon}</div>
                  <motion.div
                    className="text-4xl md:text-6xl font-luxury-display text-white mb-2"
                    animate={{ 
                      scale: [1, 1.05, 1]
                    }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: index * 0.2 }}
                  >
                    {stat.number}
                  </motion.div>
                  <p className="text-white/70 font-luxury-caption tracking-luxury">
                    {stat.label}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-b from-black to-gray-900">
        <motion.div
          className="max-w-4xl mx-auto text-center px-12"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <h2 className="text-5xl md:text-6xl font-luxury-display text-white mb-6">
            ¿LISTO PARA LA EXCELENCIA?
          </h2>
          <p className="text-xl font-luxury-body text-white/70 mb-12 max-w-2xl mx-auto">
            Nuestro equipo de expertos está preparado para ayudarte a encontrar el BMW o Mini Cooper perfecto para ti.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <motion.a
              href="https://wa.me/573195792747"
              className="group relative px-8 py-4 font-luxury-button tracking-luxury-wide transition-all duration-300 overflow-hidden bg-white text-black hover:bg-gray-100"
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 0 30px rgba(255, 255, 255, 0.3)"
              }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10 group-hover:text-white transition-colors duration-300">CONTACTAR AHORA</span>
              <div className="absolute inset-0 bg-black transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-in-out origin-left"></div>
            </motion.a>
            
            <motion.a
              href="/stock"
              className="group relative px-8 py-4 border-2 border-white font-luxury-button tracking-luxury-wide transition-all duration-300 overflow-hidden text-white hover:bg-white hover:text-black"
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 0 30px rgba(255, 255, 255, 0.3)"
              }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10 group-hover:text-black transition-colors duration-300">VER INVENTARIO</span>
              <div className="absolute inset-0 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-in-out origin-left"></div>
            </motion.a>
          </div>
        </motion.div>
      </section>
      
      {/* Footer */}
      <Footer />
    </div>
  )
}