'use client';

import { motion } from 'framer-motion';

interface FlameProps {
  size: number;
}

export default function Flame({ size }: FlameProps) {
  return (
    <motion.div
      className="inline-block styled-flame"
      animate={{
        scale: [1, 1.1, 1],
        rotate: [0, 2, -2, 0],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      style={{ fontSize: `${size}px` }}
    >
      🔥
    </motion.div>
  );
}