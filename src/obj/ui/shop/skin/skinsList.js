import { ScrollBox } from "@pixi/ui";
import { SkinCard } from "./skinCard"; 
import { GameConstant } from "../../../../gameConstant"
import { SkinManager } from "../../../skin/skinManager";

export class SkinsList extends ScrollBox {
    constructor() {
        super({
            width: GameConstant.GAME_WIDTH,
            height: GameConstant.GAME_HEIGHT * 0.624,
            background: 0xFFFFFF,
            elementsMargin: 12,
            vertPadding: 75,
        });

        this._initProperties();
        this._initSkinCards();
    }

    _initProperties() {
        this.background.alpha = 0;
        this.position.set(-360, -340);
        this.skinManager = SkinManager.instance;
    }

    _initSkinCards() {
        this.skinManager.skinsList.forEach(skin => {
            let skinCard = new SkinCard(skin);
            this.addItem(skinCard);
        });

        this.items.forEach(item => {
            item.x += 195;
        });
    }
}