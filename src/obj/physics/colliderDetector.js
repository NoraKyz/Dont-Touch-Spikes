import { CommonUtils } from "../../commonUtils";
import { EventEmitter } from "events";

export class ColliderDetector extends EventEmitter {
    static _instance;

    static get instance() {
        if (!this._instance) {
            this._instance = new ColliderDetector();
        }

        return this._instance;
    }

    constructor() {
        super();
    }

    checkCollider(obj1, groups) {
        groups.forEach(child => {
            if (this.isCollide(obj1.collider, child.collider)) {
                this.emit("collision", obj1, child);
            }
        });
    }

    isCollide(collider1, collider2) {
        const pos1 = collider1.getGlobalPosition();
        const pos2 = collider2.getGlobalPosition();
        return CommonUtils.circleCollision(
            pos1.x, pos1.y, collider1.radius, pos2.x, pos2.y, collider2.radius
        );
    }
}
