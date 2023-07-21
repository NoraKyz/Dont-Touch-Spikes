import { Assets, Texture } from "pixi.js";

export const TypeCurrency = Object.freeze({
  Candy: "candy",
  Diamond: "diamond",
});

export class SkinStorage {
  static init() {
    this.storage = [
      {
        texture1: "birdDefault1",
        texture2: "birdDefault2",
        texture3: "birdDefault3",
        particleImage: "circle",
        particleColor: {
          start: "#ff3464",
          end: "#ff3464",
        },
        cost: {
          type: TypeCurrency.Candy,
          value: 0,
        },
        enabled: true,
      },
      {
        texture1: "birdBlue1",
        texture2: "birdBlue2",
        texture3: "birdBlue3",
        particleImage: "circle",
        particleColor: {
          start: "#004ac7",
          end: "#004ac7",
        },
        cost: {
          typee: TypeCurrency.Candy,
          value: 10,
        },
        enabled: false,
      },
      {
        texture1: "birdYellow1",
        texture2: "birdYellow2",
        texture3: "birdYellow3",
        particleImage: "circle",
        particleColor: {
          start: "#DB8600",
          end: "#DB8600",
        },
        cost: {
          typee: TypeCurrency.Candy,
          value: 10,
        },
        enabled: false,
      },
      {
        texture1: "birdDarkBlue1",
        texture2: "birdDarkBlue2",
        texture3: "birdDarkBlue3",
        particleImage: "circle",
        particleColor: {
          start: "#464D92",
          end: "#464D92",
        },
        cost: {
          typee: TypeCurrency.Candy,
          value: 10,
        },
        enabled: false,
      },
      {
        texture1: "birdBrown1",
        texture2: "birdBrown2",
        texture3: "birdBrown3",
        particleImage: "circle",
        particleColor: {
          start: "#915947",
          end: "#915947",
        },
        cost: {
          typee: TypeCurrency.Candy,
          value: 10,
        },
        enabled: false,
      },
      {
        texture1: "birdNinja1",
        texture2: "birdNinja2",
        texture3: "birdNinja3",
        particleImage: "circle",
        particleColor: {
          start: "#F12204",
          end: "#F12204",
        },
        cost: {
          typee: TypeCurrency.Candy,
          value: 10,
        },
        enabled: false,
      },
      {
        texture1: "birdDefault1",
        texture2: "birdDefault2",
        texture3: "birdDefault3",
        particleImage: "circle",
        particleColor: {
          start: "#ff3464",
          end: "#ff3464",
        },
        cost: {
          type: TypeCurrency.Candy,
          value: 10,
        },
        enabled: false,
      },
      {
        texture1: "birdBlue1",
        texture2: "birdBlue2",
        texture3: "birdBlue3",
        particleImage: "circle",
        particleColor: {
          start: "#004ac7",
          end: "#004ac7",
        },
        cost: {
          typee: TypeCurrency.Candy,
          value: 10,
        },
        enabled: false,
      },
      {
        texture1: "birdYellow1",
        texture2: "birdYellow2",
        texture3: "birdYellow3",
        particleImage: "circle",
        particleColor: {
          start: "#DB8600",
          end: "#DB8600",
        },
        cost: {
          typee: TypeCurrency.Candy,
          value: 10,
        },
        enabled: false,
      },
      {
        texture1: "birdDarkBlue1",
        texture2: "birdDarkBlue2",
        texture3: "birdDarkBlue3",
        particleImage: "circle",
        particleColor: {
          start: "#464D92",
          end: "#464D92",
        },
        cost: {
          typee: TypeCurrency.Candy,
          value: 10,
        },
        enabled: false,
      },
      {
        texture1: "birdBrown1",
        texture2: "birdBrown2",
        texture3: "birdBrown3",
        particleImage: "circle",
        particleColor: {
          start: "#915947",
          end: "#915947",
        },
        cost: {
          typee: TypeCurrency.Candy,
          value: 10,
        },
        enabled: false,
      },
      {
        texture1: "birdNinja1",
        texture2: "birdNinja2",
        texture3: "birdNinja3",
        particleImage: "circle",
        particleColor: {
          start: "#F12204",
          end: "#F12204",
        },
        cost: {
          typee: TypeCurrency.Candy,
          value: 10,
        },
        enabled: false,
      },
      {
        texture1: "birdBlue1",
        texture2: "birdBlue2",
        texture3: "birdBlue3",
        particleImage: "circle",
        particleColor: {
          start: "#004ac7",
          end: "#004ac7",
        },
        cost: {
          typee: TypeCurrency.Candy,
          value: 10,
        },
        enabled: false,
      },
      {
        texture1: "birdDefault1",
        texture2: "birdDefault2",
        texture3: "birdDefault3",
        particleImage: "circle",
        particleColor: {
          start: "#ff3464",
          end: "#ff3464",
        },
        cost: {
          type: TypeCurrency.Candy,
          value: 10,
        },
        enabled: false,
      },
      {
        texture1: "birdBlue1",
        texture2: "birdBlue2",
        texture3: "birdBlue3",
        particleImage: "circle",
        particleColor: {
          start: "#004ac7",
          end: "#004ac7",
        },
        cost: {
          typee: TypeCurrency.Candy,
          value: 10,
        },
        enabled: false,
      },
      {
        texture1: "birdYellow1",
        texture2: "birdYellow2",
        texture3: "birdYellow3",
        particleImage: "circle",
        particleColor: {
          start: "#DB8600",
          end: "#DB8600",
        },
        cost: {
          typee: TypeCurrency.Candy,
          value: 10,
        },
        enabled: false,
      },
      {
        texture1: "birdDarkBlue1",
        texture2: "birdDarkBlue2",
        texture3: "birdDarkBlue3",
        particleImage: "circle",
        particleColor: {
          start: "#464D92",
          end: "#464D92",
        },
        cost: {
          typee: TypeCurrency.Candy,
          value: 10,
        },
        enabled: false,
      },
      {
        texture1: "birdBrown1",
        texture2: "birdBrown2",
        texture3: "birdBrown3",
        particleImage: "circle",
        particleColor: {
          start: "#915947",
          end: "#915947",
        },
        cost: {
          typee: TypeCurrency.Candy,
          value: 10,
        },
        enabled: false,
      },
      {
        texture1: "birdNinja1",
        texture2: "birdNinja2",
        texture3: "birdNinja3",
        particleImage: "circle",
        particleColor: {
          start: "#F12204",
          end: "#F12204",
        },
        cost: {
          typee: TypeCurrency.Candy,
          value: 10,
        },
        enabled: false,
      },
      {
        texture1: "birdDefault1",
        texture2: "birdDefault2",
        texture3: "birdDefault3",
        particleImage: "circle",
        particleColor: {
          start: "#ff3464",
          end: "#ff3464",
        },
        cost: {
          type: TypeCurrency.Candy,
          value: 10,
        },
        enabled: false,
      },
      {
        texture1: "birdBlue1",
        texture2: "birdBlue2",
        texture3: "birdBlue3",
        particleImage: "circle",
        particleColor: {
          start: "#004ac7",
          end: "#004ac7",
        },
        cost: {
          typee: TypeCurrency.Candy,
          value: 10,
        },
        enabled: false,
      },
      {
        texture1: "birdYellow1",
        texture2: "birdYellow2",
        texture3: "birdYellow3",
        particleImage: "circle",
        particleColor: {
          start: "#DB8600",
          end: "#DB8600",
        },
        cost: {
          typee: TypeCurrency.Candy,
          value: 10,
        },
        enabled: false,
      },
      {
        texture1: "birdDarkBlue1",
        texture2: "birdDarkBlue2",
        texture3: "birdDarkBlue3",
        particleImage: "circle",
        particleColor: {
          start: "#464D92",
          end: "#464D92",
        },
        cost: {
          typee: TypeCurrency.Candy,
          value: 10,
        },
        enabled: false,
      },
      {
        texture1: "birdBrown1",
        texture2: "birdBrown2",
        texture3: "birdBrown3",
        particleImage: "circle",
        particleColor: {
          start: "#915947",
          end: "#915947",
        },
        cost: {
          typee: TypeCurrency.Candy,
          value: 10,
        },
        enabled: false,
      },
      {
        texture1: "birdNinja1",
        texture2: "birdNinja2",
        texture3: "birdNinja3",
        particleImage: "circle",
        particleColor: {
          start: "#F12204",
          end: "#F12204",
        },
        cost: {
          typee: TypeCurrency.Candy,
          value: 10,
        },
        enabled: false,
      },
    ];
  }
}
