import { button, useControls } from "leva";
import { memo, useState, type FC } from "react";
import { Coin } from "../models/Coin";
import { Ingot } from "../models/Ingot";
import { Stack } from "../models/Stack";
import { useActions, useQuery } from "koota/react";
import { IsCoin, IsIngot, IsStack, Position, Velocity } from "../../koota/traits";
import type { Entity } from "koota";
import { actions, MoneyType } from "../../koota";
    
export function MoneySpawner() {
    const coins = useQuery(IsCoin, Velocity, Position);
    const stacks = useQuery(IsStack, Velocity, Position);
    const ingots = useQuery(IsIngot, Velocity, Position);
    const { throwMoney } = useActions(actions);
    const test = useControls({
        addCoin: button(() => {
            throwMoney(MoneyType.Coin);
        }),
        addStack: button(() => {
            throwMoney(MoneyType.Stack);
        }),
        addIngot: button(() => {
            throwMoney(MoneyType.Ingot);
        })
    });

    return (
        <>
            {coins.map((entity: Entity) => <Coin entity={entity} key={entity} />)}
            {stacks.map((entity: Entity) => <Stack entity={entity} key={entity} />)}
            {ingots.map((entity: Entity) => <Ingot entity={entity} key={entity} />)}
        </>
        
    );
}