import {createWorld, type World, createActions} from "koota";

export const world = createWorld();

export const actions = createActions((world: World) =>  ({
    throwMoney: (moneyType: "coin"|"stack"|"ingot") => {
        console.log(`Throwing ${moneyType}`);
    }
}));