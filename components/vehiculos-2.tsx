"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Filter, X, SlidersHorizontal, ChevronLeft, ChevronRight } from "lucide-react"

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
    transmission: "Automática"
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
    transmission: "Automática"
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
    transmission: "Automática"
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
    transmission: "Manual"
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
    transmission: "Automática"
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
    transmission: "Automática"
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
    transmission: "Automática"
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
    transmission: "Automática"
  }
]

export default function Vehiculos2() {
  const [filteredVehicles, setFilteredVehicles] = useState<Vehicle[]>(vehicles)
  const [isFiltersOpen, setIsFiltersOpen] = useState(false)
  const [currentImageIndexes, setCurrentImageIndexes] = useState<{[key: number]: number}>({})
  const [showViewAllPhotos, setShowViewAllPhotos] = useState<{[key: number]: boolean}>({})
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
        // Show "View all photos" CTA
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

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-light text-gray-900 mb-6 tracking-wide">
            Vehículos <span className="font-medium">2.0</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Descubre nuestra colección curada de vehículos premium BMW y Mini Cooper.
            Cada unidad ha sido seleccionada por su excelencia y condición excepcional.
          </p>
        </motion.div>

        {/* Filters Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex justify-center mb-12"
        >
          <button
            onClick={() => setIsFiltersOpen(true)}
            className="flex items-center gap-3 px-6 py-3 bg-gray-900 text-white rounded-full hover:bg-gray-800 transition-all duration-300 group"
          >
            <SlidersHorizontal size={20} className="group-hover:rotate-90 transition-transform duration-300" />
            <span className="font-medium">Filtros</span>
          </button>
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
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.1,
                  layout: { duration: 0.3 }
                }}
                className="group cursor-pointer"
              >
                <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100">
                  {/* Image Container */}
                  <div className="relative aspect-[5/4] overflow-hidden group/image">
                    <img
                      src={vehicle.images[getCurrentImageIndex(vehicle.id)]}
                      alt={`${vehicle.brand} ${vehicle.model}`}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    {/* Navigation Arrows */}
                    <div className="absolute inset-0 flex items-center justify-between px-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          navigateImage(vehicle.id, 'prev')
                        }}
                        className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-gray-900 hover:bg-gray-100 transition-all duration-300 disabled:opacity-50"
                        disabled={getCurrentImageIndex(vehicle.id) === 0 && !showViewAllPhotos[vehicle.id]}
                      >
                        <ChevronLeft size={20} />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          navigateImage(vehicle.id, 'next')
                        }}
                        className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-gray-900 hover:bg-gray-100 transition-all duration-300 disabled:opacity-50"
                        disabled={showViewAllPhotos[vehicle.id]}
                      >
                        <ChevronRight size={20} />
                      </button>
                    </div>

                    {/* Progress Indicators */}
                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                      {getDisplayedImages(vehicle).map((_, index) => (
                        <button
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
                            <h4 className="text-xl font-light mb-2">Ver todas las fotos</h4>
                            <p className="text-sm opacity-75 mb-4">Descubre más imágenes de este vehículo</p>
                            <button className="px-6 py-2 bg-white text-black rounded-full hover:bg-gray-100 transition-colors duration-300 font-medium">
                              Explorar galería
                            </button>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <div className="mb-4">
                      <h3 className="text-xl font-light text-gray-900 mb-1">
                        {vehicle.brand} {vehicle.model}
                      </h3>
                      <p className="text-sm text-gray-500 font-medium">
                        {vehicle.year} • {vehicle.fuel} • {vehicle.transmission}
                      </p>
                    </div>

                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <p className="text-2xl font-light text-gray-900">
                          {formatPrice(vehicle.price)}
                        </p>
                        <p className="text-sm text-gray-500">
                          {formatMileage(vehicle.mileage)}
                        </p>
                      </div>
                    </div>

                    <button className="w-full py-3 px-6 bg-gray-900 text-white rounded-full hover:bg-gray-800 transition-all duration-300 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 font-medium">
                      Ver detalles
                    </button>
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
            <p className="text-xl text-gray-500 mb-4">No se encontraron vehículos</p>
            <p className="text-gray-400">Intenta ajustar los filtros para ver más opciones</p>
          </motion.div>
        )}

        {/* Results Count */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center mt-12"
        >
          <p className="text-gray-500">
            {filteredVehicles.length} vehículo{filteredVehicles.length !== 1 ? 's' : ''} encontrado{filteredVehicles.length !== 1 ? 's' : ''}
          </p>
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
              className="fixed inset-0 bg-black/50 z-50"
              onClick={() => setIsFiltersOpen(false)}
            />

            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 50 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-3xl shadow-2xl z-50 w-full max-w-md mx-4 max-h-[90vh] overflow-y-auto"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-8 border-b border-gray-100">
                <h3 className="text-2xl font-light text-gray-900">Filtros</h3>
                <button
                  onClick={() => setIsFiltersOpen(false)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-300"
                >
                  <X size={24} className="text-gray-500" />
                </button>
              </div>

              {/* Filters Content */}
              <div className="p-8 space-y-8">
                {/* Brand */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">Marca</label>
                  <select
                    value={filters.brand}
                    onChange={(e) => setFilters(prev => ({ ...prev, brand: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all duration-300"
                  >
                    <option value="">Todas las marcas</option>
                    {uniqueBrands.map(brand => (
                      <option key={brand} value={brand}>{brand}</option>
                    ))}
                  </select>
                </div>

                {/* Model */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">Modelo</label>
                  <select
                    value={filters.model}
                    onChange={(e) => setFilters(prev => ({ ...prev, model: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all duration-300"
                  >
                    <option value="">Todos los modelos</option>
                    {uniqueModels.map(model => (
                      <option key={model} value={model}>{model}</option>
                    ))}
                  </select>
                </div>

                {/* Price Range */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">Precio</label>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-xs text-gray-500 mb-1">Min. Precio</label>
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
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all duration-300"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-500 mb-1">Max. Precio</label>
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
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all duration-300"
                      />
                    </div>
                  </div>
                </div>

                {/* Mileage Range */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Kilometraje: {formatMileage(filters.mileageRange[0])} - {formatMileage(filters.mileageRange[1])}
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
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Año: {filters.yearRange[0]} - {filters.yearRange[1]}
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
                <button
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
                  className="flex-1 py-3 px-6 bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-all duration-300 font-medium"
                >
                  Limpiar
                </button>
                <button
                  onClick={() => setIsFiltersOpen(false)}
                  className="flex-1 py-3 px-6 bg-gray-900 text-white rounded-full hover:bg-gray-800 transition-all duration-300 font-medium"
                >
                  Aplicar
                </button>
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