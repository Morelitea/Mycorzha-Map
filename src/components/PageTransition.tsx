import React from "react";
import { motion } from "framer-motion";

interface PageTransitionProps {
  children: React.ReactNode;
}

const transition = {
  duration: 0.4,
  ease: [0.22, 1, 0.36, 1],
};

const PageTransition: React.FC<PageTransitionProps> = ({ children }) => {
  return (
    <motion.div
      style={{ width: "100%", height: "100%" }}
      initial={{ opacity: 0, y: 16, scale: 1.1 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -16, scale: 1.1 }}
      transition={transition}
    >
      {children}
    </motion.div>
  );
};

export default PageTransition;
