"use client";
import React from "react";
import { motion } from "framer-motion";
const FadeInAnimation = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 1 } }}
    >
      {children}
    </motion.div>
  );
};

export default FadeInAnimation;
