"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useParams } from "next/navigation"
import Navbar from "../../../components/navbar"
import { ChevronLeft, ChevronRight, Star, Calendar, Fuel, Gauge, Car, Shield, Wifi, Music, Camera, Navigation } from "lucide-react"

interface Vehicle {
  id: number
  brand: string
  model: string
  year: number
  price: number
  mileage: number
  images: string[]
  fuel: string
  transmission: string
  condition: string
  features: string[]
  specifications: {
    engine: string
    power: string
    acceleration: string
    traction: string
    plate: string
    registration: string
  }
  equipment: string[]
}

const vehicles: Vehicle[] = [
  {
    id: 1,
    brand: "BMW",
    model: "Serie 3",
    year: 2023,
    price: 185000000,
    mileage: 15000,
    images: ["/bmw-serie-3-azul.png", "/bmw-3-series-luxury-dashboard.png", "/blue-bmw-3-series-sedan.png", "/placeholder-user.jpg", "/placeholder-1e0uo.png", "/placeholder-4ej48.png"],
    fuel: "Gasolina",
    transmission: "Automática",
    condition: "Excelente",
    features: ["Navegación GPS", "Asientos de cuero", "Sistema de sonido premium", "Cámara de reversa"],
    specifications: {
      engine: "2.0LT, 4 cilindros TwinPower Turbo",
      power: "252 HP / 350 NM",
      acceleration: "6.2s (0-100 km/h)",
      traction: "Total (xDrive)",
      plate: "3",
      registration: "Bogotá"
    },
    equipment: [
      "Volante multifuncional",
      "Asientos en cuero",
      "Frenos ABS",
      "DSC, DTC",
      "Asistente de manejo",
      "Iluminación LED",
      "Techo panorámico eléctrico",
      "Apple CarPlay & Android Auto"
    ]
  },
  {
    id: 2,
    brand: "BMW",
    model: "X3",
    year: 2022,
    price: 220000000,
    mileage: 25000,
    images: ["/bmw-x3-gris.png", "/placeholder-user.jpg", "/placeholder-1e0uo.png", "/placeholder-4ej48.png", "/placeholder-5e0mw.png", "/placeholder-b0kg7.png"],
    fuel: "Diésel",
    transmission: "Automática",
    condition: "Muy Bueno",
    features: ["Tracción integral", "Techo solar", "Sistema de asistencia al conductor", "Carga inalámbrica"],
    specifications: {
      engine: "2.0LT, 4 cilindros TwinPower Turbo",
      power: "252 HP / 350 NM",
      acceleration: "6.0s (0-100 km/h)",
      traction: "Total (xDrive)",
      plate: "3",
      registration: "Bogotá"
    },
    equipment: [
      "Volante multifuncional",
      "Asientos en cuero",
      "Frenos ABS",
      "DSC, DTC",
      "Asistente de manejo",
      "Iluminación LED",
      "Techo panorámico eléctrico",
      "Apple CarPlay & Android Auto"
    ]
  },
  {
    id: 3,
    brand: "BMW",
    model: "Serie 5",
    year: 2024,
    price: 280000000,
    mileage: 5000,
    images: ["/bmw-serie-5-gris.png", "/bmw-3-series-luxury-dashboard.png", "/placeholder-user.jpg", "/placeholder-1e0uo.png", "/placeholder-4ej48.png", "/placeholder-5e0mw.png"],
    fuel: "Gasolina",
    transmission: "Automática",
    condition: "Nuevo",
    features: ["Pantalla táctil 12.3\"", "Asientos con masaje", "Sistema de sonido Harman Kardon", "Faros LED adaptativos"],
    specifications: {
      engine: "3.0LT, 6 cilindros TwinPower Turbo",
      power: "340 HP / 450 NM",
      acceleration: "5.4s (0-100 km/h)",
      traction: "Total (xDrive)",
      plate: "5",
      registration: "Bogotá"
    },
    equipment: [
      "Volante multifuncional",
      "Asientos en cuero",
      "Frenos ABS",
      "DSC, DTC",
      "Asistente de manejo",
      "Iluminación LED",
      "Techo panorámico eléctrico",
      "Apple CarPlay & Android Auto"
    ]
  },
  {
    id: 4,
    brand: "Mini Cooper",
    model: "S",
    year: 2023,
    price: 95000000,
    mileage: 12000,
    images: ["/mini-cooper-s-rojo.png", "/placeholder-user.jpg", "/placeholder-1e0uo.png", "/placeholder-4ej48.png", "/placeholder-5e0mw.png", "/placeholder-b0kg7.png"],
    fuel: "Gasolina",
    transmission: "Manual",
    condition: "Excelente",
    features: ["Modo deportivo", "Sistema de navegación", "Asientos deportivos", "Llantas de aleación"],
    specifications: {
      engine: "2.0LT, 4 cilindros TwinPower Turbo",
      power: "192 HP / 280 NM",
      acceleration: "6.8s (0-100 km/h)",
      traction: "Delantera",
      plate: "S",
      registration: "Bogotá"
    },
    equipment: [
      "Volante multifuncional",
      "Asientos deportivos",
      "Frenos ABS",
      "DSC, DTC",
      "Asistente de manejo",
      "Iluminación LED",
      "Techo descapotable",
      "Apple CarPlay & Android Auto"
    ]
  },
  {
    id: 5,
    brand: "BMW",
    model: "Serie 1",
    year: 2022,
    price: 145000000,
    mileage: 30000,
    images: ["/bmw-serie-1-azul-lateral.png", "/bmw-3-series-luxury-dashboard.png", "/placeholder-user.jpg", "/placeholder-1e0uo.png", "/placeholder-4ej48.png", "/placeholder-5e0mw.png"],
    fuel: "Gasolina",
    transmission: "Automática",
    condition: "Bueno",
    features: ["Sistema iDrive", "Bluetooth", "Control de crucero", "Aire acondicionado automático"],
    specifications: {
      engine: "1.5LT, 3 cilindros TwinPower Turbo",
      power: "140 HP / 220 NM",
      acceleration: "8.2s (0-100 km/h)",
      traction: "Delantera",
      plate: "1",
      registration: "Bogotá"
    },
    equipment: [
      "Volante multifuncional",
      "Asientos en cuero",
      "Frenos ABS",
      "DSC, DTC",
      "Asistente de manejo",
      "Iluminación LED",
      "Techo panorámico eléctrico",
      "Apple CarPlay & Android Auto"
    ]
  },
  {
    id: 6,
    brand: "BMW",
    model: "X1",
    year: 2023,
    price: 195000000,
    mileage: 18000,
    images: ["/bmw-x1-blanco.png", "/placeholder-user.jpg", "/placeholder-1e0uo.png", "/placeholder-4ej48.png", "/placeholder-5e0mw.png", "/placeholder-b0kg7.png"],
    fuel: "Híbrido",
    transmission: "Automática",
    condition: "Excelente",
    features: ["Motor híbrido", "Modo eléctrico", "Carga rápida", "Sistema de navegación"],
    specifications: {
      engine: "1.5LT + Motor eléctrico",
      power: "170 HP / 250 NM",
      acceleration: "7.4s (0-100 km/h)",
      traction: "Total (xDrive)",
      plate: "X1",
      registration: "Bogotá"
    },
    equipment: [
      "Volante multifuncional",
      "Asientos en cuero",
      "Frenos ABS",
      "DSC, DTC",
      "Asistente de manejo",
      "Iluminación LED",
      "Techo panorámico eléctrico",
      "Apple CarPlay & Android Auto"
    ]
  },
  {
    id: 7,
    brand: "BMW",
    model: "Serie 7",
    year: 2024,
    price: 450000000,
    mileage: 8000,
    images: ["/bmw-serie-7-negro-lujo.png", "/bmw-3-series-luxury-dashboard.png", "/placeholder-user.jpg", "/placeholder-1e0uo.png", "/placeholder-4ej48.png", "/placeholder-5e0mw.png"],
    fuel: "Gasolina",
    transmission: "Automática",
    condition: "Nuevo",
    features: ["Asientos traseros ejecutivos", "Sistema de entretenimiento", "Masaje en asientos", "Pantallas individuales"],
    specifications: {
      engine: "4.4LT, 8 cilindros TwinPower Turbo",
      power: "530 HP / 750 NM",
      acceleration: "4.3s (0-100 km/h)",
      traction: "Total (xDrive)",
      plate: "7",
      registration: "Bogotá"
    },
    equipment: [
      "Volante multifuncional",
      "Asientos ejecutivos",
      "Frenos ABS",
      "DSC, DTC",
      "Asistente de manejo",
      "Iluminación LED",
      "Techo panorámico eléctrico",
      "Apple CarPlay & Android Auto"
    ]
  },
  {
    id: 8,
    brand: "BMW",
    model: "Serie 4",
    year: 2023,
    price: 210000000,
    mileage: 22000,
    images: ["/bmw-serie-4-coupe-negro.png", "/placeholder-user.jpg", "/placeholder-1e0uo.png", "/placeholder-4ej48.png", "/placeholder-5e0mw.png", "/placeholder-b0kg7.png"],
    fuel: "Gasolina",
    transmission: "Automática",
    condition: "Muy Bueno",
    features: ["Techo descapotable", "Sistema de sonido premium", "Asientos deportivos", "Llantas de 19 pulgadas"],
    specifications: {
      engine: "2.0LT, 4 cilindros TwinPower Turbo",
      power: "258 HP / 400 NM",
      acceleration: "5.8s (0-100 km/h)",
      traction: "Total (xDrive)",
      plate: "4",
      registration: "Bogotá"
    },
    equipment: [
      "Volante multifuncional",
      "Asientos deportivos",
      "Frenos ABS",
      "DSC, DTC",
      "Asistente de manejo",
      "Iluminación LED",
      "Techo descapotable",
      "Apple CarPlay & Android Auto"
    ]
  }
]

export default function VehicleDetailPage() {
  const params = useParams()
  const [vehicle, setVehicle] = useState<Vehicle | null>(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const vehicleId = parseInt(params.id as string)
    const foundVehicle = vehicles.find(v => v.id === vehicleId)
    setVehicle(foundVehicle || null)
    setIsLoading(false)
  }, [params.id])

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0
    }).format(price)
  }

  const formatMileage = (mileage: number) => {
    return new Intl.NumberFormat('es-CO').format(mileage) + ' km'
  }

  const nextImage = () => {
    if (vehicle) {
      setCurrentImageIndex((prev) => (prev + 1) % vehicle.images.length)
    }
  }

  const prevImage = () => {
    if (vehicle) {
      setCurrentImageIndex((prev) => (prev - 1 + vehicle.images.length) % vehicle.images.length)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    )
  }

  if (!vehicle) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <h1 className="text-4xl font-luxury-display text-gray-900 mb-4">Vehículo no encontrado</h1>
            <p className="text-gray-600 font-luxury-body">El vehículo que buscas no está disponible</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative py-12 bg-gradient-to-br from-gray-900 via-black to-gray-800">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[60vh]">
            {/* Image Gallery - Left Side */}
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {/* Main Image */}
              <div className="relative aspect-[4/3] overflow-hidden rounded-3xl bg-gray-100">
                <motion.img
                  key={currentImageIndex}
                  src={vehicle.images[currentImageIndex]}
                  alt={`${vehicle.brand} ${vehicle.model}`}
                  className="w-full h-full object-cover"
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                />
                
                {/* Navigation Arrows */}
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-900 hover:bg-white transition-all duration-300"
                >
                  <ChevronLeft size={24} />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-900 hover:bg-white transition-all duration-300"
                >
                  <ChevronRight size={24} />
                </button>

                {/* Image Counter */}
                <div className="absolute bottom-4 right-4 bg-black/50 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-luxury-caption">
                  {currentImageIndex + 1} / {vehicle.images.length}
                </div>
              </div>

              {/* Thumbnail Gallery */}
              <div className="grid grid-cols-4 gap-4">
                {vehicle.images.map((image, index) => (
                  <motion.button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`aspect-square overflow-hidden rounded-2xl transition-all duration-300 ${
                      index === currentImageIndex 
                        ? 'ring-4 ring-white scale-105' 
                        : 'hover:scale-105'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <img
                      src={image}
                      alt={`${vehicle.brand} ${vehicle.model} - Imagen ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </motion.button>
                ))}
              </div>
            </motion.div>

            {/* Vehicle Title and Info - Right Side */}
            <motion.div
              className="text-center lg:text-left space-y-8"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <div>
                <motion.h1
                  className="text-4xl md:text-6xl lg:text-7xl font-luxury-display tracking-luxury-tight text-white mb-6"
                  style={{ 
                    textShadow: "0 0 40px rgba(255, 255, 255, 0.3), 0 0 80px rgba(255, 255, 255, 0.1)"
                  }}
                >
                  {vehicle.brand} {vehicle.model}
                </motion.h1>
                
                <motion.div
                  className="w-24 h-1 bg-gradient-to-r from-transparent via-white to-transparent mb-6"
                  initial={{ width: 0 }}
                  animate={{ width: "6rem" }}
                  transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 }}
                />
                
                <motion.p
                  className="text-xl md:text-2xl font-luxury-body text-white/80 leading-relaxed"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
                >
                  MODELO {vehicle.year}
                </motion.p>
              </div>

              {/* Price */}
              <div>
                <motion.h2
                  className="text-3xl md:text-4xl font-luxury-display text-white mb-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                >
                  {formatPrice(vehicle.price)}
                </motion.h2>
                
                <div className="flex items-center justify-center lg:justify-start gap-4 mb-6">
                  <div className="flex items-center gap-1">
                    <Star size={20} className="text-yellow-400 fill-current" />
                    <span className="text-lg font-luxury-caption text-white/80">4.8</span>
                  </div>
                  <div className="w-px h-6 bg-white/30"></div>
                  <span className="text-lg font-luxury-caption text-white/80">
                    {formatMileage(vehicle.mileage)}
                  </span>
                </div>
              </div>

              {/* Key Features */}
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-3 p-4 bg-white/10 backdrop-blur-sm rounded-2xl">
                  <Calendar className="text-white/80" size={20} />
                  <div>
                    <p className="text-sm font-luxury-caption text-white/60">AÑO</p>
                    <p className="font-luxury-body text-white">{vehicle.year}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 bg-white/10 backdrop-blur-sm rounded-2xl">
                  <Fuel className="text-white/80" size={20} />
                  <div>
                    <p className="text-sm font-luxury-caption text-white/60">COMBUSTIBLE</p>
                    <p className="font-luxury-body text-white">{vehicle.fuel}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 bg-white/10 backdrop-blur-sm rounded-2xl">
                  <Gauge className="text-white/80" size={20} />
                  <div>
                    <p className="text-sm font-luxury-caption text-white/60">TRANSMISIÓN</p>
                    <p className="font-luxury-body text-white">{vehicle.transmission}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 bg-white/10 backdrop-blur-sm rounded-2xl">
                  <Car className="text-white/80" size={20} />
                  <div>
                    <p className="text-sm font-luxury-caption text-white/60">PLACA</p>
                    <p className="font-luxury-body text-white">{vehicle.specifications.plate}</p>
                  </div>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="space-y-4">
                <motion.button
                  className="w-full py-4 px-8 bg-white text-gray-900 font-luxury-button tracking-luxury-wide rounded-2xl hover:bg-gray-100 transition-all duration-500"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  RESERVAR DESDE $1.000.000
                </motion.button>
                
                <motion.button
                  className="w-full py-4 px-8 border-2 border-white text-white font-luxury-button tracking-luxury-wide rounded-2xl hover:bg-white hover:text-gray-900 transition-all duration-500"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  CONTACTAR ASESOR
                </motion.button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>


      {/* Specifications Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <motion.div
            className="max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-luxury-display text-gray-900 text-center mb-16">
              ESPECIFICACIONES
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="flex justify-between items-center py-4 border-b border-gray-200">
                  <span className="font-luxury-caption text-gray-500 tracking-luxury">KILOMETRAJE:</span>
                  <span className="font-luxury-body text-gray-900">{formatMileage(vehicle.mileage)}</span>
                </div>
                <div className="flex justify-between items-center py-4 border-b border-gray-200">
                  <span className="font-luxury-caption text-gray-500 tracking-luxury">MOTOR:</span>
                  <span className="font-luxury-body text-gray-900">{vehicle.specifications.engine}</span>
                </div>
                <div className="flex justify-between items-center py-4 border-b border-gray-200">
                  <span className="font-luxury-caption text-gray-500 tracking-luxury">POTENCIA DEL MOTOR:</span>
                  <span className="font-luxury-body text-gray-900">{vehicle.specifications.power}</span>
                </div>
                <div className="flex justify-between items-center py-4 border-b border-gray-200">
                  <span className="font-luxury-caption text-gray-500 tracking-luxury">TIPO DE COMBUSTIBLE:</span>
                  <span className="font-luxury-body text-gray-900">{vehicle.fuel}</span>
                </div>
              </div>
              
              <div className="space-y-6">
                <div className="flex justify-between items-center py-4 border-b border-gray-200">
                  <span className="font-luxury-caption text-gray-500 tracking-luxury">ACELERACIÓN:</span>
                  <span className="font-luxury-body text-gray-900">{vehicle.specifications.acceleration}</span>
                </div>
                <div className="flex justify-between items-center py-4 border-b border-gray-200">
                  <span className="font-luxury-caption text-gray-500 tracking-luxury">TRACCIÓN:</span>
                  <span className="font-luxury-body text-gray-900">{vehicle.specifications.traction}</span>
                </div>
                <div className="flex justify-between items-center py-4 border-b border-gray-200">
                  <span className="font-luxury-caption text-gray-500 tracking-luxury">PLACA:</span>
                  <span className="font-luxury-body text-gray-900">{vehicle.specifications.plate}</span>
                </div>
                <div className="flex justify-between items-center py-4 border-b border-gray-200">
                  <span className="font-luxury-caption text-gray-500 tracking-luxury">MATRÍCULA:</span>
                  <span className="font-luxury-body text-gray-900">{vehicle.specifications.registration}</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Equipment Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <motion.div
            className="max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-luxury-display text-gray-900 text-center mb-16">
              EQUIPAMIENTO
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {vehicle.equipment.map((item, index) => (
                <motion.div
                  key={index}
                  className="flex items-center gap-3 p-4 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-colors duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="w-2 h-2 bg-gray-900 rounded-full"></div>
                  <span className="font-luxury-body text-gray-900">{item}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-gray-900">
        <div className="container mx-auto px-6">
          <motion.div
            className="max-w-4xl mx-auto text-center"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-luxury-display text-white mb-8">
              CONTACTA A UN ASESOR
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Nombre"
                  className="w-full px-6 py-4 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-white/60 font-luxury-body focus:outline-none focus:ring-2 focus:ring-white/50 transition-all duration-300"
                />
                <input
                  type="email"
                  placeholder="Correo electrónico"
                  className="w-full px-6 py-4 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-white/60 font-luxury-body focus:outline-none focus:ring-2 focus:ring-white/50 transition-all duration-300"
                />
                <input
                  type="tel"
                  placeholder="Número de teléfono"
                  className="w-full px-6 py-4 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-white/60 font-luxury-body focus:outline-none focus:ring-2 focus:ring-white/50 transition-all duration-300"
                />
              </div>
              <div>
                <textarea
                  placeholder="Mensaje"
                  rows={6}
                  className="w-full px-6 py-4 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-white/60 font-luxury-body focus:outline-none focus:ring-2 focus:ring-white/50 transition-all duration-300 resize-none"
                />
              </div>
            </div>
            
            <motion.button
              className="mt-8 px-12 py-4 bg-white text-gray-900 font-luxury-button tracking-luxury-wide rounded-2xl hover:bg-gray-100 transition-all duration-500"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              ENVIAR
            </motion.button>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
