import React from 'react';
import { motion } from 'framer-motion';

const PulseDot = ({ color = 'bg-indigo-500', size = 'w-3 h-3' }) => {
  return (
    <motion.div
      className={`${size} ${color} rounded-full`}
      animate={{
        scale: [1, 1.5, 1],
        opacity: [1, 0.5, 1],
      }}
      transition={{
        duration: 1.5,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
};

export default PulseDot;