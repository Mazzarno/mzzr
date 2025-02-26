"use client";
import { Float } from "@react-three/drei";
import { motion } from "framer-motion-3d";
import { useState, useRef } from "react";
import gsap from "gsap";
import { useThree, useFrame } from "@react-three/fiber";
import { useCamera } from "./CameraContext";
import { useLumos } from "./LumosContext";
import Font1Letter from "./Font1Letter";
import Font2Letter from "./Font2Letter";

export default function Text() {
  return (
    <>
      <group position={[-0.2, 1.3, 0]}>
        <AlexisGermain />
        <FloatingLetter />
        <PressStart />
      </group>
    </>
  );
}

function AlexisGermain() {
  return (
    <group position={[-2, -0.5, 0]}>
      <group position={[0.5, 0.8, 0]}>
        <Font1Letter
          motionZinit={-1.7}
          motionZ={0}
          motionDelay={1.2}
          Font1Letter="A"
          position={[-6.2, 0, 0.7]}
        />
        <Font1Letter
          motionZinit={-1.7}
          motionZ={0}
          motionDelay={1.3}
          Font1Letter="L"
          position={[-3, 0, 0.7]}
        />
        <Font1Letter
          motionZinit={-1.7}
          motionZ={0}
          motionDelay={1.4}
          Font1Letter="E"
          position={[-0.5, 0, 0.7]}
        />
        <Font1Letter
          motionZinit={-1.7}
          motionZ={0}
          motionDelay={1.5}
          Font1Letter="X"
          position={[2.2, 0, 0.7]}
        />
        <Font1Letter
          motionZinit={-1.7}
          motionZ={0}
          motionDelay={1.6}
          Font1Letter="I"
          position={[5.3, 0, 0.7]}
        />
        <Font1Letter
          motionZinit={-1.7}
          motionZ={0}
          motionDelay={1.7}
          Font1Letter="S"
          position={[6, 0, 0.7]}
        />
      </group>

      <group position={[0, -2.9, 0]}>
        <Font1Letter
          motionZinit={-1.7}
          motionZ={0}
          motionDelay={1.8}
          Font1Letter="G"
          position={[-8, 0, 0.7]}
        />
        <Font1Letter
          motionZinit={-1.7}
          motionZ={0}
          motionDelay={1.9}
          Font1Letter="E"
          position={[-4.5, 0, 0.7]}
        />
        <Font1Letter
          motionZinit={-1.7}
          motionZ={0}
          motionDelay={2}
          Font1Letter="R"
          position={[-1.8, 0, 0.7]}
        />
        <Font1Letter
          motionZinit={-1.7}
          motionZ={0}
          motionDelay={2.1}
          Font1Letter="M"
          position={[1, 0, 0.7]}
        />
        <Font1Letter
          motionZinit={-1.7}
          motionZ={0}
          motionDelay={2.3}
          Font1Letter="A"
          position={[4.2, 0, 0.7]}
        />
        <Font1Letter
          motionZinit={-1.7}
          motionZ={0}
          motionDelay={2.4}
          Font1Letter="I"
          position={[7.4, 0, 0.7]}
        />
        <Font1Letter
          motionZinit={-1.7}
          motionZ={0}
          motionDelay={2.5}
          Font1Letter="N"
          position={[8.2, 0, 0.7]}
        />
      </group>
    </group>
  );
}

function FloatingLetter() {
  const floatSpeed = 1;
  const floatRotationIntensity = 0.1;
  const floatIntensities = 1;
  const floatRange = [-1, 1];
  const [position, setPosition] = useState([0, 0, 0]);

  return (
    <group>
      <Float
        speed={floatSpeed}
        rotationIntensity={floatRotationIntensity}
        floatIntensity={floatIntensities}
        floatingRange={floatRange}
      >
        <motion.group>
          <Font1Letter
            motionZinit={-2}
            motionZ={0}
            motionDelay={1.2}
            Font1Letter="?"
            position={[-14, 2, 1]}
          />
        </motion.group>
      </Float>
      <Float
        speed={floatSpeed}
        rotationIntensity={floatRotationIntensity}
        floatIntensity={floatIntensities}
        floatingRange={floatRange}
      >
        <Font1Letter
          motionZinit={-2}
          motionZ={0}
          motionDelay={1.75}
          Font1Letter="<"
          position={[-14, -3, 1]}
        />
      </Float>
      <Float
        speed={floatSpeed}
        rotationIntensity={floatRotationIntensity}
        floatIntensity={floatIntensities}
        floatingRange={floatRange}
      >
        <Font1Letter
          motionZinit={-2}
          motionZ={0}
          motionDelay={1.8}
          Font1Letter="/"
          position={[8, 1, 1]}
          textSize={2}
        />
      </Float>
      <Float
        speed={floatSpeed}
        rotationIntensity={floatRotationIntensity}
        floatIntensity={floatIntensities}
        floatingRange={floatRange}
      >
        <Font1Letter
          motionZinit={-2}
          motionZ={0}
          motionDelay={1.85}
          Font1Letter=">"
          position={[10, 0.5, 1]}
        />
      </Float>
      <Float
        speed={floatSpeed}
        rotationIntensity={floatRotationIntensity}
        floatIntensity={floatIntensities}
        floatingRange={floatRange}
      >
        <Font1Letter
          motionZinit={-2}
          motionZ={0}
          motionDelay={2.6}
          Font1Letter="@"
          position={[10, -4, 1]}
          textSize={2}
        />
      </Float>
    </group>
  );
}

function PressStart() {
  const { camera } = useThree();
  const { triggerStartupAnimation } = useCamera();

  const handlePressStart = () => {
    triggerStartupAnimation();
    gsap.to(camera.position, {
      z: -40,
    });
  };
  return (
    <motion.group
      position={[-7, -8, 0]}
      whileTap={{
        scaleZ: 0.5,
      }}
      onPointerDown={(e) => {
        e.stopPropagation();
        handlePressStart();
      }}
    >
      <Font2Letter
        motionZinit={-1.7}
        motionZ={0}
        motionDelay={3}
        Font2Letter=">"
        position={[-2, 0, 0.7]}
      />
      <Font2Letter
        motionZinit={-1.7}
        motionZ={0}
        motionDelay={3}
        Font2Letter="PRESS START"
        position={[0, 0, 0.7]}
      />
    </motion.group>
  );
}
