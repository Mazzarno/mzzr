import { Text3D } from "@react-three/drei";
import { motion } from "framer-motion-3d";

export default function Font1Letter({
  Font1Letter,
  position = [0, 0, 0],
  color = "#f8f9fa",
  font = "/fonts/Despairs1.json",
  textSize = 3.2,
  textHeight = 0.2,
  textCurveSegments = 10,
  textBevelSize = 0.02,
  textBevelThickness = 0.5,
  yRotation = 0,
  motionZinit = -2,
  motionZ = 0,
  motionDuration = 1,
  motionDelay = 2,
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
        rotation={[0, yRotation, 0]}
        castShadow
        receiveShadow
      >
        {Font1Letter}
        <meshPhongMaterial color={color} />
      </Text3D>
    </motion.group>
  );
}
