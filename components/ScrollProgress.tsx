"use client"

import { motion, useScroll, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"
import { FiArrowUp } from "react-icons/fi"

const sections = ["home", "about", "projects", "stack", "contact"]

export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const [activeSection, setActiveSection] = useState(0)
  const [showScrollTop, setShowScrollTop] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 2

      setShowScrollTop(window.scrollY > 500)

      sections.forEach((section, index) => {
        const element = document.getElementById(section)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(index)
          }
        }
      })
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const scrollToSection = (index: number) => {
    const element = document.getElementById(sections[index])
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <>
      {/* Progress bar at top */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary to-secondary origin-left z-[60]"
        style={{ scaleX: scrollYProgress }}
      />

      {/* Section dots on right side */}
      <div className="fixed right-6 top-1/2 -translate-y-1/2 z-50 hidden md:flex flex-col gap-3">
        {sections.map((section, index) => (
          <motion.button
            key={section}
            onClick={() => scrollToSection(index)}
            className="group relative w-3 h-3 cursor-pointer"
            whileHover={{ scale: 1.3 }}
            aria-label={`Go to ${section} section`}
          >
            <motion.div
              className={`w-full h-full rounded-full transition-colors ${
                activeSection === index
                  ? "bg-primary"
                  : "bg-foreground/20 group-hover:bg-foreground/40"
              }`}
              animate={{
                scale: activeSection === index ? 1 : 0.7,
              }}
            />
            {activeSection === index && (
              <motion.div
                layoutId="activeDot"
                className="absolute inset-0 rounded-full border-2 border-primary"
                style={{ scale: 1.5 }}
              />
            )}

            {/* Tooltip */}
            <span className="absolute right-6 top-1/2 -translate-y-1/2 px-2 py-1 text-xs font-mono bg-background/90 text-foreground rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none capitalize">
              {section}
            </span>
          </motion.button>
        ))}
      </div>

      {/* Scroll to top button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            onClick={scrollToTop}
            className="fixed bottom-6 right-6 z-50 p-3 glass rounded-full cursor-pointer glow-cyan"
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Scroll to top"
          >
            <FiArrowUp className="w-5 h-5 text-primary" />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  )
}
