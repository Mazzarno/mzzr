import { Text3D } from "@react-three/drei";
import { motion } from "framer-motion-3d";

export default function Font2Letter({
  Font2Letter,
  position = [0, 0, 0],
  color = "#f8f9fa",
  font = "/fonts/PressStart2P.json",
  textSize = 1,
  textHeight = 0.3,
  textCurveSegments = 10,
  textBevelSize = 0.02,
  textBevelThickness = 0.1,
  xRotation = -0.2,
  yRotation = 0,
  motionZinit = -2,
  motionZ = 0,
  motionDuration = 1,
  motionDelay = 8,
}) {
  return (
    <motion.group
      initial={{
        z: motionZinit,
      }}
      animate={{
        z: motionZ,
      }}
      transition={{
        duration: motionDuration,
        delay: motionDelay,
      }}
    >
      <Text3D
        position={position}
        font={font}
        size={textSize}
        height={textHeight}
        curveSegments={textCurveSegments}
        bevelEnabled
        bevelSize={textBevelSize}
        bevelThickness={textBevelThickness}
        rotation={[xRotation, yRotation, 0]}
        castShadow
        receiveShadow
      >
        {Font2Letter}
        <meshPhongMaterial color={color} />
      </Text3D>
    </motion.group>
  );
}
