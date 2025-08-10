import type { RigidBodyProps } from "@react-three/rapier";
import type { Entity } from "koota";

export interface MoneyProps extends RigidBodyProps {
  entity: Entity;
}