import { createWorld, type World, createActions, type Trait } from "koota";
import {
	IsCoin,
	IsIngot,
	IsStack,
	Mesh,
	Money,
	Position,
	Velocity,
} from "./traits";
import { Schedule } from "directed";
import { SyncPositionToThree } from "./systems";

export const world = createWorld(Money({ amount: 10000 }));
// export const schedule = new Schedule<{ world: World, delta: number }>();
// schedule.add(SyncPositionToThree);
// schedule.build();

export enum MoneyType {
	Coin = "coin",
	Stack = "stack",
	Ingot = "ingot",
}

export const actions = createActions((world: World) => ({
	throwMoney: (moneyType: MoneyType) => {
		const currentMoney = world.get(Money);
		if (!currentMoney || currentMoney.amount <= 0) {
			console.warn("Not enough money to throw");
			return;
		}
		const type: Trait<{ monetaryValue: number }> =
			moneyType === MoneyType.Coin
				? IsCoin
				: moneyType === MoneyType.Stack
					? IsStack
					: IsIngot;

		const velocityTypes = {
			[MoneyType.Coin]: { x: 0, y: 0.05, z: -0.325 },
			[MoneyType.Stack]: { x: 0, y: 0.15, z: -3.75 },
			[MoneyType.Ingot]: { x: 0, y: 0.4, z: -25 },
		};
		const velocity = Velocity(velocityTypes[moneyType]);

		const position = Position({ x: (Math.random() - 0.5) * 4, y: 5, z: 14 });
		const entity = world.spawn(type, velocity, position);

		const monetaryValue = entity.get(type)?.monetaryValue || 0;
		if (currentMoney && currentMoney.amount >= monetaryValue) {
			currentMoney.amount -= monetaryValue;
			world.set(Money, { amount: currentMoney.amount });
		} else {
			world.set(Money, { amount: 0 });
		}
		console.log(
			`Money thrown: ${moneyType}, remaining amount: ${currentMoney?.amount}, monetary value: ${entity.get(type)?.monetaryValue}`,
		);
	},
}));
