"use client"

import { useEffect } from "react"
import Navbar from "../../components/navbar"

export default function ExpertosPage() {
  useEffect(() => {
    // Redirect to the HTML page in public folder
    window.location.href = "/expertos.html"
  }, [])

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex items-center justify-center pt-20">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando página de expertos...</p>
        </div>
      </div>
    </>
  )
}