import { trait } from "koota";
import type { JSX } from "react";
import * as THREE from "three";

export const Position = trait({x: 0, y: 0, z: 0});
export const Velocity = trait({x: 0, y: 0, z: 0});
// export const Rotation = trait({rx: 0, ry: 0, rz: 0});


export const Money = trait({amount: 1000});
export const IsCoin = trait({monetaryValue: 1});
export const IsStack = trait({monetaryValue: 10});
export const IsIngot = trait({monetaryValue: 100});
export const Mesh = trait(() => new THREE.Object3D());