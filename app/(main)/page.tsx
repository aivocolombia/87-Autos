"use client"

import HeroSection from "../../hero-section"
import { TextGradientScroll } from "@/components/ui/text-gradient-scroll"
import { Timeline } from "@/components/ui/timeline"
import "../../app/globals.css"
import SmoothScrollHero from "@/components/ui/smooth-scroll-hero"
import ScrollLogoAnimation from "@/components/ui/scroll-logo-animation"
import Chatbot from "../../components/chatbot"
import Navbar from "../../components/navbar"

export default function Page() {
  const missionStatement =
    "En 87 Autos, creemos que conducir no es solo transporte, es una experiencia. Especializados en BMW y Mini Cooper, ofrecemos vehículos premium que combinan ingeniería alemana, diseño innovador y tecnología de vanguardia. Cada auto en nuestro showroom ha sido cuidadosamente seleccionado para brindar la máxima calidad, rendimiento y elegancia. Desde el deportivo Mini Cooper hasta los lujosos sedanes BMW, tenemos el vehículo perfecto para tu estilo de vida. Únete a la familia 87 Autos y descubre la diferencia de conducir auténtica ingeniería alemana."

  const timelineEntries = [
    {
      id: 1,
      image: "/luxury-sedan-showroom.png",
      alt: "BMW sedan de lujo en showroom",
      title: "Ingeniería Alemana",
      description:
        "Cada BMW representa décadas de innovación automotriz. Desde nuestros sedanes ejecutivos hasta nuestros SUV familiares, cada vehículo está diseñado para ofrecer la combinación perfecta de lujo, tecnología y rendimiento. ¿Estás listo para experimentar la diferencia BMW?",
      layout: "left" as const,
    },
    {
      id: 2,
      image: "/placeholder-zqug9.png",
      alt: "Mini Cooper en entorno urbano",
      title: "Estilo Único",
      description:
        "Mini Cooper no es solo un auto, es una declaración de estilo. Con su diseño icónico, personalización infinita y agilidad urbana incomparable, cada Mini es tan único como su conductor. Desde el clásico Cooper hasta el eléctrico Cooper SE, encuentra tu personalidad sobre ruedas.",
      layout: "right" as const,
    },
    {
      id: 3,
      image: "/bmw-mini-dealership.png",
      alt: "Vehículos BMW y Mini Cooper en concesionario premium",
      title: "Tu Próximo Auto Te Espera",
      description:
        "En 87 Autos, no solo vendemos autos, creamos experiencias. Nuestro equipo de expertos te guiará para encontrar el vehículo perfecto que se adapte a tu estilo de vida, presupuesto y sueños. Con financiamiento flexible y garantía extendida, hacer realidad tu auto ideal nunca fue tan fácil.",
      layout: "left" as const,
    },
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <Navbar />

      {/* Hero Section */}
      <HeroSection />

      {/* Mission Statement Section with Grid Background */}
      <section id="mission" className="relative min-h-screen flex items-center justify-center py-20 bg-white">
        {/* Subtle Grid Pattern */}
        <div className="absolute inset-0 bg-grid-subtle opacity-30 pointer-events-none" />

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-6xl font-black tracking-wider mb-12 text-gray-900">NUESTRA MISIÓN</h2>
            <TextGradientScroll
              text={missionStatement}
              className="text-2xl md:text-3xl lg:text-4xl font-medium leading-relaxed text-gray-800"
              type="word"
              textOpacity="soft"
            />
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section id="vehicles" className="relative py-20 bg-white">
        {/* Subtle Grid Pattern */}
        <div className="absolute inset-0 bg-grid-subtle opacity-30 pointer-events-none" />

        <div className="relative z-10">
          <div className="container mx-auto px-6 mb-16">
            <div className="text-center">
              <h2 className="text-4xl md:text-6xl font-black tracking-wider mb-6 text-gray-900">CALIDAD PREMIUM</h2>
              <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto">
                Descubre por qué BMW y Mini Cooper son sinónimo de excelencia automotriz y estilo incomparable.
              </p>
            </div>
          </div>

          <Timeline entries={timelineEntries} />
        </div>
      </section>


      {/* Animated Logo Section */}
      <section id="animated-logo" className="relative">
        <ScrollLogoAnimation />
      </section>

      <Chatbot />
    </div>
  )
}
