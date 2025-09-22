"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Navbar from "../../components/navbar"
import Footer from "../../components/footer"

export default function NosotrosPage() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true)
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  const values = [
    {
      icon: "🏆",
      title: "Pasión por la Excelencia",
      description: "La excelencia es nuestro sello, y la demostramos a través de la alta calidad, atención personalizada y seguridad que ofrecemos a nuestros clientes desde el momento en que deciden vivir una experiencia en movimiento."
    },
    {
      icon: "🤝",
      title: "Compromiso con Nuestros Clientes",
      description: "No solo vendemos autos, construimos relaciones. Nos aseguramos de que cada cliente se sienta valorado y satisfecho en cada paso de su compra."
    },
    {
      icon: "♾️",
      title: "El Significado de 8/7",
      description: "El ocho (8) es la representación numérica del infinito; el siete (7), significa la creación perfecta y la línea que está en medio, representa la velocidad de los vehículos."
    },
    {
      icon: "🚗",
      title: "Experiencia en Movimiento",
      description: "Los carros transmiten historias, sueños y metas, nosotros somos la mano que te ayuda a avanzar hacia ellas. Somos tu familia y haremos que tus sueños se hagan realidad."
    }
  ]

  const timeline = [
    {
      year: "2020",
      title: "Nacimiento de OCHO/SIETE",
      description: "OCHO/SIETE nace gracias a la pasión por los carros y en especial a las marcas BMW y MINI COOPER, somos una empresa con 4 años de experiencia en el mercado que comercializa vehículos usados de alta gama brindando la mejor experiencia a nuestros clientes al momento de vender o comprar su próximo carro."
    }
  ]

  const stats = [
    { number: "4", label: "Años de Experiencia", description: "En el mercado comercializando vehículos usados de alta gama" },
    { number: "∞", label: "Pasión Infinita", description: "Por los carros BMW y MINI COOPER" },
    { number: "100%", label: "Compromiso", description: "Con la mejor experiencia para nuestros clientes" },
    { number: "8/7", label: "Nuestro Nombre", description: "El 8 es infinito, el 7 es creación perfecta, la línea es velocidad" }
  ]

  if (!isLoaded) {
    return (
      <div className="fixed inset-0 bg-white flex items-center justify-center z-[9999]">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto px-12">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h1
              className="text-section-title text-gray-900 mb-8"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              NOSOTROS
            </motion.h1>
            <motion.p
              className="text-section-description text-gray-700 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            >
              OCHO/SIETE nace gracias a la pasión por los carros y en especial a las marcas BMW y MINI COOPER, somos una empresa con 4 años de experiencia en el mercado que comercializa vehículos usados de alta gama.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Mission Statement Section */}
      <section id="mission" className="relative py-20 bg-white">
        <div className="container mx-auto px-12">
          <div className="max-w-5xl mx-auto">
            {/* Main Title */}
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              viewport={{ once: true }}
            >
              <h2 className="text-section-title text-gray-900 mb-8">
                NUESTRA MISIÓN
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-transparent via-gray-400 to-transparent mx-auto"></div>
            </motion.div>

            {/* Mission Content */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Left Side - Mission Statement */}
              <motion.div
                className="space-y-8"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                viewport={{ once: true }}
              >
                <div className="bg-gray-50 border border-gray-200 rounded-2xl p-8">
                  <h3 className="text-2xl font-luxury-heading text-gray-900 mb-4">
                    Pasión por la Excelencia
                  </h3>
                  <p className="text-lg font-luxury-body text-gray-700 leading-relaxed">
                    La excelencia es nuestro sello, y la demostramos a través de la alta calidad, atención personalizada y seguridad que ofrecemos a nuestros clientes desde el momento en que deciden vivir una experiencia en movimiento.
                  </p>
                </div>

                <div className="bg-gray-50 border border-gray-200 rounded-2xl p-8">
                  <h3 className="text-2xl font-luxury-heading text-gray-900 mb-4">
                    Compromiso con Nuestros Clientes
                  </h3>
                  <p className="text-lg font-luxury-body text-gray-700 leading-relaxed">
                    No solo vendemos autos, construimos relaciones. Nos aseguramos de que cada cliente se sienta valorado y satisfecho en cada paso de su compra.
                  </p>
                </div>
              </motion.div>

              {/* Right Side - Visual Elements */}
              <motion.div
                className="relative"
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
                viewport={{ once: true }}
              >
                {/* Main Card */}
                <div className="bg-gradient-to-br from-gray-100 to-gray-50 border border-gray-200 rounded-2xl p-8 shadow-lg">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
                      <svg className="w-8 h-8 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <h4 className="text-2xl font-luxury-heading text-gray-900 mb-4">
                      El Significado de 8/7
                    </h4>
                    <p className="text-gray-600 font-luxury-body">
                      El ocho (8) es la representación numérica del infinito; el siete (7), significa la creación perfecta y la línea que está en medio, representa la velocidad de los vehículos.
                    </p>
                  </div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-2 gap-4 mt-8">
                  <div className="bg-white border border-gray-200 rounded-xl p-4 text-center">
                    <div className="text-2xl font-luxury-display text-gray-900">4</div>
                    <div className="text-sm font-luxury-caption text-gray-600">Años</div>
                  </div>
                  <div className="bg-white border border-gray-200 rounded-xl p-4 text-center">
                    <div className="text-2xl font-luxury-display text-gray-900">∞</div>
                    <div className="text-sm font-luxury-caption text-gray-600">Pasión</div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Bottom CTA */}
            <motion.div
              className="text-center mt-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.6 }}
              viewport={{ once: true }}
            >
              <motion.button
                className="group relative px-8 py-3 border-2 border-gray-900 text-gray-900 font-luxury-button tracking-luxury-wide transition-all duration-300 ease-in-out overflow-hidden hover:bg-gray-900 hover:text-white"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="relative z-10">DESCUBRIR MÁS</span>
              </motion.button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-12">
          <div className="max-w-6xl mx-auto">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              viewport={{ once: true }}
            >
              <h2 className="text-section-title text-gray-900 mb-8">
                NUESTROS VALORES
              </h2>
              <p className="text-section-description text-gray-700 max-w-3xl mx-auto">
                Los principios que guían cada decisión y cada interacción con nuestros clientes
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <motion.div
                  key={index}
                  className="bg-white border border-gray-200 rounded-2xl p-8 text-center hover:shadow-lg transition-all duration-300"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, ease: "easeOut", delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5 }}
                >
                  <div className="text-4xl mb-4">{value.icon}</div>
                  <h3 className="text-card-title text-gray-900 mb-4">{value.title}</h3>
                  <p className="text-gray-600 text-card-description leading-relaxed">{value.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* History Timeline */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-12">
          <div className="max-w-4xl mx-auto">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              viewport={{ once: true }}
            >
              <h2 className="text-section-title text-gray-900 mb-8">
                NUESTRA HISTORIA
              </h2>
              <p className="text-xl font-luxury-body text-gray-700">
                OCHO/SIETE nace gracias a la pasión por los carros BMW y MINI COOPER
              </p>
            </motion.div>

            <div className="space-y-8">
              {timeline.map((item, index) => (
                <motion.div
                  key={index}
                  className="flex items-start space-x-8"
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, ease: "easeOut", delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 bg-gray-900 text-white rounded-full flex items-center justify-center font-luxury-display text-lg">
                      {item.year}
                    </div>
                  </div>
                  <div className="flex-1 bg-gray-50 border border-gray-200 rounded-2xl p-6">
                    <h3 className="text-card-title text-gray-900 mb-3">{item.title}</h3>
                    <p className="text-gray-700 text-card-description leading-relaxed">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-12">
          <div className="max-w-6xl mx-auto">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              viewport={{ once: true }}
            >
              <h2 className="text-section-title text-gray-900 mb-8">
                NUESTRO EQUIPO
              </h2>
              <p className="text-section-description text-gray-700 max-w-3xl mx-auto">
                Los carros transmiten historias, sueños y metas, nosotros somos la mano que te ayuda a avanzar hacia ellas. Somos tu familia y haremos que tus sueños se hagan realidad con la mejor experiencia.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Leadership Team */}
              <motion.div
                className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <div className="relative h-64 w-full">
                  <img
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face"
                    alt="Jorge Rodríguez"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                </div>
                <div className="p-6 text-center">
                  <h3 className="text-xl font-luxury-heading text-gray-900 mb-2">JORGE RODRÍGUEZ</h3>
                  <p className="text-gray-600 font-luxury-caption mb-4">FOUNDER & CEO</p>
                  <div className="w-12 h-0.5 bg-gray-300 mx-auto"></div>
                </div>
              </motion.div>

              <motion.div
                className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <div className="relative h-64 w-full">
                  <img
                    src="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face"
                    alt="Alejandra Zorro"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                </div>
                <div className="p-6 text-center">
                  <h3 className="text-xl font-luxury-heading text-gray-900 mb-2">ALEJANDRA ZORRO</h3>
                  <p className="text-gray-600 font-luxury-caption mb-4">GERENTE FINANCIERA Y CONTABLE</p>
                  <div className="w-12 h-0.5 bg-gray-300 mx-auto"></div>
                </div>
              </motion.div>

              <motion.div
                className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <div className="relative h-64 w-full">
                  <img
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face"
                    alt="Juan Manuel Rodríguez"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                </div>
                <div className="p-6 text-center">
                  <h3 className="text-xl font-luxury-heading text-gray-900 mb-2">JUAN MANUEL RODRÍGUEZ</h3>
                  <p className="text-gray-600 font-luxury-caption mb-4">GERENTE COMERCIAL</p>
                  <div className="w-12 h-0.5 bg-gray-300 mx-auto"></div>
                </div>
              </motion.div>

              <motion.div
                className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <div className="relative h-64 w-full">
                  <img
                    src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face"
                    alt="Juan Ortega"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                </div>
                <div className="p-6 text-center">
                  <h3 className="text-xl font-luxury-heading text-gray-900 mb-2">JUAN ORTEGA</h3>
                  <p className="text-gray-600 font-luxury-caption mb-4">DIRECTOR COMERCIAL MOTOS</p>
                  <div className="w-12 h-0.5 bg-gray-300 mx-auto"></div>
                </div>
              </motion.div>

              <motion.div
                className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <div className="relative h-64 w-full">
                  <img
                    src="https://images.unsplash.com/photo-1560250097-0b93528c3111?w=400&h=400&fit=crop&crop=face"
                    alt="Martín Santamaría"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                </div>
                <div className="p-6 text-center">
                  <h3 className="text-xl font-luxury-heading text-gray-900 mb-2">MARTÍN SANTAMARÍA</h3>
                  <p className="text-gray-600 font-luxury-caption mb-4">ASESOR COMERCIAL</p>
                  <div className="w-12 h-0.5 bg-gray-300 mx-auto"></div>
                </div>
              </motion.div>

              <motion.div
                className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.5 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <div className="relative h-64 w-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl font-luxury-display text-gray-600">+</span>
                    </div>
                    <h4 className="text-lg font-luxury-heading text-gray-700">MÁS PROFESIONALES</h4>
                    <p className="text-sm text-gray-500">ASESORES COMERCIALES ESPECIALIZADOS</p>
                  </div>
                </div>
                <div className="p-6 text-center">
                  <h3 className="text-xl font-luxury-heading text-gray-900 mb-2">EQUIPO COMPLETO</h3>
                  <p className="text-gray-600 font-luxury-caption mb-4">ASESORES COMERCIALES ESPECIALIZADOS</p>
                  <div className="w-12 h-0.5 bg-gray-300 mx-auto"></div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gray-900">
        <div className="container mx-auto px-12">
          <div className="max-w-6xl mx-auto">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-luxury-display tracking-luxury-tight text-white mb-8">
                NÚMEROS QUE HABLAN
              </h2>
              <p className="text-xl font-luxury-body text-gray-300">
                La excelencia se mide en resultados y satisfacción del cliente
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  className="text-center"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, ease: "easeOut", delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8">
                    <div className="text-4xl md:text-5xl font-luxury-display text-white mb-2">{stat.number}</div>
                    <div className="text-lg font-luxury-heading text-white mb-2">{stat.label}</div>
                    <div className="text-sm font-luxury-body text-gray-300">{stat.description}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-12">
          <motion.div
            className="max-w-4xl mx-auto text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-luxury-display tracking-luxury-tight text-gray-900 mb-8">
              ¿LISTO PARA CONOCERNOS MEJOR?
            </h2>
            <p className="text-xl font-luxury-body text-gray-700 mb-12 max-w-2xl mx-auto">
              Visita nuestro showroom y descubre por qué somos el destino premium para BMW y Mini Cooper en Colombia.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <motion.a
                href="https://wa.me/573195792747"
                className="group relative px-8 py-4 bg-gray-900 text-white font-luxury-button tracking-luxury-wide transition-all duration-300 ease-in-out overflow-hidden hover:bg-gray-800"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="relative z-10">CONTACTAR AHORA</span>
              </motion.a>
              
              <motion.a
                href="/stock"
                className="group relative px-8 py-4 border-2 border-gray-900 text-gray-900 font-luxury-button tracking-luxury-wide transition-all duration-300 ease-in-out overflow-hidden hover:bg-gray-900 hover:text-white"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="relative z-10">VER INVENTARIO</span>
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* Footer */}
      <Footer />
    </div>
  )
}
