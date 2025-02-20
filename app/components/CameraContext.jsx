"use client";
import { createContext, useContext, useState, useEffect } from "react";

const CameraContext = createContext();

export const CameraProvider = ({ children }) => {
  const [showStartup, setShowStartup] = useState(false);

  useEffect(() => {
    triggerStartupAnimation();
  }, []);

  const triggerStartupAnimation = () => {
    setShowStartup(true);
    setTimeout(() => setShowStartup(false), 1500);
  };

  return (
    <CameraContext.Provider value={{ triggerStartupAnimation, showStartup }}>
      {children}
      {showStartup && <div className="tv-startup" />}
    </CameraContext.Provider>
  );
};

export const useCamera = () => useContext(CameraContext);
