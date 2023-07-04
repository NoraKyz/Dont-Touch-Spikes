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

    checkCollider(obj1, obj2) {
        if (obj1 === null || obj2 === null) {
            return;
        }

        if(obj1.collider.enabled === false){
            return;
        }

        if (Array.isArray(obj2)) {
            obj2.forEach(child => {
                if (this.isCollide(obj1.collider, child.collider)) {
                    this.emit("collision", obj1, child);
                }
            });
        } else {
            if (this.isCollide(obj1.collider, obj2.collider)) {
                this.emit("collision", obj1, obj2);
            }
        }
    }

    checkGroupCollisions(groups1, groups2) {
        groups1.forEach(obj1 => {
            this.checkCollider(obj1, groups2);
        });
    }

    isCollide(collider1, collider2) {
        if (collider1.enabled == false || collider2.enabled == false) {
            return false;
        }

        const pos1 = collider1.getGlobalPosition();
        const pos2 = collider2.getGlobalPosition();
        return CommonUtils.circleCollision(
            pos1.x, pos1.y, collider1.radius, pos2.x, pos2.y, collider2.radius
        );
    }
}
