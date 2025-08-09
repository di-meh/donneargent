import { Box, PerspectiveCamera } from "@react-three/drei";
import { Physics, RapierRigidBody, RigidBody } from "@react-three/rapier";
import { memo, Suspense, useEffect, useRef, useState, type FC } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { Puits } from "./models/Puits";
import { Loader } from "./scene/Loader";
import { useControls, button } from "leva";
import { Coin } from "./models/Coin";
import { Ingot } from "./models/Ingot";
import { Stack } from "./models/Stack";

const colors = ["red", "green", "blue", "yellow", "orange", "purple"];
const randomColor = () => colors[Math.floor(Math.random() * colors.length)];
const useRandomColor = () => {
  const [color] = useState(randomColor());
  return color;
};
const RigidBox = memo(() => {
  const color = useRandomColor();

  const box = useRef<RapierRigidBody>(null);

  useEffect(() => {
    const api = box.current;
    if (api) {
      api.applyTorqueImpulse({ x: 0, y: 0, z: 0.2 }, true);
    }
  }, []);

  return (
    <RigidBody
      colliders="cuboid"
      ref={box}
      position={[-4 + Math.random() * 8, 10, 0]}
    >
      <group scale={1}>
        <Box scale={0.5} receiveShadow castShadow>
          <meshPhysicalMaterial color={color} />
        </Box>
      </group>
    </RigidBody>
  );
});

const itemMap: Record<string, FC> = {
  coin: memo(() => <Coin scale={[.5,.5,.5]} position={[0, 0, 0]} />),
  stack: memo(() => <Stack scale={[3,3,3]} position={[0, 0, 0]} />),
  ingot: memo(() => <Ingot scale={[5,5,5]} position={[0, 0, 0]} />),
};

const Thing = ({ item }: { item: string }) => {
  const Thang = itemMap[item];
  return <Thang />;
};

export function Game() {
    const [items, setItems] = useState<string[]>([]);
    const addItem = (str: string) => {
        setItems((curr) => [...curr, str]);
    };
    const test = useControls({
        addCoin: button(() => {
            addItem("coin");
        }),
        addStack: button(() => {
            addItem("stack");
        }),
        addIngot: button(() => {
            addItem("ingot");
        })
    });
    // useFrame((state, delta) => {
    //     const camera = state.camera as THREE.PerspectiveCamera;
    //     camera.position.x = Math.sin(state.clock.elapsedTime) * 20;
    //     camera.position.z = Math.cos(state.clock.elapsedTime) * 20;
    //     camera.position.y = 30;
    //     camera.lookAt(0, 0, 0);
    // });
    useThree((state) => {
        const camera = state.camera as THREE.PerspectiveCamera;
        camera.lookAt(0, 0, 0);
    });
    return (
        <>
            <Suspense fallback={<Loader />}>
                <PerspectiveCamera makeDefault position={[0, 20, 10]} fov={30} />
                <directionalLight color={'#C4FFFF'} intensity={1.5} position={[0, 50, 0]} />
                <ambientLight color={'#C4FFFF'} intensity={0.5} />
                <pointLight color={'#FFD675'} intensity={50} position={[15, 15, 0]} />
                <Physics debug>
                    {items.map((item, i) => (
                        <Thing item={item} key={i} />
                    ))}
                    <Puits position={[0,0,0]} />
                </Physics>
            </Suspense>
        </>
            
    );
}