"use client";
import { useEffect } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { PerspectiveCamera, Environment, Plane } from "@react-three/drei";
import { CameraProvider, useCamera } from "./CameraContext";
import { LumosProvider } from "./LumosContext";
import Text from "./Text.jsx";
import Lumos from "./Lumos.jsx";
import LumosMenu from "./LumosMenu.jsx";
import Menu from "./Menu";
import {
  Bloom,
  DepthOfField,
  EffectComposer,
  Noise,
} from "@react-three/postprocessing";
import { Glitch } from "@react-three/postprocessing";
import { GlitchMode } from "postprocessing";
import { ChromaticAberration } from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";

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
      <Canvas shadows>
        <EffectComposer>
          <DepthOfField
            focusDistance={0}
            focalLength={0.2}
            bokehScale={0.2}
            height={480}
          />
          <Bloom
            luminanceThreshold={2}
            luminanceSmoothing={0.01}
            height={300}
          />
          <Noise opacity={0.1} />
          <Glitch
            delay={[6, 10]} // min and max glitch delay
            duration={[0.2, 0.5]} // min and max glitch duration
            strength={[0.1, 0.2]} // min and max glitch strength
            mode={GlitchMode.SPORADIC} // glitch mode
            active // turn on/off the effect (switches between "mode" prop and GlitchMode.DISABLED)
            ratio={0.01} // Threshold for strong glitches, 0 - no weak glitches, 1 - no strong glitches.
          />
          <ChromaticAberration
            blendFunction={BlendFunction.NORMAL} // blend mode
            offset={[0.001, 0.001]} // color offset
          />
        </EffectComposer>
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
