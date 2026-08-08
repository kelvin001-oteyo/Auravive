import React from 'react';
import { motion } from 'framer-motion';
import { cardHover } from '../../utils/animations';

const AnimatedCard = ({ children, className = '', delay = 0, ...props }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      whileHover={cardHover.whileHover}
      whileTap={cardHover.whileTap}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedCard;