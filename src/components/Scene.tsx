import { Canvas } from '@react-three/fiber';
import { Box, Html, OrbitControls } from "@react-three/drei";
import { Physics, RigidBody, CuboidCollider, RapierRigidBody } from "@react-three/rapier";
import { memo, Suspense, useEffect, useRef, useState, type FC } from 'react';
import { Root, Container, Text} from "@react-three/uikit";

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
  box: RigidBox,
};

const Thing = ({ item }: { item: string }) => {
  const Thang = itemMap[item];
  return <Thang />;
};

export function Scene() {
    const [items, setItems] = useState<string[]>([]);
    useEffect(() => {
        let ticker = 0;
        const interval = setInterval(() => {
            ticker++;
            addItem("box");

            if (ticker > 50) {
                clearInterval(interval);
            }
        }, 200);

        return () => clearInterval(interval);
    }, []);

    const addItem = (str: string) => {
        setItems((curr) => [...curr, str]);
    };
    return (
        <Canvas>
            <OrbitControls />
            <Suspense>
                <Physics debug>
                    {items.map((item, i) => (
                        <Thing item={item} key={i} />
                    ))}
                    <CuboidCollider position={[0, -2, 0]} args={[20, 0.5, 20]} />
                </Physics>
            </Suspense>
        </Canvas>
    );
}