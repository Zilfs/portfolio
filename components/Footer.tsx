"use client"

import { motion } from "framer-motion"

export function Footer() {
  return (
    <footer className="relative py-8 border-t border-foreground/10">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Logo */}
          <motion.div
            className="font-mono text-lg"
            whileHover={{ scale: 1.05 }}
          >
            {"<"}
            <span className="text-primary">YN</span>
            {"/>"}
          </motion.div>

          {/* Copyright */}
          <p className="text-sm text-foreground/50 font-mono">
            {`© ${new Date().getFullYear()} Your Name. All rights reserved.`}
          </p>

          {/* Built with */}
          <p className="text-sm text-foreground/50">
            Built with{" "}
            <span className="text-primary">Next.js</span> &{" "}
            <span className="text-secondary">Framer Motion</span>
          </p>
        </div>
      </div>
    </footer>
  )
}
