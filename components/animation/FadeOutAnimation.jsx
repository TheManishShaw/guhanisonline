"use client";
import React from "react";
import { motion } from "framer-motion";
const FadeOutAnimation = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0, transition: { duration: 1 } }}
      transition={{ duration: 1 }}
    >
      {children}
    </motion.div>
  );
};

export default FadeOutAnimation;
