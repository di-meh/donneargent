import { Canvas } from '@react-three/fiber';
import { Game } from './Game';
import { WorldProvider } from 'koota/react'
import { world } from '../koota';
export function Scene() {
    return (
        <Canvas shadows>
          <WorldProvider world={world}>
            <Game />
          </WorldProvider>
        </Canvas>
    );
}