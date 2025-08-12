import { button, buttonGroup, useControls } from "leva";
import { Coin } from "../models/Coin";
import { Ingot } from "../models/Ingot";
import { Stack } from "../models/Stack";
import { useActions, useQuery, useTrait, useTraitEffect } from "koota/react";
import { IsCoin, IsIngot, IsStack, Money, Position, Velocity } from "../../koota/traits";
import type { Entity } from "koota";
import { actions, MoneyType, world } from "../../koota";
    
export function MoneySpawner() {
    const coins = useQuery(IsCoin, Velocity, Position);
    const stacks = useQuery(IsStack, Velocity, Position);
    const ingots = useQuery(IsIngot, Velocity, Position);
    const { throwMoney } = useActions(actions);
    const moneyAmount = useTrait(world, Money)?.amount || 0;
    useControls("Money Spawner", {
        "add Coin": button(() => {
            throwMoney(MoneyType.Coin);
        }),
        "add Stack": button(() => {
            throwMoney(MoneyType.Stack);
        }),
        "add Ingot": button(() => {
            throwMoney(MoneyType.Ingot);
        }),
    });
    const [,set] = useControls("Wallet", () => ({
        money: {
            value: moneyAmount,
            min: 0,
            max: 100000,
            step: 100,
            onChange: (value: number) => {
                world.set(Money, { amount: value });
            }
        },
        " " : buttonGroup({
            "0x": () => set({ money: 0 }),
            "0.5x": (get) => set({ money: get('Wallet.money') * 0.5}),
            "2x": (get) => set({ money: get('Wallet.money') * 2 }),
            "5x": (get) => set({ money: get('Wallet.money') * 5 }),
            "10x": (get) => set({ money: get('Wallet.money') * 10}),
            "/2": (get) => set({ money: get('Wallet.money') / 2 }),
        }),
        "Reset": button(() => {
            set({ money: 10000});
        })
    }));


    return (
        <>
            {coins.map((entity: Entity) => <Coin entity={entity} key={entity} />)}
            {stacks.map((entity: Entity) => <Stack entity={entity} key={entity} />)}
            {ingots.map((entity: Entity) => <Ingot entity={entity} key={entity} />)}
        </>
        
    );
}