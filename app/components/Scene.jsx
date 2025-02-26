"use client";
import { useEffect } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import {
  PerspectiveCamera,
  Environment,
  Plane,
} from "@react-three/drei";
import { CameraProvider, useCamera } from "./CameraContext";
import { LumosProvider } from "./LumosContext";
import Text from "./Text.jsx";
import Lumos from "./Lumos.jsx";
import LumosMenu from "./LumosMenu.jsx";
import Menu from "./Menu";
export default function Scene() {
  return (
    <CameraProvider>
      <LumosProvider>
        <MainScene />
      </LumosProvider>
    </CameraProvider>
  );
}

function MainScene() {
  const { triggerStartupAnimation } = useCamera();

  useEffect(() => {
    const handler = () => {
      if (document.visibilityState === "visible") triggerStartupAnimation();
    };

    document.addEventListener("visibilitychange", handler);
    return () => document.removeEventListener("visibilitychange", handler);
  }, [triggerStartupAnimation]);

  return (
    <>
      <div className="soni"></div>
      <div className="scanlines"></div>
      <div className="flicker"></div>
      <div className="noisy"></div>
      <Canvas shadows >
        <ambientLight intensity={2} />
        <directionalLight intensity={1} position={[0, 0, 10]} />
        <Environment preset="sunset" />
        <PerspectiveCamera makeDefault position={[0, 0, 20]} fov={20} />
        <Plane receiveShadow args={[100, 100]} position={[0, 0, 0]}>
          <meshToonMaterial color="#adb5bd" receiveShadow />
        </Plane>
        <Plane
          receiveShadow
          args={[100, 100]}
          position={[0, 0, -100]}
          rotation={[0, 0, 0]}
        >
          <meshToonMaterial color="#adb5bd" receiveShadow />
        </Plane>
        <TextResponsiveGroup />
        <Menu />
        <LumosMenu />
        <Lumos />
        <color attach="background" args={["#e9ecef"]} />
      </Canvas>
    </>
  );
}

function TextResponsiveGroup() {
  const { width: w } = useThree((state) => state.viewport);
  return (
    <group scale={w / 55}>
      <Text />
    </group>
  );
}
