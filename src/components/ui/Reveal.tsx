'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface RevealProps {
  children: ReactNode
  delay?: number
  duration?: number
}

export default function Reveal({
  children,
  delay = 0,
  duration = 0.6,
}: RevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: false, amount: 0.1 }}
      transition={{
        duration: 0.6,
        delay: 0.2,
        ease: 'easeOut',
      }}
    >
      {children}
    </motion.div>
  )
}