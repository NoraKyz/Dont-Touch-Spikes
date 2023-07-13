import * as TWEEN from "@tweenjs/tween.js";
import { GameConstant } from "../../../../gameConstant";
export class SkinsShopEffect {
    constructor(skinsShop) {
        this._initProperties(skinsShop);
        this._initEffect();
    }

    _initProperties(skinsShop) {
        this.skinsShop = skinsShop;
        this.skinsShopUI = skinsShop.shopUI;
    }

    _initEffect() {
        this._initUIEffect();
        this._initShopEffect();
    }

    _initUIEffect() {
        this._spawnInforEffect();
        this._despawnInforEffect();
    }

    _spawnInforEffect() {
        this.spawnInforEffect = new TWEEN.Tween(this.skinsShopUI.shopInfor)
            .to({ alpha: 1 }, 1500)
            .onComplete(() => {
                this.despawnInforEffect.start();
            });
    }

    _despawnInforEffect() {
        this.despawnInforEffect = new TWEEN.Tween(this.skinsShopUI.shopInfor)
            .to({ alpha: 0 }, 1500)
            .onComplete(() => {
                this.spawnInforEffect.start();
            });
    }

    _initShopEffect() {
        this._spawnShopEffect();
        this._despawnShopEffect();
    }

    _spawnShopEffect() {
        this.spawnShopEffect1 = new TWEEN.Tween(this.skinsShop)
            .to({ y: 0 }, 500)
            .onComplete(() => {
                this.spawnShopEffect2.start();
            });

        this.spawnShopEffect2 = new TWEEN.Tween(this.skinsShop)
            .to({ y: 80 }, 200)
            .onComplete(() => {
                this.spawnShopEffect3.start();
            });

        this.spawnShopEffect3 = new TWEEN.Tween(this.skinsShop)
            .to({ y: 0 }, 250);
    }

    _despawnShopEffect() {
        this.despawnShopEffect = new TWEEN.Tween(this.skinsShop)
            .to({ y: GameConstant.GAME_HEIGHT * 0.7 }, 500)
            .onComplete(() => {
                this.skinsShop.visible = false;
            });
    }

    onStart() {
        this.despawnInforEffect.start();
        this.spawnShopEffect1.start();
    }

    onClose() {
        this.despawnShopEffect.start();
        this.despawnInforEffect.stop();
    }
}