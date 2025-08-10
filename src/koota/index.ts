import {createWorld, type World, createActions} from "koota";
import { IsCoin, IsIngot, IsStack, Mesh, Position, Velocity } from "./traits";
import {Schedule} from "directed";
import { SyncPositionToThree } from "./systems";


export const world = createWorld();
// export const schedule = new Schedule<{ world: World, delta: number }>();
// schedule.add(SyncPositionToThree);
// schedule.build();

export enum MoneyType {
    Coin = "coin",
    Stack = "stack",
    Ingot = "ingot"
};

export const actions = createActions((world: World) =>  ({
    throwMoney: (moneyType: MoneyType) => {
        const type = moneyType === MoneyType.Coin ? IsCoin :
            moneyType === MoneyType.Stack ? IsStack : IsIngot;

        const velocityTypes = {
            [MoneyType.Coin]: {x: 0, y: 0.05, z: -0.325},
            [MoneyType.Stack]: {x: 0, y: 0.05, z: -1.325},
            [MoneyType.Ingot]: {x: 0, y: 0.15, z: -3.325}
        }
        const velocity = Velocity(velocityTypes[moneyType]);

        const position = Position({x: (Math.random() - 0.5) * 4, y: 3, z: 14});
        world.spawn(type, velocity, position)
    }
}));