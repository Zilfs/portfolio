"use client"

import { useState, useEffect } from "react"
import { SplashScreen } from "@/components/SplashScreen"
import { CustomCursor } from "@/components/CustomCursor"
import { Navbar } from "@/components/Navbar"
import { ScrollProgress } from "@/components/ScrollProgress"
import { Hero } from "@/components/sections/Hero"
import { About } from "@/components/sections/About"
import { Projects } from "@/components/sections/Projects"
import { TechStack } from "@/components/sections/TechStack"
import { Contact } from "@/components/sections/Contact"
import { Footer } from "@/components/Footer"

export default function Home() {
  const [showSplash, setShowSplash] = useState(true)
  const [easterEgg, setEasterEgg] = useState(false)

  // Easter egg: typing "hack" triggers glitch effect
  useEffect(() => {
    let buffer = ""
    const handleKeyPress = (e: KeyboardEvent) => {
      buffer += e.key.toLowerCase()
      if (buffer.length > 4) {
        buffer = buffer.slice(-4)
      }
      if (buffer === "hack") {
        setEasterEgg(true)
        setTimeout(() => setEasterEgg(false), 2000)
        buffer = ""
      }
    }

    window.addEventListener("keypress", handleKeyPress)
    return () => window.removeEventListener("keypress", handleKeyPress)
  }, [])

  return (
    <main className="relative noise-overlay">
      {/* Custom cursor */}
      <CustomCursor />

      {/* Splash screen */}
      {showSplash && <SplashScreen onComplete={() => setShowSplash(false)} />}

      {/* Easter egg glitch overlay */}
      {easterEgg && (
        <div className="fixed inset-0 z-[200] pointer-events-none">
          <div className="absolute inset-0 bg-primary/10 animate-pulse" />
          <div
            className="absolute inset-0 opacity-50"
            style={{
              backgroundImage: `repeating-linear-gradient(
                0deg,
                transparent,
                transparent 2px,
                rgba(0, 245, 255, 0.1) 2px,
                rgba(0, 245, 255, 0.1) 4px
              )`,
            }}
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="glitch font-mono text-4xl md:text-6xl font-bold text-primary" data-text="ACCESS GRANTED">
              ACCESS GRANTED
            </span>
          </div>
        </div>
      )}

      {/* Navigation */}
      <Navbar />

      {/* Scroll progress */}
      <ScrollProgress />

      {/* Main content sections */}
      <Hero />
      <About />
      <Projects />
      <TechStack />
      <Contact />

      {/* Footer */}
      <Footer />
    </main>
  )
}
