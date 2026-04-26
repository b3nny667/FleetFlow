import React from 'react';
import { motion } from 'framer-motion';
import './LoadingSpinner.css';

const LoadingSpinner = ({ size = "medium", message = "Loading..." }) => {
  const getSizeClass = () => {
    switch(size) {
      case 'small': return 'spinner-small';
      case 'large': return 'spinner-large';
      default: return 'spinner-medium';
    }
  };

  const spinTransition = {
    repeat: Infinity,
    ease: "linear",
    duration: 0.8
  };

  return (
    <div className="loading-container">
      <motion.div 
        className={`spinner ${getSizeClass()}`}
        animate={{ rotate: 360 }}
        transition={spinTransition}
      />
      {message && (
        <motion.p 
          className="loading-message"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {message}
        </motion.p>
      )}
    </div>
  );
};

export default LoadingSpinner;