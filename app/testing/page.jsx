"use client";
import { useEffect } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { PerspectiveCamera, Environment, Plane } from "@react-three/drei";
import {
  Bloom,
  DepthOfField,
  EffectComposer,
  Noise,
  Vignette,
  ChromaticAberration,god
} from "@react-three/postprocessing";
import { DotScreen } from "@react-three/postprocessing";

import { Glitch } from "@react-three/postprocessing";
import { Scanline } from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import { GlitchMode } from "postprocessing";
export default function Scene() {
  return <MainScene />;
}

function MainScene() {
  return (
    <>
      <Canvas shadows>
        <EffectComposer>
          <GodRays
            sun={sunRef}
            blendFunction={BlendFunction.Screen} // The blend function of this effect.
            samples={60} // The number of samples per pixel.
            density={0.96} // The density of the light rays.
            decay={0.9} // An illumination decay factor.
            weight={0.4} // A light ray weight factor.
            exposure={0.6} // A constant attenuation coefficient.
            clampMax={1} // An upper bound for the saturation of the overall effect.
            width={Resizer.AUTO_SIZE} // Render width.
            height={Resizer.AUTO_SIZE} // Render height.
            kernelSize={KernelSize.SMALL} // The blur kernel size. Has no effect if blur is disabled.
            blur={true} // Whether the god rays should be blurred to reduce artifacts.
          />
        </EffectComposer>
        <ambientLight intensity={2} />
        <directionalLight intensity={1} position={[0, 0, 10]} />
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
      </Canvas>
    </>
  );
}
