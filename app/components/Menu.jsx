"use client";
import { motion } from "framer-motion-3d";
import { Gltf, Float, useGLTF } from "@react-three/drei";

import { useThree, useFrame } from "@react-three/fiber";
import { useRouter } from "next/navigation";
import { useCamera } from "./CameraContext";
import Font2Letter from "./Font2Letter";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function Menu() {
  const floatSpeed = 2;
  const floatRotationIntensity = 0.1;
  const floatIntensities = 10;
  const floatRange = [-0.01, 0.01];
  const router = useRouter();
  const { camera } = useThree();
  const { triggerStartupAnimation } = useCamera();

  const goGame = () => {
    triggerStartupAnimation();
    router.push("/game");
  };
  const returnScene = () => {
    triggerStartupAnimation();
    gsap.to(camera.position, {
      z: 20,
    });
    gsap.to(camera.rotation, {
      y: 0,
    });
  };
  return (
    <>
      {/*  NOKIA  */}
      <motion.group
        position={[0, 3, -98]}
        whileTap={{
          scaleY: 0.9,
          scaleZ: 0.9,
          scaleX: 0.9,
        }}
      >
        <Float
          speed={floatSpeed}
          rotationIntensity={floatRotationIntensity}
          floatIntensity={floatIntensities}
          floatingRange={floatRange}
        >
          <RotateGroup>
            <Gltf
              rotation={[0, 0, 0]}
              src={"models/Nokia.glb"}
              scale={10}
              castShadow
              receiveShadow
            />
          </RotateGroup>
          <motion.group
            position={[-1.4, -1.7, 0]}
            rotation={[0, 0, 0]}
            scale={0.3}
          >
            <Font2Letter
              Font2Letter="CONTACT"
              position={[0, 0, 0]}
              castShadow
              receiveShadow
            />
          </motion.group>
        </Float>
      </motion.group>
      {/*  PC  */}
      <motion.group
        position={[-6, 3, -98]}
        whileTap={{
          scaleY: 0.9,
          scaleZ: 0.9,
          scaleX: 0.9,
        }}
      >
        <Float
          speed={floatSpeed}
          rotationIntensity={floatRotationIntensity}
          floatIntensity={floatIntensities}
          floatingRange={floatRange}
        >
          <RotateGroup position={[0, -0.75, 0]}>
            <Gltf
              rotation={[0.2, 0, 0]}
              src={"models/Notebook.glb"}
              scale={1.2}
              castShadow
              receiveShadow
            />
          </RotateGroup>
          <motion.group
            position={[0, -1.6, -1.4]}
            rotation={[0, 0, 0]}
            scale={0.3}
          >
            <Font2Letter Font2Letter="RESUME" position={[-5, 0, 0]} />
          </motion.group>
        </Float>
      </motion.group>
      {/*  Dualshock  */}
      <motion.group
        position={[6, 3, -98]}
        onPointerDown={(e) => {
          e.stopPropagation();
          goGame();
        }}
      >
        <Float
          speed={floatSpeed}
          rotationIntensity={floatRotationIntensity}
          floatIntensity={floatIntensities}
          floatingRange={floatRange}
        >
          <RotateGroup
            rotation={[0, Math.PI / 2, Math.PI / 2]}
            position={[0, -0.1, 0]}
          >
            <Gltf
              rotation={[Math.PI / 2, Math.PI / 2, 0]}
              src={"models/DualShock.glb"}
              scale={1.1}
              castShadow
              receiveShadow
            />
          </RotateGroup>
          <motion.group
            position={[-1.3, -1.6, -1.4]}
            rotation={[0, 0, 0]}
            scale={0.3}
          >
            <Font2Letter Font2Letter="GAME" position={[2, 0, 0]} />
          </motion.group>
        </Float>
      </motion.group>
      {/*  Case  */}
      <motion.group
        position={[-6, -2.5, -98]}
        whileTap={{
          scaleY: 0.9,
          scaleZ: 0.9,
          scaleX: 0.9,
        }}
      >
        <Float
          speed={floatSpeed}
          rotationIntensity={floatRotationIntensity}
          floatIntensity={floatIntensities}
          floatingRange={floatRange}
        >
          <RotateGroup rotation={[0, 0, 0]} position={[0, 0, 0]}>
            <Gltf
              rotation={[0, 0, 0]}
              src={"models/Case.glb"}
              scale={2}
              castShadow
              receiveShadow
            />
          </RotateGroup>
          <motion.group
            position={[-1.9, -1.5, 0]}
            rotation={[0, 0, 0]}
            scale={0.3}
          >
            <Font2Letter Font2Letter="PORTFOLIO" position={[0, 0, 0]} />
          </motion.group>
        </Float>
      </motion.group>
      {/*  LIGHT  */}
      <motion.group
        position={[0, -2.9, -98]}
        whileTap={{
          scaleY: 0.9,
          scaleZ: 0.9,
          scaleX: 0.9,
        }}
        onTap={() => handleToggleLight()}
      >
        <Float
          speed={floatSpeed}
          rotationIntensity={floatRotationIntensity}
          floatIntensity={floatIntensities}
          floatingRange={floatRange}
        >
          <RotateGroup position={[0, 0, 0]}>
            <Gltf
              rotation={[Math.PI / 2, Math.PI, 0]}
              src={"models/Light2.glb"}
              scale={10}
              castShadow
              receiveShadow
            />
          </RotateGroup>
          <motion.group position={[-1, -1, 0]} rotation={[0, 0, 0]} scale={0.3}>
            <Font2Letter Font2Letter="LIGHT" position={[0, 0, 0]} />
          </motion.group>
        </Float>
      </motion.group>
      {/*  BACK */}
      <motion.group
        position={[6, -2.5, -98]}
        whileTap={{
          scaleY: 0.9,
          scaleZ: 0.9,
          scaleX: 0.9,
        }}
        onTap={() => returnScene()}
      >
        <Float
          speed={floatSpeed}
          rotationIntensity={floatRotationIntensity}
          floatIntensity={floatIntensities}
          floatingRange={floatRange}
        >
          <RotateGroup>
            <Gltf
              rotation={[Math.PI / 2, Math.PI, Math.PI]}
              src={"models/back.glb"}
              scale={0.7}
              castShadow
              receiveShadow
            />
          </RotateGroup>
          <motion.group
            position={[0, -1.6, -1.4]}
            rotation={[0, 0, 0]}
            scale={0.3}
          >
            <Font2Letter
              Font2Letter="BACK"
              position={[-1.5, 0, 0]}
              castShadow
              receiveShadow
            />
          </motion.group>
        </Float>
      </motion.group>
    </>
  );
}

function RotateGroup({ children, rotation, position }) {
  const groupRef = useRef(null);
  const isHovering = useRef(false);
  const animation = useRef(null);

  const handleMouseEnter = () => {
    if (isHovering.current) return;
    isHovering.current = true;
    if (!animation.current) {
      animation.current = gsap.to(groupRef.current.rotation, {
        y: "+=6.28",
        duration: 2,
        repeat: -1,
        ease: "linear",
      });
    }
  };
  const handleMouseLeave = () => {
    if (!isHovering.current) return;
    isHovering.current = false;

    gsap.to(groupRef.current.rotation, {
      y: Math.ceil(groupRef.current.rotation.y / (2 * Math.PI)) * (2 * Math.PI),
      duration: 2,
      ease: "linear",
      onComplete: () => {
        if (!isHovering.current) {
          animation.current?.kill();
          animation.current = null;
        }
      },
    });
  };

  return (
    <group
      ref={groupRef}
      rotation={rotation}
      position={position}
      onPointerOver={handleMouseEnter}
      onPointerOut={handleMouseLeave}
    >
      {children}
    </group>
  );
}
