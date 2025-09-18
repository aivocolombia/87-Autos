"use client"

import { motion } from "framer-motion"
import { Instagram, Facebook, MapPin, Mail, Phone } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="container mx-auto px-6 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="lg:col-span-2"
          >
            <div className="flex items-center space-x-3 mb-4">
              <img
                src="https://87autos.com/cdn/shop/files/logos-04_224ff7b9-c066-40d8-a14b-4ffa0f0a2efa.png?v=1727127568&width=200"
                alt="87 Autos Logo"
                className="h-8 w-auto"
              />
              <div className="text-black font-bold text-xl tracking-wider">87 AUTOS</div>
            </div>
            <p className="text-black leading-relaxed mb-6 max-w-md text-sm">
              Concesionario premium especializado en BMW y Mini Cooper. Vehículos de calidad, financiamiento y garantía extendida.
            </p>

            {/* Social Links */}
            <div className="flex space-x-4">
              <a
                href="https://instagram.com/87autos"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 border border-black hover:bg-black text-black hover:text-white rounded-full flex items-center justify-center transition-colors duration-300"
                aria-label="Síguenos en Instagram"
              >
                <Instagram size={18} />
              </a>
              <a
                href="https://facebook.com/87autos"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 border border-black hover:bg-black text-black hover:text-white rounded-full flex items-center justify-center transition-colors duration-300"
                aria-label="Síguenos en Facebook"
              >
                <Facebook size={18} />
              </a>
              <a
                href="https://wa.me/573195792747"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 border border-black hover:bg-black text-black hover:text-white rounded-full flex items-center justify-center transition-colors duration-300"
                aria-label="Contáctanos por WhatsApp"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.893 3.386" />
                </svg>
              </a>
            </div>
          </motion.div>

          {/* Navigation Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h4 className="text-lg font-bold text-black mb-4 tracking-wide">NAVEGACIÓN</h4>
            <ul className="space-y-3">
              <li>
                <a href="/" className="text-black hover:text-gray-600 transition-colors duration-300 font-medium text-sm">
                  Inicio
                </a>
              </li>
              <li>
                <a href="/stock" className="text-black hover:text-gray-600 transition-colors duration-300 font-medium text-sm">
                  Vehículos
                </a>
              </li>
              <li>
                <a href="/#testimonials" className="text-black hover:text-gray-600 transition-colors duration-300 font-medium text-sm">
                  Testimonios
                </a>
              </li>
              <li>
                <a href="/#contact" className="text-black hover:text-gray-600 transition-colors duration-300 font-medium text-sm">
                  Contacto
                </a>
              </li>
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h4 className="text-lg font-bold text-black mb-4 tracking-wide">CONTACTO</h4>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin size={16} className="text-black mt-0.5 flex-shrink-0" />
                <span className="text-black font-medium text-sm">Bogotá, Colombia</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail size={16} className="text-black flex-shrink-0" />
                <a
                  href="mailto:info@87autos.com"
                  className="text-black hover:text-gray-600 transition-colors duration-300 font-medium text-sm"
                >
                  info@87autos.com
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Phone size={16} className="text-black flex-shrink-0" />
                <a
                  href="tel:+573195792747"
                  className="text-black hover:text-gray-600 transition-colors duration-300 font-medium text-sm"
                >
                  +57 319 579 2747
                </a>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="border-t border-gray-200 pt-6 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0"
        >
          <p className="text-black font-medium text-sm">© {new Date().getFullYear()} 87 Autos. Todos los derechos reservados.</p>

          <div className="flex space-x-6">
            <a href="/privacy" className="text-black hover:text-gray-600 transition-colors duration-300 font-medium text-sm">
              Política de Privacidad
            </a>
            <a href="/terms" className="text-black hover:text-gray-600 transition-colors duration-300 font-medium text-sm">
              Términos de Servicio
            </a>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}
