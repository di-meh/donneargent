import { Box, Html, OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { Physics, RapierRigidBody, RigidBody } from "@react-three/rapier";
import { Suspense, useEffect, useRef } from "react";
import { useThree } from "@react-three/fiber";
import * as THREE from "three";
import { Puits } from "./models/Puits";
import { Loader } from "./scene/Loader";
import { MoneySpawner } from "./scene/MoneySpawner";
import { Or } from "koota";
import { useTrait } from "koota/react";
import { world } from "../koota";
import { Money } from "../koota/traits";
import { useControls } from "leva";

export function Game() {
	// useFrame((state, delta) => {
	//     const camera = state.camera as THREE.PerspectiveCamera;
	//     camera.position.x = Math.sin(state.clock.elapsedTime) * 20;
	//     camera.position.z = Math.cos(state.clock.elapsedTime) * 20;
	//     camera.position.y = 30;
	//     camera.lookAt(0, 0, 0);
	// });
	const money = useTrait(world, Money);
	useThree((state) => {
		const camera = state.camera as THREE.PerspectiveCamera;
		camera.lookAt(0, 0, 0);
	});
	const { physics } = useControls("Debug", {
		physics: true,
	});
	return (
		<>
			<Suspense fallback={<Loader />}>
				<Html fullscreen zIndexRange={[100, 0]}>
					<p className="m-6">Argent: {money?.amount}</p>
				</Html>

				<PerspectiveCamera makeDefault position={[0, 20, 10]} fov={50} />
				<directionalLight
					color={"#C4FFFF"}
					intensity={1.5}
					position={[0, 50, 0]}
				/>
				<ambientLight color={"#C4FFFF"} intensity={0.5} />
				<pointLight color={"#FFD675"} intensity={50} position={[15, 15, 0]} />
				<Physics debug={physics}>
					<MoneySpawner />
					<Puits position={[0, 0, 0]} />
				</Physics>
			</Suspense>
		</>
	);
}
