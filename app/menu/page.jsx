"use client";
import { useEffect } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { PerspectiveCamera, Environment, Plane } from "@react-three/drei";
import { CameraProvider, useCamera } from "../components/CameraContext";
import { LumosProvider } from "../components/LumosContext";
import LumosMenu from "../components/LumosMenu.jsx";
import { motion } from "framer-motion-3d";
import { useGLTF, Gltf, Float } from "@react-three/drei";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Font2Letter from "../components/Font2Letter";
import { gsap } from "gsap";

export default function Scene() {
  return (
    <>
      <div className="soni"></div>
      <div className="scanlines"></div>
      <div className="flicker"></div>
      <div className="noisy"></div>
      <CameraProvider>
        <LumosProvider>
          <MenuScene />
        </LumosProvider>
      </CameraProvider>
    </>
  );
}

function MenuScene() {
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
      <Canvas shadows>
        <ambientLight intensity={2} />
        <directionalLight intensity={1} position={[0, 0, 10]} />
        <Environment preset="sunset" />
        <PerspectiveCamera makeDefault position={[0, 0, 50]} fov={20} />
        <Plane receiveShadow args={[100, 100]} position={[0, 0, 0]}>
          <meshToonMaterial color="#adb5bd" receiveShadow />
        </Plane>
        <MenuContent />
        <LumosMenu />
        <color attach="background" args={["#e9ecef"]} />
      </Canvas>
    </>
  );
}

function MenuContent() {
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
    router.push("/");
  };
  return (
    <>
      {/*  NOKIA  */}
      <motion.group
        position={[-5, 0.5, 2]}
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
            <Nokia scale={0.6} />
          </RotateGroup>
          <motion.group
            position={[-1.2, -2.2, 2]}
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
      {/* SP ADVANCE */}
      <motion.group
        position={[0, 0, 3]}
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
          <RotateGroup>
            <Sp scale={0.2} />
          </RotateGroup>
          <motion.group
            position={[-1.45, -1.6, 3]}
            rotation={[0, 0, 0]}
            scale={0.3}
          >
            <Font2Letter Font2Letter="GAME" position={[2, 0, 0]} />
          </motion.group>
        </Float>
      </motion.group>
      {/*  RETURN */}
      <motion.group
        position={[5, -0.2, 3]}
        whileTap={{
          scaleY: 0.9,
          scaleZ: 0.9,
          scaleX: 0.9,
        }}
        onPointerDown={(e) => {
          e.stopPropagation();
          returnScene();
        }}
      >
        <Float
          speed={floatSpeed}
          rotationIntensity={floatRotationIntensity}
          floatIntensity={floatIntensities}
          floatingRange={floatRange}
        >
          <RotateGroup>
            <BackCar scale={0.8} />
          </RotateGroup>
          <motion.group position={[-1.5, -1.5, 3]} scale={0.3}>
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

export function Nokia(props) {
  const { nodes, materials } = useGLTF("models/Nokia.glb");
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Object_4.geometry}
        material={materials.M_Nokia}
      />
    </group>
  );
}

useGLTF.preload("models/Nokia.glb");

export function Sp(props) {
  const { nodes, materials } = useGLTF("models/Sp.glb");
  return (
    <group {...props} dispose={null}>
      <group name="GBA_grp" rotation={[Math.PI / 2, 0, 0]}>
        <group
          name="ConsoleScreen_grp"
          position={[0, -0.245, -0.148]}
          rotation={[0.067, 0, 0]}
        >
          <mesh
            name="LogoSticker_geo_Gameboy_1003_MAT_0"
            castShadow
            receiveShadow
            geometry={nodes.LogoSticker_geo_Gameboy_1003_MAT_0.geometry}
            material={materials.Gameboy_1003_MAT}
          />
          <mesh
            name="Sceren_geo_Screen_MAT_0"
            castShadow
            receiveShadow
            geometry={nodes.Sceren_geo_Screen_MAT_0.geometry}
            material={materials.Screen_MAT}
            position={[0.03, 0, 0]}
          />
          <mesh
            name="ScreenCover_geo_ScreenGlass_MAT_0"
            castShadow
            receiveShadow
            geometry={nodes.ScreenCover_geo_ScreenGlass_MAT_0.geometry}
            material={materials.ScreenGlass_MAT}
          />
          <mesh
            name="ScreenGlass_geo_ScreenGlass_MAT_0"
            castShadow
            receiveShadow
            geometry={nodes.ScreenGlass_geo_ScreenGlass_MAT_0.geometry}
            material={materials.ScreenGlass_MAT}
          />
          <mesh
            name="ScreenGuard_geo_Gameboy_1002_MAT_0"
            castShadow
            receiveShadow
            geometry={nodes.ScreenGuard_geo_Gameboy_1002_MAT_0.geometry}
            material={materials.Gameboy_1002_MAT}
          />
          <mesh
            name="Top_LargeHinge_geo_Gameboy_1002_MAT_0"
            castShadow
            receiveShadow
            geometry={nodes.Top_LargeHinge_geo_Gameboy_1002_MAT_0.geometry}
            material={materials.Gameboy_1002_MAT}
          />
          <mesh
            name="Top_SmallHinge_geo_Gameboy_1002_MAT_0"
            castShadow
            receiveShadow
            geometry={nodes.Top_SmallHinge_geo_Gameboy_1002_MAT_0.geometry}
            material={materials.Gameboy_1002_MAT}
          />
          <mesh
            name="TopScreen_Frame_geo_Gameboy_1002_MAT_0"
            castShadow
            receiveShadow
            geometry={nodes.TopScreen_Frame_geo_Gameboy_1002_MAT_0.geometry}
            material={materials.Gameboy_1002_MAT}
          />
        </group>
        <mesh
          name="Base_geo_Gameboy_1001_MAT_0"
          castShadow
          receiveShadow
          geometry={nodes.Base_geo_Gameboy_1001_MAT_0.geometry}
          material={materials.Gameboy_1001_MAT}
        />
        <mesh
          name="BatterLid_Screw_geo_Gameboy_1001_MAT_0"
          castShadow
          receiveShadow
          geometry={nodes.BatterLid_Screw_geo_Gameboy_1001_MAT_0.geometry}
          material={materials.Gameboy_1001_MAT}
        />
        <mesh
          name="Battery_Lid_geo_Gameboy_1001_MAT_0"
          castShadow
          receiveShadow
          geometry={nodes.Battery_Lid_geo_Gameboy_1001_MAT_0.geometry}
          material={materials.Gameboy_1001_MAT}
        />
        <mesh
          name="Btm_Label_geo_Gameboy_1003_MAT_0"
          castShadow
          receiveShadow
          geometry={nodes.Btm_Label_geo_Gameboy_1003_MAT_0.geometry}
          material={materials.Gameboy_1003_MAT}
        />
        <mesh
          name="A_Btn_geo_Gameboy_1002_MAT_0"
          castShadow
          receiveShadow
          geometry={nodes.A_Btn_geo_Gameboy_1002_MAT_0.geometry}
          material={materials.Gameboy_1002_MAT}
        />
        <mesh
          name="B_Btn_geo_Gameboy_1002_MAT_0"
          castShadow
          receiveShadow
          geometry={nodes.B_Btn_geo_Gameboy_1002_MAT_0.geometry}
          material={materials.Gameboy_1002_MAT}
        />
        <mesh
          name="Brightness_Btn_geo_Gameboy_1002_MAT_0"
          castShadow
          receiveShadow
          geometry={nodes.Brightness_Btn_geo_Gameboy_1002_MAT_0.geometry}
          material={materials.Gameboy_1002_MAT}
        />
        <mesh
          name="DPad_geo_Gameboy_1002_MAT_0"
          castShadow
          receiveShadow
          geometry={nodes.DPad_geo_Gameboy_1002_MAT_0.geometry}
          material={materials.Gameboy_1002_MAT}
        />
        <mesh
          name="L_ShoulderBtn_geo_Gameboy_1003_MAT_0"
          castShadow
          receiveShadow
          geometry={nodes.L_ShoulderBtn_geo_Gameboy_1003_MAT_0.geometry}
          material={materials.Gameboy_1003_MAT}
        />
        <mesh
          name="L_ShoulderButn_Inside_geo_Gameboy_1001_MAT_0"
          castShadow
          receiveShadow
          geometry={nodes.L_ShoulderButn_Inside_geo_Gameboy_1001_MAT_0.geometry}
          material={materials.Gameboy_1001_MAT}
        />
        <mesh
          name="R_ShoulderBtn_geo_Gameboy_1003_MAT_0"
          castShadow
          receiveShadow
          geometry={nodes.R_ShoulderBtn_geo_Gameboy_1003_MAT_0.geometry}
          material={materials.Gameboy_1003_MAT}
        />
        <mesh
          name="R_ShoulderButn_Inside_geo_Gameboy_1001_MAT_0"
          castShadow
          receiveShadow
          geometry={nodes.R_ShoulderButn_Inside_geo_Gameboy_1001_MAT_0.geometry}
          material={materials.Gameboy_1001_MAT}
        />
        <mesh
          name="Select_Btn_geo_Gameboy_1002_MAT_0"
          castShadow
          receiveShadow
          geometry={nodes.Select_Btn_geo_Gameboy_1002_MAT_0.geometry}
          material={materials.Gameboy_1002_MAT}
        />
        <mesh
          name="Start_Btn_geo_Gameboy_1002_MAT_0"
          castShadow
          receiveShadow
          geometry={nodes.Start_Btn_geo_Gameboy_1002_MAT_0.geometry}
          material={materials.Gameboy_1002_MAT}
        />
        <mesh
          name="CartridgeSlot_Teeth_geo_Gameboy_1001_MAT_0"
          castShadow
          receiveShadow
          geometry={nodes.CartridgeSlot_Teeth_geo_Gameboy_1001_MAT_0.geometry}
          material={materials.Gameboy_1001_MAT}
        />
        <mesh
          name="ChargingPort_Frame_geo_Gameboy_1002_MAT_0"
          castShadow
          receiveShadow
          geometry={nodes.ChargingPort_Frame_geo_Gameboy_1002_MAT_0.geometry}
          material={materials.Gameboy_1002_MAT}
        />
        <mesh
          name="ChargingPort_geo_Gameboy_1002_MAT_0"
          castShadow
          receiveShadow
          geometry={nodes.ChargingPort_geo_Gameboy_1002_MAT_0.geometry}
          material={materials.Gameboy_1002_MAT}
        />
        <mesh
          name="ChargingPort_Mid_geo_Gameboy_1002_MAT_0"
          castShadow
          receiveShadow
          geometry={nodes.ChargingPort_Mid_geo_Gameboy_1002_MAT_0.geometry}
          material={materials.Gameboy_1002_MAT}
        />
        <mesh
          name="HingeCorner_LMid_geo_Gameboy_1001_MAT_0"
          castShadow
          receiveShadow
          geometry={nodes.HingeCorner_LMid_geo_Gameboy_1001_MAT_0.geometry}
          material={materials.Gameboy_1001_MAT}
        />
        <mesh
          name="HingeCorner_RMid_geo_Gameboy_1001_MAT_0"
          castShadow
          receiveShadow
          geometry={nodes.HingeCorner_RMid_geo_Gameboy_1001_MAT_0.geometry}
          material={materials.Gameboy_1001_MAT}
        />
        <mesh
          name="LinkPort_Frame_geo_Gameboy_1002_MAT_0"
          castShadow
          receiveShadow
          geometry={nodes.LinkPort_Frame_geo_Gameboy_1002_MAT_0.geometry}
          material={materials.Gameboy_1002_MAT}
        />
        <mesh
          name="LinkPort_geo_Gameboy_1002_MAT_0"
          castShadow
          receiveShadow
          geometry={nodes.LinkPort_geo_Gameboy_1002_MAT_0.geometry}
          material={materials.Gameboy_1002_MAT}
        />
        <mesh
          name="LinkPort_Mid_geo_Gameboy_1002_MAT_0"
          castShadow
          receiveShadow
          geometry={nodes.LinkPort_Mid_geo_Gameboy_1002_MAT_0.geometry}
          material={materials.Gameboy_1002_MAT}
        />
        <mesh
          name="LKesnsignton_Lock_End_geo_Gameboy_1001_MAT_0"
          castShadow
          receiveShadow
          geometry={nodes.LKesnsignton_Lock_End_geo_Gameboy_1001_MAT_0.geometry}
          material={materials.Gameboy_1001_MAT}
        />
        <mesh
          name="Power_LED01_geo_Gameboy_1001_MAT_0"
          castShadow
          receiveShadow
          geometry={nodes.Power_LED01_geo_Gameboy_1001_MAT_0.geometry}
          material={materials.Gameboy_1001_MAT}
        />
        <mesh
          name="Power_LED02_geo_Gameboy_1001_MAT_0"
          castShadow
          receiveShadow
          geometry={nodes.Power_LED02_geo_Gameboy_1001_MAT_0.geometry}
          material={materials.Gameboy_1001_MAT}
        />
        <mesh
          name="PowerBtn_Base_geo_Gameboy_1001_MAT_0"
          castShadow
          receiveShadow
          geometry={nodes.PowerBtn_Base_geo_Gameboy_1001_MAT_0.geometry}
          material={materials.Gameboy_1001_MAT}
        />
        <mesh
          name="PowerBtn_geo_Gameboy_1001_MAT_0"
          castShadow
          receiveShadow
          geometry={nodes.PowerBtn_geo_Gameboy_1001_MAT_0.geometry}
          material={materials.Gameboy_1001_MAT}
        />
        <mesh
          name="OffDot_geo_Gameboy_1003_MAT_0"
          castShadow
          receiveShadow
          geometry={nodes.OffDot_geo_Gameboy_1003_MAT_0.geometry}
          material={materials.Gameboy_1003_MAT}
        />
        <mesh
          name="OffText_geo_Gameboy_1003_MAT_0"
          castShadow
          receiveShadow
          geometry={nodes.OffText_geo_Gameboy_1003_MAT_0.geometry}
          material={materials.Gameboy_1003_MAT}
        />
        <mesh
          name="OnDot_geo_Gameboy_1003_MAT_0"
          castShadow
          receiveShadow
          geometry={nodes.OnDot_geo_Gameboy_1003_MAT_0.geometry}
          material={materials.Gameboy_1003_MAT}
        />
        <mesh
          name="OnText_geo_Gameboy_1003_MAT_0"
          castShadow
          receiveShadow
          geometry={nodes.OnText_geo_Gameboy_1003_MAT_0.geometry}
          material={materials.Gameboy_1003_MAT}
        />
        <mesh
          name="RKesnsignton_Lock_End_geo_Gameboy_1001_MAT_0"
          castShadow
          receiveShadow
          geometry={nodes.RKesnsignton_Lock_End_geo_Gameboy_1001_MAT_0.geometry}
          material={materials.Gameboy_1001_MAT}
        />
        <mesh
          name="VolumeBtn_Base_geo_Gameboy_1001_MAT_0"
          castShadow
          receiveShadow
          geometry={nodes.VolumeBtn_Base_geo_Gameboy_1001_MAT_0.geometry}
          material={materials.Gameboy_1001_MAT}
        />
        <mesh
          name="VolumeBtn_geo_Gameboy_1001_MAT_0"
          castShadow
          receiveShadow
          geometry={nodes.VolumeBtn_geo_Gameboy_1001_MAT_0.geometry}
          material={materials.Gameboy_1001_MAT}
        />
        <mesh
          name="VolBar_geo_Gameboy_1003_MAT_0"
          castShadow
          receiveShadow
          geometry={nodes.VolBar_geo_Gameboy_1003_MAT_0.geometry}
          material={materials.Gameboy_1003_MAT}
        />
        <mesh
          name="VolDot_geo_Gameboy_1003_MAT_0"
          castShadow
          receiveShadow
          geometry={nodes.VolDot_geo_Gameboy_1003_MAT_0.geometry}
          material={materials.Gameboy_1003_MAT}
        />
        <mesh
          name="VolText_geo_Gameboy_1003_MAT_0"
          castShadow
          receiveShadow
          geometry={nodes.VolText_geo_Gameboy_1003_MAT_0.geometry}
          material={materials.Gameboy_1003_MAT}
        />
      </group>
    </group>
  );
}

useGLTF.preload("models/Sp.glb");

export function BackCar(props) {
  const { nodes, materials } = useGLTF("models/backcar.glb");
  return (
    <group {...props} dispose={null}>
      <group name="car001_291">
        <mesh
          name="Object_4"
          castShadow
          receiveShadow
          geometry={nodes.Object_4.geometry}
          material={materials["Material.034"]}
        />
        <mesh
          name="Object_5"
          castShadow
          receiveShadow
          geometry={nodes.Object_5.geometry}
          material={materials["Material.068"]}
        />
        <mesh
          name="Object_6"
          castShadow
          receiveShadow
          geometry={nodes.Object_6.geometry}
          material={materials["Material.514"]}
        />
        <mesh
          name="Object_7"
          castShadow
          receiveShadow
          geometry={nodes.Object_7.geometry}
          material={materials["Material.036"]}
        />
        <mesh
          name="Object_8"
          castShadow
          receiveShadow
          geometry={nodes.Object_8.geometry}
          material={materials["Material.037"]}
        />
        <mesh
          name="Object_9"
          castShadow
          receiveShadow
          geometry={nodes.Object_9.geometry}
          material={materials["Material.039"]}
        />
        <mesh
          name="Object_10"
          castShadow
          receiveShadow
          geometry={nodes.Object_10.geometry}
          material={materials["Material.040"]}
        />
        <mesh
          name="Object_11"
          castShadow
          receiveShadow
          geometry={nodes.Object_11.geometry}
          material={materials["Material.041"]}
        />
        <mesh
          name="Object_12"
          castShadow
          receiveShadow
          geometry={nodes.Object_12.geometry}
          material={materials["Material.042"]}
        />
        <mesh
          name="Object_13"
          castShadow
          receiveShadow
          geometry={nodes.Object_13.geometry}
          material={materials["Material.044"]}
        />
        <mesh
          name="Object_14"
          castShadow
          receiveShadow
          geometry={nodes.Object_14.geometry}
          material={materials["Material.045"]}
        />
        <mesh
          name="Object_15"
          castShadow
          receiveShadow
          geometry={nodes.Object_15.geometry}
          material={materials["Material.046"]}
        />
        <mesh
          name="Object_16"
          castShadow
          receiveShadow
          geometry={nodes.Object_16.geometry}
          material={materials["Material.094"]}
        />
        <mesh
          name="Object_17"
          castShadow
          receiveShadow
          geometry={nodes.Object_17.geometry}
          material={materials["Material.191"]}
        />
        <mesh
          name="Object_18"
          castShadow
          receiveShadow
          geometry={nodes.Object_18.geometry}
          material={materials["Material.403"]}
        />
        <group name="Cube064_16" position={[0.001, 0.449, -2.512]}>
          <mesh
            name="Object_52"
            castShadow
            receiveShadow
            geometry={nodes.Object_52.geometry}
            material={materials["Material.401"]}
          />
          <mesh
            name="Object_53"
            castShadow
            receiveShadow
            geometry={nodes.Object_53.geometry}
            material={materials["Material.155"]}
          />
        </group>
        <group name="Cube065_17" position={[1.368, -0.104, 3.023]}>
          <mesh
            name="Object_55"
            castShadow
            receiveShadow
            geometry={nodes.Object_55.geometry}
            material={materials["Material.031"]}
          />
          <mesh
            name="Object_56"
            castShadow
            receiveShadow
            geometry={nodes.Object_56.geometry}
            material={materials["Material.473"]}
          />
        </group>
        <group name="Cube068_20" position={[0.579, 0.723, -2.439]}>
          <mesh
            name="Object_62"
            castShadow
            receiveShadow
            geometry={nodes.Object_62.geometry}
            material={materials["Material.224"]}
          />
          <mesh
            name="Object_63"
            castShadow
            receiveShadow
            geometry={nodes.Object_63.geometry}
            material={materials["Material.225"]}
          />
        </group>
        <group name="Cube069_21" position={[-0.56, 0.748, -2.439]}>
          <mesh
            name="Object_65"
            castShadow
            receiveShadow
            geometry={nodes.Object_65.geometry}
            material={materials["Material.224"]}
          />
          <mesh
            name="Object_66"
            castShadow
            receiveShadow
            geometry={nodes.Object_66.geometry}
            material={materials["Material.225"]}
          />
        </group>
        <group name="Cube077_29" position={[-1.085, 0.684, -1.108]}>
          <mesh
            name="Object_82"
            castShadow
            receiveShadow
            geometry={nodes.Object_82.geometry}
            material={materials["Material.331"]}
          />
          <mesh
            name="Object_83"
            castShadow
            receiveShadow
            geometry={nodes.Object_83.geometry}
            material={materials["Material.304"]}
          />
        </group>
        <group name="Cube080_32" position={[1.049, 0.652, -1.691]}>
          <mesh
            name="Object_89"
            castShadow
            receiveShadow
            geometry={nodes.Object_89.geometry}
            material={materials["Material.331"]}
          />
          <mesh
            name="Object_90"
            castShadow
            receiveShadow
            geometry={nodes.Object_90.geometry}
            material={materials["Material.304"]}
          />
        </group>
        <group name="Cube097_50" position={[-0.008, 0.954, -0.981]}>
          <mesh
            name="Object_122"
            castShadow
            receiveShadow
            geometry={nodes.Object_122.geometry}
            material={materials["Material.105"]}
          />
          <mesh
            name="Object_123"
            castShadow
            receiveShadow
            geometry={nodes.Object_123.geometry}
            material={materials["Material.155_0"]}
          />
          <group name="Cube110_48" position={[1.208, -0.113, -0.045]}>
            <mesh
              name="Object_125"
              castShadow
              receiveShadow
              geometry={nodes.Object_125.geometry}
              material={materials["Material.155_0"]}
            />
            <mesh
              name="Object_126"
              castShadow
              receiveShadow
              geometry={nodes.Object_126.geometry}
              material={materials["Material.180"]}
            />
            <mesh
              name="Object_127"
              castShadow
              receiveShadow
              geometry={nodes.Object_127.geometry}
              material={materials["Material.180"]}
            />
            <mesh
              name="Object_128"
              castShadow
              receiveShadow
              geometry={nodes.Object_128.geometry}
              material={materials["Material.180"]}
            />
            <mesh
              name="Object_129"
              castShadow
              receiveShadow
              geometry={nodes.Object_129.geometry}
              material={materials["Material.180"]}
            />
            <mesh
              name="Object_130"
              castShadow
              receiveShadow
              geometry={nodes.Object_130.geometry}
              material={materials["Material.180"]}
            />
          </group>
          <group name="Cube111_49" position={[-1.196, -0.106, -0.049]}>
            <mesh
              name="Object_132"
              castShadow
              receiveShadow
              geometry={nodes.Object_132.geometry}
              material={materials["Material.155_0"]}
            />
            <mesh
              name="Object_133"
              castShadow
              receiveShadow
              geometry={nodes.Object_133.geometry}
              material={materials["Material.180"]}
            />
            <mesh
              name="Object_134"
              castShadow
              receiveShadow
              geometry={nodes.Object_134.geometry}
              material={materials["Material.180"]}
            />
            <mesh
              name="Object_135"
              castShadow
              receiveShadow
              geometry={nodes.Object_135.geometry}
              material={materials["Material.180"]}
            />
            <mesh
              name="Object_136"
              castShadow
              receiveShadow
              geometry={nodes.Object_136.geometry}
              material={materials["Material.180"]}
            />
            <mesh
              name="Object_137"
              castShadow
              receiveShadow
              geometry={nodes.Object_137.geometry}
              material={materials["Material.180"]}
            />
          </group>
        </group>
        <group name="Cube112_63" position={[0.75, 0.346, -2.41]}>
          <mesh
            name="Object_163"
            castShadow
            receiveShadow
            geometry={nodes.Object_163.geometry}
            material={materials["Material.196"]}
          />
          <mesh
            name="Object_164"
            castShadow
            receiveShadow
            geometry={nodes.Object_164.geometry}
            material={materials["Material.514"]}
          />
        </group>
        <group name="Cube113_64" position={[-0.743, 0.346, -2.41]}>
          <mesh
            name="Object_166"
            castShadow
            receiveShadow
            geometry={nodes.Object_166.geometry}
            material={materials["Material.196"]}
          />
          <mesh
            name="Object_167"
            castShadow
            receiveShadow
            geometry={nodes.Object_167.geometry}
            material={materials["Material.514"]}
          />
        </group>
        <group name="Cube115_66" position={[-1.085, 0.684, -1.365]}>
          <mesh
            name="Object_171"
            castShadow
            receiveShadow
            geometry={nodes.Object_171.geometry}
            material={materials["Material.331"]}
          />
          <mesh
            name="Object_172"
            castShadow
            receiveShadow
            geometry={nodes.Object_172.geometry}
            material={materials["Material.304"]}
          />
        </group>
        <group name="Cube126_96" position={[-1.421, -0.099, 2.99]}>
          <mesh
            name="Object_194"
            castShadow
            receiveShadow
            geometry={nodes.Object_194.geometry}
            material={materials["Material.031"]}
          />
          <mesh
            name="Object_195"
            castShadow
            receiveShadow
            geometry={nodes.Object_195.geometry}
            material={materials["Material.473"]}
          />
          <mesh
            name="Object_197"
            castShadow
            receiveShadow
            geometry={nodes.Object_197.geometry}
            material={materials["Material.058"]}
            position={[-0.075, -0.151, 0.196]}
          />
          <mesh
            name="Object_199"
            castShadow
            receiveShadow
            geometry={nodes.Object_199.geometry}
            material={materials["Material.058"]}
            position={[-0.048, -0.015, 0.212]}
          />
          <mesh
            name="Object_201"
            castShadow
            receiveShadow
            geometry={nodes.Object_201.geometry}
            material={materials["Material.058"]}
            position={[-0.08, -0.055, 0.113]}
          />
          <mesh
            name="Object_203"
            castShadow
            receiveShadow
            geometry={nodes.Object_203.geometry}
            material={materials["Material.058"]}
            position={[-0.067, 0.011, 0.12]}
          />
          <mesh
            name="Object_205"
            castShadow
            receiveShadow
            geometry={nodes.Object_205.geometry}
            material={materials["Material.058"]}
            position={[-0.094, -0.124, 0.104]}
          />
          <mesh
            name="Object_207"
            castShadow
            receiveShadow
            geometry={nodes.Object_207.geometry}
            material={materials["Material.058"]}
            position={[-0.085, -0.131, 0.158]}
          />
          <mesh
            name="Object_209"
            castShadow
            receiveShadow
            geometry={nodes.Object_209.geometry}
            material={materials["Material.058"]}
            position={[-0.058, 0.002, 0.174]}
          />
          <mesh
            name="Object_211"
            castShadow
            receiveShadow
            geometry={nodes.Object_211.geometry}
            material={materials["Material.058"]}
            position={[-0.071, -0.062, 0.167]}
          />
          <mesh
            name="Object_213"
            castShadow
            receiveShadow
            geometry={nodes.Object_213.geometry}
            material={materials["Material.058"]}
            position={[-0.057, 0.025, 0.094]}
          />
          <mesh
            name="Object_215"
            castShadow
            receiveShadow
            geometry={nodes.Object_215.geometry}
            material={materials["Material.058"]}
            position={[-0.105, -0.021, -0.097]}
          />
          <mesh
            name="Object_217"
            castShadow
            receiveShadow
            geometry={nodes.Object_217.geometry}
            material={materials["Material.058"]}
            position={[-0.088, 0.063, -0.085]}
          />
          <mesh
            name="Object_219"
            castShadow
            receiveShadow
            geometry={nodes.Object_219.geometry}
            material={materials["Material.058"]}
            position={[-0.082, -0.006, 0.057]}
          />
          <mesh
            name="Object_221"
            castShadow
            receiveShadow
            geometry={nodes.Object_221.geometry}
            material={materials["Material.058"]}
            position={[-0.102, 0.014, -0.066]}
          />
          <mesh
            name="Object_223"
            castShadow
            receiveShadow
            geometry={nodes.Object_223.geometry}
            material={materials["Material.058"]}
            position={[-0.071, 0.05, 0.066]}
          />
          <mesh
            name="Object_225"
            castShadow
            receiveShadow
            geometry={nodes.Object_225.geometry}
            material={materials["Material.058"]}
            position={[-0.081, 0.061, 0.004]}
          />
          <mesh
            name="Object_227"
            castShadow
            receiveShadow
            geometry={nodes.Object_227.geometry}
            material={materials["Material.058"]}
            position={[-0.091, 0.07, -0.057]}
          />
          <mesh
            name="Object_229"
            castShadow
            receiveShadow
            geometry={nodes.Object_229.geometry}
            material={materials["Material.058"]}
            position={[-0.114, -0.045, -0.075]}
          />
          <mesh
            name="Object_231"
            castShadow
            receiveShadow
            geometry={nodes.Object_231.geometry}
            material={materials["Material.058"]}
            position={[-0.104, -0.055, -0.014]}
          />
          <mesh
            name="Object_233"
            castShadow
            receiveShadow
            geometry={nodes.Object_233.geometry}
            material={materials["Material.058"]}
            position={[-0.094, -0.065, 0.048]}
          />
        </group>
        <group name="Cube127_97" position={[-0.004, -0.045, 3.418]}>
          <mesh
            name="Object_235"
            castShadow
            receiveShadow
            geometry={nodes.Object_235.geometry}
            material={materials["Material.474"]}
          />
          <mesh
            name="Object_236"
            castShadow
            receiveShadow
            geometry={nodes.Object_236.geometry}
            material={materials["Material.155_1"]}
          />
        </group>
        <group name="Cube131_98" position={[1.554, 0.369, 1.211]}>
          <mesh
            name="Object_238"
            castShadow
            receiveShadow
            geometry={nodes.Object_238.geometry}
            material={materials["Material.210"]}
          />
          <mesh
            name="Object_239"
            castShadow
            receiveShadow
            geometry={nodes.Object_239.geometry}
            material={materials["Material.209"]}
          />
        </group>
        <group name="Cube132_99" position={[-1.571, 0.369, 1.211]}>
          <mesh
            name="Object_241"
            castShadow
            receiveShadow
            geometry={nodes.Object_241.geometry}
            material={materials["Material.210"]}
          />
          <mesh
            name="Object_242"
            castShadow
            receiveShadow
            geometry={nodes.Object_242.geometry}
            material={materials["Material.209"]}
          />
        </group>
        <group name="Cylinder168_123" position={[0.018, 0.691, -2.068]}>
          <mesh
            name="Object_290"
            castShadow
            receiveShadow
            geometry={nodes.Object_290.geometry}
            material={materials["Material.354"]}
          />
          <mesh
            name="Object_291"
            castShadow
            receiveShadow
            geometry={nodes.Object_291.geometry}
            material={materials["Material.399"]}
          />
          <mesh
            name="Object_292"
            castShadow
            receiveShadow
            geometry={nodes.Object_292.geometry}
            material={materials["Material.400"]}
          />
        </group>
        <group name="Cylinder194_149" position={[-1.084, 0.569, -1.129]}>
          <mesh
            name="Object_344"
            castShadow
            receiveShadow
            geometry={nodes.Object_344.geometry}
            material={materials["Material.316"]}
          />
          <mesh
            name="Object_345"
            castShadow
            receiveShadow
            geometry={nodes.Object_345.geometry}
            material={materials["Material.317"]}
          />
        </group>
        <group name="Cylinder195_150" position={[1.047, 0.553, -1.673]}>
          <mesh
            name="Object_347"
            castShadow
            receiveShadow
            geometry={nodes.Object_347.geometry}
            material={materials["Material.324"]}
          />
          <mesh
            name="Object_348"
            castShadow
            receiveShadow
            geometry={nodes.Object_348.geometry}
            material={materials["Material.514"]}
          />
        </group>
        <group name="Cylinder265_220" position={[-1.084, 0.569, -1.387]}>
          <mesh
            name="Object_488"
            castShadow
            receiveShadow
            geometry={nodes.Object_488.geometry}
            material={materials["Material.301"]}
          />
          <mesh
            name="Object_489"
            castShadow
            receiveShadow
            geometry={nodes.Object_489.geometry}
            material={materials["Material.514"]}
          />
        </group>
        <group name="Cylinder285_240" position={[-1.21, 0.546, -1.414]}>
          <mesh
            name="Object_529"
            castShadow
            receiveShadow
            geometry={nodes.Object_529.geometry}
            material={materials["Material.358"]}
          />
          <mesh
            name="Object_530"
            castShadow
            receiveShadow
            geometry={nodes.Object_530.geometry}
            material={materials["Material.359"]}
          />
        </group>
        <group name="Cylinder286_241" position={[-1.273, 0.546, -1.414]}>
          <mesh
            name="Object_532"
            castShadow
            receiveShadow
            geometry={nodes.Object_532.geometry}
            material={materials["Material.358"]}
          />
          <mesh
            name="Object_533"
            castShadow
            receiveShadow
            geometry={nodes.Object_533.geometry}
            material={materials["Material.359"]}
          />
        </group>
        <group name="Cylinder287_242" position={[-1.224, 0.588, -1.414]}>
          <mesh
            name="Object_535"
            castShadow
            receiveShadow
            geometry={nodes.Object_535.geometry}
            material={materials["Material.358"]}
          />
          <mesh
            name="Object_536"
            castShadow
            receiveShadow
            geometry={nodes.Object_536.geometry}
            material={materials["Material.359"]}
          />
        </group>
        <group name="hold_01018_245" position={[1.345, 0.016, 2.879]}>
          <mesh
            name="Object_542"
            castShadow
            receiveShadow
            geometry={nodes.Object_542.geometry}
            material={materials["Material.461"]}
          />
          <mesh
            name="Object_543"
            castShadow
            receiveShadow
            geometry={nodes.Object_543.geometry}
            material={materials["Material.451"]}
          />
        </group>
        <group name="hold_01019_246" position={[1.382, 0.113, 2.619]}>
          <mesh
            name="Object_545"
            castShadow
            receiveShadow
            geometry={nodes.Object_545.geometry}
            material={materials["Material.461"]}
          />
          <mesh
            name="Object_546"
            castShadow
            receiveShadow
            geometry={nodes.Object_546.geometry}
            material={materials["Material.451"]}
          />
        </group>
        <group name="hold_01020_247" position={[1.458, 0.068, 2.132]}>
          <mesh
            name="Object_548"
            castShadow
            receiveShadow
            geometry={nodes.Object_548.geometry}
            material={materials["Material.461"]}
          />
          <mesh
            name="Object_549"
            castShadow
            receiveShadow
            geometry={nodes.Object_549.geometry}
            material={materials["Material.451"]}
          />
        </group>
        <group name="hold_01021_248" position={[1.474, -0.266, 1.929]}>
          <mesh
            name="Object_551"
            castShadow
            receiveShadow
            geometry={nodes.Object_551.geometry}
            material={materials["Material.461"]}
          />
          <mesh
            name="Object_552"
            castShadow
            receiveShadow
            geometry={nodes.Object_552.geometry}
            material={materials["Material.451"]}
          />
        </group>
        <group name="hold_01022_249" position={[1.532, -0.266, -0.628]}>
          <mesh
            name="Object_554"
            castShadow
            receiveShadow
            geometry={nodes.Object_554.geometry}
            material={materials["Material.461"]}
          />
          <mesh
            name="Object_555"
            castShadow
            receiveShadow
            geometry={nodes.Object_555.geometry}
            material={materials["Material.451"]}
          />
        </group>
        <group name="hold_01023_250" position={[1.481, 0.013, -0.711]}>
          <mesh
            name="Object_557"
            castShadow
            receiveShadow
            geometry={nodes.Object_557.geometry}
            material={materials["Material.461"]}
          />
          <mesh
            name="Object_558"
            castShadow
            receiveShadow
            geometry={nodes.Object_558.geometry}
            material={materials["Material.451"]}
          />
        </group>
        <group name="hold_01024_251" position={[1.454, 0.282, -0.87]}>
          <mesh
            name="Object_560"
            castShadow
            receiveShadow
            geometry={nodes.Object_560.geometry}
            material={materials["Material.461"]}
          />
          <mesh
            name="Object_561"
            castShadow
            receiveShadow
            geometry={nodes.Object_561.geometry}
            material={materials["Material.451"]}
          />
        </group>
        <group name="hold_01025_252" position={[1.535, -0.501, 1.259]}>
          <mesh
            name="Object_563"
            castShadow
            receiveShadow
            geometry={nodes.Object_563.geometry}
            material={materials["Material.099"]}
          />
          <mesh
            name="Object_564"
            castShadow
            receiveShadow
            geometry={nodes.Object_564.geometry}
            material={materials["Material.451"]}
          />
        </group>
        <group name="hold_01026_253" position={[1.576, -0.479, -0.001]}>
          <mesh
            name="Object_566"
            castShadow
            receiveShadow
            geometry={nodes.Object_566.geometry}
            material={materials["Material.099"]}
          />
          <mesh
            name="Object_567"
            castShadow
            receiveShadow
            geometry={nodes.Object_567.geometry}
            material={materials["Material.451"]}
          />
        </group>
        <group name="hold_01027_254" position={[-1.601, -0.477, -0.037]}>
          <mesh
            name="Object_569"
            castShadow
            receiveShadow
            geometry={nodes.Object_569.geometry}
            material={materials["Material.099"]}
          />
          <mesh
            name="Object_570"
            castShadow
            receiveShadow
            geometry={nodes.Object_570.geometry}
            material={materials["Material.451"]}
          />
        </group>
        <group name="hold_01028_255" position={[-1.571, -0.5, 1.225]}>
          <mesh
            name="Object_572"
            castShadow
            receiveShadow
            geometry={nodes.Object_572.geometry}
            material={materials["Material.099"]}
          />
          <mesh
            name="Object_573"
            castShadow
            receiveShadow
            geometry={nodes.Object_573.geometry}
            material={materials["Material.451"]}
          />
        </group>
        <group name="hold_01029_256" position={[-1.463, 0.283, -0.857]}>
          <mesh
            name="Object_575"
            castShadow
            receiveShadow
            geometry={nodes.Object_575.geometry}
            material={materials["Material.461"]}
          />
          <mesh
            name="Object_576"
            castShadow
            receiveShadow
            geometry={nodes.Object_576.geometry}
            material={materials["Material.451"]}
          />
        </group>
        <group name="hold_01030_257" position={[-1.516, 0.001, -0.72]}>
          <mesh
            name="Object_578"
            castShadow
            receiveShadow
            geometry={nodes.Object_578.geometry}
            material={materials["Material.461"]}
          />
          <mesh
            name="Object_579"
            castShadow
            receiveShadow
            geometry={nodes.Object_579.geometry}
            material={materials["Material.451"]}
          />
        </group>
        <group name="hold_01031_258" position={[-1.554, -0.274, -0.638]}>
          <mesh
            name="Object_581"
            castShadow
            receiveShadow
            geometry={nodes.Object_581.geometry}
            material={materials["Material.461"]}
          />
          <mesh
            name="Object_582"
            castShadow
            receiveShadow
            geometry={nodes.Object_582.geometry}
            material={materials["Material.451"]}
          />
        </group>
        <group name="hold_01032_259" position={[-1.504, -0.259, 1.905]}>
          <mesh
            name="Object_584"
            castShadow
            receiveShadow
            geometry={nodes.Object_584.geometry}
            material={materials["Material.461"]}
          />
          <mesh
            name="Object_585"
            castShadow
            receiveShadow
            geometry={nodes.Object_585.geometry}
            material={materials["Material.451"]}
          />
        </group>
        <group name="hold_01033_260" position={[-1.493, 0.06, 2.116]}>
          <mesh
            name="Object_587"
            castShadow
            receiveShadow
            geometry={nodes.Object_587.geometry}
            material={materials["Material.461"]}
          />
          <mesh
            name="Object_588"
            castShadow
            receiveShadow
            geometry={nodes.Object_588.geometry}
            material={materials["Material.451"]}
          />
        </group>
        <group name="hold_01034_261" position={[-1.407, 0.11, 2.597]}>
          <mesh
            name="Object_590"
            castShadow
            receiveShadow
            geometry={nodes.Object_590.geometry}
            material={materials["Material.461"]}
          />
          <mesh
            name="Object_591"
            castShadow
            receiveShadow
            geometry={nodes.Object_591.geometry}
            material={materials["Material.451"]}
          />
        </group>
        <group name="hold_01035_262" position={[-1.397, 0.035, 2.811]}>
          <mesh
            name="Object_593"
            castShadow
            receiveShadow
            geometry={nodes.Object_593.geometry}
            material={materials["Material.461"]}
          />
          <mesh
            name="Object_594"
            castShadow
            receiveShadow
            geometry={nodes.Object_594.geometry}
            material={materials["Material.451"]}
          />
        </group>
        <group name="key001_263" position={[1.353, 0.319, -0.399]}>
          <mesh
            name="Object_596"
            castShadow
            receiveShadow
            geometry={nodes.Object_596.geometry}
            material={materials["Material.096"]}
          />
          <mesh
            name="Object_597"
            castShadow
            receiveShadow
            geometry={nodes.Object_597.geometry}
            material={materials["Material.155_0"]}
          />
        </group>
        <group name="pipe004_268" position={[0.293, 0.532, -1.619]}>
          <mesh
            name="Object_599"
            castShadow
            receiveShadow
            geometry={nodes.Object_599.geometry}
            material={materials["Material.383"]}
          />
          <mesh
            name="Object_600"
            castShadow
            receiveShadow
            geometry={nodes.Object_600.geometry}
            material={materials["Material.383"]}
          />
          <mesh
            name="Object_601"
            castShadow
            receiveShadow
            geometry={nodes.Object_601.geometry}
            material={materials["Material.383"]}
          />
          <mesh
            name="Object_602"
            castShadow
            receiveShadow
            geometry={nodes.Object_602.geometry}
            material={materials["Material.383"]}
          />
          <mesh
            name="Object_603"
            castShadow
            receiveShadow
            geometry={nodes.Object_603.geometry}
            material={materials["Material.383"]}
          />
        </group>
        <group name="pipe005_269" position={[-0.276, 0.684, -1.63]}>
          <mesh
            name="Object_605"
            castShadow
            receiveShadow
            geometry={nodes.Object_605.geometry}
            material={materials["Material.383"]}
          />
          <mesh
            name="Object_606"
            castShadow
            receiveShadow
            geometry={nodes.Object_606.geometry}
            material={materials["Material.383"]}
          />
          <mesh
            name="Object_607"
            castShadow
            receiveShadow
            geometry={nodes.Object_607.geometry}
            material={materials["Material.383"]}
          />
          <mesh
            name="Object_608"
            castShadow
            receiveShadow
            geometry={nodes.Object_608.geometry}
            material={materials["Material.383"]}
          />
          <mesh
            name="Object_609"
            castShadow
            receiveShadow
            geometry={nodes.Object_609.geometry}
            material={materials["Material.383"]}
          />
        </group>
        <group name="pipe006_270" position={[-0.247, 0.776, -1.63]}>
          <mesh
            name="Object_611"
            castShadow
            receiveShadow
            geometry={nodes.Object_611.geometry}
            material={materials["Material.383"]}
          />
          <mesh
            name="Object_612"
            castShadow
            receiveShadow
            geometry={nodes.Object_612.geometry}
            material={materials["Material.383"]}
          />
          <mesh
            name="Object_613"
            castShadow
            receiveShadow
            geometry={nodes.Object_613.geometry}
            material={materials["Material.383"]}
          />
          <mesh
            name="Object_614"
            castShadow
            receiveShadow
            geometry={nodes.Object_614.geometry}
            material={materials["Material.383"]}
          />
          <mesh
            name="Object_615"
            castShadow
            receiveShadow
            geometry={nodes.Object_615.geometry}
            material={materials["Material.383"]}
          />
        </group>
        <group name="pipe007_271" position={[0.382, 0.694, -1.614]}>
          <mesh
            name="Object_617"
            castShadow
            receiveShadow
            geometry={nodes.Object_617.geometry}
            material={materials["Material.383"]}
          />
          <mesh
            name="Object_618"
            castShadow
            receiveShadow
            geometry={nodes.Object_618.geometry}
            material={materials["Material.383"]}
          />
          <mesh
            name="Object_619"
            castShadow
            receiveShadow
            geometry={nodes.Object_619.geometry}
            material={materials["Material.383"]}
          />
          <mesh
            name="Object_620"
            castShadow
            receiveShadow
            geometry={nodes.Object_620.geometry}
            material={materials["Material.383"]}
          />
          <mesh
            name="Object_621"
            castShadow
            receiveShadow
            geometry={nodes.Object_621.geometry}
            material={materials["Material.383"]}
          />
        </group>
        <group name="wheel004_275" position={[1.278, -0.354, 2.431]}>
          <mesh
            name="Object_629"
            castShadow
            receiveShadow
            geometry={nodes.Object_629.geometry}
            material={materials["Material.413"]}
          />
          <mesh
            name="Object_630"
            castShadow
            receiveShadow
            geometry={nodes.Object_630.geometry}
            material={materials["Material.409"]}
          />
          <mesh
            name="Object_631"
            castShadow
            receiveShadow
            geometry={nodes.Object_631.geometry}
            material={materials["Material.430"]}
          />
        </group>
        <group name="wheel005_276" position={[1.278, -0.278, -1.288]}>
          <mesh
            name="Object_633"
            castShadow
            receiveShadow
            geometry={nodes.Object_633.geometry}
            material={materials["Material.413"]}
          />
          <mesh
            name="Object_634"
            castShadow
            receiveShadow
            geometry={nodes.Object_634.geometry}
            material={materials["Material.409"]}
          />
          <mesh
            name="Object_635"
            castShadow
            receiveShadow
            geometry={nodes.Object_635.geometry}
            material={materials["Material.430"]}
          />
        </group>
        <group name="wheel006_277" position={[-1.232, -0.278, -1.288]}>
          <mesh
            name="Object_637"
            castShadow
            receiveShadow
            geometry={nodes.Object_637.geometry}
            material={materials["Material.413"]}
          />
          <mesh
            name="Object_638"
            castShadow
            receiveShadow
            geometry={nodes.Object_638.geometry}
            material={materials["Material.409"]}
          />
          <mesh
            name="Object_639"
            castShadow
            receiveShadow
            geometry={nodes.Object_639.geometry}
            material={materials["Material.430"]}
          />
        </group>
        <group name="wheel007_278" position={[-1.232, -0.354, 2.431]}>
          <mesh
            name="Object_641"
            castShadow
            receiveShadow
            geometry={nodes.Object_641.geometry}
            material={materials["Material.413"]}
          />
          <mesh
            name="Object_642"
            castShadow
            receiveShadow
            geometry={nodes.Object_642.geometry}
            material={materials["Material.409"]}
          />
          <mesh
            name="Object_643"
            castShadow
            receiveShadow
            geometry={nodes.Object_643.geometry}
            material={materials["Material.430"]}
          />
        </group>
        <group name="Cube096_287" position={[0.812, -0.044, 3.314]}>
          <mesh
            name="Object_661"
            castShadow
            receiveShadow
            geometry={nodes.Object_661.geometry}
            material={materials["Material.513"]}
          />
          <mesh
            name="Object_662"
            castShadow
            receiveShadow
            geometry={nodes.Object_662.geometry}
            material={materials["Material.514"]}
          />
        </group>
        <group name="Cube128_288" position={[1.132, -0.044, 3.314]}>
          <mesh
            name="Object_664"
            castShadow
            receiveShadow
            geometry={nodes.Object_664.geometry}
            material={materials["Material.513"]}
          />
          <mesh
            name="Object_665"
            castShadow
            receiveShadow
            geometry={nodes.Object_665.geometry}
            material={materials["Material.514"]}
          />
        </group>
        <group name="Cube129_289" position={[-0.81, -0.044, 3.314]}>
          <mesh
            name="Object_667"
            castShadow
            receiveShadow
            geometry={nodes.Object_667.geometry}
            material={materials["Material.513"]}
          />
          <mesh
            name="Object_668"
            castShadow
            receiveShadow
            geometry={nodes.Object_668.geometry}
            material={materials["Material.514"]}
          />
        </group>
        <group name="Cube130_290" position={[-1.135, -0.044, 3.314]}>
          <mesh
            name="Object_670"
            castShadow
            receiveShadow
            geometry={nodes.Object_670.geometry}
            material={materials["Material.513"]}
          />
          <mesh
            name="Object_671"
            castShadow
            receiveShadow
            geometry={nodes.Object_671.geometry}
            material={materials["Material.514"]}
          />
        </group>
        <mesh
          name="Object_20"
          castShadow
          receiveShadow
          geometry={nodes.Object_20.geometry}
          material={materials["Material.321"]}
          position={[-1.08, 0.588, -1.09]}
        />
        <mesh
          name="Object_22"
          castShadow
          receiveShadow
          geometry={nodes.Object_22.geometry}
          material={materials["Material.322"]}
          position={[-1.106, 0.588, -1.09]}
        />
        <mesh
          name="Object_24"
          castShadow
          receiveShadow
          geometry={nodes.Object_24.geometry}
          material={materials["Material.333"]}
          position={[-1.134, 0.588, -1.09]}
        />
        <mesh
          name="Object_26"
          castShadow
          receiveShadow
          geometry={nodes.Object_26.geometry}
          material={materials["Material.333"]}
          position={[1.091, 0.57, -1.707]}
        />
        <mesh
          name="Object_28"
          castShadow
          receiveShadow
          geometry={nodes.Object_28.geometry}
          material={materials["Material.322"]}
          position={[1.067, 0.57, -1.707]}
        />
        <mesh
          name="Object_30"
          castShadow
          receiveShadow
          geometry={nodes.Object_30.geometry}
          material={materials["Material.321"]}
          position={[1.045, 0.57, -1.707]}
        />
        <mesh
          name="Object_32"
          castShadow
          receiveShadow
          geometry={nodes.Object_32.geometry}
          material={materials["Material.407"]}
          position={[-0.1, 0.739, -1.212]}
        />
        <mesh
          name="Object_34"
          castShadow
          receiveShadow
          geometry={nodes.Object_34.geometry}
          material={materials["Material.407"]}
          position={[0.656, 0.567, -1.212]}
        />
        <mesh
          name="Object_36"
          castShadow
          receiveShadow
          geometry={nodes.Object_36.geometry}
          material={materials["Material.407"]}
          position={[0.886, 0.62, -1.148]}
        />
        <mesh
          name="Object_38"
          castShadow
          receiveShadow
          geometry={nodes.Object_38.geometry}
          material={materials["Material.407"]}
          position={[-0.874, 0.567, -1.212]}
        />
        <mesh
          name="Object_40"
          castShadow
          receiveShadow
          geometry={nodes.Object_40.geometry}
          material={materials["Material.390"]}
          position={[0.723, 0.964, -1.47]}
        />
        <mesh
          name="Object_42"
          castShadow
          receiveShadow
          geometry={nodes.Object_42.geometry}
          material={materials["Material.390"]}
          position={[-0.818, 0.964, -1.47]}
        />
        <mesh
          name="Object_44"
          castShadow
          receiveShadow
          geometry={nodes.Object_44.geometry}
          material={materials["Material.407"]}
          position={[-0.1, -0.306, -2.328]}
        />
        <mesh
          name="Object_46"
          castShadow
          receiveShadow
          geometry={nodes.Object_46.geometry}
          material={materials["Material.333"]}
          position={[-1.134, 0.588, -1.347]}
        />
        <mesh
          name="Object_48"
          castShadow
          receiveShadow
          geometry={nodes.Object_48.geometry}
          material={materials["Material.322"]}
          position={[-1.106, 0.588, -1.347]}
        />
        <mesh
          name="Object_50"
          castShadow
          receiveShadow
          geometry={nodes.Object_50.geometry}
          material={materials["Material.321"]}
          position={[-1.08, 0.588, -1.347]}
        />
        <mesh
          name="Object_58"
          castShadow
          receiveShadow
          geometry={nodes.Object_58.geometry}
          material={materials["Material.098"]}
          position={[1.504, -0.51, 1.35]}
        />
        <mesh
          name="Object_60"
          castShadow
          receiveShadow
          geometry={nodes.Object_60.geometry}
          material={materials["Material.404"]}
          position={[-0.974, -0.331, -2.233]}
        />
        <mesh
          name="Object_68"
          castShadow
          receiveShadow
          geometry={nodes.Object_68.geometry}
          material={materials["Material.270"]}
          position={[0.032, 0.554, -1.582]}
        />
        <mesh
          name="Object_70"
          castShadow
          receiveShadow
          geometry={nodes.Object_70.geometry}
          material={materials["Material.269"]}
          position={[-0.302, 0.609, -1.578]}
        />
        <mesh
          name="Object_72"
          castShadow
          receiveShadow
          geometry={nodes.Object_72.geometry}
          material={materials["Material.269"]}
          position={[0.366, 0.609, -1.569]}
        />
        <mesh
          name="Object_74"
          castShadow
          receiveShadow
          geometry={nodes.Object_74.geometry}
          material={materials["Material.228"]}
          position={[0.037, 0.736, -1.576]}
        />
        <mesh
          name="Object_76"
          castShadow
          receiveShadow
          geometry={nodes.Object_76.geometry}
          material={materials["Material.270"]}
          position={[-0.462, 0.409, -1.337]}
        />
        <mesh
          name="Object_78"
          castShadow
          receiveShadow
          geometry={nodes.Object_78.geometry}
          material={materials["Material.298"]}
          position={[1.176, 0.542, -1.855]}
        />
        <mesh
          name="Object_80"
          castShadow
          receiveShadow
          geometry={nodes.Object_80.geometry}
          material={materials["Material.299"]}
          position={[1.151, 0.521, -1.855]}
        />
        <mesh
          name="Object_85"
          castShadow
          receiveShadow
          geometry={nodes.Object_85.geometry}
          material={materials["Material.300"]}
          position={[-1.085, 0.453, -1.173]}
        />
        <mesh
          name="Object_87"
          castShadow
          receiveShadow
          geometry={nodes.Object_87.geometry}
          material={materials["Material.300"]}
          position={[1.049, 0.453, -1.635]}
        />
        <mesh
          name="Object_92"
          castShadow
          receiveShadow
          geometry={nodes.Object_92.geometry}
          material={materials["Material.404"]}
          position={[0.861, -0.331, -2.233]}
        />
        <mesh
          name="Object_94"
          castShadow
          receiveShadow
          geometry={nodes.Object_94.geometry}
          material={materials["Material.406"]}
          position={[-0.048, -0.319, -2.281]}
        />
        <mesh
          name="Object_96"
          castShadow
          receiveShadow
          geometry={nodes.Object_96.geometry}
          material={materials["Material.227"]}
          position={[0.169, 0.968, -0.973]}
        />
        <mesh
          name="Object_98"
          castShadow
          receiveShadow
          geometry={nodes.Object_98.geometry}
          material={materials["Material.227"]}
          position={[0.412, 0.968, -0.915]}
        />
        <mesh
          name="Object_100"
          castShadow
          receiveShadow
          geometry={nodes.Object_100.geometry}
          material={materials["Material.227"]}
          position={[0.412, 0.968, -1.035]}
        />
        <mesh
          name="Object_102"
          castShadow
          receiveShadow
          geometry={nodes.Object_102.geometry}
          material={materials["Material.228"]}
          position={[0.165, 1.03, -0.975]}
        />
        <mesh
          name="Object_104"
          castShadow
          receiveShadow
          geometry={nodes.Object_104.geometry}
          material={materials["Material.228"]}
          position={[-0.179, 1.03, -0.975]}
        />
        <mesh
          name="Object_106"
          castShadow
          receiveShadow
          geometry={nodes.Object_106.geometry}
          material={materials["Material.230"]}
          position={[-0.446, 0.968, -1.035]}
        />
        <mesh
          name="Object_108"
          castShadow
          receiveShadow
          geometry={nodes.Object_108.geometry}
          material={materials["Material.230"]}
          position={[-0.446, 0.968, -0.915]}
        />
        <mesh
          name="Object_110"
          castShadow
          receiveShadow
          geometry={nodes.Object_110.geometry}
          material={materials["Material.230"]}
          position={[-0.182, 0.968, -0.973]}
        />
        <mesh
          name="Object_112"
          castShadow
          receiveShadow
          geometry={nodes.Object_112.geometry}
          material={materials["Material.228"]}
          position={[-0.004, 1.081, -0.973]}
        />
        <mesh
          name="Object_114"
          castShadow
          receiveShadow
          geometry={nodes.Object_114.geometry}
          material={materials["Material.232"]}
          position={[-0.004, 1.175, -0.973]}
        />
        <mesh
          name="Object_116"
          castShadow
          receiveShadow
          geometry={nodes.Object_116.geometry}
          material={materials["Material.232"]}
          position={[-0.004, 1.204, -0.977]}
        />
        <mesh
          name="Object_118"
          castShadow
          receiveShadow
          geometry={nodes.Object_118.geometry}
          material={materials["Material.235"]}
          position={[-0.004, 1.204, -1.071]}
        />
        <mesh
          name="Object_120"
          castShadow
          receiveShadow
          geometry={nodes.Object_120.geometry}
          material={materials["Material.235"]}
          position={[-0.004, 1.206, -0.766]}
        />
        <mesh
          name="Object_139"
          castShadow
          receiveShadow
          geometry={nodes.Object_139.geometry}
          material={materials["Material.110"]}
          position={[1.367, 0.366, -1.297]}
        />
        <mesh
          name="Object_141"
          castShadow
          receiveShadow
          geometry={nodes.Object_141.geometry}
          material={materials["Material.110"]}
          position={[1.367, 0.367, -1.871]}
        />
        <mesh
          name="Object_143"
          castShadow
          receiveShadow
          geometry={nodes.Object_143.geometry}
          material={materials["Material.110"]}
          position={[1.413, 0.266, -2.165]}
        />
        <mesh
          name="Object_145"
          castShadow
          receiveShadow
          geometry={nodes.Object_145.geometry}
          material={materials["Material.110"]}
          position={[1.422, -0.12, -2.214]}
        />
        <mesh
          name="Object_147"
          castShadow
          receiveShadow
          geometry={nodes.Object_147.geometry}
          material={materials["Material.110"]}
          position={[1.298, 0.527, -0.978]}
        />
        <mesh
          name="Object_149"
          castShadow
          receiveShadow
          geometry={nodes.Object_149.geometry}
          material={materials["Material.110"]}
          position={[0.809, 0.886, -0.978]}
        />
        <mesh
          name="Object_151"
          castShadow
          receiveShadow
          geometry={nodes.Object_151.geometry}
          material={materials["Material.110"]}
          position={[-0.741, 0.91, -0.978]}
        />
        <mesh
          name="Object_153"
          castShadow
          receiveShadow
          geometry={nodes.Object_153.geometry}
          material={materials["Material.110"]}
          position={[-1.289, 0.55, -0.978]}
        />
        <mesh
          name="Object_155"
          castShadow
          receiveShadow
          geometry={nodes.Object_155.geometry}
          material={materials["Material.110"]}
          position={[-1.423, -0.096, -2.214]}
        />
        <mesh
          name="Object_157"
          castShadow
          receiveShadow
          geometry={nodes.Object_157.geometry}
          material={materials["Material.110"]}
          position={[-1.412, 0.253, -2.157]}
        />
        <mesh
          name="Object_159"
          castShadow
          receiveShadow
          geometry={nodes.Object_159.geometry}
          material={materials["Material.110"]}
          position={[-1.356, 0.37, -1.871]}
        />
        <mesh
          name="Object_161"
          castShadow
          receiveShadow
          geometry={nodes.Object_161.geometry}
          material={materials["Material.110"]}
          position={[-1.356, 0.361, -1.297]}
        />
        <mesh
          name="Object_169"
          castShadow
          receiveShadow
          geometry={nodes.Object_169.geometry}
          material={materials["Material.300"]}
          position={[-1.085, 0.453, -1.43]}
        />
        <mesh
          name="Object_174"
          castShadow
          receiveShadow
          geometry={nodes.Object_174.geometry}
          material={materials["Material.404"]}
          position={[-0.818, 0.58, -1.104]}
        />
        <mesh
          name="Object_176"
          castShadow
          receiveShadow
          geometry={nodes.Object_176.geometry}
          material={materials["Material.352"]}
          position={[-0.804, 0.715, -1.119]}
        />
        <mesh
          name="Object_178"
          castShadow
          receiveShadow
          geometry={nodes.Object_178.geometry}
          material={materials["Material.353"]}
          position={[-0.817, 0.581, -1.496]}
        />
        <mesh
          name="Object_180"
          castShadow
          receiveShadow
          geometry={nodes.Object_180.geometry}
          material={materials["Material.364"]}
          position={[-1.235, 0.559, -1.906]}
        />
        <mesh
          name="Object_182"
          castShadow
          receiveShadow
          geometry={nodes.Object_182.geometry}
          material={materials["Material.364"]}
          position={[-1.235, 0.559, -1.786]}
        />
        <mesh
          name="Object_184"
          castShadow
          receiveShadow
          geometry={nodes.Object_184.geometry}
          material={materials["Material.364"]}
          position={[-1.173, 0.416, -1.417]}
        />
        <mesh
          name="Object_186"
          castShadow
          receiveShadow
          geometry={nodes.Object_186.geometry}
          material={materials["Material.297"]}
          position={[1.216, 0.487, -1.236]}
        />
        <mesh
          name="Object_188"
          castShadow
          receiveShadow
          geometry={nodes.Object_188.geometry}
          material={materials["Material.297"]}
          position={[1.216, 0.487, -1.432]}
        />
        <mesh
          name="Object_190"
          castShadow
          receiveShadow
          geometry={nodes.Object_190.geometry}
          material={materials["Material.297"]}
          position={[1.216, 0.487, -1.621]}
        />
        <mesh
          name="Object_192"
          castShadow
          receiveShadow
          geometry={nodes.Object_192.geometry}
          material={materials["Material.098"]}
          position={[-1.546, -0.506, 1.319]}
        />
        <mesh
          name="Object_244"
          castShadow
          receiveShadow
          geometry={nodes.Object_244.geometry}
          material={materials["Material.058"]}
          position={[1.461, -0.183, 3.056]}
        />
        <mesh
          name="Object_246"
          castShadow
          receiveShadow
          geometry={nodes.Object_246.geometry}
          material={materials["Material.058"]}
          position={[1.461, -0.174, 2.993]}
        />
        <mesh
          name="Object_248"
          castShadow
          receiveShadow
          geometry={nodes.Object_248.geometry}
          material={materials["Material.058"]}
          position={[1.461, -0.165, 2.93]}
        />
        <mesh
          name="Object_250"
          castShadow
          receiveShadow
          geometry={nodes.Object_250.geometry}
          material={materials["Material.058"]}
          position={[1.461, -0.047, 2.95]}
        />
        <mesh
          name="Object_252"
          castShadow
          receiveShadow
          geometry={nodes.Object_252.geometry}
          material={materials["Material.058"]}
          position={[1.461, -0.056, 3.012]}
        />
        <mesh
          name="Object_254"
          castShadow
          receiveShadow
          geometry={nodes.Object_254.geometry}
          material={materials["Material.058"]}
          position={[1.461, -0.065, 3.075]}
        />
        <mesh
          name="Object_256"
          castShadow
          receiveShadow
          geometry={nodes.Object_256.geometry}
          material={materials["Material.058"]}
          position={[1.461, -0.105, 2.94]}
        />
        <mesh
          name="Object_258"
          castShadow
          receiveShadow
          geometry={nodes.Object_258.geometry}
          material={materials["Material.058"]}
          position={[1.461, -0.122, 3.065]}
        />
        <mesh
          name="Object_260"
          castShadow
          receiveShadow
          geometry={nodes.Object_260.geometry}
          material={materials["Material.058"]}
          position={[1.461, -0.06, 2.921]}
        />
        <mesh
          name="Object_262"
          castShadow
          receiveShadow
          geometry={nodes.Object_262.geometry}
          material={materials["Material.058"]}
          position={[1.461, -0.145, 2.908]}
        />
        <mesh
          name="Object_264"
          castShadow
          receiveShadow
          geometry={nodes.Object_264.geometry}
          material={materials["Material.058"]}
          position={[1.461, -0.085, 3.103]}
        />
        <mesh
          name="Object_266"
          castShadow
          receiveShadow
          geometry={nodes.Object_266.geometry}
          material={materials["Material.058"]}
          position={[1.461, -0.177, 3.176]}
        />
        <mesh
          name="Object_268"
          castShadow
          receiveShadow
          geometry={nodes.Object_268.geometry}
          material={materials["Material.058"]}
          position={[1.461, -0.112, 3.184]}
        />
        <mesh
          name="Object_270"
          castShadow
          receiveShadow
          geometry={nodes.Object_270.geometry}
          material={materials["Material.058"]}
          position={[1.461, -0.247, 3.167]}
        />
        <mesh
          name="Object_272"
          castShadow
          receiveShadow
          geometry={nodes.Object_272.geometry}
          material={materials["Material.058"]}
          position={[1.461, -0.241, 3.111]}
        />
        <mesh
          name="Object_274"
          castShadow
          receiveShadow
          geometry={nodes.Object_274.geometry}
          material={materials["Material.058"]}
          position={[1.461, -0.104, 3.129]}
        />
        <mesh
          name="Object_276"
          castShadow
          receiveShadow
          geometry={nodes.Object_276.geometry}
          material={materials["Material.058"]}
          position={[1.461, -0.171, 3.121]}
        />
        <mesh
          name="Object_278"
          castShadow
          receiveShadow
          geometry={nodes.Object_278.geometry}
          material={materials["Material.058"]}
          position={[1.446, -0.101, 3.224]}
        />
        <mesh
          name="Object_280"
          castShadow
          receiveShadow
          geometry={nodes.Object_280.geometry}
          material={materials["Material.058"]}
          position={[1.446, -0.131, 3.22]}
        />
        <mesh
          name="Object_282"
          castShadow
          receiveShadow
          geometry={nodes.Object_282.geometry}
          material={materials["Material.058"]}
          position={[1.446, -0.27, 3.201]}
        />
        <mesh
          name="Object_284"
          castShadow
          receiveShadow
          geometry={nodes.Object_284.geometry}
          material={materials["Material.058"]}
          position={[1.446, -0.239, 3.205]}
        />
        <mesh
          name="Object_286"
          castShadow
          receiveShadow
          geometry={nodes.Object_286.geometry}
          material={materials["Material.467"]}
          position={[1.392, 0.013, 2.975]}
        />
        <mesh
          name="Object_288"
          castShadow
          receiveShadow
          geometry={nodes.Object_288.geometry}
          material={materials["Material.271"]}
          position={[0.182, 0.735, -1.485]}
        />
        <mesh
          name="Object_294"
          castShadow
          receiveShadow
          geometry={nodes.Object_294.geometry}
          material={materials["Material.271"]}
          position={[0.217, 0.735, -1.677]}
        />
        <mesh
          name="Object_296"
          castShadow
          receiveShadow
          geometry={nodes.Object_296.geometry}
          material={materials["Material.271"]}
          position={[-0.155, 0.735, -1.677]}
        />
        <mesh
          name="Object_298"
          castShadow
          receiveShadow
          geometry={nodes.Object_298.geometry}
          material={materials["Material.271"]}
          position={[-0.119, 0.735, -1.485]}
        />
        <mesh
          name="Object_300"
          castShadow
          receiveShadow
          geometry={nodes.Object_300.geometry}
          material={materials["Material.270"]}
          position={[-0.075, 0.494, -1.316]}
        />
        <mesh
          name="Object_302"
          castShadow
          receiveShadow
          geometry={nodes.Object_302.geometry}
          material={materials["Material.270"]}
          position={[0.151, 0.494, -1.316]}
        />
        <mesh
          name="Object_304"
          castShadow
          receiveShadow
          geometry={nodes.Object_304.geometry}
          material={materials["Material.271"]}
          position={[0.095, 0.743, -1.635]}
        />
        <mesh
          name="Object_306"
          castShadow
          receiveShadow
          geometry={nodes.Object_306.geometry}
          material={materials["Material.271"]}
          position={[0.095, 0.743, -1.516]}
        />
        <mesh
          name="Object_308"
          castShadow
          receiveShadow
          geometry={nodes.Object_308.geometry}
          material={materials["Material.271"]}
          position={[-0.02, 0.743, -1.515]}
        />
        <mesh
          name="Object_310"
          castShadow
          receiveShadow
          geometry={nodes.Object_310.geometry}
          material={materials["Material.271"]}
          position={[-0.02, 0.743, -1.634]}
        />
        <mesh
          name="Object_312"
          castShadow
          receiveShadow
          geometry={nodes.Object_312.geometry}
          material={materials["Material.304"]}
          position={[1.232, 0.532, -1.236]}
        />
        <mesh
          name="Object_314"
          castShadow
          receiveShadow
          geometry={nodes.Object_314.geometry}
          material={materials["Material.297"]}
          position={[1.243, 0.567, -1.236]}
        />
        <mesh
          name="Object_316"
          castShadow
          receiveShadow
          geometry={nodes.Object_316.geometry}
          material={materials["Material.297"]}
          position={[1.284, 0.56, -1.203]}
        />
        <mesh
          name="Object_318"
          castShadow
          receiveShadow
          geometry={nodes.Object_318.geometry}
          material={materials["Material.297"]}
          position={[1.243, 0.565, -1.265]}
        />
        <mesh
          name="Object_320"
          castShadow
          receiveShadow
          geometry={nodes.Object_320.geometry}
          material={materials["Material.297"]}
          position={[1.243, 0.565, -1.461]}
        />
        <mesh
          name="Object_322"
          castShadow
          receiveShadow
          geometry={nodes.Object_322.geometry}
          material={materials["Material.297"]}
          position={[1.284, 0.56, -1.399]}
        />
        <mesh
          name="Object_324"
          castShadow
          receiveShadow
          geometry={nodes.Object_324.geometry}
          material={materials["Material.297"]}
          position={[1.243, 0.567, -1.432]}
        />
        <mesh
          name="Object_326"
          castShadow
          receiveShadow
          geometry={nodes.Object_326.geometry}
          material={materials["Material.304"]}
          position={[1.232, 0.532, -1.432]}
        />
        <mesh
          name="Object_328"
          castShadow
          receiveShadow
          geometry={nodes.Object_328.geometry}
          material={materials["Material.304"]}
          position={[1.232, 0.532, -1.621]}
        />
        <mesh
          name="Object_330"
          castShadow
          receiveShadow
          geometry={nodes.Object_330.geometry}
          material={materials["Material.297"]}
          position={[1.243, 0.567, -1.621]}
        />
        <mesh
          name="Object_332"
          castShadow
          receiveShadow
          geometry={nodes.Object_332.geometry}
          material={materials["Material.297"]}
          position={[1.284, 0.56, -1.588]}
        />
        <mesh
          name="Object_334"
          castShadow
          receiveShadow
          geometry={nodes.Object_334.geometry}
          material={materials["Material.297"]}
          position={[1.243, 0.565, -1.65]}
        />
        <mesh
          name="Object_336"
          castShadow
          receiveShadow
          geometry={nodes.Object_336.geometry}
          material={materials["Material.329"]}
          position={[-1.091, 0.482, -1.238]}
        />
        <mesh
          name="Object_338"
          castShadow
          receiveShadow
          geometry={nodes.Object_338.geometry}
          material={materials["Material.155_0"]}
          position={[-1.058, 0.688, -1.134]}
        />
        <mesh
          name="Object_340"
          castShadow
          receiveShadow
          geometry={nodes.Object_340.geometry}
          material={materials["Material.155_0"]}
          position={[-1.109, 0.688, -1.134]}
        />
        <mesh
          name="Object_342"
          castShadow
          receiveShadow
          geometry={nodes.Object_342.geometry}
          material={materials["Material.155_0"]}
          position={[-1.083, 0.688, -1.134]}
        />
        <mesh
          name="Object_350"
          castShadow
          receiveShadow
          geometry={nodes.Object_350.geometry}
          material={materials["Material.155_0"]}
          position={[1.047, 0.656, -1.669]}
        />
        <mesh
          name="Object_352"
          castShadow
          receiveShadow
          geometry={nodes.Object_352.geometry}
          material={materials["Material.155_0"]}
          position={[1.07, 0.656, -1.669]}
        />
        <mesh
          name="Object_354"
          castShadow
          receiveShadow
          geometry={nodes.Object_354.geometry}
          material={materials["Material.155_0"]}
          position={[1.025, 0.656, -1.669]}
        />
        <mesh
          name="Object_356"
          castShadow
          receiveShadow
          geometry={nodes.Object_356.geometry}
          material={materials["Material.329"]}
          position={[1.054, 0.478, -1.579]}
        />
        <mesh
          name="Object_358"
          castShadow
          receiveShadow
          geometry={nodes.Object_358.geometry}
          material={materials["Material.392"]}
          position={[0.701, 0.815, -1.024]}
        />
        <mesh
          name="Object_360"
          castShadow
          receiveShadow
          geometry={nodes.Object_360.geometry}
          material={materials["Material.392"]}
          position={[-0.868, 0.823, -1.024]}
        />
        <mesh
          name="Object_362"
          castShadow
          receiveShadow
          geometry={nodes.Object_362.geometry}
          material={materials["Material.395"]}
          position={[-0.868, 0.823, -1.08]}
        />
        <mesh
          name="Object_364"
          castShadow
          receiveShadow
          geometry={nodes.Object_364.geometry}
          material={materials["Material.395"]}
          position={[0.701, 0.815, -1.08]}
        />
        <mesh
          name="Object_366"
          castShadow
          receiveShadow
          geometry={nodes.Object_366.geometry}
          material={materials["Material.395"]}
          position={[-0.907, 0.894, -1.742]}
        />
        <mesh
          name="Object_368"
          castShadow
          receiveShadow
          geometry={nodes.Object_368.geometry}
          material={materials["Material.395"]}
          position={[0.866, 0.894, -1.742]}
        />
        <mesh
          name="Object_370"
          castShadow
          receiveShadow
          geometry={nodes.Object_370.geometry}
          material={materials["Material.395"]}
          position={[0.821, 0.869, -2.378]}
        />
        <mesh
          name="Object_372"
          castShadow
          receiveShadow
          geometry={nodes.Object_372.geometry}
          material={materials["Material.395"]}
          position={[-0.801, 0.88, -2.378]}
        />
        <mesh
          name="Object_374"
          castShadow
          receiveShadow
          geometry={nodes.Object_374.geometry}
          material={materials["Material.228"]}
          position={[0.08, 1.105, -0.975]}
        />
        <mesh
          name="Object_376"
          castShadow
          receiveShadow
          geometry={nodes.Object_376.geometry}
          material={materials["Material.228"]}
          position={[-0.094, 1.105, -0.975]}
        />
        <mesh
          name="Object_378"
          castShadow
          receiveShadow
          geometry={nodes.Object_378.geometry}
          material={materials["Material.232"]}
          position={[0.049, 1.204, -1.049]}
        />
        <mesh
          name="Object_380"
          castShadow
          receiveShadow
          geometry={nodes.Object_380.geometry}
          material={materials["Material.232"]}
          position={[-0.054, 1.204, -1.049]}
        />
        <mesh
          name="Object_382"
          castShadow
          receiveShadow
          geometry={nodes.Object_382.geometry}
          material={materials["Material.271"]}
          position={[-0.15, 1.09, -0.88]}
        />
        <mesh
          name="Object_384"
          castShadow
          receiveShadow
          geometry={nodes.Object_384.geometry}
          material={materials["Material.271"]}
          position={[0.419, 1.029, -1.032]}
        />
        <mesh
          name="Object_386"
          castShadow
          receiveShadow
          geometry={nodes.Object_386.geometry}
          material={materials["Material.271"]}
          position={[-0.477, 1.029, -1.032]}
        />
        <mesh
          name="Object_388"
          castShadow
          receiveShadow
          geometry={nodes.Object_388.geometry}
          material={materials["Material.271"]}
          position={[-0.477, 1.029, -0.916]}
        />
        <mesh
          name="Object_390"
          castShadow
          receiveShadow
          geometry={nodes.Object_390.geometry}
          material={materials["Material.271"]}
          position={[-0.418, 1.029, -1.032]}
        />
        <mesh
          name="Object_392"
          castShadow
          receiveShadow
          geometry={nodes.Object_392.geometry}
          material={materials["Material.271"]}
          position={[-0.418, 1.029, -0.916]}
        />
        <mesh
          name="Object_394"
          castShadow
          receiveShadow
          geometry={nodes.Object_394.geometry}
          material={materials["Material.271"]}
          position={[0.421, 1.029, -0.916]}
        />
        <mesh
          name="Object_396"
          castShadow
          receiveShadow
          geometry={nodes.Object_396.geometry}
          material={materials["Material.271"]}
          position={[0.362, 1.029, -0.916]}
        />
        <mesh
          name="Object_398"
          castShadow
          receiveShadow
          geometry={nodes.Object_398.geometry}
          material={materials["Material.271"]}
          position={[0.362, 1.029, -1.032]}
        />
        <mesh
          name="Object_400"
          castShadow
          receiveShadow
          geometry={nodes.Object_400.geometry}
          material={materials["Material.271"]}
          position={[0.089, 1.042, -1.032]}
        />
        <mesh
          name="Object_402"
          castShadow
          receiveShadow
          geometry={nodes.Object_402.geometry}
          material={materials["Material.271"]}
          position={[0.089, 1.042, -0.916]}
        />
        <mesh
          name="Object_404"
          castShadow
          receiveShadow
          geometry={nodes.Object_404.geometry}
          material={materials["Material.271"]}
          position={[0.237, 1.042, -1.032]}
        />
        <mesh
          name="Object_406"
          castShadow
          receiveShadow
          geometry={nodes.Object_406.geometry}
          material={materials["Material.271"]}
          position={[0.237, 1.042, -0.916]}
        />
        <mesh
          name="Object_408"
          castShadow
          receiveShadow
          geometry={nodes.Object_408.geometry}
          material={materials["Material.271"]}
          position={[-0.113, 1.042, -0.916]}
        />
        <mesh
          name="Object_410"
          castShadow
          receiveShadow
          geometry={nodes.Object_410.geometry}
          material={materials["Material.271"]}
          position={[-0.113, 1.042, -1.032]}
        />
        <mesh
          name="Object_412"
          castShadow
          receiveShadow
          geometry={nodes.Object_412.geometry}
          material={materials["Material.271"]}
          position={[-0.262, 1.042, -0.916]}
        />
        <mesh
          name="Object_414"
          castShadow
          receiveShadow
          geometry={nodes.Object_414.geometry}
          material={materials["Material.271"]}
          position={[-0.262, 1.042, -1.032]}
        />
        <mesh
          name="Object_416"
          castShadow
          receiveShadow
          geometry={nodes.Object_416.geometry}
          material={materials["Material.271"]}
          position={[-0.151, 1.09, -1.061]}
        />
        <mesh
          name="Object_418"
          castShadow
          receiveShadow
          geometry={nodes.Object_418.geometry}
          material={materials["Material.271"]}
          position={[0.136, 1.09, -0.881]}
        />
        <mesh
          name="Object_420"
          castShadow
          receiveShadow
          geometry={nodes.Object_420.geometry}
          material={materials["Material.271"]}
          position={[0.136, 1.09, -1.063]}
        />
        <mesh
          name="Object_422"
          castShadow
          receiveShadow
          geometry={nodes.Object_422.geometry}
          material={materials["Material.271"]}
          position={[0.212, 1.042, -0.974]}
        />
        <mesh
          name="Object_424"
          castShadow
          receiveShadow
          geometry={nodes.Object_424.geometry}
          material={materials["Material.271"]}
          position={[0.16, 1.06, -0.974]}
        />
        <mesh
          name="Object_426"
          castShadow
          receiveShadow
          geometry={nodes.Object_426.geometry}
          material={materials["Material.271"]}
          position={[-0.173, 1.062, -0.974]}
        />
        <mesh
          name="Object_428"
          castShadow
          receiveShadow
          geometry={nodes.Object_428.geometry}
          material={materials["Material.271"]}
          position={[-0.225, 1.044, -0.974]}
        />
        <mesh
          name="Object_430"
          castShadow
          receiveShadow
          geometry={nodes.Object_430.geometry}
          material={materials["Material.271"]}
          position={[-0.003, 1.194, -1.183]}
        />
        <mesh
          name="Object_432"
          castShadow
          receiveShadow
          geometry={nodes.Object_432.geometry}
          material={materials["Material.271"]}
          position={[-0.034, 1.221, -1.183]}
        />
        <mesh
          name="Object_434"
          castShadow
          receiveShadow
          geometry={nodes.Object_434.geometry}
          material={materials["Material.271"]}
          position={[0.029, 1.221, -1.183]}
        />
        <mesh
          name="Object_436"
          castShadow
          receiveShadow
          geometry={nodes.Object_436.geometry}
          material={materials["Material.271"]}
          position={[0.075, 1.221, -1.183]}
        />
        <mesh
          name="Object_438"
          castShadow
          receiveShadow
          geometry={nodes.Object_438.geometry}
          material={materials["Material.271"]}
          position={[-0.086, 1.221, -1.183]}
        />
        <mesh
          name="Object_440"
          castShadow
          receiveShadow
          geometry={nodes.Object_440.geometry}
          material={materials["Material.271"]}
          position={[0.799, 0.976, -2.704]}
        />
        <mesh
          name="Object_442"
          castShadow
          receiveShadow
          geometry={nodes.Object_442.geometry}
          material={materials["Material.271"]}
          position={[0.799, 0.81, -2.728]}
        />
        <mesh
          name="Object_444"
          castShadow
          receiveShadow
          geometry={nodes.Object_444.geometry}
          material={materials["Material.271"]}
          position={[0.799, 0.657, -2.75]}
        />
        <mesh
          name="Object_446"
          castShadow
          receiveShadow
          geometry={nodes.Object_446.geometry}
          material={materials["Material.271"]}
          position={[0.799, 0.644, -2.68]}
        />
        <mesh
          name="Object_448"
          castShadow
          receiveShadow
          geometry={nodes.Object_448.geometry}
          material={materials["Material.271"]}
          position={[0.799, 0.797, -2.658]}
        />
        <mesh
          name="Object_450"
          castShadow
          receiveShadow
          geometry={nodes.Object_450.geometry}
          material={materials["Material.271"]}
          position={[0.799, 0.963, -2.633]}
        />
        <mesh
          name="Object_452"
          castShadow
          receiveShadow
          geometry={nodes.Object_452.geometry}
          material={materials["Material.271"]}
          position={[0.795, 0.673, -1.967]}
        />
        <mesh
          name="Object_454"
          castShadow
          receiveShadow
          geometry={nodes.Object_454.geometry}
          material={materials["Material.271"]}
          position={[0.795, 0.699, -2.035]}
        />
        <mesh
          name="Object_456"
          castShadow
          receiveShadow
          geometry={nodes.Object_456.geometry}
          material={materials["Material.271"]}
          position={[0.724, 0.657, -1.787]}
        />
        <mesh
          name="Object_458"
          castShadow
          receiveShadow
          geometry={nodes.Object_458.geometry}
          material={materials["Material.271"]}
          position={[0.644, 0.655, -1.787]}
        />
        <mesh
          name="Object_460"
          castShadow
          receiveShadow
          geometry={nodes.Object_460.geometry}
          material={materials["Material.213"]}
          position={[0.441, 0.654, -1.788]}
        />
        <mesh
          name="Object_462"
          castShadow
          receiveShadow
          geometry={nodes.Object_462.geometry}
          material={materials["Material.271"]}
          position={[0.528, 0.653, -1.788]}
        />
        <mesh
          name="Object_464"
          castShadow
          receiveShadow
          geometry={nodes.Object_464.geometry}
          material={materials["Material.271"]}
          position={[-0.507, 0.679, -1.788]}
        />
        <mesh
          name="Object_466"
          castShadow
          receiveShadow
          geometry={nodes.Object_466.geometry}
          material={materials["Material.213"]}
          position={[-0.417, 0.679, -1.788]}
        />
        <mesh
          name="Object_468"
          castShadow
          receiveShadow
          geometry={nodes.Object_468.geometry}
          material={materials["Material.271"]}
          position={[-0.627, 0.68, -1.787]}
        />
        <mesh
          name="Object_470"
          castShadow
          receiveShadow
          geometry={nodes.Object_470.geometry}
          material={materials["Material.271"]}
          position={[-0.71, 0.682, -1.787]}
        />
        <mesh
          name="Object_472"
          castShadow
          receiveShadow
          geometry={nodes.Object_472.geometry}
          material={materials["Material.271"]}
          position={[-0.784, 0.724, -2.035]}
        />
        <mesh
          name="Object_474"
          castShadow
          receiveShadow
          geometry={nodes.Object_474.geometry}
          material={materials["Material.271"]}
          position={[-0.784, 0.699, -1.967]}
        />
        <mesh
          name="Object_476"
          castShadow
          receiveShadow
          geometry={nodes.Object_476.geometry}
          material={materials["Material.271"]}
          position={[-0.788, 0.988, -2.633]}
        />
        <mesh
          name="Object_478"
          castShadow
          receiveShadow
          geometry={nodes.Object_478.geometry}
          material={materials["Material.271"]}
          position={[-0.788, 0.822, -2.658]}
        />
        <mesh
          name="Object_480"
          castShadow
          receiveShadow
          geometry={nodes.Object_480.geometry}
          material={materials["Material.271"]}
          position={[-0.788, 0.669, -2.68]}
        />
        <mesh
          name="Object_482"
          castShadow
          receiveShadow
          geometry={nodes.Object_482.geometry}
          material={materials["Material.271"]}
          position={[-0.788, 0.682, -2.75]}
        />
        <mesh
          name="Object_484"
          castShadow
          receiveShadow
          geometry={nodes.Object_484.geometry}
          material={materials["Material.271"]}
          position={[-0.788, 0.835, -2.728]}
        />
        <mesh
          name="Object_486"
          castShadow
          receiveShadow
          geometry={nodes.Object_486.geometry}
          material={materials["Material.271"]}
          position={[-0.788, 1.001, -2.704]}
        />
        <mesh
          name="Object_491"
          castShadow
          receiveShadow
          geometry={nodes.Object_491.geometry}
          material={materials["Material.155_0"]}
          position={[-1.083, 0.688, -1.391]}
        />
        <mesh
          name="Object_493"
          castShadow
          receiveShadow
          geometry={nodes.Object_493.geometry}
          material={materials["Material.155_0"]}
          position={[-1.109, 0.688, -1.391]}
        />
        <mesh
          name="Object_495"
          castShadow
          receiveShadow
          geometry={nodes.Object_495.geometry}
          material={materials["Material.155_0"]}
          position={[-1.058, 0.688, -1.391]}
        />
        <mesh
          name="Object_497"
          castShadow
          receiveShadow
          geometry={nodes.Object_497.geometry}
          material={materials["Material.329"]}
          position={[-1.091, 0.482, -1.495]}
        />
        <mesh
          name="Object_499"
          castShadow
          receiveShadow
          geometry={nodes.Object_499.geometry}
          material={materials["Material.271"]}
          position={[-1.049, 0.477, -1.537]}
        />
        <mesh
          name="Object_501"
          castShadow
          receiveShadow
          geometry={nodes.Object_501.geometry}
          material={materials["Material.271"]}
          position={[-1.135, 0.477, -1.537]}
        />
        <mesh
          name="Object_503"
          castShadow
          receiveShadow
          geometry={nodes.Object_503.geometry}
          material={materials["Material.271"]}
          position={[-1.135, 0.477, -1.324]}
        />
        <mesh
          name="Object_505"
          castShadow
          receiveShadow
          geometry={nodes.Object_505.geometry}
          material={materials["Material.271"]}
          position={[-1.049, 0.477, -1.324]}
        />
        <mesh
          name="Object_507"
          castShadow
          receiveShadow
          geometry={nodes.Object_507.geometry}
          material={materials["Material.271"]}
          position={[-1.049, 0.477, -1.073]}
        />
        <mesh
          name="Object_509"
          castShadow
          receiveShadow
          geometry={nodes.Object_509.geometry}
          material={materials["Material.271"]}
          position={[-1.135, 0.477, -1.073]}
        />
        <mesh
          name="Object_511"
          castShadow
          receiveShadow
          geometry={nodes.Object_511.geometry}
          material={materials["Material.271"]}
          position={[-1.135, 0.477, -1.286]}
        />
        <mesh
          name="Object_513"
          castShadow
          receiveShadow
          geometry={nodes.Object_513.geometry}
          material={materials["Material.271"]}
          position={[-1.049, 0.477, -1.286]}
        />
        <mesh
          name="Object_515"
          castShadow
          receiveShadow
          geometry={nodes.Object_515.geometry}
          material={materials["Material.271"]}
          position={[1.017, 0.473, -1.54]}
        />
        <mesh
          name="Object_517"
          castShadow
          receiveShadow
          geometry={nodes.Object_517.geometry}
          material={materials["Material.271"]}
          position={[1.091, 0.473, -1.54]}
        />
        <mesh
          name="Object_519"
          castShadow
          receiveShadow
          geometry={nodes.Object_519.geometry}
          material={materials["Material.271"]}
          position={[1.091, 0.473, -1.724]}
        />
        <mesh
          name="Object_521"
          castShadow
          receiveShadow
          geometry={nodes.Object_521.geometry}
          material={materials["Material.271"]}
          position={[1.017, 0.473, -1.724]}
        />
        <mesh
          name="Object_523"
          castShadow
          receiveShadow
          geometry={nodes.Object_523.geometry}
          material={materials["Material.349"]}
          position={[0.551, 0.576, -1.093]}
        />
        <mesh
          name="Object_525"
          castShadow
          receiveShadow
          geometry={nodes.Object_525.geometry}
          material={materials["Material.350"]}
          position={[-0.307, 0.571, -1.087]}
        />
        <mesh
          name="Object_527"
          castShadow
          receiveShadow
          geometry={nodes.Object_527.geometry}
          material={materials["Material.355"]}
          position={[-0.814, 0.613, -1.497]}
        />
        <mesh
          name="Object_538"
          castShadow
          receiveShadow
          geometry={nodes.Object_538.geometry}
          material={materials["Material.467"]}
          position={[-1.434, 0.021, 2.947]}
        />
        <mesh
          name="Object_540"
          castShadow
          receiveShadow
          geometry={nodes.Object_540.geometry}
          material={materials["Material.095"]}
          position={[1.404, -0.005, -0.017]}
        />
        <mesh
          name="Object_623"
          castShadow
          receiveShadow
          geometry={nodes.Object_623.geometry}
          material={materials["Material.228"]}
          position={[-0.005, 1.206, -1.175]}
        />
        <mesh
          name="Object_625"
          castShadow
          receiveShadow
          geometry={nodes.Object_625.geometry}
          material={materials["Material.067"]}
          position={[1.381, 0.004, 3.057]}
        />
        <mesh
          name="Object_627"
          castShadow
          receiveShadow
          geometry={nodes.Object_627.geometry}
          material={materials["Material.067"]}
          position={[-1.41, 0.009, 3.026]}
        />
        <mesh
          name="Object_645"
          castShadow
          receiveShadow
          geometry={nodes.Object_645.geometry}
          material={materials["Material.068"]}
          position={[1.422, -0.018, 2.1]}
        />
        <mesh
          name="Object_647"
          castShadow
          receiveShadow
          geometry={nodes.Object_647.geometry}
          material={materials["Material.090"]}
          position={[1.416, 0.012, 2.1]}
        />
        <mesh
          name="Object_649"
          castShadow
          receiveShadow
          geometry={nodes.Object_649.geometry}
          material={materials["Material.091"]}
          position={[1.409, 0.022, 2.104]}
        />
        <mesh
          name="Object_651"
          castShadow
          receiveShadow
          geometry={nodes.Object_651.geometry}
          material={materials["Material.092"]}
          position={[1.393, 0.022, 2.104]}
        />
        <mesh
          name="Object_653"
          castShadow
          receiveShadow
          geometry={nodes.Object_653.geometry}
          material={materials["Material.092"]}
          position={[-1.424, 0.021, 2.075]}
        />
        <mesh
          name="Object_655"
          castShadow
          receiveShadow
          geometry={nodes.Object_655.geometry}
          material={materials["Material.091"]}
          position={[-1.44, 0.023, 2.077]}
        />
        <mesh
          name="Object_657"
          castShadow
          receiveShadow
          geometry={nodes.Object_657.geometry}
          material={materials["Material.090"]}
          position={[-1.45, 0.016, 2.075]}
        />
        <mesh
          name="Object_659"
          castShadow
          receiveShadow
          geometry={nodes.Object_659.geometry}
          material={materials["Material.068"]}
          position={[-1.461, -0.014, 2.076]}
        />
      </group>
    </group>
  );
}

useGLTF.preload("models/backcar.glb");
