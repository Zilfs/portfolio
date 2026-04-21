"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { FiExternalLink, FiGithub } from "react-icons/fi"

const projects = [
  {
    title: "SecureAuth Platform",
    description:
      "A robust authentication system with multi-factor authentication, OAuth integration, and advanced security features.",
    tech: ["React", "Node.js", "PostgreSQL", "JWT"],
    gradient: "from-cyan-500/20 to-blue-500/20",
  },
  {
    title: "E-Commerce Dashboard",
    description:
      "Full-featured admin dashboard for e-commerce platforms with real-time analytics, inventory management, and order tracking.",
    tech: ["Next.js", "TypeScript", "Tailwind", "Prisma"],
    gradient: "from-purple-500/20 to-pink-500/20",
  },
  {
    title: "Network Monitor",
    description:
      "Real-time network monitoring tool that detects anomalies, tracks traffic patterns, and alerts on security threats.",
    tech: ["Python", "Go", "InfluxDB", "Grafana"],
    gradient: "from-green-500/20 to-teal-500/20",
  },
  {
    title: "CryptoTrack",
    description:
      "Cryptocurrency portfolio tracker with live price updates, historical charts, and automated trading signals.",
    tech: ["React", "WebSockets", "Redis", "Chart.js"],
    gradient: "from-orange-500/20 to-yellow-500/20",
  },
  {
    title: "DevOps Pipeline",
    description:
      "Automated CI/CD pipeline with containerized deployments, blue-green strategies, and comprehensive testing.",
    tech: ["Docker", "Kubernetes", "Jenkins", "AWS"],
    gradient: "from-indigo-500/20 to-violet-500/20",
  },
  {
    title: "AI Chat Interface",
    description:
      "Modern chat interface powered by LLMs with conversation history, context awareness, and custom personas.",
    tech: ["Next.js", "OpenAI", "Supabase", "Vercel"],
    gradient: "from-rose-500/20 to-pink-500/20",
  },
]

export function Projects() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section
      id="projects"
      ref={ref}
      className="relative py-24 md:py-32 overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-30">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 80% 50%, rgba(255, 0, 170, 0.1) 0%, transparent 50%)`,
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
            {"// MY WORK"}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mt-2 text-foreground">
            {"Things I've Built"}
          </h2>
        </motion.div>

        {/* Projects grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative"
            >
              <div className="relative h-full glass rounded-2xl overflow-hidden transition-all duration-300 group-hover:-translate-y-2 group-hover:shadow-xl group-hover:shadow-primary/10">
                {/* Project image/gradient placeholder */}
                <div
                  className={`h-40 bg-gradient-to-br ${project.gradient} relative overflow-hidden`}
                >
                  <div
                    className="absolute inset-0 opacity-30"
                    style={{
                      backgroundImage: `
                        linear-gradient(45deg, transparent 40%, rgba(255,255,255,0.1) 45%, transparent 50%),
                        linear-gradient(-45deg, transparent 40%, rgba(255,255,255,0.1) 45%, transparent 50%)
                      `,
                      backgroundSize: "20px 20px",
                    }}
                  />

                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-background/80 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                    <motion.button
                      className="p-3 glass rounded-full cursor-pointer"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      aria-label="View project"
                    >
                      <FiExternalLink className="w-5 h-5" />
                    </motion.button>
                    <motion.button
                      className="p-3 glass rounded-full cursor-pointer"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      aria-label="View code"
                    >
                      <FiGithub className="w-5 h-5" />
                    </motion.button>
                  </div>
                </div>

                {/* Project content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-foreground/60 text-sm leading-relaxed mb-4">
                    {project.description}
                  </p>

                  {/* Tech stack badges */}
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-1 text-xs font-mono bg-foreground/5 text-foreground/70 rounded-md border border-foreground/10"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Accent border on hover */}
                <div className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-primary to-secondary scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
