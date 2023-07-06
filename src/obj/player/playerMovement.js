import { GameManager } from "../../custom/gameManager";
import { Game } from "../../game";
import { Assets } from "pixi.js";

export class PlayerMovement {
    constructor(obj) {
        this.obj = obj;
        this._initProperties();
        this.gameManager = GameManager.instance;
    }

    _initProperties() {
        this.velocity = { x: 0 / Game.ratio, y: -1.5 / Game.ratio };
        this.gravity = 0.5 / Game.ratio;
        this.jumpForce = 12 / Game.ratio;
        this.direction = { x: 1, y: 1 };

        this.topLimit = -Game.app.view.height / 2 + Game.app.view.height / 14;
        this.bottomLimit = (Game.app.view.height * 2.5) / 7;
        this.leftLimit = -Game.app.view.width / 2;
        this.rightLimit = Game.app.view.width / 2;
    }

    _move(dt) {
        if (this.obj.isPlaying == false) {
            return;
        }

        this._limitHozMovement();

        // di chuyển bằng thay đổi pos
        this.velocity.y += this.gravity * dt;
        this.obj.position.x += this.velocity.x * this.direction.x * dt;
        this.obj.position.y += this.velocity.y * this.direction.y * dt;

        this._limitVerMovement();
    }

    // xử lý chạm left or right
    _limitHozMovement() {
        if (
            this.obj.position.x - this.obj.radiousCollider <= this.leftLimit &&
            this.direction.x == -1
        ) {
            this.direction.x = 1;
            this.gameManager.emit("nextLevel", this.direction.x);
            this._onTouchWall();
        } else if (
            this.obj.position.x + this.obj.radiousCollider >= this.rightLimit &&
            this.direction.x == 1
        ) {
            this.direction.x = -1;
            this.gameManager.emit("nextLevel", this.direction.x);
            this._onTouchWall();
        }
    }

    _onTouchWall() {
        if (!this.obj.isDie) {
            Assets.get("touchWallSound").play();
        }
        // Nếu bird vẫn còn đang đi lên và chạm tường
        if (this.velocity.y <= -this.jumpForce * 0.7) {
            this.velocity.y = -this.jumpForce * 0.7;
        } else {
            this.velocity.y = -4 / Game.ratio;
            if (this.obj.isDie) {
                this.velocity.y = 2 / Game.ratio;
            }
        }

    }

    //xử lý chạm top vs bottom
    _limitVerMovement() {
        if (this.obj.position.y - this.obj.radiousCollider <= this.topLimit) {
            this.obj.position.y = this.topLimit + this.obj.radiousCollider;
            if (this.obj.isDie) {
                this.velocity.y = this.jumpForce * 1.5;
            }
        } else if (
            this.obj.position.y + this.obj.radiousCollider >=
            this.bottomLimit
        ) {
            this.obj.position.y = this.bottomLimit - this.obj.radiousCollider;
            if (this.obj.isDie) {
                this.velocity.y = -this.jumpForce * 1.5;
            }
        }
    }

    _moveInMenu(dt) {
        if (this.obj.isPlaying) {
            return;
        }

        if (this.obj.position.y >= this.obj.radiousCollider) {
            this.direction.y = 1;
        } else if (this.obj.position.y <= -this.obj.radiousCollider) {
            this.direction.y = -1;
        }

        this.obj.position.y += this.velocity.y * this.direction.y * dt;
    }

    onStart() {
        this.velocity.x = this.jumpForce / 1.7;
        this.velocity.y = -this.jumpForce;
        this.direction = { x: 1, y: 1 };
    }

    onReset() {
        this.velocity = { x: 0 / Game.ratio, y: -1.5 / Game.ratio };
        this.direction = { x: 1, y: 1 };
    }

    onPointerDown() {
        this.velocity.y = -this.jumpForce;
    }

    onCollisionSpike() {
        this.velocity.x = this.jumpForce * 1.5;
    }

    update(dt) {
        this._move(dt);
        this._moveInMenu(dt);
    }
}
