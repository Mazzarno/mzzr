import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";

export default function Lumos() {
  const lightRef = useRef(null);
  const [inputMoved, setInputMoved] = useState(false);
  const [inputPos, setInputPos] = useState({ x: 0, y: 0 });

  const updatePosition = (x, y) => {
    const posX = (x / window.innerWidth) * 30 - 15;
    const posY = -(y / window.innerHeight) * 10 + 5;

    if (lightRef.current) {
      gsap.to(lightRef.current.position, {
        x: posX,
        y: posY,
        duration: 2.5,
        ease: "power2",
      });
    }
  };

  useEffect(() => {
    const handleMouseMove = (event) => {
      setInputPos({ x: event.clientX, y: event.clientY });
      setInputMoved(true);
    };

    const handleTouchMove = (event) => {
      if (event.touches.length > 0) {
        const touch = event.touches[0];
        setInputPos({ x: touch.clientX, y: touch.clientY });
        setInputMoved(true);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("touchmove", handleTouchMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, []);

  useEffect(() => {
    if (inputMoved) {
      updatePosition(inputPos.x, inputPos.y);
    }
  }, [inputPos, inputMoved]);

  return (
    <pointLight
      ref={lightRef}
      position={[0, 0, -90]}
      castShadow
      intensity={50}
      shadow-mapSize={[2048, 2048]}
      shadow-camera-near={0.5}
      shadow-camera-far={100}
    />
  );
}
