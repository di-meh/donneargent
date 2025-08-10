import type { World } from "koota";
import { Mesh, Position } from "./traits";

export const SyncPositionToThree = ({world}: { world: World }) => {
  world.query(Position, Mesh).updateEach(([pos, mesh]) => {
    // sync back to three
    mesh.position.copy(pos);
  });
}