"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Menu, X, ArrowLeft } from "lucide-react"
import Footer from "../../components/footer"
import Navbar from "../../components/navbar"

const vehicleCategories = [
  {
    id: "bmw",
    name: "BMW",
    models: [
      "SERIE 1",
      "SERIE 2",
      "SERIE 3",
      "SERIE 4",
      "SERIE 5",
      "SERIE 7",
      "SERIE 8",
      "X1",
      "X2",
      "X3",
      "X4",
      "X5",
      "X6",
      "X7",
      "Z4",
      "i3",
      "i4",
      "iX",
    ],
  },
  {
    id: "mini",
    name: "MINI COOPER",
    models: [
      "COOPER",
      "COOPER S",
      "COOPER SE",
      "COUNTRYMAN",
      "CLUBMAN",
      "CONVERTIBLE",
      "JOHN COOPER WORKS",
      "ELECTRIC",
    ],
  },
  {
    id: "motos",
    name: "MOTOS",
    models: ["BMW S1000RR", "BMW R1250GS", "BMW F850GS", "BMW R NINET", "BMW C400X"],
  },
]

const modelImages = {
  "SERIE 1": "/bmw-serie-1-azul-lateral.png",
  "SERIE 2": "/bmw-serie-2-blanco-deportivo.png",
  "SERIE 3": "/bmw-serie-3-azul.png",
  "SERIE 4": "/bmw-serie-4-coupe-negro.png",
  "SERIE 5": "/bmw-serie-5-gris.png",
  "SERIE 7": "/bmw-serie-7-negro-lujo.png",
  "SERIE 8": "/bmw-serie-8-rojo.png",
  X1: "/bmw-x1-blanco.png",
  X2: "/bmw-x2-azul.png",
  X3: "/bmw-x3-gris.png",
  X4: "/bmw-x4-black-coupe-suv.png",
  X5: "/placeholder.svg?height=800&width=1200",
  X6: "/placeholder.svg?height=800&width=1200",
  X7: "/placeholder.svg?height=800&width=1200",
  Z4: "/placeholder.svg?height=800&width=1200",
  i3: "/placeholder.svg?height=800&width=1200",
  i4: "/placeholder.svg?height=800&width=1200",
  iX: "/bmw-ix-blanco.png",
  COOPER: "/placeholder.svg?height=800&width=1200",
  "COOPER S": "/mini-cooper-s-rojo.png",
  "COOPER SE": "/placeholder.svg?height=800&width=1200",
  COUNTRYMAN: "/placeholder.svg?height=800&width=1200",
  CLUBMAN: "/placeholder.svg?height=800&width=1200",
  CONVERTIBLE: "/placeholder.svg?height=800&width=1200",
  "JOHN COOPER WORKS": "/placeholder.svg?height=800&width=1200",
  ELECTRIC: "/placeholder.svg?height=800&width=1200",
  "BMW S1000RR": "/placeholder.svg?height=800&width=1200",
  "BMW R1250GS": "/placeholder.svg?height=800&width=1200",
  "BMW F850GS": "/placeholder.svg?height=800&width=1200",
  "BMW R NINET": "/placeholder.svg?height=800&width=1200",
  "BMW C400X": "/placeholder.svg?height=800&width=1200",
}

const vehicleInventory = {
  "SERIE 1": [
    {
      id: 1,
      year: 2022,
      model: "118i Sport",
      color: "Azul Metalico",
      km: 15000,
      price: "$85,500,000",
      fuelType: "Gasolina",
      specs: ["118i", "140 HP", "Manual", "Gasolina"],
      image: "/bmw-serie-1-azul-lateral.png",
      detailedSpecs: {
        year: 2022,
        mileage: "15,000 km",
        transmission: "Manual",
        engine: "1.5L Turbo",
        exteriorColor: "Azul Metalico",
        interiorColor: "Cuero Negro",
        fuelType: "Gasolina",
        driveType: "Tracción Delantera",
        condition: "Excelente",
        vin: "WBA1G3C50DJ123456",
        stockNumber: "AS-2022-001",
        warranty: "Garantía del Fabricante",
        features: "Navegación, Techo Solar, Sistema de Sonido Premium",
        safety: "ABS, Airbags, Sensores de Estacionamiento",
        entertainment: "Bluetooth, Apple CarPlay, Android Auto",
        comfort: "Asientos Calefaccionados, Tapicería de Cuero, Control de Clima Dual",
      },
    },
    {
      id: 2,
      year: 2023,
      model: "120i M Sport",
      color: "Blanco Alpine",
      km: 8000,
      price: "$92,200,000",
      fuelType: "Gasolina",
      specs: ["120i", "178 HP", "Automático", "Gasolina"],
      image: "/bmw-serie-1-azul-lateral.png",
      detailedSpecs: {
        year: 2023,
        mileage: "8,000 km",
        transmission: "Automático",
        engine: "2.0L Turbo",
        exteriorColor: "Blanco Alpine",
        interiorColor: "Cuero Rojo",
        fuelType: "Gasolina",
        driveType: "Tracción Delantera",
        condition: "Como Nuevo",
        vin: "WBA1G3C50EJ789012",
        stockNumber: "AS-2023-002",
        warranty: "Garantía del Fabricante",
        features: "Navegación, Techo Solar, Sistema de Sonido Harman Kardon",
        safety: "ABS, Airbags, Sensores de Estacionamiento, Cámara Trasera",
        entertainment: 'Bluetooth, Apple CarPlay, Android Auto, Pantalla Táctil 10.25"',
        comfort: "Asientos Deportivos M, Tapicería de Cuero, Control de Clima Automático",
      },
    },
    {
      id: 3,
      year: 2021,
      model: "118d Efficient",
      color: "Negro Zafiro",
      km: 22000,
      price: "$78,800,000",
      fuelType: "Diesel",
      specs: ["118d", "150 HP", "Manual", "Diesel"],
      image: "/bmw-serie-1-azul-lateral.png",
      detailedSpecs: {
        year: 2021,
        mileage: "22,000 km",
        transmission: "Manual",
        engine: "2.0L Diesel",
        exteriorColor: "Negro Zafiro",
        interiorColor: "Cuero Beige",
        fuelType: "Diesel",
        driveType: "Tracción Delantera",
        condition: "Muy Bueno",
        vin: "WBA1G3C50CJ345678",
        stockNumber: "AS-2021-003",
        warranty: "Garantía Extendida",
        features: "Navegación, Sistema de Sonido Premium",
        safety: "ABS, Airbags, Sensores de Estacionamiento",
        entertainment: "Bluetooth, Apple CarPlay, Radio Digital",
        comfort: "Asientos Calefaccionados, Tapicería de Cuero, Aire Acondicionado",
      },
    },
  ],
  "SERIE 3": [
    {
      id: 4,
      year: 2023,
      model: "320i",
      color: "Azul Storm Bay",
      km: 12000,
      price: "$42,500",
      fuelType: "Gasolina",
      specs: ["320i", "184 HP", "Automático", "Gasolina"],
      image: "/bmw-serie-3-azul.png",
      detailedSpecs: {
        year: 2023,
        mileage: "12,000 km",
        transmission: "Automático",
        engine: "2.0L Turbo",
        exteriorColor: "Azul Storm Bay",
        interiorColor: "Cuero Gris",
        fuelType: "Gasolina",
        driveType: "Tracción Delantera",
        condition: "Excelente",
        vin: "WBA1G3C50DJ123456",
        stockNumber: "AS-2023-004",
        warranty: "Garantía del Fabricante",
        features: "Navegación, Techo Solar, Sistema de Sonido Premium",
        safety: "ABS, Airbags, Sensores de Estacionamiento",
        entertainment: "Bluetooth, Apple CarPlay, Android Auto",
        comfort: "Asientos Calefaccionados, Tapicería de Cuero, Control de Clima Dual",
      },
    },
    {
      id: 5,
      year: 2022,
      model: "318d",
      color: "Gris Mineral",
      km: 18000,
      price: "$39,800",
      fuelType: "Diesel",
      specs: ["318d", "150 HP", "Automático", "Diesel"],
      image: "/bmw-serie-3-azul.png",
      detailedSpecs: {
        year: 2022,
        mileage: "18,000 km",
        transmission: "Automático",
        engine: "1.5L Diesel",
        exteriorColor: "Gris Mineral",
        interiorColor: "Cuero Beige",
        fuelType: "Diesel",
        driveType: "Tracción Delantera",
        condition: "Bueno",
        vin: "WBA1G3C50EJ789012",
        stockNumber: "AS-2022-005",
        warranty: "Garantía del Fabricante",
        features: "Navegación, Techo Solar",
        safety: "ABS, Airbags",
        entertainment: "Bluetooth, Apple CarPlay",
        comfort: "Asientos Calefaccionados, Tapicería de Cuero",
      },
    },
    {
      id: 6,
      year: 2024,
      model: "330i",
      color: "Blanco Alpine",
      km: 5000,
      price: "$48,900",
      fuelType: "Gasolina",
      specs: ["330i", "258 HP", "Automático", "Gasolina"],
      image: "/bmw-serie-3-azul.png",
      detailedSpecs: {
        year: 2024,
        mileage: "5,000 km",
        transmission: "Automático",
        engine: "3.0L Turbo",
        exteriorColor: "Blanco Alpine",
        interiorColor: "Cuero Rojo",
        fuelType: "Gasolina",
        driveType: "Tracción Delantera",
        condition: "Nuevo",
        vin: "WBA1G3C50CJ345678",
        stockNumber: "AS-2024-006",
        warranty: "Garantía Extendida",
        features: "Navegación, Techo Solar, Sistema de Sonido Premium",
        safety: "ABS, Airbags, Sensores de Estacionamiento",
        entertainment: "Bluetooth, Apple CarPlay, Android Auto",
        comfort: "Asientos Calefaccionados, Tapicería de Cuero, Control de Clima Automático",
      },
    },
  ],
  "COOPER S": [
    {
      id: 7,
      year: 2023,
      model: "COOPER S",
      color: "Rojo Chili",
      km: 9000,
      price: "$32,400",
      fuelType: "Gasolina",
      specs: ["2.0L Turbo", "189 HP", "Manual", "Gasolina"],
      image: "/mini-cooper-s-rojo.png",
      detailedSpecs: {
        year: 2023,
        mileage: "9,000 km",
        transmission: "Manual",
        engine: "2.0L Turbo",
        exteriorColor: "Rojo Chili",
        interiorColor: "Cuero Rojo",
        fuelType: "Gasolina",
        driveType: "Tracción Delantera",
        condition: "Excelente",
        vin: "WBA1G3C50DJ123456",
        stockNumber: "AS-2023-007",
        warranty: "Garantía del Fabricante",
        features: "Navegación, Techo Solar, Sistema de Sonido Premium",
        safety: "ABS, Airbags, Sensores de Estacionamiento",
        entertainment: "Bluetooth, Apple CarPlay, Android Auto",
        comfort: "Asientos Calefaccionados, Tapicería de Cuero, Control de Clima Dual",
      },
    },
    {
      id: 8,
      year: 2022,
      model: "COOPER S",
      color: "Verde British Racing",
      km: 14000,
      price: "$29,800",
      fuelType: "Gasolina",
      specs: ["2.0L Turbo", "189 HP", "Automático", "Gasolina"],
      image: "/mini-cooper-s-rojo.png",
      detailedSpecs: {
        year: 2022,
        mileage: "14,000 km",
        transmission: "Automático",
        engine: "2.0L Turbo",
        exteriorColor: "Verde British Racing",
        interiorColor: "Cuero Verde",
        fuelType: "Gasolina",
        driveType: "Tracción Delantera",
        condition: "Bueno",
        vin: "WBA1G3C50EJ789012",
        stockNumber: "AS-2022-008",
        warranty: "Garantía del Fabricante",
        features: "Navegación, Techo Solar",
        safety: "ABS, Airbags",
        entertainment: "Bluetooth, Apple CarPlay",
        comfort: "Asientos Calefaccionados, Tapicería de Cuero",
      },
    },
    {
      id: 9,
      year: 2024,
      model: "COOPER S",
      color: "Blanco Pepper",
      km: 3000,
      price: "$35,600",
      fuelType: "Gasolina",
      specs: ["2.0L Turbo", "189 HP", "Manual", "Gasolina"],
      image: "/mini-cooper-s-rojo.png",
      detailedSpecs: {
        year: 2024,
        mileage: "3,000 km",
        transmission: "Manual",
        engine: "2.0L Turbo",
        exteriorColor: "Blanco Pepper",
        interiorColor: "Cuero Blanco",
        fuelType: "Gasolina",
        driveType: "Tracción Delantera",
        condition: "Nuevo",
        vin: "WBA1G3C50CJ345678",
        stockNumber: "AS-2024-009",
        warranty: "Garantía Extendida",
        features: "Navegación, Techo Solar, Sistema de Sonido Premium",
        safety: "ABS, Airbags, Sensores de Estacionamiento",
        entertainment: "Bluetooth, Apple CarPlay, Android Auto",
        comfort: "Asientos Calefaccionados, Tapicería de Cuero, Control de Clima Automático",
      },
    },
  ],
  iX: [
    {
      id: 10,
      year: 2023,
      model: "iX",
      color: "Blanco Mineral",
      km: 8500,
      price: "$235.000.000",
      fuelType: "Eléctrico",
      specs: ["xDrive50", "516 HP", "Automático", "Eléctrico"],
      image: "/bmw-ix-blanco.png",
      detailedSpecs: {
        year: 2023,
        mileage: "8,500 km",
        transmission: "Automático",
        engine: "516 HP",
        exteriorColor: "Blanco Mineral",
        interiorColor: "Cuero Gris",
        fuelType: "Eléctrico",
        driveType: "Tracción Integral",
        condition: "Excelente",
        vin: "WBA1G3C50DJ123456",
        stockNumber: "AS-2023-010",
        warranty: "Garantía del Fabricante",
        features: "Navegación, Techo Solar, Sistema de Sonido Premium",
        safety: "ABS, Airbags, Sensores de Estacionamiento",
        entertainment: "Bluetooth, Apple CarPlay, Android Auto",
        comfort: "Asientos Calefaccionados, Tapicería de Cuero, Control de Clima Automático",
      },
    },
    {
      id: 11,
      year: 2024,
      model: "iX",
      color: "Gris Storm Bay",
      km: 2000,
      price: "$340.000.000",
      fuelType: "Eléctrico",
      specs: ["xDrive50", "516 HP", "Automático", "Eléctrico"],
      image: "/bmw-ix-blanco.png",
      detailedSpecs: {
        year: 2024,
        mileage: "2,000 km",
        transmission: "Automático",
        engine: "516 HP",
        exteriorColor: "Gris Storm Bay",
        interiorColor: "Cuero Blanco",
        fuelType: "Eléctrico",
        driveType: "Tracción Integral",
        condition: "Nuevo",
        vin: "WBA1G3C50EJ789012",
        stockNumber: "AS-2024-011",
        warranty: "Garantía Extendida",
        features: "Navegación, Techo Solar, Sistema de Sonido Premium",
        safety: "ABS, Airbags, Sensores de Estacionamiento",
        entertainment: "Bluetooth, Apple CarPlay, Android Auto",
        comfort: "Asientos Calefaccionados, Tapicería de Cuero, Control de Clima Automático",
      },
    },
  ],
}

export default function StockPage() {
  const [selectedCategory, setSelectedCategory] = useState("bmw")
  const [selectedModel, setSelectedModel] = useState("")
  const [showInventory, setShowInventory] = useState(false)
  const [selectedVehicle, setSelectedVehicle] = useState(null)
  const [showVehicleDetails, setShowVehicleDetails] = useState(false)
  const router = useRouter()

  const currentCategory = vehicleCategories.find((cat) => cat.id === selectedCategory)
  const currentImage = selectedModel ? modelImages[selectedModel as keyof typeof modelImages] : modelImages["SERIE 3"]
  const currentInventory = selectedModel ? vehicleInventory[selectedModel as keyof typeof vehicleInventory] || [] : []


  const handleModelSelect = (model: string) => {
    setSelectedModel(model)
    setShowInventory(false)
  }

  const handleShowInventory = () => {
    if (selectedModel && currentInventory.length > 0) {
      setShowInventory(true)
    }
  }

  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategory(categoryId)
    setSelectedModel("")
    setShowInventory(false)
  }

  const handleVehicleReserve = (vehicle) => {
    setSelectedVehicle(vehicle)
    setShowVehicleDetails(true)
  }

  const handleBackToInventory = () => {
    setShowVehicleDetails(false)
    setSelectedVehicle(null)
  }

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Navigation */}
      <Navbar />

      {/* Category Navigation - Sticky to page */}
      <div className="sticky top-20 z-20 w-80 bg-gray-50 border-b border-gray-200">
        <div className="px-12 py-4">
          <div className="relative">
            <div className="flex space-x-8">
              {vehicleCategories.map((category, index) => (
                <button
                  key={category.id}
                  onClick={() => handleCategoryChange(category.id)}
                  className={`relative px-2 py-3 text-sm font-medium transition-colors duration-300 ${
                    selectedCategory === category.id ? "text-blue-600" : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>

            {/* Sliding underline indicator */}
            <motion.div
              className="absolute bottom-0 h-0.5 bg-blue-600"
              initial={false}
              animate={{
                x: selectedCategory === "bmw" ? 0 : selectedCategory === "mini" ? 80 : 200,
                width: selectedCategory === "bmw" ? 40 : selectedCategory === "mini" ? 100 : 60,
              }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            />
          </div>
        </div>
      </div>

      <div className="flex min-h-screen">
        {/* Left Sidebar */}
        <div className="w-80 bg-gray-50 border-r border-gray-200 h-screen flex flex-col overflow-hidden">

          {/* Model List */}
          <div className="px-12 py-4 pt-8 flex-1 overflow-y-auto">
            <h3 className="text-lg font-bold mb-4 text-gray-900">{currentCategory?.name}</h3>
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedCategory}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="space-y-2"
              >
                {currentCategory?.models.map((model, index) => (
                  <motion.button
                    key={model}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    onClick={() => handleModelSelect(model)}
                    className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-300 ${
                      selectedModel === model
                        ? "text-blue-600 text-lg font-semibold transform scale-105"
                        : "text-gray-500 text-sm hover:text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    <motion.div
                      className="font-medium"
                      animate={{
                        scale: selectedModel === model ? 1.05 : 1,
                        color: selectedModel === model ? "#2563eb" : "#6b7280",
                      }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      {model}
                    </motion.div>
                  </motion.button>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-y-auto">
          {showVehicleDetails && selectedVehicle ? (
            <div className="p-8 bg-white min-h-full">
              <div className="mb-6">
                <button
                  onClick={handleBackToInventory}
                  className="flex items-center text-gray-600 hover:text-blue-600 transition-colors mb-4"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Volver al inventario
                </button>
                <div className="text-sm text-gray-500 mb-2">
                  Inventario / Usado / {selectedVehicle.year} {selectedModel}
                </div>
              </div>

              <div className="max-w-6xl mx-auto">
                {/* Vehicle Image */}
                <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden mb-8">
                  <Image
                    src={selectedVehicle.image || currentImage}
                    alt={`${selectedVehicle.year} ${selectedModel}`}
                    width={1200}
                    height={600}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Vehicle Title and Description */}
                <div className="mb-8">
                  <h1 className="text-section-title text-white mb-4">
                    {selectedVehicle.year} {selectedModel}
                  </h1>
                  <p className="text-gray-300 leading-relaxed">
                    Este {selectedVehicle.year} {selectedModel} es un testimonio de lujo y rendimiento. Con su diseño
                    elegante y motor potente, ofrece una experiencia de conducción incomparable. El interior está
                    elaborado con materiales premium, asegurando comodidad y sofisticación en cada viaje.
                  </p>
                </div>

                {/* Specifications */}
                <div className="mb-8">
                  <h2 className="text-card-title text-white mb-6">Especificaciones</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="flex justify-between py-3 border-b border-gray-700">
                        <span className="text-gray-400">Año</span>
                        <span className="text-white">{selectedVehicle.detailedSpecs.year}</span>
                      </div>
                      <div className="flex justify-between py-3 border-b border-gray-700">
                        <span className="text-gray-400">Kilometraje</span>
                        <span className="text-white">{selectedVehicle.detailedSpecs.mileage}</span>
                      </div>
                      <div className="flex justify-between py-3 border-b border-gray-700">
                        <span className="text-gray-400">Transmisión</span>
                        <span className="text-white">{selectedVehicle.detailedSpecs.transmission}</span>
                      </div>
                      <div className="flex justify-between py-3 border-b border-gray-700">
                        <span className="text-gray-400">Motor</span>
                        <span className="text-white">{selectedVehicle.detailedSpecs.engine}</span>
                      </div>
                      <div className="flex justify-between py-3 border-b border-gray-700">
                        <span className="text-gray-400">Color Exterior</span>
                        <span className="text-white">{selectedVehicle.detailedSpecs.exteriorColor}</span>
                      </div>
                      <div className="flex justify-between py-3 border-b border-gray-700">
                        <span className="text-gray-400">Color Interior</span>
                        <span className="text-white">{selectedVehicle.detailedSpecs.interiorColor}</span>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="flex justify-between py-3 border-b border-gray-700">
                        <span className="text-gray-400">Tipo de Combustible</span>
                        <span className="text-white">{selectedVehicle.detailedSpecs.fuelType}</span>
                      </div>
                      <div className="flex justify-between py-3 border-b border-gray-700">
                        <span className="text-gray-400">Tipo de Tracción</span>
                        <span className="text-white">{selectedVehicle.detailedSpecs.driveType}</span>
                      </div>
                      <div className="flex justify-between py-3 border-b border-gray-700">
                        <span className="text-gray-400">Condición</span>
                        <span className="text-white">{selectedVehicle.detailedSpecs.condition}</span>
                      </div>
                      <div className="flex justify-between py-3 border-b border-gray-700">
                        <span className="text-gray-400">VIN</span>
                        <span className="text-white">{selectedVehicle.detailedSpecs.vin}</span>
                      </div>
                      <div className="flex justify-between py-3 border-b border-gray-700">
                        <span className="text-gray-400">Número de Stock</span>
                        <span className="text-white">{selectedVehicle.detailedSpecs.stockNumber}</span>
                      </div>
                      <div className="flex justify-between py-3 border-b border-gray-700">
                        <span className="text-gray-400">Garantía</span>
                        <span className="text-white">{selectedVehicle.detailedSpecs.warranty}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Additional Details */}
                <div className="mb-8">
                  <h2 className="text-card-title text-white mb-6">Detalles Adicionales</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="py-3 border-b border-gray-700">
                        <span className="text-gray-400 block mb-2">Características</span>
                        <span className="text-white">{selectedVehicle.detailedSpecs.features}</span>
                      </div>
                      <div className="py-3 border-b border-gray-700">
                        <span className="text-gray-400 block mb-2">Seguridad</span>
                        <span className="text-white">{selectedVehicle.detailedSpecs.safety}</span>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="py-3 border-b border-gray-700">
                        <span className="text-gray-400 block mb-2">Entretenimiento</span>
                        <span className="text-white">{selectedVehicle.detailedSpecs.entertainment}</span>
                      </div>
                      <div className="py-3 border-b border-gray-700">
                        <span className="text-gray-400 block mb-2">Comodidad</span>
                        <span className="text-white">{selectedVehicle.detailedSpecs.comfort}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Reserve Button */}
                <div className="text-center">
                  <button
                    onClick={() =>
                      window.open(
                        `https://wa.me/573195792747?text=Hola, estoy interesado en reservar el ${selectedVehicle.year} ${selectedModel} por ${selectedVehicle.price}`,
                        "_blank",
                      )
                    }
                    className="bg-blue-600 text-white px-12 py-4 text-xl font-bold rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Reservar por {selectedVehicle.price}
                  </button>
                </div>
              </div>
            </div>
          ) : !showInventory ? (
            <div className="relative h-screen min-h-screen">
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedModel || "default"}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0"
                >
                  <Image
                    src={currentImage || "/placeholder.svg"}
                    alt={selectedModel || "Vehículo"}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-white/60 via-transparent to-white/30" />
                </motion.div>
              </AnimatePresence>

              {/* Content Overlay */}
              <div className="absolute inset-0 flex items-center justify-between p-12">
                <div className="max-w-lg">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                  >
                    <h1 className="text-hero-title mb-4 leading-tight text-gray-900">
                      {selectedModel || "SELECCIONA UN MODELO"}
                    </h1>
                    <p className="text-hero-description text-gray-700 mb-6 italic">The Others Just Travel.</p>

                    {selectedModel && currentInventory.length > 0 && (
                      <div className="flex items-center space-x-4">
                        <button
                          onClick={handleShowInventory}
                          className="bg-blue-600 text-white px-8 py-3 font-bold rounded-lg hover:bg-blue-700 transition-colors"
                        >
                          VER DISPONIBLES ({currentInventory.length})
                        </button>
                      </div>
                    )}

                    {selectedModel && currentInventory.length === 0 && (
                      <div className="flex items-center space-x-4">
                        <button className="bg-gray-400 text-white px-8 py-3 font-bold rounded-lg cursor-not-allowed">
                          SIN STOCK DISPONIBLE
                        </button>
                      </div>
                    )}
                  </motion.div>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-8 bg-white">
              <div className="mb-8">
                <button onClick={() => setShowInventory(false)} className="text-blue-600 hover:text-blue-700 mb-4">
                  ← Volver a {selectedModel}
                </button>
                <h1 className="text-section-title mb-2 text-gray-900">{selectedModel} - Vehículos Disponibles</h1>
                <p className="text-gray-600">Encontramos {currentInventory.length} vehículos disponibles</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {currentInventory.map((vehicle) => (
                  <motion.div
                    key={vehicle.id}
                    className="bg-white rounded-xl overflow-hidden shadow-lg border border-gray-200 relative group cursor-pointer"
                    whileHover={{ scale: 1.05, y: -5 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                  >
                    <div className="aspect-video bg-gray-100 relative overflow-hidden">
                      <Image
                        src={vehicle.image || currentImage}
                        alt={`${selectedModel} ${vehicle.color}`}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute top-4 left-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            vehicle.fuelType === "Eléctrico"
                              ? "bg-green-100 text-green-800"
                              : vehicle.fuelType === "Híbrido"
                                ? "bg-blue-100 text-blue-800"
                                : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {vehicle.fuelType}
                        </span>
                      </div>
                    </div>

                    <div className="p-6">
                      <div className="mb-4">
                        <h3 className="text-xl font-bold text-gray-900 mb-1">{vehicle.model}</h3>
                        <p className="text-gray-600 text-sm">
                          {vehicle.year} • {vehicle.color}
                        </p>
                        <p className="text-gray-500 text-sm">{vehicle.km.toLocaleString()} km</p>
                      </div>

                      <div className="flex justify-between items-end">
                        <div>
                          <div className="text-2xl font-bold text-blue-600 mb-2">{vehicle.price}</div>
                        </div>
                        <button
                          onClick={() => handleVehicleReserve(vehicle)}
                          className="text-blue-600 hover:text-blue-800 font-medium text-sm transition-colors duration-200 flex items-center group"
                        >
                          reservar
                          <motion.span
                            className="ml-1"
                            animate={{ x: 0 }}
                            whileHover={{ x: 3 }}
                            transition={{ duration: 0.2 }}
                          >
                            →
                          </motion.span>
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Footer */}
      <Footer />
    </div>
  )
}
