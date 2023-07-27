import { utils } from "pixi.js";

export class CommonUtils {

    static normalizeVector(vector) {
        const length = Math.sqrt(vector.x * vector.x + vector.y * vector.y);

        if (length === 0) return vector;

        const normalizedVector = {
            x: vector.x / length,
            y: vector.y / length,
        };
        return normalizedVector;
    }

    static randomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    static AABBCheck(x1, y1, w1, h1, x2, y2, w2, h2) {
        return ((x1 < x2 + w2) && (x1 + w1 > x2) && (y1 < y2 + h2) && (y1 + h1 > y2));
    }

    static circleCollision(x1, y1, r1, x2, y2, r2) {
        const len = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
        return (r1 + r2 >= len);
    }

    // Chưa test
    static circleRectCollision(x1, y1, r1, x2, y2, w2, h2) {
        let dx = Math.abs(x1 - x2 - w2 / 2);
        let dy = Math.abs(y1 - y2 - h2 / 2);

        if (dx > w2 / 2 + r1 || dy > h2 / 2 + r1) {
            return false;
        }

        if (dx <= w2 / 2 || dy <= h2 / 2) {
            return true;
        }

        let cornerDistance = Math.pow(dx - w2 / 2, 2) + Math.pow(dy - h2 / 2, 2);
        return cornerDistance <= Math.pow(r1, 2);
    }

    static randomColorBackground() {
        const letters = '0123456789ABCDEF';
        let color = '';
        let colorDarker = '';
        for (let i = 0; i < 6; i++) {
            if (i % 2 == 0) {
                let indexColor = 13 + Math.floor(Math.random() * 3);
                color += letters[indexColor];
                colorDarker += letters[indexColor - 2];
            } else {
                let indexColor = Math.floor(Math.random() * 3);
                color += letters[indexColor];
                colorDarker += letters[0];
            }
        }
        return { color: color, colorDarker: colorDarker };
    }

    // luôn luôn có khoảng trống 2 ô trên spikeLine để dễ chơi
    static randomArray(quantity) {
        const resultArray = [];
        const makerArray = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        const num = this.randomInt(1, 7);
        makerArray[num] = 1;
        makerArray[num + 1] = 1;
        const valueArray = [num, num + 1];
        while (valueArray.length < makerArray.length - quantity) {
            let newNum = CommonUtils.randomInt(0, 9);
            if (!valueArray.includes(newNum)) {
                valueArray.push(newNum);
                makerArray[newNum] = 1;
            }
        }
        makerArray.forEach((value, index) => {
            if (value == 0) resultArray.push(index);
        })
        return resultArray;
    }

    static lerpColor(colorStart, colorEnd, ratio) {
        const start = utils.string2hex(colorStart);
        const end = utils.string2hex(colorEnd);
        const r = (1 - ratio) * ((start >> 16) & 0xff) + ratio * ((end >> 16) & 0xff);
        const g = (1 - ratio) * ((start >> 8) & 0xff) + ratio * ((end >> 8) & 0xff);
        const b = (1 - ratio) * (start & 0xff) + ratio * (end & 0xff);
        const rgb = (r << 16) + (g << 8) + b;
        return utils.hex2string(rgb);
    }
}