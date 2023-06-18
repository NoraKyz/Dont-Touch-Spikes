import { utils } from "pixi.js";

export class InputManager {
  /**
   * @class InputManager
   * @param {HTMLCanvasElement} canvas 
   */
  static init(canvas) {
    this.canvas = canvas;
    this.emitter = new utils.EventEmitter();
    this.startPosition = { x: 0, y: 0 };
    this.position = { x: 0, y: 0 };
    this.isMouseDown = false;
    this._tmpPos = { x: 0, y: 0 };
    this.keys = {};
    this._registerDOMEvents();
  }

  static _registerDOMEvents() {
    document.addEventListener("touchstart", e => this._handleTouchEvent(e, this._mouseDownEventHandler.bind(this)), { passive: false });
    document.addEventListener("touchmove", e => this._handleTouchEvent(e, this._mouseMoveEventHandler.bind(this)), { passive: false });
    document.addEventListener("touchend", e => this._handleTouchEvent(e, this._mouseUpEventHandler.bind(this)), { passive: false });

    document.addEventListener("mousedown", e => this._mouseDownEventHandler(e));
    document.addEventListener("mousemove", e => this._mouseMoveEventHandler(e));
    document.addEventListener("mouseup", e => this._mouseUpEventHandler(e));

    document.addEventListener("keydown", (e) => this._handleKeyDown(e));
    document.addEventListener("keyup", (e) => this._handleKeyUp(e));
  }

  /**
   * @param {TouchEvent} evt 
   * @param {(evt: Touch) => void} callback 
   */
  // Lấy điểm chạm đầu tiên để thực thi callback
  static _handleTouchEvent(evt, callback) {
    evt.preventDefault();
    callback(evt.touches[0]);
  }

  /**
   * @param {Touch} evt 
   */
  static _mouseDownEventHandler(evt) {
    this._tmpPos = this.getCanvasMousePos(evt);
    this.startPosition.x = this._tmpPos.x;
    this.startPosition.y = this._tmpPos.y;
    this.position.x = this._tmpPos.x;
    this.position.y = this._tmpPos.y;
    this.isMouseDown = true;
  }

  /**
   * @param {Touch} evt 
   */
  static _mouseMoveEventHandler(evt) {
    this._tmpPos = this.getCanvasMousePos(evt);
    this.position.x = this._tmpPos.x;
    this.position.y = this._tmpPos.y;
    this.emitter.emit(InputEvent.MouseMove, this.position, this.startPosition);
  }

  static _mouseUpEventHandler() {
    this.isMouseDown = false;
    this.emitter.emit(InputEvent.MouseUp, this.position, this.startPosition);
  }

  /**
   * @param {Touch} evt 
   */
  static getCanvasMousePos(evt) {
    let bound = this.canvas.getBoundingClientRect();
    this._tmpPos.x = (evt.clientX - bound.left) * this.canvas.width / bound.width;
    this._tmpPos.y = (evt.clientY - bound.top) * this.canvas.height / bound.height;
    return this._tmpPos;
  }

  /**
   * @param {string} event 
   * @param {(mouseX?: number, mouseY?: number, startMouseX?: number)} callback 
   */
  static registerEvent(event, callback) {
    this.emitter.on(event, callback);
  }

  /**
   * @param {string} event 
   * @param {(mouseX?: number, mouseY?: number, startMouseX?: number)} callback 
   */
  static removeEvent(event, callback) {
    this.emitter.off(event, callback)
  }

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

/**
 * @enum InputEvent 
 */
export const InputEvent = Object.freeze({
  MouseDown: "mousedown",
  MouseMove: "mousemove",
  MouseUp: "mouseup",
  KeyDown: "keydown",
  KeyUp: "keyup"
});