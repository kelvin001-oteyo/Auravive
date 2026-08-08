import React from 'react';
import { motion } from 'framer-motion';
import { staggerChildren } from '../../utils/animations';

const AnimatedList = ({ children, className = '' }) => {
  return (
    <motion.div
      initial="initial"
      animate="animate"
      variants={staggerChildren}
      className={className}
    >
      {React.Children.map(children, (child, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: index * 0.05 }}
        >
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
};

export default AnimatedList;