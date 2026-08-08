import React from 'react';
import { motion } from 'framer-motion';
import { pageVariants } from '../../utils/animations';

const AnimatedPage = ({ children, className = '' }) => {
  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedPage;