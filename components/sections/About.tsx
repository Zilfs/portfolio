"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"

const skills = [
  { name: "Frontend Development", level: 90 },
  { name: "Backend Development", level: 85 },
  { name: "Cybersecurity", level: 80 },
  { name: "Database Design", level: 85 },
]

export function About() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section
      id="about"
      ref={ref}
      className="relative py-24 md:py-32 overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-30">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 20% 50%, rgba(0, 245, 255, 0.1) 0%, transparent 50%)`,
          }}
        />
      </div>

      <div className="max-w-6xl mx-auto px-6">
        {/* Section title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="font-mono text-primary text-sm tracking-widest">
            {"// ABOUT ME"}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mt-2 text-foreground">
            Who I Am
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Avatar/Photo */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex justify-center"
          >
            <div className="relative">
              {/* Glowing border effect */}
              <motion.div
                className="absolute -inset-1 rounded-full bg-gradient-to-r from-primary via-secondary to-primary opacity-75 blur-md"
                animate={{
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                }}
                transition={{ duration: 5, repeat: Infinity }}
                style={{ backgroundSize: "200% 200%" }}
              />

              {/* Avatar container */}
              <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-background">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                  <span className="font-mono text-6xl font-bold text-foreground/30">
                    YN
                  </span>
                </div>
              </div>

              {/* Decorative elements */}
              <motion.div
                className="absolute -top-4 -right-4 w-8 h-8 border-2 border-primary"
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              />
              <motion.div
                className="absolute -bottom-4 -left-4 w-6 h-6 bg-secondary"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </div>
          </motion.div>

          {/* Bio text */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="glass p-8 rounded-2xl">
              <p className="text-foreground/80 text-lg leading-relaxed mb-6">
                {"I'm a passionate "}
                <span className="text-primary font-semibold">
                  full-stack developer
                </span>
                {" with a deep interest in "}
                <span className="text-secondary font-semibold">
                  cybersecurity
                </span>
                {
                  ". I love building secure, scalable web applications that deliver exceptional user experiences."
                }
              </p>
              <p className="text-foreground/80 text-lg leading-relaxed mb-6">
                {
                  "With expertise spanning frontend frameworks to backend architectures, I bring ideas to life with clean, efficient code. Security isn't just an afterthought—it's embedded in everything I build."
                }
              </p>
              <p className="text-foreground/80 text-lg leading-relaxed">
                {
                  "When I'm not coding, you'll find me exploring the latest in tech, contributing to open source, or diving into CTF challenges."
                }
              </p>
            </div>

            {/* Skill bars */}
            <div className="mt-8 space-y-4">
              {skills.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, x: 20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
                >
                  <div className="flex justify-between mb-1">
                    <span className="font-mono text-sm text-foreground/70">
                      {skill.name}
                    </span>
                    <span className="font-mono text-sm text-primary">
                      {skill.level}%
                    </span>
                  </div>
                  <div className="h-2 bg-foreground/10 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-primary to-secondary rounded-full"
                      initial={{ width: 0 }}
                      animate={isInView ? { width: `${skill.level}%` } : {}}
                      transition={{
                        duration: 1,
                        delay: 0.8 + index * 0.1,
                        ease: "easeOut",
                      }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
