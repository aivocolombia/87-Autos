"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Filter, X, SlidersHorizontal, ChevronLeft, ChevronRight, Star, Heart, Share2, Eye } from "lucide-react"

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
    features: ["Navegación GPS", "Asientos de cuero", "Sistema de sonido premium", "Cámara de reversa"]
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
    features: ["Tracción integral", "Techo solar", "Sistema de asistencia al conductor", "Carga inalámbrica"]
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
    features: ["Pantalla táctil 12.3\"", "Asientos con masaje", "Sistema de sonido Harman Kardon", "Faros LED adaptativos"]
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
    features: ["Modo deportivo", "Sistema de navegación", "Asientos deportivos", "Llantas de aleación"]
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
    features: ["Sistema iDrive", "Bluetooth", "Control de crucero", "Aire acondicionado automático"]
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
    features: ["Motor híbrido", "Modo eléctrico", "Carga rápida", "Sistema de navegación"]
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
    features: ["Asientos traseros ejecutivos", "Sistema de entretenimiento", "Masaje en asientos", "Pantallas individuales"]
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
    features: ["Techo descapotable", "Sistema de sonido premium", "Asientos deportivos", "Llantas de 19 pulgadas"]
  }
]

export default function Vehiculos2() {
  const [filteredVehicles, setFilteredVehicles] = useState<Vehicle[]>(vehicles)
  const [isFiltersOpen, setIsFiltersOpen] = useState(false)
  const [currentImageIndexes, setCurrentImageIndexes] = useState<{[key: number]: number}>({})
  const [showViewAllPhotos, setShowViewAllPhotos] = useState<{[key: number]: boolean}>({})
  const [favorites, setFavorites] = useState<number[]>([])
  const [filters, setFilters] = useState({
    brand: "",
    model: "",
    minPrice: 50000000,
    maxPrice: 500000000,
    mileageRange: [0, 100000],
    yearRange: [2020, 2024]
  })

  // Apply filters
  useEffect(() => {
    let filtered = vehicles.filter(vehicle => {
      const matchesBrand = !filters.brand || vehicle.brand === filters.brand
      const matchesModel = !filters.model || vehicle.model === filters.model
      const matchesPrice = vehicle.price >= filters.minPrice && vehicle.price <= filters.maxPrice
      const matchesMileage = vehicle.mileage >= filters.mileageRange[0] && vehicle.mileage <= filters.mileageRange[1]
      const matchesYear = vehicle.year >= filters.yearRange[0] && vehicle.year <= filters.yearRange[1]

      return matchesBrand && matchesModel && matchesPrice && matchesMileage && matchesYear
    })

    setFilteredVehicles(filtered)
  }, [filters])

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

  const uniqueBrands = [...new Set(vehicles.map(v => v.brand))]
  const uniqueModels = [...new Set(vehicles.map(v => v.model))]

  // Image navigation functions
  const getCurrentImageIndex = (vehicleId: number) => {
    return currentImageIndexes[vehicleId] || 0
  }

  const navigateImage = (vehicleId: number, direction: 'prev' | 'next') => {
    const currentIndex = getCurrentImageIndex(vehicleId)
    const vehicle = vehicles.find(v => v.id === vehicleId)
    if (!vehicle) return

    const maxVisibleImages = 5
    let newIndex = currentIndex

    if (direction === 'next') {
      if (currentIndex < maxVisibleImages - 1) {
        newIndex = currentIndex + 1
        setShowViewAllPhotos(prev => ({ ...prev, [vehicleId]: false }))
      } else {
        setShowViewAllPhotos(prev => ({ ...prev, [vehicleId]: true }))
        return
      }
    } else {
      if (showViewAllPhotos[vehicleId]) {
        setShowViewAllPhotos(prev => ({ ...prev, [vehicleId]: false }))
        return
      }
      newIndex = Math.max(0, currentIndex - 1)
    }

    setCurrentImageIndexes(prev => ({ ...prev, [vehicleId]: newIndex }))
  }

  const getDisplayedImages = (vehicle: Vehicle) => {
    return vehicle.images.slice(0, 5)
  }

  const toggleFavorite = (vehicleId: number) => {
    setFavorites(prev => 
      prev.includes(vehicleId) 
        ? prev.filter(id => id !== vehicleId)
        : [...prev, vehicleId]
    )
  }

  return (
    <section className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      {/* Hero Section */}
      <div className="relative py-20 bg-gradient-to-br from-gray-900 via-black to-gray-800 overflow-hidden">
        {/* Luxury Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-800"></div>
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-transparent to-black/30"></div>
          
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
            opacity: [0.2, 0.6, 0.2],
            scale: [1, 1.2, 1]
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-40 right-16 w-2 h-2 rounded-full bg-white/30"
          animate={{
            y: [0, -15, 0],
            opacity: [0.3, 0.7, 0.3],
            scale: [1, 1.1, 1]
          }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
        <motion.div
          className="absolute bottom-32 left-20 w-2.5 h-2.5 rounded-full bg-white/25"
          animate={{
            y: [0, -25, 0],
            opacity: [0.25, 0.6, 0.25],
            scale: [1, 1.3, 1]
          }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />

        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            className="text-center max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <motion.h1
              className="text-5xl md:text-7xl lg:text-8xl font-luxury-display tracking-luxury-tight text-white mb-8"
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
              VEHÍCULOS 2.0
            </motion.h1>
            
            <motion.div
              className="w-24 h-1 bg-gradient-to-r from-transparent via-white to-transparent mx-auto mb-8"
              initial={{ width: 0 }}
              animate={{ width: "6rem" }}
              transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 }}
            />
            
            <motion.p
              className="text-xl md:text-2xl font-luxury-body text-white/80 max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
            >
              Descubre nuestra colección curada de vehículos premium BMW y Mini Cooper. 
              Cada unidad ha sido seleccionada por su excelencia y condición excepcional.
            </motion.p>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-20">
        {/* Filters Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex justify-center mb-16"
        >
          <motion.button
            onClick={() => setIsFiltersOpen(true)}
            className="group relative px-8 py-4 bg-gradient-to-r from-gray-900 to-black text-white font-luxury-button tracking-luxury-wide rounded-2xl hover:shadow-2xl transition-all duration-500 overflow-hidden"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="flex items-center gap-3">
              <SlidersHorizontal size={20} className="group-hover:rotate-90 transition-transform duration-300" />
              <span>FILTROS AVANZADOS</span>
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out"></div>
          </motion.button>
        </motion.div>

        {/* Vehicles Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
        >
          <AnimatePresence>
            {filteredVehicles.map((vehicle, index) => (
              <motion.div
                key={vehicle.id}
                layout
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -50, scale: 0.9 }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.1,
                  layout: { duration: 0.3 }
                }}
                className="group cursor-pointer h-full"
                whileHover={{ y: -8 }}
              >
                <div className="bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-700 border border-gray-100 group-hover:border-gray-200 h-full flex flex-col">
                  {/* Image Container */}
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <motion.img
                      src={vehicle.images[getCurrentImageIndex(vehicle.id)]}
                      alt={`${vehicle.brand} ${vehicle.model}`}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      whileHover={{ scale: 1.1 }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    {/* Navigation Arrows */}
                    <div className="absolute inset-0 flex items-center justify-between px-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <motion.button
                        onClick={(e) => {
                          e.stopPropagation()
                          navigateImage(vehicle.id, 'prev')
                        }}
                        className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-900 hover:bg-white transition-all duration-300 disabled:opacity-50"
                        disabled={getCurrentImageIndex(vehicle.id) === 0 && !showViewAllPhotos[vehicle.id]}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <ChevronLeft size={20} />
                      </motion.button>
                      <motion.button
                        onClick={(e) => {
                          e.stopPropagation()
                          navigateImage(vehicle.id, 'next')
                        }}
                        className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-900 hover:bg-white transition-all duration-300 disabled:opacity-50"
                        disabled={showViewAllPhotos[vehicle.id]}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <ChevronRight size={20} />
                      </motion.button>
                    </div>

                    {/* Progress Indicators */}
                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                      {getDisplayedImages(vehicle).map((_, index) => (
                        <motion.button
                          key={index}
                          onClick={(e) => {
                            e.stopPropagation()
                            setCurrentImageIndexes(prev => ({ ...prev, [vehicle.id]: index }))
                            setShowViewAllPhotos(prev => ({ ...prev, [vehicle.id]: false }))
                          }}
                          className={`w-2 h-2 rounded-full transition-all duration-300 ${
                            index === getCurrentImageIndex(vehicle.id) && !showViewAllPhotos[vehicle.id]
                              ? 'bg-white scale-125'
                              : 'bg-white/50 hover:bg-white/75'
                          }`}
                          whileHover={{ scale: 1.2 }}
                        />
                      ))}
                    </div>

                    {/* View All Photos CTA */}
                    <AnimatePresence>
                      {showViewAllPhotos[vehicle.id] && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.9 }}
                          className="absolute inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center"
                        >
                          <div className="text-center text-white">
                            <Eye size={32} className="mx-auto mb-4" />
                            <h4 className="text-xl font-luxury-heading mb-2">Ver todas las fotos</h4>
                            <p className="text-sm opacity-75 mb-4">Descubre más imágenes de este vehículo</p>
                            <motion.button 
                              className="px-6 py-3 bg-white text-black rounded-full hover:bg-gray-100 transition-colors duration-300 font-luxury-button"
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              Explorar galería
                            </motion.button>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Content */}
                  <div className="p-6 flex flex-col flex-grow">
                    <div className="mb-4">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-xl font-luxury-heading text-gray-900">
                          {vehicle.brand} {vehicle.model}
                        </h3>
                        <div className="flex items-center gap-1">
                          <Star size={16} className="text-yellow-400 fill-current" />
                          <span className="text-sm font-luxury-caption text-gray-500">4.8</span>
                        </div>
                      </div>
                      <p className="text-sm font-luxury-caption text-gray-500 tracking-luxury">
                        {vehicle.year} • {vehicle.fuel} • {vehicle.transmission}
                      </p>
                    </div>

                    <div className="flex items-center justify-between mb-6">
                      <div>
                        <p className="text-2xl font-luxury-display text-gray-900">
                          {formatPrice(vehicle.price)}
                        </p>
                        <p className="text-sm font-luxury-caption text-gray-500">
                          {formatMileage(vehicle.mileage)}
                        </p>
                      </div>
                    </div>

                    {/* Features */}
                    <div className="mb-6 flex-grow">
                      <div className="flex flex-wrap gap-2">
                        {vehicle.features.slice(0, 2).map((feature, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-gray-100 text-gray-600 text-xs font-luxury-caption rounded-full"
                          >
                            {feature}
                          </span>
                        ))}
                        {vehicle.features.length > 2 && (
                          <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs font-luxury-caption rounded-full">
                            +{vehicle.features.length - 2} más
                          </span>
                        )}
                      </div>
                    </div>

                    <motion.button 
                      onClick={() => window.location.href = `/vehiculos/${vehicle.id}`}
                      className="w-full py-4 px-6 bg-gradient-to-r from-gray-900 to-black text-white font-luxury-button tracking-luxury-wide rounded-2xl hover:shadow-xl transition-all duration-500 overflow-hidden group/btn mt-auto"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <span className="relative z-10">VER DETALLES</span>
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000 ease-in-out"></div>
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* No Results */}
        {filteredVehicles.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Filter size={32} className="text-gray-400" />
            </div>
            <h3 className="text-2xl font-luxury-heading text-gray-900 mb-4">No se encontraron vehículos</h3>
            <p className="text-gray-500 font-luxury-body">Intenta ajustar los filtros para ver más opciones</p>
          </motion.div>
        )}

        {/* Results Count */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center mt-16"
        >
          <div className="inline-flex items-center gap-2 bg-gray-100 px-6 py-3 rounded-full">
            <div className="w-2 h-2 bg-gray-900 rounded-full"></div>
            <p className="text-gray-700 font-luxury-caption tracking-luxury">
              {filteredVehicles.length} vehículo{filteredVehicles.length !== 1 ? 's' : ''} encontrado{filteredVehicles.length !== 1 ? 's' : ''}
            </p>
          </div>
        </motion.div>
      </div>

      {/* Filters Modal */}
      <AnimatePresence>
        {isFiltersOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
              onClick={() => setIsFiltersOpen(false)}
            />

            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 50 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-white rounded-3xl shadow-2xl z-50 w-full max-w-lg mx-4 max-h-[calc(100vh-2rem)] overflow-y-auto"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-8 border-b border-gray-100">
                <h3 className="text-3xl font-luxury-display text-gray-900">Filtros Avanzados</h3>
                <motion.button
                  onClick={() => setIsFiltersOpen(false)}
                  className="p-3 hover:bg-gray-100 rounded-full transition-colors duration-300"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <X size={24} className="text-gray-500" />
                </motion.button>
              </div>

              {/* Filters Content */}
              <div className="p-8 space-y-8">
                {/* Brand */}
                <div>
                  <label className="block text-sm font-luxury-caption text-gray-700 mb-3 tracking-luxury">MARCA</label>
                  <select
                    value={filters.brand}
                    onChange={(e) => setFilters(prev => ({ ...prev, brand: e.target.value }))}
                    className="w-full px-4 py-4 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all duration-300 font-luxury-body"
                  >
                    <option value="">Todas las marcas</option>
                    {uniqueBrands.map(brand => (
                      <option key={brand} value={brand}>{brand}</option>
                    ))}
                  </select>
                </div>

                {/* Model */}
                <div>
                  <label className="block text-sm font-luxury-caption text-gray-700 mb-3 tracking-luxury">MODELO</label>
                  <select
                    value={filters.model}
                    onChange={(e) => setFilters(prev => ({ ...prev, model: e.target.value }))}
                    className="w-full px-4 py-4 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all duration-300 font-luxury-body"
                  >
                    <option value="">Todos los modelos</option>
                    {uniqueModels.map(model => (
                      <option key={model} value={model}>{model}</option>
                    ))}
                  </select>
                </div>

                {/* Price Range */}
                <div>
                  <label className="block text-sm font-luxury-caption text-gray-700 mb-3 tracking-luxury">PRECIO</label>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-luxury-caption text-gray-500 mb-2">Precio Mínimo</label>
                      <input
                        type="number"
                        min="50000000"
                        max="500000000"
                        step="10000000"
                        value={filters.minPrice}
                        onChange={(e) => setFilters(prev => ({
                          ...prev,
                          minPrice: parseInt(e.target.value) || 50000000
                        }))}
                        className="w-full px-4 py-4 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all duration-300 font-luxury-body"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-luxury-caption text-gray-500 mb-2">Precio Máximo</label>
                      <input
                        type="number"
                        min="50000000"
                        max="500000000"
                        step="10000000"
                        value={filters.maxPrice}
                        onChange={(e) => setFilters(prev => ({
                          ...prev,
                          maxPrice: parseInt(e.target.value) || 500000000
                        }))}
                        className="w-full px-4 py-4 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all duration-300 font-luxury-body"
                      />
                    </div>
                  </div>
                </div>

                {/* Mileage Range */}
                <div>
                  <label className="block text-sm font-luxury-caption text-gray-700 mb-3 tracking-luxury">
                    KILOMETRAJE: {formatMileage(filters.mileageRange[0])} - {formatMileage(filters.mileageRange[1])}
                  </label>
                  <div className="px-2">
                    <input
                      type="range"
                      min="0"
                      max="100000"
                      step="5000"
                      value={filters.mileageRange[0]}
                      onChange={(e) => setFilters(prev => ({
                        ...prev,
                        mileageRange: [parseInt(e.target.value), prev.mileageRange[1]]
                      }))}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                    />
                    <input
                      type="range"
                      min="0"
                      max="100000"
                      step="5000"
                      value={filters.mileageRange[1]}
                      onChange={(e) => setFilters(prev => ({
                        ...prev,
                        mileageRange: [prev.mileageRange[0], parseInt(e.target.value)]
                      }))}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider mt-2"
                    />
                  </div>
                </div>

                {/* Year Range */}
                <div>
                  <label className="block text-sm font-luxury-caption text-gray-700 mb-3 tracking-luxury">
                    AÑO: {filters.yearRange[0]} - {filters.yearRange[1]}
                  </label>
                  <div className="px-2">
                    <input
                      type="range"
                      min="2020"
                      max="2024"
                      value={filters.yearRange[0]}
                      onChange={(e) => setFilters(prev => ({
                        ...prev,
                        yearRange: [parseInt(e.target.value), prev.yearRange[1]]
                      }))}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                    />
                    <input
                      type="range"
                      min="2020"
                      max="2024"
                      value={filters.yearRange[1]}
                      onChange={(e) => setFilters(prev => ({
                        ...prev,
                        yearRange: [prev.yearRange[0], parseInt(e.target.value)]
                      }))}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider mt-2"
                    />
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-4 p-8 border-t border-gray-100">
                <motion.button
                  onClick={() => {
                    setFilters({
                      brand: "",
                      model: "",
                      minPrice: 50000000,
                      maxPrice: 500000000,
                      mileageRange: [0, 100000],
                      yearRange: [2020, 2024]
                    })
                  }}
                  className="flex-1 py-4 px-6 bg-gray-100 text-gray-700 rounded-2xl hover:bg-gray-200 transition-all duration-300 font-luxury-button tracking-luxury-wide"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  LIMPIAR
                </motion.button>
                <motion.button
                  onClick={() => setIsFiltersOpen(false)}
                  className="flex-1 py-4 px-6 bg-gradient-to-r from-gray-900 to-black text-white rounded-2xl hover:shadow-xl transition-all duration-300 font-luxury-button tracking-luxury-wide"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  APLICAR
                </motion.button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #1a1a1a;
          cursor: pointer;
          border: 2px solid #ffffff;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
        }

        .slider::-webkit-slider-thumb:hover {
          background: #333333;
        }

        .slider::-moz-range-thumb {
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #1a1a1a;
          cursor: pointer;
          border: 2px solid #ffffff;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
        }
      `}</style>
    </section>
  )
}