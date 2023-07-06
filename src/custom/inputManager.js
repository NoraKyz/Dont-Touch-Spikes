
export class InputManager {
  // Bắt sự kiện nhấn các phím
  static _handleKeyDown(e) {
    this.keys[e.keyCode] = true;
  }

  static _handleKeyUp(e) {
    this.keys[e.keyCode] = false;
  }

  // Chuyển từ charCode
  static isKeyPressed(key) {
    return !!this.keys[key.charCodeAt()];
  }
}