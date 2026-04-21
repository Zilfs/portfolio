"use client"

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const [isHovering, setIsHovering] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [isMobile, setIsMobile] = useState(true)

  useEffect(() => {
    // Check if device has a fine pointer (mouse)
    const mediaQuery = window.matchMedia("(pointer: fine)")
    setIsMobile(!mediaQuery.matches)

    const handleChange = (e: MediaQueryListEvent) => {
      setIsMobile(!e.matches)
    }

    mediaQuery.addEventListener("change", handleChange)
    return () => mediaQuery.removeEventListener("change", handleChange)
  }, [])

  useEffect(() => {
    if (isMobile) return

    const cursor = cursorRef.current
    const ring = ringRef.current
    if (!cursor || !ring) return

    let cursorX = 0
    let cursorY = 0
    let ringX = 0
    let ringY = 0

    const handleMouseMove = (e: MouseEvent) => {
      cursorX = e.clientX
      cursorY = e.clientY
      setIsVisible(true)
    }

    const handleMouseLeave = () => {
      setIsVisible(false)
    }

    const handleMouseEnter = () => {
      setIsVisible(true)
    }

    // Check for interactive elements
    const handleElementHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const isInteractive =
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("a") ||
        target.closest("button") ||
        target.classList.contains("cursor-pointer") ||
        target.closest(".cursor-pointer")

      setIsHovering(!!isInteractive)
    }

    // Smooth lerp animation
    const animate = () => {
      const lerpFactor = 0.15
      const ringLerpFactor = 0.08

      const dx = cursorX - parseFloat(cursor.style.left || "0")
      const dy = cursorY - parseFloat(cursor.style.top || "0")
      const rdx = cursorX - parseFloat(ring.style.left || "0")
      const rdy = cursorY - parseFloat(ring.style.top || "0")

      cursor.style.left = `${parseFloat(cursor.style.left || "0") + dx * lerpFactor}px`
      cursor.style.top = `${parseFloat(cursor.style.top || "0") + dy * lerpFactor}px`

      ring.style.left = `${parseFloat(ring.style.left || "0") + rdx * ringLerpFactor}px`
      ring.style.top = `${parseFloat(ring.style.top || "0") + rdy * ringLerpFactor}px`

      requestAnimationFrame(animate)
    }

    document.addEventListener("mousemove", handleMouseMove)
    document.addEventListener("mousemove", handleElementHover)
    document.addEventListener("mouseleave", handleMouseLeave)
    document.addEventListener("mouseenter", handleMouseEnter)

    const animationId = requestAnimationFrame(animate)

    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mousemove", handleElementHover)
      document.removeEventListener("mouseleave", handleMouseLeave)
      document.removeEventListener("mouseenter", handleMouseEnter)
      cancelAnimationFrame(animationId)
    }
  }, [isMobile])

  if (isMobile) return null

  return (
    <>
      {/* Main cursor dot */}
      <motion.div
        ref={cursorRef}
        className="fixed pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 mix-blend-difference"
        initial={{ opacity: 0 }}
        animate={{
          opacity: isVisible ? 1 : 0,
          scale: isHovering ? 1.5 : 1,
        }}
        transition={{ duration: 0.15 }}
        style={{ left: 0, top: 0 }}
      >
        <div
          className={`rounded-full transition-all duration-200 ${
            isHovering
              ? "w-5 h-5 bg-secondary"
              : "w-4 h-4 bg-primary"
          }`}
          style={{
            boxShadow: isHovering
              ? "0 0 20px rgba(255, 0, 170, 0.8), 0 0 40px rgba(255, 0, 170, 0.4)"
              : "0 0 15px rgba(0, 245, 255, 0.8), 0 0 30px rgba(0, 245, 255, 0.4)",
          }}
        />
      </motion.div>

      {/* Outer ring */}
      <motion.div
        ref={ringRef}
        className="fixed pointer-events-none z-[9998] -translate-x-1/2 -translate-y-1/2"
        initial={{ opacity: 0 }}
        animate={{
          opacity: isVisible ? 0.5 : 0,
          scale: isHovering ? 1.3 : 1,
        }}
        transition={{ duration: 0.2 }}
        style={{ left: 0, top: 0 }}
      >
        <div
          className={`rounded-full border transition-all duration-300 ${
            isHovering
              ? "w-16 h-16 border-secondary/50"
              : "w-14 h-14 border-primary/30"
          }`}
        />
      </motion.div>

      {/* Hide default cursor */}
      <style jsx global>{`
        * {
          cursor: none !important;
        }
      `}</style>
    </>
  )
}
