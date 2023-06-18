
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
        return (r1 + r2 <= len);
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
}