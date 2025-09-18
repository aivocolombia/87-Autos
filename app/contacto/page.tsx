"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { MapPin, Phone, Mail, Send, Clock, CheckCircle, Car, Users, Award, Star } from "lucide-react"
import Navbar from "../../components/navbar"

export default function ContactoPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    vehicleInterest: "",
    budget: ""
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [focusedField, setFocusedField] = useState<string | null>(null)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000))

    setIsSubmitting(false)
    setIsSubmitted(true)

    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false)
      setFormData({
        name: "",
        email: "",
        phone: "",
        message: "",
        vehicleInterest: "",
        budget: ""
      })
    }, 3000)
  }

  const contactInfo = [
    {
      icon: MapPin,
      title: "Ubicación",
      content: "Bogotá, Colombia",
      detail: "Calle 123 #45-67",
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: Phone,
      title: "Teléfono",
      content: "+57 319 579 2747",
      detail: "Lun - Vie: 8:00 AM - 6:00 PM",
      color: "from-green-500 to-green-600"
    },
    {
      icon: Mail,
      title: "Correo",
      content: "info@87autos.com",
      detail: "Respuesta en 24 horas",
      color: "from-purple-500 to-purple-600"
    },
    {
      icon: Clock,
      title: "Horarios",
      content: "Lun - Sáb",
      detail: "8:00 AM - 6:00 PM",
      color: "from-orange-500 to-orange-600"
    }
  ]

  const stats = [
    {
      icon: Car,
      number: "5000+",
      label: "Vehículos Entregados",
      color: "text-blue-600"
    },
    {
      icon: Users,
      number: "98%",
      label: "Clientes Satisfechos",
      color: "text-green-600"
    },
    {
      icon: Award,
      number: "15+",
      label: "Años de Experiencia",
      color: "text-purple-600"
    },
    {
      icon: Star,
      number: "4.9/5",
      label: "Calificación Promedio",
      color: "text-orange-600"
    }
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-20 pb-16 bg-gradient-to-br from-gray-50 to-white overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-grid-subtle opacity-20" />

        {/* Floating Elements */}
        <div className="absolute top-20 right-10 w-32 h-32 bg-blue-100 rounded-full opacity-20 animate-float" />
        <div className="absolute bottom-32 left-16 w-24 h-24 bg-blue-200 rounded-full opacity-30 animate-float" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 right-20 w-20 h-20 bg-blue-300 rounded-full opacity-25 animate-float" style={{ animationDelay: '4s' }} />

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 pt-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black tracking-wider text-gray-900 mb-6">
              HABLEMOS DE TU
              <span className="block text-blue-600">SIGUIENTE AUTO</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed mb-12">
              Estamos aquí para hacer realidad tu sueño de conducir un BMW o Mini Cooper.
              Nuestro equipo de expertos te guiará en cada paso del proceso.
            </p>

            {/* Quick Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto"
            >
              {stats.map((stat, index) => (
                <div key={stat.label} className="text-center">
                  <div className="flex justify-center mb-3">
                    <stat.icon className={`w-8 h-8 ${stat.color}`} />
                  </div>
                  <div className={`text-3xl md:text-4xl font-bold ${stat.color} mb-2`}>
                    {stat.number}
                  </div>
                  <div className="text-sm text-gray-600 font-medium">
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  Envíanos un Mensaje
                </h2>
                <p className="text-lg text-gray-600 leading-relaxed">
                  Completa el formulario y nuestro equipo de expertos te contactará
                  para ayudarte a encontrar el vehículo perfecto para ti.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="relative">
                    <label
                      htmlFor="name"
                      className={`absolute left-4 transition-all duration-300 pointer-events-none ${
                        focusedField === 'name' || formData.name
                          ? 'top-2 text-xs text-blue-600 font-medium'
                          : 'top-4 text-gray-500'
                      }`}
                    >
                      Nombre Completo *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      onFocus={() => setFocusedField('name')}
                      onBlur={() => setFocusedField(null)}
                      className="w-full pt-6 pb-3 px-4 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors duration-300 bg-transparent"
                      required
                    />
                  </div>

                  <div className="relative">
                    <label
                      htmlFor="email"
                      className={`absolute left-4 transition-all duration-300 pointer-events-none ${
                        focusedField === 'email' || formData.email
                          ? 'top-2 text-xs text-blue-600 font-medium'
                          : 'top-4 text-gray-500'
                      }`}
                    >
                      Correo Electrónico *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      onFocus={() => setFocusedField('email')}
                      onBlur={() => setFocusedField(null)}
                      className="w-full pt-6 pb-3 px-4 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors duration-300 bg-transparent"
                      required
                    />
                  </div>
                </div>

                <div className="relative">
                  <label
                    htmlFor="phone"
                    className={`absolute left-4 transition-all duration-300 pointer-events-none ${
                      focusedField === 'phone' || formData.phone
                        ? 'top-2 text-xs text-blue-600 font-medium'
                        : 'top-4 text-gray-500'
                    }`}
                  >
                    Teléfono
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    onFocus={() => setFocusedField('phone')}
                    onBlur={() => setFocusedField(null)}
                    className="w-full pt-6 pb-3 px-4 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors duration-300 bg-transparent"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="relative">
                    <label
                      htmlFor="vehicleInterest"
                      className={`absolute left-4 transition-all duration-300 pointer-events-none ${
                        focusedField === 'vehicleInterest' || formData.vehicleInterest
                          ? 'top-2 text-xs text-blue-600 font-medium'
                          : 'top-4 text-gray-500'
                      }`}
                    >
                      Vehículo de Interés
                    </label>
                    <select
                      id="vehicleInterest"
                      name="vehicleInterest"
                      value={formData.vehicleInterest}
                      onChange={handleInputChange}
                      onFocus={() => setFocusedField('vehicleInterest')}
                      onBlur={() => setFocusedField(null)}
                      className="w-full pt-6 pb-3 px-4 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors duration-300 bg-transparent appearance-none"
                    >
                      <option value="">Seleccionar vehículo</option>
                      <option value="bmw-serie-1">BMW Serie 1</option>
                      <option value="bmw-serie-3">BMW Serie 3</option>
                      <option value="bmw-serie-5">BMW Serie 5</option>
                      <option value="bmw-x1">BMW X1</option>
                      <option value="bmw-x3">BMW X3</option>
                      <option value="mini-cooper">Mini Cooper</option>
                      <option value="otro">Otro</option>
                    </select>
                  </div>

                  <div className="relative">
                    <label
                      htmlFor="budget"
                      className={`absolute left-4 transition-all duration-300 pointer-events-none ${
                        focusedField === 'budget' || formData.budget
                          ? 'top-2 text-xs text-blue-600 font-medium'
                          : 'top-4 text-gray-500'
                      }`}
                    >
                      Rango de Presupuesto
                    </label>
                    <select
                      id="budget"
                      name="budget"
                      value={formData.budget}
                      onChange={handleInputChange}
                      onFocus={() => setFocusedField('budget')}
                      onBlur={() => setFocusedField(null)}
                      className="w-full pt-6 pb-3 px-4 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors duration-300 bg-transparent appearance-none"
                    >
                      <option value="">Seleccionar presupuesto</option>
                      <option value="50-100">50M - 100M COP</option>
                      <option value="100-150">100M - 150M COP</option>
                      <option value="150-200">150M - 200M COP</option>
                      <option value="200+">Más de 200M COP</option>
                    </select>
                  </div>
                </div>

                <div className="relative">
                  <label
                    htmlFor="message"
                    className={`absolute left-4 transition-all duration-300 pointer-events-none ${
                      focusedField === 'message' || formData.message
                        ? 'top-2 text-xs text-blue-600 font-medium'
                        : 'top-4 text-gray-500'
                    }`}
                  >
                    Mensaje *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    onFocus={() => setFocusedField('message')}
                    onBlur={() => setFocusedField(null)}
                    rows={6}
                    className="w-full pt-6 pb-3 px-4 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors duration-300 bg-transparent resize-none"
                    placeholder="Cuéntanos más sobre tus necesidades y preferencias..."
                    required
                  />
                </div>

                <motion.button
                  type="submit"
                  disabled={isSubmitting || isSubmitted}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full py-4 px-8 rounded-lg font-semibold text-white transition-all duration-300 flex items-center justify-center gap-3 ${
                    isSubmitted
                      ? 'bg-green-600 cursor-not-allowed'
                      : isSubmitting
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-blue-600 hover:bg-blue-700 shadow-lg hover:shadow-xl'
                  }`}
                >
                  {isSubmitted ? (
                    <>
                      <CheckCircle size={20} />
                      ¡Mensaje Enviado!
                    </>
                  ) : isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Enviando...
                    </>
                  ) : (
                    <>
                      <Send size={20} />
                      Enviar Mensaje
                    </>
                  )}
                </motion.button>
              </form>
            </motion.div>

            {/* Contact Info & Map */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              {/* Contact Info Cards */}
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Información de Contacto</h3>
                <div className="grid grid-cols-1 gap-6">
                  {contactInfo.map((info, index) => (
                    <motion.div
                      key={info.title}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                    >
                      <div className="flex items-start gap-4">
                        <div className={`p-3 bg-gradient-to-r ${info.color} rounded-lg`}>
                          <info.icon className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-1">{info.title}</h4>
                          <p className="text-gray-900 font-medium text-lg">{info.content}</p>
                          <p className="text-gray-500 text-sm mt-1">{info.detail}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Map Section */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100"
              >
                <div className="p-6 border-b border-gray-100">
                  <h4 className="text-xl font-bold text-gray-900 mb-2">Nuestra Ubicación</h4>
                  <p className="text-gray-600">Visítanos en nuestro showroom premium en el corazón de Bogotá.</p>
                </div>

                <div className="relative h-80 bg-gradient-to-br from-blue-50 to-blue-100">
                  {/* Placeholder Map - In a real implementation, you'd integrate Google Maps or similar */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                        <MapPin className="w-8 h-8 text-white" />
                      </div>
                      <h5 className="text-lg font-semibold text-gray-900 mb-2">87 Autos Showroom</h5>
                      <p className="text-gray-600 max-w-xs mb-4">
                        Calle 123 #45-67, Bogotá, Colombia
                      </p>
                      <a
                        href="https://wa.me/573195792747"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300 font-medium"
                      >
                        <Phone size={18} />
                        Cómo Llegar
                      </a>
                    </div>
                  </div>

                  {/* Decorative elements */}
                  <div className="absolute top-4 right-4 w-3 h-3 bg-blue-400 rounded-full animate-pulse" />
                  <div className="absolute bottom-6 left-6 w-2 h-2 bg-blue-300 rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
                  <div className="absolute top-1/2 right-8 w-2 h-2 bg-blue-500 rounded-full animate-pulse" style={{ animationDelay: '2s' }} />
                </div>
              </motion.div>

              {/* Additional Info */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                viewport={{ once: true }}
                className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-xl border border-gray-100"
              >
                <h4 className="text-lg font-bold text-gray-900 mb-3">¿Por qué elegirnos?</h4>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-center gap-2">
                    <CheckCircle size={16} className="text-green-600 flex-shrink-0" />
                    <span>Especialistas certificados BMW y Mini Cooper</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle size={16} className="text-green-600 flex-shrink-0" />
                    <span>Garantía extendida y servicio postventa</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle size={16} className="text-green-600 flex-shrink-0" />
                    <span>Financiamiento flexible y personalizado</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle size={16} className="text-green-600 flex-shrink-0" />
                    <span>Entrega inmediata de vehículos en stock</span>
                  </li>
                </ul>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto text-center px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              ¿Listo para vivir la experiencia BMW y Mini Cooper?
            </h2>
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              Nuestro equipo está preparado para hacer realidad tu sueño automotriz.
              Contáctanos hoy mismo y comienza tu viaje hacia la excelencia.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:+573195792747"
                className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300 font-semibold"
              >
                <Phone size={20} />
                Llamar Ahora
              </a>
              <a
                href="https://wa.me/573195792747"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-300 font-semibold"
              >
                <Send size={20} />
                WhatsApp
              </a>
            </div>
          </motion.div>
        </div>
      </section>


      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .bg-grid-subtle {
          background-image: radial-gradient(circle, #e5e7eb 1px, transparent 1px);
          background-size: 20px 20px;
        }
      `}</style>
    </div>
  )
}