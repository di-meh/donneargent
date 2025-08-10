import { button, useControls } from "leva";
import { memo, useState, type FC } from "react";
import { Coin } from "../models/Coin";
import { Ingot } from "../models/Ingot";
import { Stack } from "../models/Stack";
import { useActions, useQuery } from "koota/react";
import { IsCoin, Position, Velocity } from "../../koota/traits";
import type { Entity } from "koota";
import { actions } from "../../koota";
    
export function MoneySpawner() {
    const coins = useQuery(IsCoin, Velocity, Position);
    const { throwMoney } = useActions(actions);
    const test = useControls({
        addCoin: button(() => {
            throwMoney("coin");
        })
    });

    return (
        <>
            {coins.map((entity: Entity) => <Coin entity={entity} key={entity} />)}
        </>
        
    );
}