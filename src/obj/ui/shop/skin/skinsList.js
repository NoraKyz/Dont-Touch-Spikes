import { ScrollBox } from "@pixi/ui";
import { SkinCard } from "../../../skin/skinCard";
import { GameConstant } from "../../../../gameConstant"

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
    }

    _initProperties() {
        this.background.alpha = 0;
        this.position.set(-360, -340);
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