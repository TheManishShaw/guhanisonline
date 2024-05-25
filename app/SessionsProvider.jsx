"use client";
import React from "react";
import { SessionProvider } from "next-auth/react";
 const SessionsProvider = ({ children }) => {
  return <SessionProvider>{children}</SessionProvider>;
};

export default SessionsProvider;
