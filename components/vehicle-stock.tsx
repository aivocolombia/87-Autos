"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Car, Fuel, Settings, Eye } from "lucide-react"
import { LiquidButton } from "@/components/ui/liquid-glass-button"

interface Vehicle {
  id: number
  brand: "BMW" | "Mini Cooper"
  model: string
  year: number
  price: number
  mileage: number
  fuel: string
  transmission: string
  color: string
  image: string
  gallery: string[]
  specs: {
    engine: string
    power: string
    acceleration: string
    topSpeed: string
    consumption: string
    features: string[]
  }
}

const vehicles: Vehicle[] = [
  {
    id: 1,
    brand: "BMW",
    model: "Serie 3 320i",
    year: 2023,
    price: 45000,
    mileage: 15000,
    fuel: "Gasolina",
    transmission: "Automática",
    color: "Azul Mineral",
    image: "/blue-bmw-3-series-sedan.png",
    gallery: ["/bmw-3-series-luxury-dashboard.png", "/placeholder-4ej48.png", "/placeholder.svg?height=400&width=600"],
    specs: {
      engine: "2.0L TwinPower Turbo",
      power: "184 HP",
      acceleration: "0-100 km/h en 7.1s",
      topSpeed: "235 km/h",
      consumption: "6.8L/100km",
      features: ["Sistema iDrive", "Asientos de cuero", "Techo solar", "Cámara trasera", "Sensores de parking"],
    },
  },
  {
    id: 2,
    brand: "Mini Cooper",
    model: "Cooper S",
    year: 2022,
    price: 32000,
    mileage: 8000,
    fuel: "Gasolina",
    transmission: "Manual",
    color: "Rojo Chili",
    image: "/placeholder.svg?height=400&width=600",
    gallery: [
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
    ],
    specs: {
      engine: "2.0L TwinPower Turbo",
      power: "192 HP",
      acceleration: "0-100 km/h en 6.8s",
      topSpeed: "233 km/h",
      consumption: "6.4L/100km",
      features: [
        "MINI Connected",
        "Asientos deportivos",
        "Luces LED",
        "Sistema de sonido Harman Kardon",
        "Control de crucero",
      ],
    },
  },
  {
    id: 3,
    brand: "BMW",
    model: "X3 xDrive30i",
    year: 2023,
    price: 58000,
    mileage: 12000,
    fuel: "Gasolina",
    transmission: "Automática",
    color: "Blanco Alpino",
    image: "/placeholder.svg?height=400&width=600",
    gallery: [
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
    ],
    specs: {
      engine: "2.0L TwinPower Turbo",
      power: "248 HP",
      acceleration: "0-100 km/h en 6.3s",
      topSpeed: "230 km/h",
      consumption: "7.9L/100km",
      features: [
        "xDrive AWD",
        "Suspensión adaptativa",
        'Pantalla táctil 12.3"',
        "Carga inalámbrica",
        "Asistente de parking",
      ],
    },
  },
  {
    id: 4,
    brand: "Mini Cooper",
    model: "Countryman",
    year: 2022,
    price: 38000,
    mileage: 18000,
    fuel: "Gasolina",
    transmission: "Automática",
    color: "Verde British Racing",
    image: "/placeholder.svg?height=400&width=600",
    gallery: [
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
    ],
    specs: {
      engine: "2.0L TwinPower Turbo",
      power: "192 HP",
      acceleration: "0-100 km/h en 7.5s",
      topSpeed: "215 km/h",
      consumption: "7.2L/100km",
      features: ["ALL4 AWD", "Techo panorámico", "MINI Connected XL", "Asientos calefaccionados", "Portón eléctrico"],
    },
  },
]

export default function VehicleStock() {
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null)
  const [selectedImage, setSelectedImage] = useState(0)
  const [isVideoPlaying, setIsVideoPlaying] = useState(false)

  const openVehicleDetails = (vehicle: Vehicle) => {
    setSelectedVehicle(vehicle)
    setSelectedImage(0)
    setIsVideoPlaying(true)
  }

  const closeVehicleDetails = () => {
    setSelectedVehicle(null)
    setIsVideoPlaying(false)
  }

  return (
    <section id="stock" className="relative py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-black tracking-wider mb-6 text-gray-900">
            NUESTRO <span className="text-blue-600">STOCK</span>
          </h2>
          <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto">
            Descubre nuestra selección premium de vehículos BMW y Mini Cooper
          </p>
        </div>

        {/* Vehicle Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {vehicles.map((vehicle) => (
            <motion.div
              key={vehicle.id}
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer"
              whileHover={{ y: -5 }}
              onClick={() => openVehicleDetails(vehicle)}
            >
              <div className="relative">
                <img
                  src={vehicle.image || "/placeholder.svg"}
                  alt={`${vehicle.brand} ${vehicle.model}`}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-4 left-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold text-white ${
                      vehicle.brand === "BMW" ? "bg-blue-600" : "bg-green-600"
                    }`}
                  >
                    {vehicle.brand}
                  </span>
                </div>
                <div className="absolute top-4 right-4">
                  <span className="bg-black/70 text-white px-2 py-1 rounded text-xs">{vehicle.year}</span>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{vehicle.model}</h3>
                <p className="text-2xl font-black text-blue-600 mb-4">${vehicle.price.toLocaleString()}</p>

                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <Car className="w-4 h-4" />
                    <span>{vehicle.mileage.toLocaleString()} km</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Fuel className="w-4 h-4" />
                    <span>{vehicle.fuel}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Settings className="w-4 h-4" />
                    <span>{vehicle.transmission}</span>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t">
                  <LiquidButton size="sm" className="w-full">
                    <Eye className="w-4 h-4 mr-2" />
                    Ver Detalles
                  </LiquidButton>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Vehicle Details Modal */}
      <AnimatePresence>
        {selectedVehicle && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
            onClick={closeVehicleDetails}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="absolute inset-0 flex items-center justify-center z-20">
                {isVideoPlaying && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="relative w-full h-full bg-black/90 flex items-center justify-center"
                  >
                    <video
                      src="https://cdn.shopify.com/videos/c/o/v/d68fe2922a8a4bb2aa1135c773587153.mp4"
                      autoPlay
                      muted
                      loop
                      className="max-w-full max-h-full object-contain"
                      onLoadStart={() => console.log("[v0] Video started loading")}
                      onCanPlay={() => console.log("[v0] Video can play")}
                    />
                    <button
                      onClick={() => setIsVideoPlaying(false)}
                      className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors"
                    >
                      <X size={32} />
                    </button>
                  </motion.div>
                )}
              </div>

              {!isVideoPlaying && (
                <>
                  {/* Header */}
                  <div className="flex items-center justify-between p-6 border-b">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">
                        {selectedVehicle.brand} {selectedVehicle.model}
                      </h2>
                      <p className="text-3xl font-black text-blue-600">${selectedVehicle.price.toLocaleString()}</p>
                    </div>
                    <button
                      onClick={closeVehicleDetails}
                      className="text-gray-500 hover:text-gray-700 transition-colors"
                    >
                      <X size={24} />
                    </button>
                  </div>

                  {/* Image Gallery */}
                  <div className="p-6">
                    <div className="mb-4">
                      <img
                        src={selectedImage === 0 ? selectedVehicle.image : selectedVehicle.gallery[selectedImage - 1]}
                        alt={`${selectedVehicle.brand} ${selectedVehicle.model}`}
                        className="w-full h-64 md:h-96 object-cover rounded-lg"
                      />
                    </div>

                    <div className="flex gap-2 overflow-x-auto pb-2">
                      <button
                        onClick={() => setSelectedImage(0)}
                        className={`flex-shrink-0 w-20 h-16 rounded border-2 overflow-hidden ${
                          selectedImage === 0 ? "border-blue-500" : "border-gray-200"
                        }`}
                      >
                        <img
                          src={selectedVehicle.image || "/placeholder.svg"}
                          alt="Main"
                          className="w-full h-full object-cover"
                        />
                      </button>
                      {selectedVehicle.gallery.map((img, index) => (
                        <button
                          key={index}
                          onClick={() => setSelectedImage(index + 1)}
                          className={`flex-shrink-0 w-20 h-16 rounded border-2 overflow-hidden ${
                            selectedImage === index + 1 ? "border-blue-500" : "border-gray-200"
                          }`}
                        >
                          <img
                            src={img || "/placeholder.svg"}
                            alt={`Gallery ${index + 1}`}
                            className="w-full h-full object-cover"
                          />
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Specifications */}
                  <div className="px-6 pb-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      {/* Basic Info */}
                      <div>
                        <h3 className="text-lg font-bold text-gray-900 mb-4">Información General</h3>
                        <div className="space-y-3">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Año:</span>
                            <span className="font-semibold">{selectedVehicle.year}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Kilometraje:</span>
                            <span className="font-semibold">{selectedVehicle.mileage.toLocaleString()} km</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Combustible:</span>
                            <span className="font-semibold">{selectedVehicle.fuel}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Transmisión:</span>
                            <span className="font-semibold">{selectedVehicle.transmission}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Color:</span>
                            <span className="font-semibold">{selectedVehicle.color}</span>
                          </div>
                        </div>
                      </div>

                      {/* Technical Specs */}
                      <div>
                        <h3 className="text-lg font-bold text-gray-900 mb-4">Especificaciones Técnicas</h3>
                        <div className="space-y-3">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Motor:</span>
                            <span className="font-semibold">{selectedVehicle.specs.engine}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Potencia:</span>
                            <span className="font-semibold">{selectedVehicle.specs.power}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Aceleración:</span>
                            <span className="font-semibold">{selectedVehicle.specs.acceleration}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Velocidad máx:</span>
                            <span className="font-semibold">{selectedVehicle.specs.topSpeed}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Consumo:</span>
                            <span className="font-semibold">{selectedVehicle.specs.consumption}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Features */}
                    <div className="mt-8">
                      <h3 className="text-lg font-bold text-gray-900 mb-4">Características</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {selectedVehicle.specs.features.map((feature, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                            <span className="text-gray-700">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* CTA Buttons */}
                    <div className="mt-8 flex gap-4">
                      <LiquidButton size="lg" className="flex-1">
                        Contactar Vendedor
                      </LiquidButton>
                      <LiquidButton
                        size="lg"
                        variant="outline"
                        className="flex-1"
                        onClick={() => setIsVideoPlaying(true)}
                      >
                        Ver Video
                      </LiquidButton>
                    </div>
                  </div>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
