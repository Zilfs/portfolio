"use client"

import { motion } from "framer-motion"
import { TypeAnimation } from "react-type-animation"
import { FaGithub, FaLinkedin } from "react-icons/fa"
import { useMousePosition } from "@/hooks/useMousePosition"

export function Hero() {
  const mousePosition = useMousePosition()

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Animated gradient mesh background */}
      <div className="absolute inset-0 gradient-mesh" />

      {/* Dot matrix pattern */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)`,
          backgroundSize: "40px 40px",
        }}
      />

      {/* Floating particles that react to mouse */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full bg-primary/30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              x: (mousePosition.x - window.innerWidth / 2) * 0.02 * (i % 3 + 1),
              y: (mousePosition.y - window.innerHeight / 2) * 0.02 * (i % 3 + 1),
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              x: { type: "spring", stiffness: 50 },
              y: { type: "spring", stiffness: 50 },
              scale: { duration: 3 + i * 0.5, repeat: Infinity },
              opacity: { duration: 3 + i * 0.5, repeat: Infinity },
            }}
          />
        ))}
      </div>

      {/* Floating abstract shapes */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-primary/5 blur-3xl"
        animate={{
          x: (mousePosition.x - window.innerWidth / 2) * 0.03,
          y: (mousePosition.y - window.innerHeight / 2) * 0.03,
          scale: [1, 1.1, 1],
        }}
        transition={{
          x: { type: "spring", stiffness: 30 },
          y: { type: "spring", stiffness: 30 },
          scale: { duration: 8, repeat: Infinity },
        }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-secondary/5 blur-3xl"
        animate={{
          x: (mousePosition.x - window.innerWidth / 2) * -0.02,
          y: (mousePosition.y - window.innerHeight / 2) * -0.02,
          scale: [1.1, 1, 1.1],
        }}
        transition={{
          x: { type: "spring", stiffness: 20 },
          y: { type: "spring", stiffness: 20 },
          scale: { duration: 10, repeat: Infinity },
        }}
      />

      {/* Main content */}
      <div className="relative z-10 text-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 2.8 }}
        >
          {/* Greeting */}
          <motion.p
            className="font-mono text-primary text-sm md:text-base mb-4 tracking-widest"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 3 }}
          >
            {"// WELCOME TO MY PORTFOLIO"}
          </motion.p>

          {/* Main heading */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6">
            {"Hi, I'm "}
            <span className="text-primary text-glow-cyan">Your Name</span>
          </h1>

          {/* Typewriter effect */}
          <div className="h-12 md:h-16 flex items-center justify-center">
            <span className="font-mono text-xl md:text-3xl text-foreground/80">
              {"I'm a "}
              <TypeAnimation
                sequence={[
                  "Frontend Developer",
                  1500,
                  "Backend Developer",
                  1500,
                  "Web Developer",
                  1500,
                  "Cyber Security Enthusiast",
                  1500,
                ]}
                wrapper="span"
                speed={50}
                repeat={Infinity}
                className="text-secondary"
              />
            </span>
          </div>

          {/* Subtitle */}
          <motion.p
            className="mt-6 text-foreground/60 max-w-xl mx-auto text-base md:text-lg leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 3.2 }}
          >
            Building secure, scalable, and beautiful digital experiences
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-wrap items-center justify-center gap-4 mt-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 3.4 }}
          >
            <motion.a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative px-6 py-3 glass rounded-xl flex items-center gap-3 cursor-pointer overflow-hidden"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="absolute inset-0 bg-primary/0 group-hover:bg-primary/10 transition-colors" />
              <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity glow-cyan" />
              <FaGithub className="w-5 h-5 relative z-10" />
              <span className="font-mono text-sm relative z-10">GitHub</span>
            </motion.a>

            <motion.a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative px-6 py-3 glass rounded-xl flex items-center gap-3 cursor-pointer overflow-hidden"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="absolute inset-0 bg-secondary/0 group-hover:bg-secondary/10 transition-colors" />
              <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity glow-magenta" />
              <FaLinkedin className="w-5 h-5 relative z-10" />
              <span className="font-mono text-sm relative z-10">LinkedIn</span>
            </motion.a>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 4 }}
        >
          <motion.div
            className="w-6 h-10 rounded-full border-2 border-foreground/30 flex justify-center pt-2"
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <motion.div
              className="w-1.5 h-2.5 rounded-full bg-primary"
              animate={{ y: [0, 12, 0], opacity: [1, 0.3, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
