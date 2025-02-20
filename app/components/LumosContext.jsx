"use client";
import { createContext, useContext, useRef, useState } from "react";

const LumosContext = createContext();

export const LumosProvider = ({ children }) => {
  const mainLightRef = useRef();
  const menuLightRef = useRef();
  const [lightsActive, setLightsActive] = useState(true);
  const [activeLight, setActiveLight] = useState("main");

  return (
    <LumosContext.Provider
      value={{
        mainLightRef,
        menuLightRef,
        lightsActive,
        setLightsActive,
        activeLight,
        setActiveLight,
      }}
    >
      {children}
    </LumosContext.Provider>
  );
};
export const useLumos = () => {
  const context = useContext(LumosContext);
  if (!context) throw new Error("useLumos must be within LumosProvider");
  return context;
};
