"use client";
import { motion } from "framer-motion-3d";
import { Gltf, Float } from "@react-three/drei";
import { useState } from "react";
import { useThree } from "@react-three/fiber";
import { useRouter } from "next/navigation";
import { useCamera } from "./CameraContext";
import Font2Letter from "./Font2Letter";
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
        position={[48, 2, 45]}
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
              rotation={[0, Math.PI / -2, 0]}
              src={"models/Nokia.glb"}
              scale={10}
              castShadow
              receiveShadow
            />
          </RotateGroup>
          <motion.group
            position={[0, -1.6, -1.4]}
            rotation={[0, Math.PI / -2, 0]}
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
        position={[48, 2, 50]}
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
          <RotateGroup position={[0, -0.7, 0]}>
            <Gltf
              rotation={[0, Math.PI / -2, 0]}
              src={"models/Notebook.glb"}
              scale={1.2}
              castShadow
              receiveShadow
            />
          </RotateGroup>
          <motion.group
            position={[0, -1.6, -1.4]}
            rotation={[0, Math.PI / -2, 0]}
            scale={0.3}
          >
            <Font2Letter Font2Letter="RESEAUX" position={[0, 0, 0]} />
          </motion.group>
        </Float>
      </motion.group>
      {/*  Dualshock  */}
      <motion.group
        position={[48, 2, 55]}
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
            rotation={[0, Math.PI / -2, Math.PI / 2]}
            position={[0, -0.1, 0]}
          >
            <Gltf
              rotation={[0, Math.PI / 2, 0]}
              src={"models/DualShock.glb"}
              scale={1}
              castShadow
              receiveShadow
            />
          </RotateGroup>
          <motion.group
            position={[0, -1.6, -1.4]}
            rotation={[0, Math.PI / -2, 0]}
            scale={0.3}
          >
            <Font2Letter Font2Letter="GAME" position={[2, 0, 0]} />
          </motion.group>
        </Float>
      </motion.group>
      {/*  Case  */}
      <motion.group
        position={[48, -2, 45]}
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
          <RotateGroup rotation={[0, 0, 0]} position={[0, 0.2, 0]}>
            <Gltf
              rotation={[0, Math.PI / -2, 0]}
              src={"models/Case.glb"}
              scale={2}
              castShadow
              receiveShadow
            />
          </RotateGroup>
          <motion.group
            position={[0, -1.6, -1.8]}
            rotation={[0, Math.PI / -2, 0]}
            scale={0.3}
          >
            <Font2Letter Font2Letter="PORTFOLIO" position={[0, 0, 0]} />
          </motion.group>
        </Float>
      </motion.group>
      {/*  LIGHT  */}
      <motion.group
        position={[48, -2, 50]}
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
          <RotateGroup position={[0, -0.5, 0]}>
            <Gltf
              rotation={[Math.PI / 2, Math.PI, Math.PI / -2]}
              src={"models/Light2.glb"}
              scale={10}
              castShadow
              receiveShadow
            />
          </RotateGroup>
          <motion.group
            position={[0, -1.6, -1.05]}
            rotation={[0, Math.PI / -2, 0]}
            scale={0.3}
          >
            <Font2Letter Font2Letter="LIGHT" position={[0, 0, 0]} />
          </motion.group>
        </Float>
      </motion.group>
      {/*  RETURN */}
      <motion.group
        position={[48, -2, 55]}
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
              rotation={[0, Math.PI / -2, 0]}
              src={"models/Nokia.glb"}
              scale={10}
              castShadow
              receiveShadow
            />
          </RotateGroup>
          <motion.group
            position={[0, -1.6, -1.4]}
            rotation={[0, Math.PI / -2, 0]}
            scale={0.3}
          >
            <Font2Letter
              Font2Letter="RETOUR"
              position={[0, 0, 0]}
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
  const [isHovering, setIsHovering] = useState(false);
  return (
    <motion.group
      whileHover={{
        rotateY: [0, Math.PI * 2],
        transition: {
          repeat: Infinity,
          duration: 2,
          ease: "linear",
        },
      }}
      animate={
        isHovering
          ? {}
          : {
              rotateY: Math.PI * 2,
              transition: {
                duration: 2,
                ease: "linear",
              },
            }
      }
      onHoverStart={() => setIsHovering(true)}
      onHoverEnd={() => setIsHovering(false)}
      rotation={rotation}
      position={position}
    >
      {children}
    </motion.group>
  );
}
