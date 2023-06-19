
export class InputManager {
  // Key
  static _handleKeyDown(e) {
    this.keys[e.keyCode] = true;
  }

  static _handleKeyUp(e) {
    this.keys[e.keyCode] = false;
  }

  // Cái này chỉ hoạt động với ký tự
  static isKeyPressed(key) {
    return !!this.keys[key.charCodeAt()];
  }
}