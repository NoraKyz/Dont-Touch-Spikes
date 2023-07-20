import { Assets, Texture } from "pixi.js";

export const TypeCurrency = Object.freeze({
    Candy: "candy",
    Diamond: "diamond"
});

// Default : {
//     texture1: Assets.get("birdDefault1"),
//     texture2: Assets.get("birdDefault2"),
//     texture3: Assets.get("birdDefault3"),
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
                texture1: Assets.get("birdDefault1"),
                texture2: Assets.get("birdDefault2"),
                texture3: Assets.get("birdDefault3"),
                particle: Texture.from("circle"),
                cost: {
                    type: TypeCurrency.Candy,
                    value: 0
                },
                enabled: true
            },
            {
                texture1: Assets.get("birdBlue1"),
                texture2: Assets.get("birdBlue2"),
                texture3: Assets.get("birdBlue3"),
                particle: Texture.from("circle"),
                cost: {
                    type: TypeCurrency.Candy,
                    value: 10
                },
                enabled: false
            },
            {
                texture1: Assets.get("birdDefault1"),
                texture2: Assets.get("birdDefault2"),
                texture3: Assets.get("birdDefault3"),
                particle: Texture.from("circle"),
                cost: {
                    type: TypeCurrency.Candy,
                    value: 20
                },
                enabled: false
            },
            {
                texture1: Assets.get("birdDefault1"),
                texture2: Assets.get("birdDefault2"),
                texture3: Assets.get("birdDefault3"),
                particle: Texture.from("circle"),
                cost: {
                    type: TypeCurrency.Candy,
                    value: 20
                },
                enabled: false
            },
            {
                texture1: Assets.get("birdDefault1"),
                texture2: Assets.get("birdDefault2"),
                texture3: Assets.get("birdDefault3"),
                particle: Texture.from("circle"),
                cost: {
                    type: TypeCurrency.Candy,
                    value: 40
                },
                enabled: false
            },
            {
                texture1: Assets.get("birdDefault1"),
                texture2: Assets.get("birdDefault2"),
                texture3: Assets.get("birdDefault3"),
                particle: Texture.from("circle"),
                cost: {
                    type: TypeCurrency.Candy,
                    value: 40
                },
                enabled: false
            },
            {
                texture1: Assets.get("birdDefault1"),
                texture2: Assets.get("birdDefault2"),
                texture3: Assets.get("birdDefault3"),
                particle: Texture.from("circle"),
                cost: {
                    type: TypeCurrency.Candy,
                    value: 50
                },
                enabled: false
            },
            {
                texture1: Assets.get("birdDefault1"),
                texture2: Assets.get("birdDefault2"),
                texture3: Assets.get("birdDefault3"),
                particle: Texture.from("circle"),
                cost: {
                    type: TypeCurrency.Candy,
                    value: 100
                },
                enabled: false
            },
            {
                texture1: Assets.get("birdDefault1"),
                texture2: Assets.get("birdDefault2"),
                texture3: Assets.get("birdDefault3"),
                particle: Texture.from("circle"),
                cost: {
                    type: TypeCurrency.Candy,
                    value: 100
                },
                enabled: false
            },
            {
                texture1: Assets.get("birdDefault1"),
                texture2: Assets.get("birdDefault2"),
                texture3: Assets.get("birdDefault3"),
                particle: Texture.from("circle"),
                cost: {
                    type: TypeCurrency.Candy,
                    value: 100
                },
                enabled: false
            },
            {
                texture1: Assets.get("birdDefault1"),
                texture2: Assets.get("birdDefault2"),
                texture3: Assets.get("birdDefault3"),
                particle: Texture.from("circle"),
                cost: {
                    type: TypeCurrency.Candy,
                    value: 150
                },
                enabled: false
            },
            {
                texture1: Assets.get("birdDefault1"),
                texture2: Assets.get("birdDefault2"),
                texture3: Assets.get("birdDefault3"),
                particle: Texture.from("circle"),
                cost: {
                    type: TypeCurrency.Candy,
                    value: 200
                },
                enabled: false
            },
            {
                texture1: Assets.get("birdDefault1"),
                texture2: Assets.get("birdDefault2"),
                texture3: Assets.get("birdDefault3"),
                particle: Texture.from("circle"),
                cost: {
                    type: TypeCurrency.Candy,
                    value: 200
                },
                enabled: false
            },
            {
                texture1: Assets.get("birdDefault1"),
                texture2: Assets.get("birdDefault2"),
                texture3: Assets.get("birdDefault3"),
                particle: Texture.from("circle"),
                cost: {
                    type: TypeCurrency.Candy,
                    value: 400
                },
                enabled: false
            },
            {
                texture1: Assets.get("birdDefault1"),
                texture2: Assets.get("birdDefault2"),
                texture3: Assets.get("birdDefault3"),
                particle: Texture.from("circle"),
                cost: {
                    type: TypeCurrency.Candy,
                    value: 500
                },
                enabled: false
            },
            {
                texture1: Assets.get("birdDefault1"),
                texture2: Assets.get("birdDefault2"),
                texture3: Assets.get("birdDefault3"),
                particle: Texture.from("circle"),
                cost: {
                    type: TypeCurrency.Candy,
                    value: 500
                },
                enabled: false
            },
            {
                texture1: Assets.get("birdDefault1"),
                texture2: Assets.get("birdDefault2"),
                texture3: Assets.get("birdDefault3"),
                particle: Texture.from("circle"),
                cost: {
                    type: TypeCurrency.Candy,
                    value: 500
                },
                enabled: false
            },
            {
                texture1: Assets.get("birdDefault1"),
                texture2: Assets.get("birdDefault2"),
                texture3: Assets.get("birdDefault3"),
                particle: Texture.from("circle"),
                cost: {
                    type: TypeCurrency.Candy,
                    value: 1000
                },
                enabled: false
            },
            {
                texture1: Assets.get("birdDefault1"),
                texture2: Assets.get("birdDefault2"),
                texture3: Assets.get("birdDefault3"),
                particle: Texture.from("circle"),
                cost: {
                    type: TypeCurrency.Candy,
                    value: 1000
                },
                enabled: false
            },
            {
                texture1: Assets.get("birdDefault1"),
                texture2: Assets.get("birdDefault2"),
                texture3: Assets.get("birdDefault3"),
                particle: Texture.from("circle"),
                cost: {
                    type: TypeCurrency.Candy,
                    value: 1200
                },
                enabled: false
            },
            {
                texture1: Assets.get("birdDefault1"),
                texture2: Assets.get("birdDefault2"),
                texture3: Assets.get("birdDefault3"),
                particle: Texture.from("circle"),
                cost: {
                    type: TypeCurrency.Candy,
                    value: 1200
                },
                enabled: false
            },

        ];
    }
}