"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Menu, X } from "lucide-react"

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

const vehicleFilters = [
  { id: "all", name: "VER TODOS", icon: "🚗" },
  { id: "electric", name: "ELÉCTRICOS", icon: "⚡" },
  { id: "sport", name: "DEPORTIVOS", icon: "🏎️" },
  { id: "luxury", name: "PREMIUM", icon: "✨" },
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
      color: "Azul Metalico",
      km: 15000,
      price: "$28,500",
      specs: ["118i", "140 HP", "Manual", "Gasolina"],
    },
    {
      id: 2,
      year: 2023,
      color: "Blanco Alpine",
      km: 8000,
      price: "$31,200",
      specs: ["120i", "178 HP", "Automático", "Gasolina"],
    },
    {
      id: 3,
      year: 2021,
      color: "Negro Zafiro",
      km: 22000,
      price: "$26,800",
      specs: ["118d", "150 HP", "Manual", "Diesel"],
    },
  ],
  "SERIE 3": [
    {
      id: 4,
      year: 2023,
      color: "Azul Storm Bay",
      km: 12000,
      price: "$42,500",
      specs: ["320i", "184 HP", "Automático", "Gasolina"],
    },
    {
      id: 5,
      year: 2022,
      color: "Gris Mineral",
      km: 18000,
      price: "$39,800",
      specs: ["318d", "150 HP", "Automático", "Diesel"],
    },
    {
      id: 6,
      year: 2024,
      color: "Blanco Alpine",
      km: 5000,
      price: "$48,900",
      specs: ["330i", "258 HP", "Automático", "Gasolina"],
    },
  ],
  "COOPER S": [
    {
      id: 7,
      year: 2023,
      color: "Rojo Chili",
      km: 9000,
      price: "$32,400",
      specs: ["2.0L Turbo", "189 HP", "Manual", "Gasolina"],
    },
    {
      id: 8,
      year: 2022,
      color: "Verde British Racing",
      km: 14000,
      price: "$29,800",
      specs: ["2.0L Turbo", "189 HP", "Automático", "Gasolina"],
    },
    {
      id: 9,
      year: 2024,
      color: "Blanco Pepper",
      km: 3000,
      price: "$35,600",
      specs: ["2.0L Turbo", "189 HP", "Manual", "Gasolina"],
    },
  ],
  iX: [
    {
      id: 10,
      year: 2023,
      color: "Blanco Mineral",
      km: 8500,
      price: "$78,900",
      specs: ["xDrive50", "516 HP", "Automático", "Eléctrico"],
    },
    {
      id: 11,
      year: 2024,
      color: "Gris Storm Bay",
      km: 2000,
      price: "$85,400",
      specs: ["xDrive50", "516 HP", "Automático", "Eléctrico"],
    },
  ],
}

export default function StockPage() {
  const [selectedCategory, setSelectedCategory] = useState("bmw")
  const [selectedModel, setSelectedModel] = useState("")
  const [selectedFilter, setSelectedFilter] = useState("all")
  const [showInventory, setShowInventory] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const router = useRouter()

  const currentCategory = vehicleCategories.find((cat) => cat.id === selectedCategory)
  const currentImage = selectedModel ? modelImages[selectedModel as keyof typeof modelImages] : modelImages["SERIE 3"]
  const currentInventory = selectedModel ? vehicleInventory[selectedModel as keyof typeof vehicleInventory] || [] : []

  const navItems = [
    { name: "Inicio", href: "/", type: "navigate" },
    { name: "Stock", href: "/stock", type: "navigate" },
    { name: "Vehículos", href: "/#vehicles", type: "navigate" },
    { name: "Testimonios", href: "/#testimonials", type: "navigate" },
    { name: "Contacto", href: "/#contact", type: "navigate" },
  ]

  const handleNavigation = (item: { href: string; type: string }) => {
    if (item.type === "navigate") {
      router.push(item.href)
    }
    setIsMenuOpen(false)
  }

  const handleModelSelect = (model: string) => {
    setSelectedModel(model)
    setShowInventory(false)
  }

  const handleShowInventory = () => {
    if (selectedModel && currentInventory.length > 0) {
      setShowInventory(true)
    }
  }

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-sm border-b border-gray-200">
        <div className="flex items-center justify-between p-6 md:p-8">
          {/* Logo/Brand */}
          <div className="flex items-center space-x-3">
            <img
              src="https://87autos.com/cdn/shop/files/logos-04_224ff7b9-c066-40d8-a14b-4ffa0f0a2efa.png?v=1727127568&width=200"
              alt="87 Autos Logo"
              className="h-8 w-auto"
            />
            <div className="text-gray-900 font-bold text-xl tracking-wider">87 AUTOS</div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => handleNavigation(item)}
                className={`relative hover:text-blue-600 transition-colors duration-300 font-medium tracking-wide pb-1 group ${
                  item.name === "Stock" ? "text-blue-600" : "text-gray-900"
                }`}
              >
                {item.name}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-500 transition-all duration-300 ease-out group-hover:w-full"></span>
              </button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-900 hover:text-blue-600 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="absolute top-0 left-0 w-full h-screen bg-white/95 md:hidden">
            <div className="flex flex-col items-center justify-center h-full space-y-8">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => handleNavigation(item)}
                  className="text-gray-900 text-2xl font-bold tracking-wider hover:text-blue-600 transition-colors duration-300"
                >
                  {item.name}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      <div className="flex pt-20">
        {/* Left Sidebar */}
        <div className="w-80 bg-gray-50 border-r border-gray-200 overflow-y-auto h-screen">
          {/* Category Tabs */}
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex space-x-1">
              {vehicleCategories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => {
                    setSelectedCategory(category.id)
                    setSelectedModel("")
                    setShowInventory(false)
                  }}
                  className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                    selectedCategory === category.id
                      ? "bg-blue-600 text-white"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>

          {/* Filters */}
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="grid grid-cols-2 gap-2">
              {vehicleFilters.map((filter) => (
                <button
                  key={filter.id}
                  onClick={() => setSelectedFilter(filter.id)}
                  className={`p-3 text-xs font-medium rounded-lg transition-colors text-left ${
                    selectedFilter === filter.id
                      ? "bg-gray-200 text-gray-900"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <span>{filter.icon}</span>
                    <span>{filter.name}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Model List */}
          <div className="px-6 py-4">
            <h3 className="text-lg font-bold mb-4 text-gray-900">{currentCategory?.name}</h3>
            <div className="space-y-2">
              {currentCategory?.models.map((model) => (
                <button
                  key={model}
                  onClick={() => handleModelSelect(model)}
                  className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                    selectedModel === model
                      ? "bg-blue-600 text-white"
                      : "text-gray-700 hover:text-gray-900 hover:bg-gray-100"
                  }`}
                >
                  <div className="font-medium">{model}</div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          {!showInventory ? (
            // Model Display
            <div className="relative h-screen">
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
              <div className="absolute inset-0 flex items-end justify-between p-12">
                <div className="max-w-lg">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                  >
                    <h1 className="text-5xl md:text-7xl font-black mb-4 leading-tight text-gray-900">
                      {selectedModel || "SELECCIONA UN MODELO"}
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-700 mb-6 italic">The Others Just Travel.</p>

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
                <h1 className="text-4xl font-bold mb-2 text-gray-900">{selectedModel} - Vehículos Disponibles</h1>
                <p className="text-gray-600">Encontramos {currentInventory.length} vehículos disponibles</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {currentInventory.map((vehicle) => (
                  <div
                    key={vehicle.id}
                    className="bg-gray-50 rounded-lg overflow-hidden hover:bg-gray-100 transition-colors border border-gray-200"
                  >
                    <div className="aspect-video bg-gray-200 relative">
                      <Image
                        src={currentImage || "/placeholder.svg"}
                        alt={`${selectedModel} ${vehicle.color}`}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-xl font-bold text-gray-900">
                            {selectedModel} {vehicle.year}
                          </h3>
                          <p className="text-gray-600">
                            {vehicle.color} • {vehicle.km.toLocaleString()} km
                          </p>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-blue-600">{vehicle.price}</div>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2 mb-4">
                        {vehicle.specs.map((spec, index) => (
                          <span key={index} className="px-2 py-1 bg-gray-200 rounded text-sm text-gray-700">
                            {spec}
                          </span>
                        ))}
                      </div>

                      <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 transition-colors">
                        RESERVAR
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
