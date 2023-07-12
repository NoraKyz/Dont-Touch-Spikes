import { ScrollBox } from "@pixi/ui";
import { SkinCard } from "../../skin/skinCard";
import { GameConstant } from "../../../gameConstant"
import { Assets, Sprite } from "pixi.js";

export class Shop extends ScrollBox {
    constructor() {
        super({
            width: GameConstant.GAME_WIDTH,
            height: GameConstant.GAME_HEIGHT * 2 / 3,
            background: 0xFFFFFF,
            elementsMargin: 12,
            vertPadding: 75,
        });

        this._initProperties();
    }

    _initProperties() {
        this.background.alpha = 0;
    }

    initSkins(skinsList) {
        skinsList.forEach(skin => {
            let skinCard = new SkinCard(skin);
            this.addItem(skinCard);
        });

        this.items.forEach(item => {
            item.x += 195;
        });
    }
}