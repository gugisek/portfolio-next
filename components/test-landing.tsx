"use client"; // aby się nie wywalało na server side rendering

// tsrfc
import { motion } from 'framer-motion'
import React from 'react'

type Props = {}

export default function TestLanding({}: Props) {
  return (
    <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="h-screen bg-gray-900"
    >
      test-laning
    </motion.section>
  )
}