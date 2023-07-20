import { Assets, Texture } from "pixi.js";

export const TypeCurrency = Object.freeze({
    Candy: "candy",
    Diamond: "diamond"
});

// Default : {
//     texture1: Assets.get("bird1"),
//     texture2: Assets.get("bird2"),
//     texture3: Assets.get("bird3"),
//     particle: Texture.from("circle"), 
//     cost: {
//         type: TypeCurrency.Candy,
//         value: 0
//     },
//     enabled: true
// }

export class SkinStorage {
    static init() {
        this.storage = [
            {
                
                texture1: Assets.get("bird1"),
                texture2: Assets.get("bird2"),
                texture3: Assets.get("bird3"),
                particle: Texture.from("circle"), 
                cost: {
                    type: TypeCurrency.Candy,
                    value: 10
                },
                enabled: true
            },
            {
                texture1: Assets.get("bird1"),
                texture2: Assets.get("bird2"),
                texture3: Assets.get("bird3"),
                particle: Texture.from("circle"), 
                cost: {
                    type: TypeCurrency.Candy,
                    value: 20
                },
                enabled: false
            },
            {
                texture1: Assets.get("bird1"),
                texture2: Assets.get("bird2"),
                texture3: Assets.get("bird3"),
                particle: Texture.from("circle"), 
                cost: {
                    type: TypeCurrency.Candy,
                    value: 20
                },
                enabled: false
            },
            {
                texture1: Assets.get("bird1"),
                texture2: Assets.get("bird2"),
                texture3: Assets.get("bird3"),
                particle: Texture.from("circle"), 
                cost: {
                    type: TypeCurrency.Candy,
                    value: 30
                },
                enabled: false
            },
            {
                texture1: Assets.get("bird1"),
                texture2: Assets.get("bird2"),
                texture3: Assets.get("bird3"),
                particle: Texture.from("circle"), 
                cost: {
                    type: TypeCurrency.Candy,
                    value: 50
                },
                enabled: false
            },
            {
                texture1: Assets.get("bird1"),
                texture2: Assets.get("bird2"),
                texture3: Assets.get("bird3"),
                particle: Texture.from("circle"), 
                cost: {
                    type: TypeCurrency.Candy,
                    value: 50
                },
                enabled: false
            },
            {
                texture1: Assets.get("bird1"),
                texture2: Assets.get("bird2"),
                texture3: Assets.get("bird3"),
                particle: Texture.from("circle"), 
                cost: {
                    type: TypeCurrency.Candy,
                    value: 100
                },
                enabled: false
            },
            {
                texture1: Assets.get("bird1"),
                texture2: Assets.get("bird2"),
                texture3: Assets.get("bird3"),
                particle: Texture.from("circle"), 
                cost: {
                    type: TypeCurrency.Candy,
                    value: 100
                },
                enabled: false
            },
            {
                texture1: Assets.get("bird1"),
                texture2: Assets.get("bird2"),
                texture3: Assets.get("bird3"),
                particle: Texture.from("circle"), 
                cost: {
                    type: TypeCurrency.Candy,
                    value: 100
                },
                enabled: false
            },
            {
                texture1: Assets.get("bird1"),
                texture2: Assets.get("bird2"),
                texture3: Assets.get("bird3"),
                particle: Texture.from("circle"), 
                cost: {
                    type: TypeCurrency.Candy,
                    value: 100
                },
                enabled: false
            },
            {
                texture1: Assets.get("bird1"),
                texture2: Assets.get("bird2"),
                texture3: Assets.get("bird3"),
                particle: Texture.from("circle"), 
                cost: {
                    type: TypeCurrency.Candy,
                    value: 100
                },
                enabled: false
            },
            {
                texture1: Assets.get("bird1"),
                texture2: Assets.get("bird2"),
                texture3: Assets.get("bird3"),
                particle: Texture.from("circle"), 
                cost: {
                    type: TypeCurrency.Candy,
                    value: 125
                },
                enabled: false
            },
            {
                texture1: Assets.get("bird1"),
                texture2: Assets.get("bird2"),
                texture3: Assets.get("bird3"),
                particle: Texture.from("circle"), 
                cost: {
                    type: TypeCurrency.Candy,
                    value: 200
                },
                enabled: false
            },
            {
                texture1: Assets.get("bird1"),
                texture2: Assets.get("bird2"),
                texture3: Assets.get("bird3"),
                particle: Texture.from("circle"), 
                cost: {
                    type: TypeCurrency.Candy,
                    value: 200
                },
                enabled: false
            },
            {
                texture1: Assets.get("bird1"),
                texture2: Assets.get("bird2"),
                texture3: Assets.get("bird3"),
                particle: Texture.from("circle"), 
                cost: {
                    type: TypeCurrency.Candy,
                    value: 200
                },
                enabled: false
            },
            {
                texture1: Assets.get("bird1"),
                texture2: Assets.get("bird2"),
                texture3: Assets.get("bird3"),
                particle: Texture.from("circle"), 
                cost: {
                    type: TypeCurrency.Candy,
                    value: 200
                },
                enabled: false
            },
            {
                texture1: Assets.get("bird1"),
                texture2: Assets.get("bird2"),
                texture3: Assets.get("bird3"),
                particle: Texture.from("circle"), 
                cost: {
                    type: TypeCurrency.Candy,
                    value: 200
                },
                enabled: false
            },
            {
                texture1: Assets.get("bird1"),
                texture2: Assets.get("bird2"),
                texture3: Assets.get("bird3"),
                particle: Texture.from("circle"), 
                cost: {
                    type: TypeCurrency.Candy,
                    value: 200
                },
                enabled: false
            },
        ];
    }
}