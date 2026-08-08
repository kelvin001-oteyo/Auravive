import React from 'react';
import { motion } from 'framer-motion';
import { buttonHover } from '../../utils/animations';

const AnimatedButton = ({ children, className = '', onClick, disabled = false, ...props }) => {
  return (
    <motion.button
      whileHover={buttonHover.whileHover}
      whileTap={buttonHover.whileTap}
      onClick={onClick}
      disabled={disabled}
      className={className}
      {...props}
    >
      {children}
    </motion.button>
  );
};

export default AnimatedButton;