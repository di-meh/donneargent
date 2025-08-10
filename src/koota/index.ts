import {createWorld, type World, createActions} from "koota";
import { IsCoin, IsIngot, IsStack, Mesh, Position, Velocity } from "./traits";
import {Schedule} from "directed";
import { SyncPositionToThree } from "./systems";


export const world = createWorld();
export const schedule = new Schedule<{ world: World, delta: number }>();
// schedule.add(SyncPositionToThree);
// schedule.build();

export type MoneyType = "coin" | "stack" | "ingot";

export const actions = createActions((world: World) =>  ({
    throwMoney: (moneyType: MoneyType) => {
        console.log(`Throwing ${moneyType}`);
        const type = moneyType === "coin" ? IsCoin : moneyType === "stack" ? IsStack : IsIngot
        const velocity = Velocity({x: 0, y: 1, z: -1.5});
        const position = Position({x: (Math.random() - 0.5) * 4, y: 0, z: 10});
        world.spawn(type, velocity, position)
    }
}));