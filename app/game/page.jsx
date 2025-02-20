"use client";

import { useState, useContext, useCallback, useEffect, useRef } from "react";
import { motion } from "framer-motion-3d";
import { Canvas } from "@react-three/fiber";
import {
  PerspectiveCamera,
  Environment,
  Plane,
  OrbitControls,
  Html,
  useGLTF,
} from "@react-three/drei";
import React from "react";
import { gsap } from "gsap";

function EmulatorInterface({ setLoadPokemonRom }) {
  const [gbaModule, setGbaModule] = useState(null);
  const [error, setError] = useState("");
  useEffect(() => {
    const importGbaModule = async () => {
      const {
        default: ReactGbaJs,
        GbaContext,
        GbaProvider,
      } = await import("react-gbajs");
      setGbaModule({ ReactGbaJs, GbaContext, GbaProvider });
    };

    importGbaModule();
  }, []);

  if (!gbaModule) {
    return <p>Loading ReactGbaJs...</p>;
  }

  return (
    <gbaModule.GbaProvider>
      <EmulatorDisplay
        setLoadPokemonRom={setLoadPokemonRom}
        gbaModule={gbaModule}
      />
    </gbaModule.GbaProvider>
  );
}
function EmulatorDisplay({ setLoadPokemonRom, gbaModule }) {
  const { play } = useContext(gbaModule.GbaContext);
  const loadPokemonRom = useCallback(async () => {
    try {
      const response = await fetch("/gba/pkmfirered.gba");
      const arrayBuffer = await response.arrayBuffer();
      play({ newRomBuffer: new Uint8Array(arrayBuffer) });
      setError("");
    } catch (err) {}
  }, [play]);
  useEffect(() => {
    if (setLoadPokemonRom) {
      setLoadPokemonRom(() => loadPokemonRom);
    }
  }, [setLoadPokemonRom, loadPokemonRom]);
  return <gbaModule.ReactGbaJs scale={1.71} />;
}

function GamePage({ setLoadPokemonRom }) {
  return <EmulatorInterface setLoadPokemonRom={setLoadPokemonRom} />;
}

export default function MainScene() {
  const [loadPokemonRom, setLoadPokemonRom] = useState(null);
  const [isActivated, setIsActivated] = useState(false);
  const pkmCart = useRef();
  const movePkmInside = () => {
    if (isActivated) return;
    setIsActivated(true);
    gsap.to(pkmCart.current.rotation, { x: Math.PI / -1, duration: 0.2 });
    gsap.to(pkmCart.current.position, { x: 0, z: 2, delay: 0.2, duration: 1 });
    gsap.to(pkmCart.current.position, {
      x: 0,
      y: -6.45,
      z: 2,
      delay: 1.4,
      duration: 1,
      onComplete: () => {
        loadPokemonRom && loadPokemonRom();
      },
    });
  };

  return (
    <Canvas shadows>
      <ambientLight intensity={1} />
      <directionalLight intensity={1} position={[0, -20, 50]} />
      <Environment preset="sunset" />
      <PerspectiveCamera makeDefault position={[0, 0, 100]} fov={20} />
      <OrbitControls />
      <Plane receiveShadow args={[100, 100]} position={[0, 0, 0]}>
        <meshToonMaterial color="#adb5bd" receiveShadow />
      </Plane>
      <Sp scale={1.6} position={[0, -6, 1]} />
      <motion.group
        ref={pkmCart}
        onTap={isActivated ? undefined : movePkmInside}
        position={[16, -12, 2]}
      >
        <CartPkm scale={1.6} />
      </motion.group>

      <Html
        className="content"
        position={[0, 6.88, 5]}
        rotation={[0.067, 0, 0]}
        transform
        occlude
      >
        <div className="wrapper">
          <GamePage setLoadPokemonRom={setLoadPokemonRom} />
        </div>
      </Html>

      <color attach="background" args={["#e9ecef"]} />
    </Canvas>
  );
}

function CartPkm(props) {
  const { nodes, materials } = useGLTF("models/cartridge-pkm.glb");
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cartridge_geo_Cartridge_MAT_0.geometry}
        material={materials.Cartridge_MAT}
      />
    </group>
  );
}

useGLTF.preload("models/cartridge-pkm.glb");

function Sp(props) {
  const { nodes, materials } = useGLTF("models/Sp.glb");
  return (
    <group {...props} dispose={null}>
      <group name="Scene">
        <group name="Sketchfab_model">
          <group name="GBA_SP" rotation={[Math.PI / 2, 0, 0]}>
            <group name="RootNode">
              <group name="GBA_grp">
                <group name="ConsoleBase_grp">
                  <group name="Base_geo">
                    <mesh
                      name="Base_geo_Gameboy_1001_MAT_0"
                      castShadow
                      receiveShadow
                      geometry={nodes.Base_geo_Gameboy_1001_MAT_0.geometry}
                      material={materials.Gameboy_1001_MAT}
                    />
                  </group>
                  <group name="BatterLid_Screw_geo">
                    <mesh
                      name="BatterLid_Screw_geo_Gameboy_1001_MAT_0"
                      castShadow
                      receiveShadow
                      geometry={
                        nodes.BatterLid_Screw_geo_Gameboy_1001_MAT_0.geometry
                      }
                      material={materials.Gameboy_1001_MAT}
                    />
                  </group>
                  <group name="Battery_Lid_geo">
                    <mesh
                      name="Battery_Lid_geo_Gameboy_1001_MAT_0"
                      castShadow
                      receiveShadow
                      geometry={
                        nodes.Battery_Lid_geo_Gameboy_1001_MAT_0.geometry
                      }
                      material={materials.Gameboy_1001_MAT}
                    />
                  </group>
                  <group name="Btm_Label_geo">
                    <mesh
                      name="Btm_Label_geo_Gameboy_1003_MAT_0"
                      castShadow
                      receiveShadow
                      geometry={nodes.Btm_Label_geo_Gameboy_1003_MAT_0.geometry}
                      material={materials.Gameboy_1003_MAT}
                    />
                  </group>
                  <group name="Buttons_grp">
                    <motion.group
                      name="A_Btn_geo"
                      whileTap={{
                        scaleY: 0.9,
                      }}
                    >
                      <mesh
                        name="A_Btn_geo_Gameboy_1002_MAT_0"
                        castShadow
                        receiveShadow
                        geometry={nodes.A_Btn_geo_Gameboy_1002_MAT_0.geometry}
                        material={materials.Gameboy_1002_MAT}
                      />
                    </motion.group>
                    <motion.group
                      name="B_Btn_geo"
                      whileTap={{
                        scaleY: 0.9,
                      }}
                    >
                      <mesh
                        name="B_Btn_geo_Gameboy_1002_MAT_0"
                        castShadow
                        receiveShadow
                        geometry={nodes.B_Btn_geo_Gameboy_1002_MAT_0.geometry}
                        material={materials.Gameboy_1002_MAT}
                      />
                    </motion.group>
                    <motion.group
                      name="Brightness_Btn_geo"
                      whileTap={{
                        scaleY: 0.95,
                      }}
                    >
                      <mesh
                        name="Brightness_Btn_geo_Gameboy_1002_MAT_0"
                        castShadow
                        receiveShadow
                        geometry={
                          nodes.Brightness_Btn_geo_Gameboy_1002_MAT_0.geometry
                        }
                        material={materials.Gameboy_1002_MAT}
                      />
                    </motion.group>
                    <motion.group
                      name="DPad_geo"
                      whileTap={{
                        y: -0.05,
                        rotateX: -0.02,
                      }}
                    >
                      <mesh
                        name="DPad_geo_Gameboy_1002_MAT_0"
                        castShadow
                        receiveShadow
                        geometry={nodes.DPad_geo_Gameboy_1002_MAT_0.geometry}
                        material={materials.Gameboy_1002_MAT}
                      />
                    </motion.group>
                    <motion.group
                      whileTap={{
                        scaleZ: 0.95,
                      }}
                      name="L_ShoulderBtn_geo"
                    >
                      <mesh
                        name="L_ShoulderBtn_geo_Gameboy_1003_MAT_0"
                        castShadow
                        receiveShadow
                        geometry={
                          nodes.L_ShoulderBtn_geo_Gameboy_1003_MAT_0.geometry
                        }
                        material={materials.Gameboy_1003_MAT}
                      />
                    </motion.group>
                    <group name="L_ShoulderButn_Inside_geo">
                      <mesh
                        name="L_ShoulderButn_Inside_geo_Gameboy_1001_MAT_0"
                        castShadow
                        receiveShadow
                        geometry={
                          nodes.L_ShoulderButn_Inside_geo_Gameboy_1001_MAT_0
                            .geometry
                        }
                        material={materials.Gameboy_1001_MAT}
                      />
                    </group>
                    <motion.group
                      whileTap={{
                        scaleZ: 0.95,
                      }}
                      name="R_ShoulderBtn_geo"
                    >
                      <mesh
                        name="R_ShoulderBtn_geo_Gameboy_1003_MAT_0"
                        castShadow
                        receiveShadow
                        geometry={
                          nodes.R_ShoulderBtn_geo_Gameboy_1003_MAT_0.geometry
                        }
                        material={materials.Gameboy_1003_MAT}
                      />
                    </motion.group>
                    <group name="R_ShoulderButn_Inside_geo">
                      <mesh
                        name="R_ShoulderButn_Inside_geo_Gameboy_1001_MAT_0"
                        castShadow
                        receiveShadow
                        geometry={
                          nodes.R_ShoulderButn_Inside_geo_Gameboy_1001_MAT_0
                            .geometry
                        }
                        material={materials.Gameboy_1001_MAT}
                      />
                    </group>
                    <motion.group
                      whileTap={{
                        scaleY: 0.95,
                      }}
                      name="Select_Btn_geo"
                    >
                      <mesh
                        name="Select_Btn_geo_Gameboy_1002_MAT_0"
                        castShadow
                        receiveShadow
                        geometry={
                          nodes.Select_Btn_geo_Gameboy_1002_MAT_0.geometry
                        }
                        material={materials.Gameboy_1002_MAT}
                      />
                    </motion.group>
                    <motion.group
                      whileTap={{
                        scaleY: 0.95,
                      }}
                      name="Start_Btn_geo"
                    >
                      <mesh
                        name="Start_Btn_geo_Gameboy_1002_MAT_0"
                        castShadow
                        receiveShadow
                        geometry={
                          nodes.Start_Btn_geo_Gameboy_1002_MAT_0.geometry
                        }
                        material={materials.Gameboy_1002_MAT}
                      />
                    </motion.group>
                  </group>
                  <group name="CartridgeSlot_Teeth_geo">
                    <mesh
                      name="CartridgeSlot_Teeth_geo_Gameboy_1001_MAT_0"
                      castShadow
                      receiveShadow
                      geometry={
                        nodes.CartridgeSlot_Teeth_geo_Gameboy_1001_MAT_0
                          .geometry
                      }
                      material={materials.Gameboy_1001_MAT}
                    />
                  </group>
                  <group name="ChargingPort_grp">
                    <group name="ChargingPort_Frame_geo">
                      <mesh
                        name="ChargingPort_Frame_geo_Gameboy_1002_MAT_0"
                        castShadow
                        receiveShadow
                        geometry={
                          nodes.ChargingPort_Frame_geo_Gameboy_1002_MAT_0
                            .geometry
                        }
                        material={materials.Gameboy_1002_MAT}
                      />
                    </group>
                    <group name="ChargingPort_geo">
                      <mesh
                        name="ChargingPort_geo_Gameboy_1002_MAT_0"
                        castShadow
                        receiveShadow
                        geometry={
                          nodes.ChargingPort_geo_Gameboy_1002_MAT_0.geometry
                        }
                        material={materials.Gameboy_1002_MAT}
                      />
                    </group>
                    <group name="ChargingPort_Mid_geo">
                      <mesh
                        name="ChargingPort_Mid_geo_Gameboy_1002_MAT_0"
                        castShadow
                        receiveShadow
                        geometry={
                          nodes.ChargingPort_Mid_geo_Gameboy_1002_MAT_0.geometry
                        }
                        material={materials.Gameboy_1002_MAT}
                      />
                    </group>
                  </group>
                  <group name="HingeCorner_LMid_geo">
                    <mesh
                      name="HingeCorner_LMid_geo_Gameboy_1001_MAT_0"
                      castShadow
                      receiveShadow
                      geometry={
                        nodes.HingeCorner_LMid_geo_Gameboy_1001_MAT_0.geometry
                      }
                      material={materials.Gameboy_1001_MAT}
                    />
                  </group>
                  <group name="HingeCorner_RMid_geo">
                    <mesh
                      name="HingeCorner_RMid_geo_Gameboy_1001_MAT_0"
                      castShadow
                      receiveShadow
                      geometry={
                        nodes.HingeCorner_RMid_geo_Gameboy_1001_MAT_0.geometry
                      }
                      material={materials.Gameboy_1001_MAT}
                    />
                  </group>
                  <group name="LinkPort_grp">
                    <group name="LinkPort_Frame_geo">
                      <mesh
                        name="LinkPort_Frame_geo_Gameboy_1002_MAT_0"
                        castShadow
                        receiveShadow
                        geometry={
                          nodes.LinkPort_Frame_geo_Gameboy_1002_MAT_0.geometry
                        }
                        material={materials.Gameboy_1002_MAT}
                      />
                    </group>
                    <group name="LinkPort_geo">
                      <mesh
                        name="LinkPort_geo_Gameboy_1002_MAT_0"
                        castShadow
                        receiveShadow
                        geometry={
                          nodes.LinkPort_geo_Gameboy_1002_MAT_0.geometry
                        }
                        material={materials.Gameboy_1002_MAT}
                      />
                    </group>
                    <group name="LinkPort_Mid_geo">
                      <mesh
                        name="LinkPort_Mid_geo_Gameboy_1002_MAT_0"
                        castShadow
                        receiveShadow
                        geometry={
                          nodes.LinkPort_Mid_geo_Gameboy_1002_MAT_0.geometry
                        }
                        material={materials.Gameboy_1002_MAT}
                      />
                    </group>
                  </group>
                  <group name="LKesnsignton_Lock_End_geo">
                    <mesh
                      name="LKesnsignton_Lock_End_geo_Gameboy_1001_MAT_0"
                      castShadow
                      receiveShadow
                      geometry={
                        nodes.LKesnsignton_Lock_End_geo_Gameboy_1001_MAT_0
                          .geometry
                      }
                      material={materials.Gameboy_1001_MAT}
                    />
                  </group>
                  <motion.group name="Power_LED01_geo">
                    <mesh
                      name="Power_LED01_geo_Gameboy_1001_MAT_0"
                      castShadow
                      receiveShadow
                      geometry={
                        nodes.Power_LED01_geo_Gameboy_1001_MAT_0.geometry
                      }
                      material={materials.Gameboy_1001_MAT}
                    />
                  </motion.group>
                  <group name="Power_LED02_geo">
                    <mesh
                      name="Power_LED02_geo_Gameboy_1001_MAT_0"
                      castShadow
                      receiveShadow
                      geometry={
                        nodes.Power_LED02_geo_Gameboy_1001_MAT_0.geometry
                      }
                      material={materials.Gameboy_1001_MAT}
                    />
                  </group>
                  <group name="PowerBtn_grp">
                    <group name="PowerBtn_Base_geo">
                      <mesh
                        name="PowerBtn_Base_geo_Gameboy_1001_MAT_0"
                        castShadow
                        receiveShadow
                        geometry={
                          nodes.PowerBtn_Base_geo_Gameboy_1001_MAT_0.geometry
                        }
                        material={materials.Gameboy_1001_MAT}
                      />
                    </group>
                    <motion.group
                      position={[0, 0, 0.18]}
                      whileTap={{
                        z: -0.02,
                      }}
                      name="PowerBtn_geo"
                    >
                      <mesh
                        name="PowerBtn_geo_Gameboy_1001_MAT_0"
                        castShadow
                        receiveShadow
                        geometry={
                          nodes.PowerBtn_geo_Gameboy_1001_MAT_0.geometry
                        }
                        material={materials.Gameboy_1001_MAT}
                      />
                    </motion.group>
                  </group>
                  <group name="PowerSwitchText_grp">
                    <group name="OffDot_geo">
                      <mesh
                        name="OffDot_geo_Gameboy_1003_MAT_0"
                        castShadow
                        receiveShadow
                        geometry={nodes.OffDot_geo_Gameboy_1003_MAT_0.geometry}
                        material={materials.Gameboy_1003_MAT}
                      />
                    </group>
                    <group name="OffText_geo">
                      <mesh
                        name="OffText_geo_Gameboy_1003_MAT_0"
                        castShadow
                        receiveShadow
                        geometry={nodes.OffText_geo_Gameboy_1003_MAT_0.geometry}
                        material={materials.Gameboy_1003_MAT}
                      />
                    </group>
                    <group name="OnDot_geo">
                      <mesh
                        name="OnDot_geo_Gameboy_1003_MAT_0"
                        castShadow
                        receiveShadow
                        geometry={nodes.OnDot_geo_Gameboy_1003_MAT_0.geometry}
                        material={materials.Gameboy_1003_MAT}
                      />
                    </group>
                    <group name="OnText_geo">
                      <mesh
                        name="OnText_geo_Gameboy_1003_MAT_0"
                        castShadow
                        receiveShadow
                        geometry={nodes.OnText_geo_Gameboy_1003_MAT_0.geometry}
                        material={materials.Gameboy_1003_MAT}
                      />
                    </group>
                  </group>
                  <group name="RKesnsignton_Lock_End_geo">
                    <mesh
                      name="RKesnsignton_Lock_End_geo_Gameboy_1001_MAT_0"
                      castShadow
                      receiveShadow
                      geometry={
                        nodes.RKesnsignton_Lock_End_geo_Gameboy_1001_MAT_0
                          .geometry
                      }
                      material={materials.Gameboy_1001_MAT}
                    />
                  </group>
                  <group name="VolumeBtn_grp">
                    <group name="VolumeBtn_Base_geo">
                      <mesh
                        name="VolumeBtn_Base_geo_Gameboy_1001_MAT_0"
                        castShadow
                        receiveShadow
                        geometry={
                          nodes.VolumeBtn_Base_geo_Gameboy_1001_MAT_0.geometry
                        }
                        material={materials.Gameboy_1001_MAT}
                      />
                    </group>
                    <group name="VolumeBtn_geo">
                      <mesh
                        name="VolumeBtn_geo_Gameboy_1001_MAT_0"
                        castShadow
                        receiveShadow
                        geometry={
                          nodes.VolumeBtn_geo_Gameboy_1001_MAT_0.geometry
                        }
                        material={materials.Gameboy_1001_MAT}
                      />
                    </group>
                  </group>
                  <group name="VolumeSwitchText_grp">
                    <group name="VolBar_geo">
                      <mesh
                        name="VolBar_geo_Gameboy_1003_MAT_0"
                        castShadow
                        receiveShadow
                        geometry={nodes.VolBar_geo_Gameboy_1003_MAT_0.geometry}
                        material={materials.Gameboy_1003_MAT}
                      />
                    </group>
                    <group name="VolDot_geo">
                      <mesh
                        name="VolDot_geo_Gameboy_1003_MAT_0"
                        castShadow
                        receiveShadow
                        geometry={nodes.VolDot_geo_Gameboy_1003_MAT_0.geometry}
                        material={materials.Gameboy_1003_MAT}
                      />
                    </group>
                    <group name="VolText_geo">
                      <mesh
                        name="VolText_geo_Gameboy_1003_MAT_0"
                        castShadow
                        receiveShadow
                        geometry={nodes.VolText_geo_Gameboy_1003_MAT_0.geometry}
                        material={materials.Gameboy_1003_MAT}
                      />
                    </group>
                  </group>
                </group>
                <group
                  name="ConsoleScreen_grp"
                  position={[0, -0.245, -0.148]}
                  rotation={[0.067, 0, 0]}
                >
                  <group name="LogoSticker_geo">
                    <mesh
                      name="LogoSticker_geo_Gameboy_1003_MAT_0"
                      castShadow
                      receiveShadow
                      geometry={
                        nodes.LogoSticker_geo_Gameboy_1003_MAT_0.geometry
                      }
                      material={materials.Gameboy_1003_MAT}
                    />
                  </group>
                  <group name="Screen_grp">
                    <motion.group name="Screen_geo"></motion.group>
                    <group name="ScreenCover_geo">
                      <mesh
                        name="ScreenCover_geo_ScreenGlass_MAT_0"
                        geometry={
                          nodes.ScreenCover_geo_ScreenGlass_MAT_0.geometry
                        }
                        material={materials.ScreenGlass_MAT}
                      />
                    </group>
                    <group name="ScreenGlass_geo">
                      <mesh
                        name="ScreenGlass_geo_ScreenGlass_MAT_0"
                        geometry={
                          nodes.ScreenGlass_geo_ScreenGlass_MAT_0.geometry
                        }
                        material={materials.ScreenGlass_MAT}
                      />
                    </group>
                  </group>
                  <group name="ScreenGuard_geo">
                    <mesh
                      name="ScreenGuard_geo_Gameboy_1002_MAT_0"
                      geometry={
                        nodes.ScreenGuard_geo_Gameboy_1002_MAT_0.geometry
                      }
                      material={materials.Gameboy_1002_MAT}
                    />
                  </group>
                  <group name="Top_LargeHinge_geo">
                    <mesh
                      name="Top_LargeHinge_geo_Gameboy_1002_MAT_0"
                      castShadow
                      receiveShadow
                      geometry={
                        nodes.Top_LargeHinge_geo_Gameboy_1002_MAT_0.geometry
                      }
                      material={materials.Gameboy_1002_MAT}
                    />
                  </group>
                  <group name="Top_SmallHinge_geo">
                    <mesh
                      name="Top_SmallHinge_geo_Gameboy_1002_MAT_0"
                      castShadow
                      receiveShadow
                      geometry={
                        nodes.Top_SmallHinge_geo_Gameboy_1002_MAT_0.geometry
                      }
                      material={materials.Gameboy_1002_MAT}
                    />
                  </group>
                  <group name="TopScreen_Frame_geo">
                    <mesh
                      name="TopScreen_Frame_geo_Gameboy_1002_MAT_0"
                      castShadow
                      receiveShadow
                      geometry={
                        nodes.TopScreen_Frame_geo_Gameboy_1002_MAT_0.geometry
                      }
                      material={materials.Gameboy_1002_MAT}
                    />
                  </group>
                </group>
              </group>
            </group>
          </group>
        </group>
      </group>
    </group>
  );
}

useGLTF.preload("models/Sp.glb");
