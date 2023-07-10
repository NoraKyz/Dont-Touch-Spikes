import { Assets, Texture } from "pixi.js";

export const TypeCurrency = Object.freeze({
    Candy: "candy",
    Diamond: "diamond"
});

export const SkinStorage = Object.freeze({
    Default : {
        texture1: Assets.get("bird1"),
        texture2: Assets.get("bird2"),
        texture3: Assets.get("bird3"),
        particle: Texture.from("circle"), 
        cost: {
            type: "candy",
            value: 0
        },
        enabled: true
    }
});