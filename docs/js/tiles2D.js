(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (factory((global.TILES2D = global.TILES2D || {})));
}(this, (function (exports) { 'use strict';

    /**
     * Keyboard keys Constants
     *
     * @static
     * @constant
     * @name KEYBOARD
     * @memberof TILES2D
     */
    var KEYBOARD = {
        CANCEL: 3,
        HELP: 6,
        BACK_SPACE: 8,
        TAB: 9,
        CLEAR: 12,
        RETURN: 13,
        ENTER: 14,
        SHIFT: 16,
        CONTROL: 17,
        ALT: 18,
        PAUSE: 19,
        CAPS_LOCK: 20,
        ESCAPE: 27,
        SPACE: 32,
        PAGE_UP: 33,
        PAGE_DOWN: 34,
        END: 35,
        HOME: 36,
        LEFT: 37,
        UP: 38,
        RIGHT: 39,
        DOWN: 40,
        PRINTSCREEN: 44,
        INSERT: 45,
        DELETE: 46,
        0: 48,
        1: 49,
        2: 50,
        3: 51,
        4: 52,
        5: 53,
        6: 54,
        7: 55,
        8: 56,
        9: 57,
        SEMICOLON: 59,
        EQUALS: 61,
        A: 65,
        B: 66,
        C: 67,
        D: 68,
        E: 69,
        F: 70,
        G: 71,
        H: 72,
        I: 73,
        J: 74,
        K: 75,
        L: 76,
        M: 77,
        N: 78,
        O: 79,
        P: 80,
        Q: 81,
        R: 82,
        S: 83,
        T: 84,
        U: 85,
        V: 86,
        W: 87,
        X: 88,
        Y: 89,
        Z: 90,
        CONTEXT_MENU: 93,
        NUMPAD0: 96,
        NUMPAD1: 97,
        NUMPAD2: 98,
        NUMPAD3: 99,
        NUMPAD4: 100,
        NUMPAD5: 101,
        NUMPAD6: 102,
        NUMPAD7: 103,
        NUMPAD8: 104,
        NUMPAD9: 105,
        MULTIPLY: 106,
        ADD: 107,
        SEPARATOR: 108,
        SUBTRACT: 109,
        DECIMAL: 110,
        DIVIDE: 111,
        F1: 112,
        F2: 113,
        F3: 114,
        F4: 115,
        F5: 116,
        F6: 117,
        F7: 118,
        F8: 119,
        F9: 120,
        F10: 121,
        F11: 122,
        F12: 123,
        F13: 124,
        F14: 125,
        F15: 126,
        F16: 127,
        F17: 128,
        F18: 129,
        F19: 130,
        F20: 131,
        F21: 132,
        F22: 133,
        F23: 134,
        F24: 135,
        NUM_LOCK: 144,
        SCROLL_LOCK: 145,
        COMMA: 188,
        PERIOD: 190,
        SLASH: 191,
        BACK_QUOTE: 192,
        OPEN_BRACKET: 219,
        BACK_SLASH: 220,
        CLOSE_BRACKET: 221,
        QUOTE: 222,
        META: 224
    };

    /**
     * Gamepad buttons Constants
     *
     * @static
     * @constant
     * @name GAMEPAD
     * @memberof TILES2D
     */
    var GAMEPAD = {
        //xbox
        A: 0,
        B: 1,
        Y: 3,
        BACK: 8,
        LB: 4,
        RB: 5,
        LT: 6,
        RT: 7,

        //common
        X: 2,
        START: 9,
        L_STICK: 10,
        R_STICK: 11,
        DPAD_UP: 12,
        DPAD_DOWN: 13,
        DPAD_LEFT: 14,
        DPAD_RIGHT: 15,
        VENDOR: 16,

        L_AXIS: { axis: [0, 1] },
        L_AXIS_X: { axis: 0 },
        L_AXIS_X_LEFT: { axis: 0, direction: -1 },
        L_AXIS_X_RIGHT: { axis: 0, direction: 1 },
        L_AXIS_Y: { axis: 1 },
        L_AXIS_Y_TOP: { axis: 1, direction: -1 },
        L_AXIS_Y_BOTTON: { axis: 1, direction: 1 },

        R_AXIS: { axis: [2, 3] },
        R_AXIS_X: { axis: 2 },
        R_AXIS_X_LEFT: { axis: 2, direction: -1 },
        R_AXIS_X_RIGHT: { axis: 2, direction: 1 },
        R_AXIS_Y: { axis: 3 },
        R_AXIS_Y_TOP: { axis: 3, direction: -1 },
        R_AXIS_Y_BOTTON: { axis: 3, direction: 1 },

        //ps3/ps4
        TRIANGLE: 0,
        CIRCLE: 1,
        SQUARE: 3,
        SELECT: 8,
        L1: 6,
        l2: 4,
        R1: 7,
        R2: 5,

        //generic
        BUTTON_1: 0,
        BUTTON_2: 2,
        BUTTON_3: 3,
        BUTTON_4: 4,
        BUTTON_5: 5,
        BUTTON_6: 6,
        BUTTON_7: 7,
        BUTTON_8: 8,
        BUTTON_9: 9,
        BUTTON_10: 10,
        BUTTON_11: 11,
        BUTTON_12: 12,
        BUTTON_13: 13,
        BUTTON_14: 14,
        BUTTON_15: 15,
        BUTTON_16: 16
    };

    /**
     * GAMEPADIDs Constants
     *
     * @static
     * @constant
     * @name GAMEPADID
     * @memberof TILES2D
     */
    var GAMEPADID = {
        xbox360: 0x45E
    };

    var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
      return typeof obj;
    } : function (obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };











    var classCallCheck = function (instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
      }
    };

    var createClass = function () {
      function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
          var descriptor = props[i];
          descriptor.enumerable = descriptor.enumerable || false;
          descriptor.configurable = true;
          if ("value" in descriptor) descriptor.writable = true;
          Object.defineProperty(target, descriptor.key, descriptor);
        }
      }

      return function (Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);
        if (staticProps) defineProperties(Constructor, staticProps);
        return Constructor;
      };
    }();







    var get = function get(object, property, receiver) {
      if (object === null) object = Function.prototype;
      var desc = Object.getOwnPropertyDescriptor(object, property);

      if (desc === undefined) {
        var parent = Object.getPrototypeOf(object);

        if (parent === null) {
          return undefined;
        } else {
          return get(parent, property, receiver);
        }
      } else if ("value" in desc) {
        return desc.value;
      } else {
        var getter = desc.get;

        if (getter === undefined) {
          return undefined;
        }

        return getter.call(receiver);
      }
    };

    var inherits = function (subClass, superClass) {
      if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
      }

      subClass.prototype = Object.create(superClass && superClass.prototype, {
        constructor: {
          value: subClass,
          enumerable: false,
          writable: true,
          configurable: true
        }
      });
      if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
    };











    var possibleConstructorReturn = function (self, call) {
      if (!self) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
      }

      return call && (typeof call === "object" || typeof call === "function") ? call : self;
    };



    var set = function set(object, property, value, receiver) {
      var desc = Object.getOwnPropertyDescriptor(object, property);

      if (desc === undefined) {
        var parent = Object.getPrototypeOf(object);

        if (parent !== null) {
          set(parent, property, value, receiver);
        }
      } else if ("value" in desc && desc.writable) {
        desc.value = value;
      } else {
        var setter = desc.set;

        if (setter !== undefined) {
          setter.call(receiver, value);
        }
      }

      return value;
    };

    /**
      * The KeyboardInput is used to manage the keyboard events
      *
      * @class
      * @memberof TILES2D
      * @author Fabio Toste
    */

    var KeyboardInput = function () {
        function KeyboardInput() {
            classCallCheck(this, KeyboardInput);

            this.key = [];

            document.body.addEventListener("keydown", this._onKeyDown.bind(this));
            document.body.addEventListener("keyup", this._onKeyUp.bind(this));
        }

        createClass(KeyboardInput, [{
            key: "update",
            value: function update(item) {
                var i = void 0,
                    len = void 0;
                for (i = 0, len = item.keyboard.length; i < len; i++) {
                    var char = item.keyboard[i];

                    if (this.key[char] && this.key[char].state && item.canHit) {
                        if (item.oneHit) {
                            item.canHit = false;
                            this.key[char] = false;
                        }

                        if (item.onPress) item.onPress(1);
                    }

                    if (this.key[char] && !this.key[char].state) {
                        if (item.onRelease) item.onRelease(0);

                        item.canHit = true;
                        this.key[char] = false;
                    }
                }
            }
        }, {
            key: "_onKeyDown",
            value: function _onKeyDown(e) {
                var char = e.keyCode || e.which;
                this.key[char] = { state: true };
            }
        }, {
            key: "_onKeyUp",
            value: function _onKeyUp(e) {
                var char = e.keyCode || e.which;
                this.key[char] = { state: false };
            }
        }], [{
            key: "normalize",
            value: function normalize(key) {
                if ((typeof key === "undefined" ? "undefined" : _typeof(key)) == 'object' && key.length != undefined) {
                    for (var i = 0, len = key.length; i < len; i++) {
                        key[i] = KeyboardInput.getValue(key[i]);
                    }
                } else key = [KeyboardInput.getValue(key)];

                return key;
            }
        }, {
            key: "getValue",
            value: function getValue(value) {
                if (typeof value == 'string') value = KEYBOARD[value.toUpperCase()];else if (typeof value == 'number') value = value;else value = -1;

                return value;
            }
        }]);
        return KeyboardInput;
    }();

    /**
      * The MouseInput object is used to manage the mouse events
      *
      * @class
      * @memberof TILES2D
      * @author Fabio Toste
    */
    var MouseInput = function () {
        function MouseInput() {
            classCallCheck(this, MouseInput);

            this.button = [];
            this.wheel = 0;
            this.axis = [];

            document.addEventListener("mousewheel", this.onWheel, false);
            document.addEventListener("DOMMouseScroll", this.onWheel, false);
        }

        createClass(MouseInput, [{
            key: "update",
            value: function update(item) {}
        }, {
            key: "onWheel",
            value: function onWheel(e) {
                var e = window.event || e;
                this.wheel = Math.max(-1, Math.min(1, e.wheelDelta || -e.detail));
            }
        }]);
        return MouseInput;
    }();

    /**
     * The Vector2 object represents a location in a two-dimensional coordinate system,
     * where x represents the horizontal axis and y represents the vertical axis.
     *
     * @class
     * @memberof TILES2D
     * @author Fabio Toste
     */
    var Vector2 = function () {
        /**
         * @param {number} [x = 0] - position of the vector on the x axis
         * @param {number} [y = 0] - position of the vector on the y axis
         */
        function Vector2() {
            var x = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
            var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
            classCallCheck(this, Vector2);

            /**
             * @member {number}
             * @default 0
             */
            this._x = 0;

            /**
             * @member {number}
             * @default 0
             */
            this._y = 0;

            this.x = x;
            this.y = y;
        }

        /**
         * Creates a clone of this vector
         *
         * @return {TILES2D.Vector2} a copy of the vector
         */


        createClass(Vector2, [{
            key: "clone",
            value: function clone() {
                return new Vector2(this.x, this.y);
            }

            /**
             * Copies x and y from the given vector
             *
             * @param {TILES2D.Vector2} v - The vector to copy.
             */

        }, {
            key: "copy",
            value: function copy(v) {
                this.set(v.x, v.y);
            }

            /**
             * Returns true if the given vector is equal to this vector
             *
             * @param {TILES2D.Vector2} v - The vector to check
             *
             * @returns {boolean} Whether the given vector equal to this vector
             */

        }, {
            key: "equals",
            value: function equals(v) {
                return v.x === this.x && v.y === this.y;
            }

            /**
             * Sets the vector to a new x and y position.
             * If y is omitted, both x and y will be set to x.
             *
             * @param {number} [x=0] - position of the vector on the x axis
             * @param {number} [y=0] - position of the vector on the y axis
             */

        }, {
            key: "set",
            value: function set$$1(x, y) {
                this.x = x || 0;
                this.y = y || (y !== 0 ? this.x : 0);
            }

            /**
             * Returns the x position of the vector
             *
             * @returns {number} The vector x position
             */

        }, {
            key: "zero",


            /**
             * Sets the vector x and y positions to zero
             *
             * @return {TILES2D.Vector2} this vector for chaining
             */
            value: function zero() {
                this.x = 0;
                this.y = 0;
                return this;
            }

            /**
             * Adds to the vector the x and y position of a given vector
             *
             * @param {TILES2D.Vector2} v - The vector to add
             *
             * @return {TILES2D.Vector2} this vector for chaining
             */

        }, {
            key: "add",
            value: function add(v) {
                this.x += v.x;
                this.y += v.y;
                return this;
            }

            /**
             * Adds to the vector x and y position a given scalar number
             *
             * @param {number} n - The number to add
             *
             * @return {TILES2D.Vector2} this vector for chaining
             */

        }, {
            key: "addScalar",
            value: function addScalar(n) {
                this.x += n;
                this.y += n;
                return this;
            }

            /**
             * Subtracts from the vector the x and y position of a given vector
             *
             * @param {TILES2D.Vector2} v - The vector to subtract
             *
             * @return {TILES2D.Vector2} this vector for chaining
             */

        }, {
            key: "subtract",
            value: function subtract(v) {
                this.x -= v.x;
                this.y -= v.y;
                return this;
            }

            /**
             * Subtracts from the vector x and y position a given scalar number
             *
             * @param {number} n - The number to subtract
             *
             * @return {TILES2D.Vector2} this vector for chaining
             */

        }, {
            key: "subtractScalar",
            value: function subtractScalar(n) {
                this.x -= n;
                this.y -= n;
                return this;
            }

            /**
             * Multiplies to the vector the x and y position of a given vector
             *
             * @param {TILES2D.Vector2} v - The vector to multiply
             *
             * @return {TILES2D.Vector2} this vector for chaining
             */

        }, {
            key: "multiply",
            value: function multiply(v) {
                this.x *= v.x;
                this.y *= v.y;
                return this;
            }

            /**
             * Multiplies to the vector x and y position a given scalar number
             *
             * @param {number} n - The number to multiply
             *
             * @return {TILES2D.Vector2} this vector for chaining
             */

        }, {
            key: "multiplyScalar",
            value: function multiplyScalar(n) {
                this.x *= n;
                this.y *= n;
                return this;
            }

            /**
             * Divides the vector for the x and y position of a given vector
             *
             * @param {TILES2D.Vector2} v - The vector to divide
             *
             * @return {TILES2D.Vector2} this vector for chaining
             */

        }, {
            key: "divide",
            value: function divide(v) {
                this.x /= v.x;
                this.y /= v.y;
                return this;
            }

            /**
             * Divides the vector for the x and y position of a given scalar number
             *
             * @param {number} n - The number to divide
             *
             * @return {TILES2D.Vector2} this vector for chaining
             */

        }, {
            key: "divideScalar",
            value: function divideScalar(n) {
                this.x /= n;
                this.y /= n;
                return this;
            }

            /**
             * Clamps this vector's length to given min and max values
             *
             * @param {TILES2D.Vector2} vmin - the min (vector2) value to clamp
             * @param {TILES2D.Vector2} vmax - the max (vector2) value to clamp
             *
             * @return {TILES2D.Vector2} this vector for chaining
             */

        }, {
            key: "clamp",
            value: function clamp(vmin, vmax) {
                this.x = Math.max(vmin.x, Math.min(vmax.x, this.x));
                this.y = Math.max(vmin.y, Math.min(vmax.y, this.y));
                return this;
            }

            /**
             * Floors the x and y positions of the vector
             *
             * @return {TILES2D.Vector2} this vector for chaining
             */

        }, {
            key: "floor",
            value: function floor() {
                this.x = Math.floor(this.x);
                this.y = Math.floor(this.y);
                return this;
            }

            /**
             * Ceils the x and y positions of the vector
             *
             * @return {TILES2D.Vector2} this vector for chaining
             */

        }, {
            key: "ceil",
            value: function ceil() {
                this.x = Math.ceil(this.x);
                this.y = Math.ceil(this.y);
                return this;
            }

            /**
             * Rounds the x and y positions of the vector
             *
             * @return {TILES2D.Vector2} this vector for chaining
             */

        }, {
            key: "round",
            value: function round() {
                this.x = Math.round(this.x);
                this.y = Math.round(this.y);
                return this;
            }

            /**
             * Makes the x and y positions of the vector negative
             *
             * @return {TILES2D.Vector2} this vector for chaining
             */

        }, {
            key: "negate",
            value: function negate() {
                this.x = -this.x;
                this.y = -this.y;
                return this;
            }

            /**
             * Gives to a given vector the x and y positions of this vector
             *
             * @param {TILES2D.Vector2} v - The vector to give the positions
             *
             * @return {TILES2D.Vector2} this vector for chaining
             */

        }, {
            key: "equals",
            value: function equals(v) {
                v.x = this.x;
                v.y = this.y;
                return this;
            }

            /**
             * Sets the angle of the vector
             *
             * @param {number} n - The angle (radians) to set
             *
             * @return {TILES2D.Vector2} this vector for chaining
             */

        }, {
            key: "rotate",


            /**
             * Rotates the angle by a given radian angle
             *
             * @param {number} n - The angle (radians) to rotate
             *
             * @return {TILES2D.Vector2} this vector for chaining
             */
            value: function rotate() {
                var n = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

                var angle = angle();
                var length = Math.sqrt(this.x * this.x + this.y * this.y);
                this.x = Math.cos(n + angle) * length;
                this.y = Math.sin(n + angle) * length;
                return this;
            }

            /**
             * Rotates the angle by a given degree angle
             *
             * @param {number} n - The angle (degrees) to rotate
             *
             * @return {TILES2D.Vector2} this vector for chaining
             */

        }, {
            key: "rotateDeg",
            value: function rotateDeg(n) {
                n *= 0.0174532925;
                rotate(n);
                return this;
            }

            /**
             * Normalizes the vector ()
             *
             * @param {number} n - A scale value to normalize (defaults to 1.0)
             *
             * @return {TILES2D.Vector2} this vector for chaining
             */

        }, {
            key: "normalize",
            value: function normalize() {
                var n = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1.0;

                var length = Math.sqrt(this.x * this.x + this.y * this.y);
                this.x = this.x / length * n;
                this.y = this.y / length * n;
                return this;
            }

            /**
             * Sets the length of the vector
             *
             * @param {number} n - The new length of the vector
             *
             * @return {TILES2D.Vector2} this vector for chaining
             */

        }, {
            key: "dot",


            /**
             * Makes a dot product operation between this vector and a given vector
             *
             * @param {TILES2D.Vector2} v - The vector to make the dot operation
             *
             * @return {number} the result of dot operation
             */
            value: function dot(v) {
                return this.x * v.x + this.y * v.y;
            }

            /**
             * Calculates the distance between this vector and a given vector
             *
             * @param {TILES2D.Vector2} v - The vector calculate the distance to
             *
             * @return {number} the distance between the vectors
             */

        }, {
            key: "distance",
            value: function distance(v) {
                return Math.sqrt(distanceSquared(v));
            }

            /**
             * Calculates the squared distance between this vector and a given vector
             *
             * @param {TILES2D.Vector2} v - The vector calculate the squared distance to
             *
             * @return {number} the squared distance between the vectors
             */

        }, {
            key: "distanceSquared",
            value: function distanceSquared(v) {
                var dx = this.x - v.x,
                    dy = this.y - v.y;
                return dx * dx + dy * dy;
            }

            /**
             * Makes a linear interpolation between this vector and a given vector
             *
             * @param {TILES2D.Vector2} v - The vector to lerp to
             * @param {number} a - The amount to interpolate between the vectors
             *
             * @return {TILES2D.Vector2} this vector for chaining
             */

        }, {
            key: "lerp",
            value: function lerp(v, a) {
                this.x += (v.x - this.x) * a;
                this.y += (v.y - this.y) * a;
                return this;
            }

            /**
             * Offsets this vector x and y positions by the given dx and dy values
             *
             * @param {number} dx - The offset value for x position
             * @param {number} dy - The offset value for y position
             *
             * @return {TILES2D.Vector2} this vector for chaining
             */

        }, {
            key: "offset",
            value: function offset() {
                var dx = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
                var dy = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

                this.x += dx;
                this.y += dy;
                return this;
            }

            /**
             * Makes this vector looks to the position of a given vector
             *
             * @param {TILES2D.Vector2} v - The vector to look at
             *
             * @return {TILES2D.Vector2} this vector for chaining
             */

        }, {
            key: "lookAt",
            value: function lookAt(v) {
                var vector = new Vector2(v.x - x, v.y - y);
                angle(vector.angle());
                return this;
            }
        }, {
            key: "x",
            get: function get$$1() {
                return this._x;
            }

            /**
             * Sets the vector to a new x position.
             *
             * @param {number} [x=0] - position of the vector on the x axis
             */
            ,
            set: function set$$1() {
                var x = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

                this._x = x;
            }

            /**
             * Returns the y position of the vector
             *
             * @returns {number} The vector y position
             */

        }, {
            key: "y",
            get: function get$$1() {
                return this._y;
            }

            /**
             * Sets the vector to a new y position.
             *
             * @param {number} [y=0] - position of the vector on the y axis
             */
            ,
            set: function set$$1() {
                var y = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

                this._y = y;
            }
        }, {
            key: "angle",
            set: function set$$1() {
                var n = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

                var length = this.length;
                this.x = Math.cos(n) * length;
                this.y = Math.sin(n) * length;
                return this;
            }

            /**
             * Gets the angle of the vector
             *
             * @return {number} the angle of the vector in radians
             */
            ,
            get: function get$$1() {
                return Math.atan2(this.y, this.x);
            }

            /**
             * Sets the angle of the vector
             *
             * @param {number} n - The angle (degrees) to set
             *
             * @return {TILES2D.Vector2} this vector for chaining
             */

        }, {
            key: "angleDeg",
            set: function set$$1() {
                var n = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

                n *= 0.0174532925;
                angle(n);
                return this;
            }

            /**
             * Gets the angle of the vector
             *
             * @return {number} the angle of the vector in degrees
             */
            ,
            get: function get$$1() {
                return Math.atan2(this.y, this.x) * 57.2957;
            }
        }, {
            key: "length",
            set: function set$$1(n) {
                normalize(1);
                this.x *= n;
                this.y *= n;
                return this;
            }

            /**
             * Gets the length of the vector
             *
             * @return {number} the length of the vector
             */
            ,
            get: function get$$1() {
                return Math.sqrt(this.x * this.x + this.y * this.y);
            }
        }]);
        return Vector2;
    }();

    /**
     * Two Pi.
     *
     * @static
     * @constant
     * @memberof TILES2D
     * @type {number}
     */


    /**
     * Conversion factor for converting radians to degrees.
     *
     * @static
     * @constant
     * @memberof TILES2D
     * @type {number}
     */


    /**
     * Conversion factor for converting degrees to radians.
     *
     * @static
     * @constant
     * @memberof TILES2D
     * @type {number}
     */


    /**
     * A Math Helper class with a some math functions
     *
     * @class
     * @memberof TILES2D
     */

    var MathUtil = function () {
        function MathUtil() {
            classCallCheck(this, MathUtil);
        }

        createClass(MathUtil, null, [{
            key: 'analogicToDigital',
            value: function analogicToDigital(v, threshold) {
                v = MathUtil.percentageFit(v, threshold, 1);
                return v == 0 ? 0 : v > 0 ? 1 : -1;
            }
        }, {
            key: 'percentageFit',
            value: function percentageFit(v, min, max) {
                var signal = Math.sign(v);
                v = Math.abs(v);
                var returnValue = v - min;
                var fitValue = max - min;
                returnValue = returnValue < 0 ? 0 : returnValue;
                returnValue = returnValue > fitValue ? fitValue : returnValue;
                returnValue = returnValue / fitValue;
                return returnValue * signal;
            }
        }, {
            key: 'radToDeg',
            value: function radToDeg(radian) {
                return radian / Math.PI * 180;
            }
        }, {
            key: 'degToRad',
            value: function degToRad(degree) {
                return degree / 180 * Math.PI;
            }
        }, {
            key: 'ease',
            value: function ease(origin, target, speed) {
                return (origin - target) / speed;
            }
        }, {
            key: 'dist1D',
            value: function dist1D(start, end) {
                return Math.sqrt(Math.abs(start - end));
            }
        }, {
            key: 'dist2D',
            value: function dist2D(startX, startY, endX, endY) {
                var dirX = startX - endX;
                var dirY = startY - endY;
                return Math.sqrt(dirX * dirX + dirY * dirY);
            }
        }, {
            key: 'average',
            value: function average() {
                var total = arguments.length;
                var sum = 0;
                var i = 0;
                while (i < total) {
                    sum += arguments.length <= i ? undefined : arguments[i];
                    i++;
                }
                return sum / total;
            }
        }, {
            key: 'smoothAverage',
            value: function smoothAverage(n, n2) {
                var speed = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0.5;

                var sinSpeed = Math.sin(n) * speed;
                var cosSpeed = Math.cos(n) * speed;
                var sin = Math.sin(n2) * (1 - speed);
                var cos = Math.sin(n2) * (1 - speed);
                return Math.atan2(sinSpeed + sin, cosSpeed + cos);
            }
        }, {
            key: 'lerp',
            value: function lerp(from, to, a) {
                if (a > 1) {
                    return to;
                }
                if (a < 0) {
                    return from;
                }
                return from + (to - from) * a;
            }
        }, {
            key: 'clamp',
            value: function clamp(v, min, max) {
                return Math.max(min, Math.min(max, v));
            }
        }, {
            key: 'clampNum',
            value: function clampNum(v) {
                return MathUtil.clamp(v, 0, 1);
            }
        }, {
            key: 'rand',
            value: function rand(min, max) {
                return min + (max - min) * Math.random();
            }
        }, {
            key: 'approach',
            value: function approach(c, t, i) {
                i = Math.abs(i);

                if (c < t) return MathUtil.clamp(c + i, c, t);else if (c > t) return MathUtil.clamp(c - i, t, c);

                return t;
            }
        }, {
            key: 'isBetween',
            value: function isBetween(n, min, max) {
                return n >= min && n <= max;
            }
        }, {
            key: 'vectorRand',
            value: function vectorRand() {
                return new Vector2(rand(-1, 1), rand(-1, 1));
            }
        }, {
            key: 'fit',
            value: function fit(v, vMin, vMax, outMin, outMax) {
                return (v - vMin) * (outMax - outMin) / (vMax - vMin) + outMin;
            }
        }, {
            key: 'toFixed',
            value: function toFixed(v, factor) {
                return Math.round(v * factor) / factor;
            }
        }]);
        return MathUtil;
    }();

    /**
      * The GamepadInput object is used to manage the gamepad inputs
      *
      * @class
      * @memberof TILES2D
      * @author Fabio Toste
    */

    var GamepadInput = function () {
        function GamepadInput() {
            classCallCheck(this, GamepadInput);

            this.getGamepads = 'getGamepads';
            this.hasGamepadSupport = window.navigator.getGamepads !== undefined;

            if (!this.hasGamepadSupport && window.navigator.webkitGetGamepads !== undefined) {
                this.hasGamepadSupport = true;
                this.getGamepads = 'webkitGetGamepads';
            }

            this.threshold = 0.2;
            this.onGamepadConnected = null;
            this.onGamepadDisconnected = null;
            this.axes = [0, 0, 0, 0];

            window.addEventListener("gamepadconnected", this.onConnect);
            window.addEventListener("gamepaddisconnected", this.onDisconnect);

            if (this.hasGamepadSupport) {
                var gp = window.navigator[this.getGamepads]();
            }
        }

        createClass(GamepadInput, [{
            key: 'onConnect',
            value: function onConnect(e) {
                if (this.onGamepadConnected != null) this.onGamepadConnected(e);
            }
        }, {
            key: 'onDisconnect',
            value: function onDisconnect(e) {
                if (this.onGamepadDisconnected != null) this.onGamepadDisconnected(e);
            }
        }, {
            key: 'update',
            value: function update(item) {
                if (this.hasGamepadSupport) {
                    var gindex = item.gamepadIndex || 0;
                    var i = void 0,
                        len = void 0;
                    for (i = 0, len = item.gamepad.length; i < len; i++) {
                        var bt = item.gamepad[i];
                        var gp = window.navigator[this.getGamepads]()[gindex];

                        if (gp != null) {
                            if (typeof bt == 'number') {
                                if (gp.buttons[bt] && gp.buttons[bt].pressed == true && item.canHit) this._setOnPress(item, gp.buttons[bt].value, 'pressed');

                                if (item.pressed && gp.buttons[bt] && gp.buttons[bt].pressed == false) this._setOnRelease(item, gp.buttons[bt].value, 'pressed');
                            } else {
                                if (gp.axes && bt.hasOwnProperty('axis')) {
                                    if (bt.axis.length != undefined) {
                                        for (var _i = 0; _i < bt.axis.length; _i++) {
                                            this._setAxisValue(gp, _i, bt.axis[_i], item.onlyDigital);
                                        }
                                    } else this._setAxisValue(gp, 0, bt.axis, item.onlyDigital);

                                    if (item.onMove) item.onMove(this.axes[0], this.axes[1], this.axes[2], this.axes[3]);else {
                                        var sameDirection = Math.sign(this.axes[0]) == Math.sign(bt.direction);
                                        if (item.canHit && this.axes[0] != 0 && sameDirection) this._setOnPress(item, this.axes[0], 'moved');

                                        if (item.moved && this.axes[0] == 0) this._setOnRelease(item, this.axes[0], 'moved');
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }, {
            key: '_setOnPress',
            value: function _setOnPress(item, value, type) {
                if (item.oneHit) item.canHit = false;

                if (item.onPress) item.onPress(value);

                switch (type) {
                    case 'pressed':
                        item.pressed = true;
                        break;
                    case 'moved':
                        item.moved = true;
                        break;
                    default:
                        item.pressed = true;
                }
            }
        }, {
            key: '_setOnRelease',
            value: function _setOnRelease(item, value, type) {
                if (item.onRelease) item.onRelease(value);

                item.canHit = true;

                switch (type) {
                    case 'pressed':
                        item.pressed = false;
                        break;
                    case 'moved':
                        item.moved = false;
                        break;
                    default:
                        item.pressed = false;
                }
            }
        }, {
            key: '_setAxisValue',
            value: function _setAxisValue(gp, axisIndex, index, onlyDigital) {
                if (gp.axes[index]) {
                    if (onlyDigital) this.axes[axisIndex] = MathUtil.analogicToDigital(gp.axes[index], this.threshold);else this.axes[axisIndex] = MathUtil.percentageFit(gp.axes[index], this.threshold, 1);
                }
            }
        }], [{
            key: 'normalize',
            value: function normalize(button) {
                if (typeof button == 'number' || typeof button == 'string') button = [button];

                return button;
            }
        }]);
        return GamepadInput;
    }();

    /**
      * The TouchInput object is used to manage the touch inputs
      *
      * @class
      * @memberof TILES2D
      * @author Fabio Toste
    */
    var TouchInput = function () {
        function TouchInput() {
            classCallCheck(this, TouchInput);
        }

        createClass(TouchInput, [{
            key: "update",
            value: function update(item) {}
        }]);
        return TouchInput;
    }();

    /**
      * The InputManager object is the base class of all input methods tha can be used
      *
      * @class
      * @memberof TILES2D
      * @author Fabio Toste
    */
    var inputLength = 0;
    var inputList = [];
    var keyboard = false;
    var mouse = false;
    var gamepad = false;
    var touch = false;

    var InputManager = function () {
        function InputManager() {
            classCallCheck(this, InputManager);
        }

        createClass(InputManager, null, [{
            key: 'addInput',
            value: function addInput() {
                var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
                var inputs = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

                var index = InputManager.getIndexByName(name);
                if (index == -1) {
                    inputs.name = name;
                    inputs.canHit = true;
                    inputs.pressed = false;
                    inputs.moved = false;
                    inputs.onlyDigital = inputs.onlyDigital || false;
                    inputs.gamepadIndex = inputs.gamepadIndex || 0;

                    if (inputs.keyboard != undefined) {
                        if (!keyboard) keyboard = new KeyboardInput();

                        inputs.keyboard = KeyboardInput.normalize(inputs.keyboard);
                    }

                    if (inputs.gamepad != undefined) {
                        if (!gamepad) gamepad = new GamepadInput();

                        inputs.gamepad = GamepadInput.normalize(inputs.gamepad);
                    }

                    inputLength = inputList.push(inputs);
                } else console.log("Input name (" + inputs.name + ") already exists");
            }
        }, {
            key: 'removeInputByName',
            value: function removeInputByName(name) {
                var index = InputManager.getIndexByName("name");
                if (index != -1) inputList.splice(index, 1);
            }
        }, {
            key: 'removeInputAt',
            value: function removeInputAt() {
                var index = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : -1;

                if (index != -1 && index > 0 && index < inputLength) inputList.splice(index, 1);
            }
        }, {
            key: 'update',
            value: function update() {
                var i, item;
                for (i = 0; i < inputLength; i++) {
                    item = inputList[i];

                    if (keyboard && item.keyboard) keyboard.update(item);

                    if (gamepad && item.gamepad) gamepad.update(item);

                    if (mouse && item.mouse) mouse.update(item);

                    if (touch && item.touch) touch.update(item);
                }
            }
        }, {
            key: 'getIndexByName',
            value: function getIndexByName(name) {
                var index = -1;
                for (var i = 0; i < inputLength; i++) {
                    if (inputList[i].name == name) {
                        index = i;
                        break;
                    }
                }
                return index;
            }
        }]);
        return InputManager;
    }();

    /**
     * String of the current TILES2D version.
     *
     * @static
     * @constant
     * @memberof TILES2D
     * @name VERSION
     * @type {string}
     */
    var VERSION = '0.0.1';

    /**
     * Constants that identify axis, mainly to prevent `instanceof` calls.
     *
     * @static
     * @constant
     * @name AXIS
     * @memberof TILES2D
     * @type {object}
     * @property {number} X the x axis
     * @property {number} Y the y axis
     */
    var AXIS = {
      X: "x",
      Y: "y"
    };

    /**
     * Constants that identify shapes, mainly to prevent `instanceof` calls.
     *
     * @static
     * @constant
     * @name SHAPES
     * @memberof TILES2D
     * @type {object}
     * @property {number} POLY Polygon
     * @property {number} RECT Rectangle
     * @property {number} CIRC Circle
     * @property {number} ELIP Ellipse
     * @property {number} RREC Rounded Rectangle
     */
    var SHAPES = {
      POLY: 0,
      RECT: 1,
      CIRC: 2,
      ELIP: 3,
      RREC: 4
    };

    /**
     * Regexp for image type by extension.
     *
     * @static
     * @constant
     * @memberof TILES2D
     * @type {RegExp|string}
     * @example `image.png`
     */
    var URL_FILE_EXTENSION = /\.(\w{3,4})(?:$|\?|#)/i;

    /**
     * Regexp for data URI.
     * Based on: {@link https://github.com/ragingwind/data-uri-regex}
     *
     * @static
     * @constant
     * @name DATA_URI
     * @memberof TILES2D
     * @type {RegExp|string}
     * @example data:image/png;base64
     */
    var DATA_URI = /^\s*data:(?:([\w-]+)\/([\w+.-]+))?(?:;(charset=[\w-]+|base64))?,(.*)/i;

    /**
     * Regexp for SVG size.
     *
     * @static
     * @constant
     * @name SVG_SIZE
     * @memberof TILES2D
     * @type {RegExp|string}
     * @example &lt;svg width="100" height="100"&gt;&lt;/svg&gt;
     */
    var SVG_SIZE = /<svg[^>]*(?:\s(width|height)=('|")(\d*(?:\.\d+)?)(?:px)?('|"))[^>]*(?:\s(width|height)=('|")(\d*(?:\.\d+)?)(?:px)?('|"))[^>]*>/i; // eslint-disable-line max-len

    /**
     * @namespace TILES2D.settings
     */
    var SETTINGS = {
        /**
         * Default Environment force to use in environments
         *
         * @static
         * @memberof TILES2D.settings
         * @type {object}
         * @default Object {x: 0, y: 0}
         */
        ENVIRONMENT_MULTIPLY: {
            x: 1,
            y: 2.2
        },

        /**
         * The unit used for convert meters to pixels
         *
         * @static
         * @memberof TILES2D.settings
         * @type {number}
         * @default 70
         */
        PIXEL_METER_UNIT: 70,

        /**
         * The size of the tiles (used by all tiles in the TILES2D)
         *
         * @static
         * @memberof TILES2D.settings
         * @type {number}
         * @default 50
         */
        TILE_SIZE: 42,

        /**
         * The time step to calculate the physics
         *
         * @static
         * @memberof TILES2D.settings
         * @type {number}
         * @default 1 / 60
         */
        TIME_STEP: 1 / 30,

        /**
         * The bounds to compute interactions and physics
         *
         * @static
         * @memberof TILES2D.settings
         * @type {object}
         * @default {x: 0, y: 0 width: 100000, height: 100000}
         */
        BOUNDS: {
            left: -1000,
            right: 1000,
            top: -1000,
            botom: 1000
        },

        /**
         * The variable to set the state (Paused/Running) of the engine
         *
         * @static
         * @memberof TILES2D.settings
         * @type {boolean}
         * @default false
         */
        PAUSED: false
    };

    /**
      * The ScreenConsole object iis used to debug variables on screen
      *
      * @class
      * @memberof TILES2D
      * @author Fabio Toste
    */
    var screenLogElement = null;

    var ScreenConsole = function () {
        function ScreenConsole() {
            classCallCheck(this, ScreenConsole);
        }

        createClass(ScreenConsole, null, [{
            key: 'add',

            /**
             *
             * @param [left=0] x - The left position of the console screen
             * @param [top=0] y - The top position of the console screen
             * @param [width=10] width - The width of the console screen
             * @param [height=10] height - The height of the console screen
             *
             */
            value: function add() {
                var left = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
                var top = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
                var width = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 200;
                var height = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 150;
                var opacity = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 0.9;

                screenLogElement = document.createElement("DIV");
                screenLogElement.style.position = 'Absolute';
                screenLogElement.style.left = left + 'px';
                screenLogElement.style.top = top + 'px';
                screenLogElement.style.width = width + 'px';
                screenLogElement.style.height = height + 'px';
                screenLogElement.style.border = '1px solid #323232';
                screenLogElement.style.color = '#f2f2f2';
                screenLogElement.style.backgroundColor = '#282828';
                screenLogElement.style.padding = '10px';
                screenLogElement.style['z-index'] = 9999;

                screenLogElement.style.opacity = opacity;
                screenLogElement.style['-ms-filter'] = 'progid:DXImageTransform.Microsoft.Alpha(Opacity=' + opacity * 100 + ')';
                screenLogElement.style.filter = 'alpha(opacity=' + opacity * 100 + ')';
                screenLogElement.style['-moz-opacity'] = opacity;
                screenLogElement.style['-khtml-opacity'] = opacity;

                document.body.appendChild(screenLogElement);
            }
        }, {
            key: 'log',
            value: function log() {
                var text = '';

                for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                    args[_key] = arguments[_key];
                }

                var _iteratorNormalCompletion = true;
                var _didIteratorError = false;
                var _iteratorError = undefined;

                try {
                    for (var _iterator = args[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                        var arg = _step.value;

                        text += '<div style="width:100%">' + arg + '</div>';
                    }
                } catch (err) {
                    _didIteratorError = true;
                    _iteratorError = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion && _iterator.return) {
                            _iterator.return();
                        }
                    } finally {
                        if (_didIteratorError) {
                            throw _iteratorError;
                        }
                    }
                }

                screenLogElement.innerHTML = text;
            }
        }]);
        return ScreenConsole;
    }();

    /**
     * @namespace TILES2D.debug
     */

    /**
     * Rectangle object is an area defined by its position, as indicated by its top-left corner
     * point (x, y) and by its width and its height.
     *
     * @class
     * @memberof TILES2D
     */

    var Rectangle = function () {
        /**
         * @param {number} [x = 0] - The X coordinate of the upper-left corner of the rectangle
         * @param {number} [y = 0] - The Y coordinate of the upper-left corner of the rectangle
         * @param {number} [width = 0] - The overall width of this rectangle
         * @param {number} [height = 0] - The overall height of this rectangle
         */
        function Rectangle() {
            var x = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
            var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
            var width = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
            var height = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;
            classCallCheck(this, Rectangle);

            /**
             * @member {number}
             * @default 0
             */
            this.x = x;

            /**
             * @member {number}
             * @default 0
             */
            this.y = y;

            /**
             * @member {number}
             * @default 0
             */
            this.width = width;

            /**
             * @member {number}
             * @default 0
             */
            this.height = height;

            /**
             * The type of the object, mainly used to avoid `instanceof` checks
             *
             * @member {number}
             * @readOnly
             * @default TILES2D.SHAPES.RECT
             * @see TILES2D.SHAPES
             */
            this.type = SHAPES.RECT;

            /**
             * The bounds object to return in some loop cases
             *
             * @private
             * @member {object.JSON}
             * @readOnly
             * @default 0
             */
            this._bounds = {
                top: this.top,
                bottom: this.bottom,
                left: this.left,
                right: this.right,
                center: { x: this.x + this.width / 2, y: this.y - this.height / 2 }
            };

            /**
             * The intersection object to return in some loop cases
             *
             * @private
             * @member {object.JSON}
             * @readOnly
             * @default 0
             */
            this._intersection = {
                x: 0,
                y: 0,
                width: 0,
                height: 0,
                angle: 0,
                direction: { x: 0, y: 0 }
            };
        }

        /**
         * returns the center of the rectangle
         *
         * @member {number}
         */


        createClass(Rectangle, [{
            key: 'clone',


            /**
             * Creates a clone of this Rectangle
             *
             * @return {TILES2D.Rectangle} a copy of the rectangle
             */
            value: function clone() {
                return new Rectangle(this.x, this.y, this.width, this.height);
            }

            /**
             * Copies another rectangle to this one.
             *
             * @param {TILES2D.Rectangle} rectangle - The rectangle to copy.
             * @return {TILES2D.Rectangle} Returns itself.
             */

        }, {
            key: 'copy',
            value: function copy(rectangle) {
                this.x = rectangle.x;
                this.y = rectangle.y;
                this.width = rectangle.width;
                this.height = rectangle.height;

                return this;
            }

            /**
             * Checks whether the x and y coordinates given are contained within this Rectangle
             *
             * @param {number} x - The X coordinate of the point to test
             * @param {number} y - The Y coordinate of the point to test
             * @return {boolean} Whether the x/y coordinates are within this Rectangle
             */

        }, {
            key: 'contains',
            value: function contains(x, y) {
                if (this.width <= 0 || this.height <= 0) return false;

                if (x >= this.x && x < this.x + this.width) {
                    if (y >= this.y && y < this.y + this.height) return true;
                }

                return false;
            }

            /**
             * Pads the rectangle making it grow in all directions.
             *
             * @param {number} paddingX - The horizontal padding amount.
             * @param {number} paddingY - The vertical padding amount.
             */

        }, {
            key: 'pad',
            value: function pad(paddingX, paddingY) {
                paddingX = paddingX || 0;
                paddingY = paddingY || (paddingY !== 0 ? paddingX : 0);

                this.x -= paddingX;
                this.y -= paddingY;

                this.width += paddingX * 2;
                this.height += paddingY * 2;
            }

            /**
             * Fits this rectangle around the passed one.
             *
             * @param {TILES2D.Rectangle} rectangle - The rectangle to fit.
             */

        }, {
            key: 'fit',
            value: function fit(rectangle) {
                if (this.x < rectangle.x) {
                    this.width += this.x;
                    if (this.width < 0) this.width = 0;

                    this.x = rectangle.x;
                }

                if (this.y < rectangle.y) {
                    this.height += this.y;
                    if (this.height < 0) this.height = 0;

                    this.y = rectangle.y;
                }

                if (this.x + this.width > rectangle.x + rectangle.width) {
                    this.width = rectangle.width - this.x;
                    if (this.width < 0) this.width = 0;
                }

                if (this.y + this.height > rectangle.y + rectangle.height) {
                    this.height = rectangle.height - this.y;
                    if (this.height < 0) this.height = 0;
                }
            }

            /**
             * Enlarges this rectangle to include the passed rectangle.
             *
             * @param {TILES2D.Rectangle} rectangle - The rectangle to include.
             */

        }, {
            key: 'enlarge',
            value: function enlarge(rectangle) {
                var x1 = Math.min(this.x, rectangle.x);
                var x2 = Math.max(this.x + this.width, rectangle.x + rectangle.width);
                var y1 = Math.min(this.y, rectangle.y);
                var y2 = Math.max(this.y + this.height, rectangle.y + rectangle.height);

                this.x = x1;
                this.width = x2 - x1;
                this.y = y1;
                this.height = y2 - y1;
            }

            /**
             * Returns a angle between this rectangle and a given shape.
             *
             * @param {TILES2D.Rectangle|TILES2D.Circle} shape - The shape to compares.
             */

        }, {
            key: 'angleBetween',
            value: function angleBetween(shape) {
                return Math.atan2(this.center.y - shape.center.y, this.center.x - shape.center.x);
            }

            /**
             * Checks if a shape intersects with this rectangle.
             *
             * @param {TILES2D.Rectangle|TILES2D.Circle} shape - The shape to compares.
             * @param {TILES2D.AXIS} axis - Optional axis, if you wanna know the intersection in one axis only.
             */

        }, {
            key: 'intersects',
            value: function intersects(shape) {
                var axis = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";

                var intersects = false;

                if (axis == AXIS.X) intersects = this.left < shape.right && this.right > shape.left;else if (axis == AXIS.Y) intersects = this.top < shape.bottom && this.bottom > shape.top;else intersects = this.left < shape.right && this.right > shape.left && this.top < shape.bottom && this.bottom > shape.top;

                return intersects;
            }

            /**
             * Checks if a shape intersects with this rectangle.
             *
             * @param {TILES2D.Rectangle|TILES2D.Circle} shape - The shape to compares.
             */

        }, {
            key: 'intersection',
            value: function intersection(shape) {
                var returnIntersection = false;

                if (this.intersects(shape)) {
                    this._intersection.x = Math.max(this.left, shape.left);
                    this._intersection.y = Math.max(this.top, shape.top);
                    this._intersection.width = Math.max(0, Math.min(this.right, shape.right) - Math.max(this.left, shape.left));
                    this._intersection.height = Math.max(0, Math.min(this.bottom, shape.bottom) - Math.max(this.top, shape.top));

                    var dx = this.center.x - shape.center.x;
                    this._intersection.direction.x = dx > 0 ? 1 : -1;

                    var dy = this.center.y - shape.center.y;
                    this._intersection.direction.y = dy > 0 ? 1 : -1;

                    this._intersection.angle = Math.atan2(dy, dx);

                    returnIntersection = this._intersection;
                }

                return returnIntersection;
            }
        }, {
            key: 'center',
            get: function get$$1() {
                this._bounds.center.x = this.x + this.width / 2;
                this._bounds.center.y = this.y + this.height / 2;

                return this._bounds.center;
            }

            /**
             * returns the left edge of the rectangle
             *
             * @member {number}
             */

        }, {
            key: 'left',
            get: function get$$1() {
                return this.x;
            }

            /**
             * returns the right edge of the rectangle
             *
             * @member {number}
             */

        }, {
            key: 'right',
            get: function get$$1() {
                return this.x + this.width;
            }

            /**
             * returns the top edge of the rectangle
             *
             * @member {number}
             */

        }, {
            key: 'top',
            get: function get$$1() {
                return this.y;
            }

            /**
             * returns the bottom edge of the rectangle
             *
             * @member {number}
             */

        }, {
            key: 'bottom',
            get: function get$$1() {
                return this.y + this.height;
            }

            /**
             * returns the the bounds information about the rectangle
             *
             */

        }, {
            key: 'bounds',
            get: function get$$1() {
                this._bounds.top = this.top;
                this._bounds.bottom = this.bottom;
                this._bounds.left = this.left;
                this._bounds.right = this.right;
                this._bounds.center.x = this.x + this.width / 2;
                this._bounds.center.y = this.y + this.height / 2;

                return this._bounds;
            }

            /**
             * A constant zero rectangle.
             *
             * @static
             * @constant
             */

        }], [{
            key: 'zero',
            get: function get$$1() {
                return new Rectangle(0, 0, 0, 0);
            }
        }]);
        return Rectangle;
    }();

    /**
     * Circle object is an area defined by its position, as indicated by its top-left corner
     *
     * @class
     * @memberof TILES2D
     */

    var Circle = function Circle() {
        var x = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
        var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
        var radius = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
        classCallCheck(this, Circle);
    };

    /**
      * The DisplayObject is the base class of any graphic instance in TILES2D
      *
      * @class
      * @memberof TILES2D
      * @author Fabio Toste
    */
    var DisplayObject = function () {
        function DisplayObject() {
            classCallCheck(this, DisplayObject);

            /**
             * The id of the body object, can be used for identify the instance or for indexing
             *
             * @private
             * @member {number}
             */
            this._id = -1;

            /**
             * The name of the body object, can be used for identify the instance
             *
             * @member {string}
             */
            this.name = "";

            /**
             * The type of the body object, can be used for identify the instance
             *
             * @member {string}
             */
            this.type = "";

            this._parent = null;
            this._x = 0;
            this._y = 0;
            this._width = 0;
            this._height = 0;
            this._rotation = 0;
            this._rotationX = 0;
            this._rotationY = 0;
            this._scale = 0;
            this._scaleX = 0;
            this._scaleY = 0;
            this._pivotX = 0.5;
            this._pivotY = 0.5;
            this._color = '';
            this._visible = true;
            this._alpha = 1;
            this._parent = null;
            this._mouseX = 0;
            this._mouseY = 0;
            this._worldCenter = { x: 0, y: 0 };
            this._center = { x: 0, y: 0 };
        }

        createClass(DisplayObject, [{
            key: "draw",
            value: function draw() {
                var deltatime = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
            }
        }, {
            key: "x",
            set: function set$$1(value) {
                this._x = value;
            },
            get: function get$$1() {
                return this._x;
            }
        }, {
            key: "y",
            set: function set$$1(value) {
                this._y = value;
            },
            get: function get$$1() {
                return this._y;
            }
        }, {
            key: "width",
            set: function set$$1(value) {
                this._width = value;
            },
            get: function get$$1() {
                return this._width;
            }
        }, {
            key: "height",
            set: function set$$1(value) {
                this._height = value;
            },
            get: function get$$1() {
                return this._height;
            }
        }, {
            key: "color",
            set: function set$$1(value) {
                this._color = value;
            },
            get: function get$$1() {
                return this._color;
            }
        }, {
            key: "alpha",
            set: function set$$1(value) {
                this._alpha = value;
            },
            get: function get$$1() {
                return this._alpha;
            }
        }, {
            key: "center",
            get: function get$$1() {
                this._center.x = this.x + this.width / 2;
                this._center.y = this.y + this.height / 2;

                return this._center;
            }
        }, {
            key: "worldCenter",
            get: function get$$1() {
                return this._worldCenter;
            }
        }, {
            key: "localPosition",
            get: function get$$1() {
                return { x: this.x, y: this.y };
            }
        }, {
            key: "globalPosition",
            get: function get$$1() {
                if (this._parent != null) return { x: this._parent.x + this.x, y: this._parent.y + this.y };else this.localPosition();
            }
        }]);
        return DisplayObject;
    }();

    /**
      * The Sprite to use with html div elements in dom TILES2D
      *
      * @class
      * @memberof TILES2D
      * @author Fabio Toste
    */

    var DomSprite = function (_DisplayObject) {
        inherits(DomSprite, _DisplayObject);

        /**
         *
         * @param [x=0] x - The x position of the sprite
         * @param [y=0] y - The y position of the sprite
         * @param [width=10] width - The width of the sprite
         * @param [height=10] height - The height of the sprite
         * @param [color='#000'] color - The color of the sprite
         *
         */
        function DomSprite() {
            var x = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
            var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
            var width = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 10;
            var height = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 10;
            var color = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : '#000';
            classCallCheck(this, DomSprite);

            var _this = possibleConstructorReturn(this, (DomSprite.__proto__ || Object.getPrototypeOf(DomSprite)).call(this));

            _this.domElement = document.createElement("DIV");
            _this.domElement.style.position = 'Absolute';

            var transformOrigin = '50% 50%';
            _this.domElement.style.webkitTransformOrigin = transformOrigin;
            _this.domElement.style.MozTransformOrigin = transformOrigin;
            _this.domElement.style.msTransformOrigin = transformOrigin;
            _this.domElement.style.OTransformOrigin = transformOrigin;
            _this.domElement.style.transformOrigin = transformOrigin;

            _this.x = x;
            _this.y = y;

            _this.width = width;
            _this.height = height;
            _this.color = color;
            _this._initialColor = color;
            _this.alpha = 1;

            if (window._tiles2dcontainer) window._tiles2dcontainer.appendChild(_this.domElement);
            return _this;
        }

        createClass(DomSprite, [{
            key: 'addChild',
            value: function addChild(domElement) {
                this.domElement.appendChild(domElement);
            }
        }, {
            key: 'draw',
            value: function draw() {
                var deltatime = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
            }
        }, {
            key: 'x',
            set: function set$$1(value) {
                set(DomSprite.prototype.__proto__ || Object.getPrototypeOf(DomSprite.prototype), 'x', value, this);

                var transform = 'translate3d(' + value + 'px, ' + get(DomSprite.prototype.__proto__ || Object.getPrototypeOf(DomSprite.prototype), 'y', this) + 'px, 0px)';
                if (this.domElement) {
                    this.domElement.style.webkitTransformOrigin = transform;
                    this.domElement.style.MozTransform = transform;
                    this.domElement.style.msTransform = transform;
                    this.domElement.style.OTransform = transform;
                    this.domElement.style.transform = transform;
                }
            },
            get: function get$$1() {
                return get(DomSprite.prototype.__proto__ || Object.getPrototypeOf(DomSprite.prototype), 'x', this);
            }
        }, {
            key: 'y',
            set: function set$$1(value) {
                set(DomSprite.prototype.__proto__ || Object.getPrototypeOf(DomSprite.prototype), 'y', value, this);

                var transform = 'translate3d(' + get(DomSprite.prototype.__proto__ || Object.getPrototypeOf(DomSprite.prototype), 'x', this) + 'px, ' + value + 'px, 0px)';
                if (this.domElement) {
                    this.domElement.style.webkitTransform = transform;
                    this.domElement.style.MozTransform = transform;
                    this.domElement.style.msTransform = transform;
                    this.domElement.style.OTransform = transform;
                    this.domElement.style.transform = transform;
                }
            },
            get: function get$$1() {
                return get(DomSprite.prototype.__proto__ || Object.getPrototypeOf(DomSprite.prototype), 'y', this);
            }
        }, {
            key: 'width',
            set: function set$$1(value) {
                set(DomSprite.prototype.__proto__ || Object.getPrototypeOf(DomSprite.prototype), 'width', value, this);

                if (this.domElement) this.domElement.style.width = value + 'px';
            },
            get: function get$$1() {
                return get(DomSprite.prototype.__proto__ || Object.getPrototypeOf(DomSprite.prototype), 'width', this);
            }
        }, {
            key: 'height',
            set: function set$$1(value) {
                set(DomSprite.prototype.__proto__ || Object.getPrototypeOf(DomSprite.prototype), 'height', value, this);

                if (this.domElement) this.domElement.style.height = value + 'px';
            },
            get: function get$$1() {
                return get(DomSprite.prototype.__proto__ || Object.getPrototypeOf(DomSprite.prototype), 'height', this);
            }
        }, {
            key: 'color',
            set: function set$$1(value) {
                set(DomSprite.prototype.__proto__ || Object.getPrototypeOf(DomSprite.prototype), 'color', value, this);

                if (this.domElement) this.domElement.style.backgroundColor = value;
            },
            get: function get$$1() {
                return get(DomSprite.prototype.__proto__ || Object.getPrototypeOf(DomSprite.prototype), 'color', this);
            }
        }, {
            key: 'alpha',
            set: function set$$1(value) {
                set(DomSprite.prototype.__proto__ || Object.getPrototypeOf(DomSprite.prototype), 'alpha', value, this);

                if (this.domElement) {
                    this.domElement.style.opacity = value;
                    this.domElement.style['-ms-filter'] = 'progid:DXImageTransform.Microsoft.Alpha(Opacity=' + value * 100 + ')';
                    this.domElement.style.filter = 'alpha(opacity=' + value * 100 + ')';
                    this.domElement.style['-moz-opacity'] = value;
                    this.domElement.style['-khtml-opacity'] = value;
                }
            },
            get: function get$$1() {
                return get(DomSprite.prototype.__proto__ || Object.getPrototypeOf(DomSprite.prototype), 'alpha', this);
            }
        }]);
        return DomSprite;
    }(DisplayObject);

    /**
      * The Body object is the base for all dynamics objects, including the player, npcs, and tiles
      *
      * @class
      * @memberof TILES2D
      * @author Fabio Toste
    */

    var Body = function () {
        /**
         *
         * @param {TILES2D.Sprite} sprite - The sprite to apply body transformations
         *
         */
        function Body() {
            var sprite = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
            var shape = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : new Rectangle();
            classCallCheck(this, Body);

            /**
             * The id of the body object, can be used for identify the instance or for indexing
             *
             * @private
             * @member {number}
             */
            this._id = -1;

            /**
             * The name of the body object, can be used for identify the instance
             *
             * @member {string}
             */
            this.name = "";

            /**
             * The type of the body object, can be used for identify the instance
             *
             * @member {string}
             */
            this.type = "";

            this.static = false;

            this.automaticPropertiesUpdate = false;

            /**
             * The variable to know if the tile is grabable or not
             *
             * @private
             * @member {boolean}
             */
            this.grabbable = false;

            /**
             * Sets the state of the body, used for skip some calculations if it'is "sleeping"
             *
             * @member {boolean}
             * @default false
             */
            this.sleeping = false;

            this.dragCoefficient = 1.0;

            //Calculated physics properties
            this._sprite = null;
            this._density = 1;
            this._volume = 1;
            this._area = { x: 0, y: 0 };
            this._mass = 70;
            this._size = {
                min: { left: 0, right: 0, top: 0, bottom: 0 },
                max: { left: 1, right: 1, top: 1, bottom: 1 },
                pixels: { width: 1, height: 1, depth: 1 },
                meters: { width: 1, height: 1, depth: 1 },
                initial: { width: 1, height: 1, depth: 1 }
            };
            this._frictionArea = { left: { top: 0, bottom: 0 }, right: { top: 0, bottom: 0 }, top: { left: 0, right: 0 }, bottom: { left: 0, right: 0 } };
            this._friction = { x: { '1': 0, '-1': 0 }, y: { '1': 0, '-1': 0 } };
            this._contactfriction = { x: { '1': 0, '-1': 0 }, y: { '1': 0, '-1': 0 } };

            /**
             * The bounciness of the body
             *
             * @private
             * @member {object}
             */
            this._bounciness = { x: { '1': 0, '-1': 0 }, y: { '1': 0, '-1': 0 } };

            //physics properties
            this.velocity = new Vector2(0, 0);
            this.acceleration = { x: 0, y: 0 };

            //variables for calculation
            this._environment = false;
            this._displacedVolume = 0;
            this._environmentForce = { x: 0, y: 0 };
            this._netForce = { x: 0, y: 0 };
            this._frictionalForce = { x: 0, y: 0 };
            this._dragForce = { x: 0, y: 0 };
            this._buoyantForce = { x: 0, y: 0 };
            this._movingForce = { x: 0, y: 0 };
            this._movingImpulse = { x: 0, y: 0 };
            this._direction = { x: 0, y: 0 };
            this._impulseDirection = { x: 0, y: 0 };
            this._restitution = { x: 0, y: 0 };

            /**
             * The array list of impulses to apply to this body
             *
             * @private
             * @member {array}
             */
            this._impulseList = [];

            /**
             * The array list of bodies in contact with this one
             *
             * @private
             * @member {array}
             */
            this._contactList = [];

            this.shape = shape;
            this.sprite = sprite;
        }

        createClass(Body, [{
            key: 'applyForce',
            value: function applyForce() {
                var axis = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
                var force = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

                if (force != 0 && (axis === AXIS.X || axis === AXIS.Y)) this._movingForce[axis] += force;

                return this;
            }
        }, {
            key: 'clearForces',
            value: function clearForces() {
                this._movingForce = { x: 0, y: 0 };
                return this;
            }
        }, {
            key: 'addImpulse',
            value: function addImpulse() {
                var axis = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
                var force = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
                var time = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0.1;
                var delay = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;

                if (axis === AXIS.X || axis === AXIS.Y) this._impulseList.push({ axis: axis, force: force, time: delay + time, delay: delay, _dt: 0 });

                return this;
            }
        }, {
            key: 'removeImpulses',
            value: function removeImpulses() {
                var axis = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";

                if (axis === AXIS.X || axis === AXIS.Y) {
                    this._movingImpulse[axis] = 0;

                    var i = void 0;
                    for (i = 0; i < this._impulseList.length; i++) {
                        if (this._impulseList[i].axis == axis) this._impulseList.splice(i, 1);
                    }
                }
                return this;
            }
        }, {
            key: 'applyImpulses',
            value: function applyImpulses() {
                var deltatime = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

                var i = void 0,
                    ilen = void 0;
                for (i = 0, ilen = this._impulseList.length; i < ilen; i++) {
                    this._impulseList[i]._dt += deltatime;
                    if (this._impulseList[i].force != 0 && this._impulseList[i]._dt >= this._impulseList[i].delay) this._movingImpulse[this._impulseList[i].axis] += this._impulseList[i].force;
                }

                return this;
            }
        }, {
            key: 'clearImpulses',
            value: function clearImpulses() {
                this._movingImpulse = { x: 0, y: 0 };

                var i = void 0;
                for (i = 0; i < this._impulseList.length; i++) {
                    if (this._impulseList[i]._dt >= this._impulseList[i].time) this._impulseList.splice(i, 1);
                }
                return this;
            }
        }, {
            key: 'clearContacts',
            value: function clearContacts() {
                this._impulseDirection.x = 0;
                this._impulseDirection.y = 0;
                this._restitution.x = 0;
                this._restitution.y = 0;
                this._contactfriction.x['-1'] = this._contactfriction.x['1'] = 0;
                this._contactfriction.y['-1'] = this._contactfriction.y['1'] = 0;
            }
        }, {
            key: 'beginUpdate',
            value: function beginUpdate() {
                var deltatime = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

                //Apply all the impulses
                this.applyImpulses(deltatime);
            }
        }, {
            key: 'update',
            value: function update() {
                var deltatime = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

                if (this._sprite) this._sprite.draw(deltatime);
            }
        }, {
            key: 'endUpdate',
            value: function endUpdate() {
                var deltatime = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

                //Clear forces
                this.clearForces();

                //Clear all finished impulses
                this.clearImpulses();
            }
        }, {
            key: 'x',
            set: function set$$1(value) {
                this._sprite.x = value;
            },
            get: function get$$1() {
                return this._sprite.x;
            }
        }, {
            key: 'y',
            set: function set$$1(value) {
                this._sprite.y = value;
            },
            get: function get$$1() {
                return this._sprite.y;
            }
        }, {
            key: 'width',
            set: function set$$1(value) {
                this._size.pixels.width = value;
                this._size.initial.width = value;
                this._size.meters.width = value / SETTINGS.PIXEL_METER_UNIT;
                this._area.y = this._size.meters.width * this._size.meters.depth;
                this._volume = this._size.meters.width * this._size.meters.height * this._size.meters.depth;

                this._sprite.width = value;
            },
            get: function get$$1() {
                return this._size.pixels.width;
            }
        }, {
            key: 'height',
            set: function set$$1(value) {
                this._size.pixels.height = value;
                this._size.initial.height = value;
                this._size.meters.height = value / SETTINGS.PIXEL_METER_UNIT;
                this._area.x = this._size.meters.height * this._size.meters.depth;
                this._volume = this._size.meters.width * this._size.meters.height * this._size.meters.depth;

                this._sprite.height = value;
            },
            get: function get$$1() {
                return this._size.pixels.height;
            }
        }, {
            key: 'depth',
            set: function set$$1(value) {
                this._size.pixels.depth = value;
                this._size.initial.depth = value;
                this._size.meters.depth = value / SETTINGS.PIXEL_METER_UNIT;
                this._area.x = this._size.meters.height * this._size.meters.depth;
                this._area.y = this._size.meters.width * this._size.meters.depth;
                this._volume = this._size.meters.width * this._size.meters.height * this._size.meters.depth;
            },
            get: function get$$1() {
                return this._size.pixels.depth;
            }
        }, {
            key: 'frictionArea',
            set: function set$$1(value) {
                if (typeof value == 'number') this._frictionArea = { left: { top: 0, bottom: value }, right: { top: 0, bottom: value }, top: { left: 0, right: value }, bottom: { left: 0, right: value } };else if ((typeof value === 'undefined' ? 'undefined' : _typeof(value)) == 'object') {
                    if (value.hasOwnProperty('left')) {
                        if (typeof value.left == 'number') {
                            this._frictionArea.left.top = value.left;
                            this._frictionArea.left.bottom = value.left;
                        } else if ((typeof value === 'undefined' ? 'undefined' : _typeof(value)) == 'object') this._frictionArea.left = value.left;
                    }

                    this._frictionArea = { x: { '1': value.left, '-1': value.right }, y: { '1': value.top, '-1': value.bottom } };
                } else this._frictionArea = this._frictionArea;
            },
            get: function get$$1() {
                return {
                    left: {
                        top: this.y + this.height * this._frictionArea.left.top,
                        bottom: this.y + this.height * this._frictionArea.left.bottom
                    },
                    right: {
                        top: this.y + this.height * this._frictionArea.right.top,
                        bottom: this.y + this.height * this._frictionArea.right.bottom
                    },
                    top: {
                        left: this.x + this.width * this._frictionArea.top.left,
                        right: this.x + this.width * this._frictionArea.top.right
                    },
                    bottom: {
                        left: this.x + this.width * this._frictionArea.bottom.left,
                        right: this.x + this.width * this._frictionArea.bottom.right
                    }
                };
            }
        }, {
            key: 'sprite',
            set: function set$$1(value) {
                this._sprite = value;

                this.width = this._sprite.width;
                this.height = this._sprite.height;
                this.depth = this._sprite.width;

                this.shape.x = this._sprite.x;
                this.shape.y = this._sprite.y;
                this.shape.width = this._sprite.width;
                this.shape.height = this._sprite.height;
            },
            get: function get$$1() {
                return this._sprite;
            }
        }, {
            key: 'friction',
            set: function set$$1(value) {
                if (typeof value == 'number') {
                    value = Math.min(Math.max(value, 0), 1);

                    this._friction.x['1'] = value;
                    this._friction.x['-1'] = value;
                    this._friction.y['1'] = value;
                    this._friction.y['-1'] = value;
                } else if ((typeof value === 'undefined' ? 'undefined' : _typeof(value)) == 'object') {
                    if (value.hasOwnProperty('left')) {
                        value.left = Math.min(Math.max(value.left, 0), 1);
                        this._friction.x['1'] = value.left;
                    }

                    if (value.hasOwnProperty('right')) {
                        value.right = Math.min(Math.max(value.right, 0), 1);
                        this._friction.x['-1'] = value.right;
                    }

                    if (value.hasOwnProperty('top')) {
                        value.top = Math.min(Math.max(value.top, 0), 1);
                        this._friction.y['1'] = value.top;
                    }

                    if (value.hasOwnProperty('bottom')) {
                        value.bottom = Math.min(Math.max(value.bottom, 0), 1);
                        this._friction.y['-1'] = value.bottom;
                    }
                }
            },
            get: function get$$1() {
                return {
                    left: this._friction.x['1'],
                    right: this._friction.x['-1'],
                    top: this._friction.y['1'],
                    bottom: this._friction.y['-1']
                };
            }
        }, {
            key: 'bounciness',
            set: function set$$1(value) {
                if (typeof value == 'number') {
                    value = Math.min(Math.max(value, 0), 1);

                    this._bounciness.x['1'] = value;
                    this._bounciness.x['-1'] = value;
                    this._bounciness.y['1'] = value;
                    this._bounciness.y['-1'] = value;
                } else if ((typeof value === 'undefined' ? 'undefined' : _typeof(value)) == 'object') {
                    if (value.hasOwnProperty('left')) {
                        value.left = Math.min(Math.max(value.left, 0), 1);
                        this._bounciness.x['1'] = value.left;
                    }

                    if (value.hasOwnProperty('right')) {
                        value.right = Math.min(Math.max(value.right, 0), 1);
                        this._bounciness.x['-1'] = value.right;
                    }

                    if (value.hasOwnProperty('top')) {
                        value.top = Math.min(Math.max(value.top, 0), 1);
                        this._bounciness.y['1'] = value.top;
                    }

                    if (value.hasOwnProperty('bottom')) {
                        value.bottom = Math.min(Math.max(value.bottom, 0), 1);
                        this._bounciness.y['-1'] = value.bottom;
                    }
                }
            },
            get: function get$$1() {
                return {
                    left: this._bounciness.x['1'],
                    right: this._bounciness.x['-1'],
                    top: this._bounciness.y['1'],
                    bottom: this._bounciness.y['-1']
                };
            }
        }, {
            key: 'mass',
            set: function set$$1(value) {
                this._mass = value;

                if (this.automaticPropertiesUpdate) this._density = this._mass / this._volume;
            },
            get: function get$$1() {
                return this._mass;
            }
        }, {
            key: 'volume',
            set: function set$$1(value) {
                this._size.meters.depth = value / (this._size.meters.width * this._size.meters.height);

                if (this.automaticPropertiesUpdate) this._density = this._mass / this._volume;
            },
            get: function get$$1() {
                return this._volume;
            }
        }, {
            key: 'density',
            set: function set$$1(value) {
                this._density = value;

                if (this.automaticPropertiesUpdate) this._mass = this._volume * this._density;
            },
            get: function get$$1() {
                return this._density;
            }
        }, {
            key: 'area',
            set: function set$$1(value) {
                if (typeof value == 'number') this._area = { x: value, y: value };else this._area = value;
            },
            get: function get$$1() {
                return this._area;
            }
        }]);
        return Body;
    }();

    /**
     * Constants for density of the materials
     *
     * @static
     * @constant
     * @name AXIS
     * @memberof TILES2D
     */
    var DRAG_COEFFICIENT = {
        laminar_flat_plate: 0.001,
        fast_aircraft: 0.021,
        average_aircraft: 0.027,
        slow_aircraft: 0.048,
        turbulent_flat_plate: 0.005,
        smooth_sphere: 0.1,
        fast_car: 0.18,
        average_car: 0.25,
        slow_car: 0.37,
        rocket: 0.75,
        human: 1.1,
        wire: 1.2,
        building: 2.0
    };

    /**
     * Constants for density of the materials
     *
     * @static
     * @constant
     * @name AXIS
     * @memberof TILES2D
     */
    var MATERIAL_DENSITY = {
        air: 1.2,
        aerographite: 0.2,
        metallic_microlattice: 0.9,
        aerogel: 1.0,
        styrofoam: 75,
        liquid_hydrogen: 70,
        cork: 240,
        lithium: 535,
        wood: 700,
        potassium: 860,
        sodium: 970,
        ice: 916.7,
        water: 1000,
        salt_water: 1030,
        human: 1080,
        plastics: 1175,
        tetrachloroethene: 1622,
        magnesium: 1740,
        beryllium: 1850,
        glycerol: 1261,
        silicon: 2330,
        aluminium: 2700,
        diiodomethane: 3325,
        diamond: 3500,
        titanium: 4540,
        selenium: 4800,
        vanadium: 6100,
        antimony: 6690,
        zinc: 7000,
        chromium: 7200,
        manganese: 7325,
        tin: 7310,
        iron: 7870,
        niobium: 8570,
        cadmium: 8650,
        cobalt: 8900,
        nickel: 8900,
        copper: 8940,
        bismuth: 9750,
        molybdenum: 10220,
        silver: 10500,
        lead: 11340,
        thorium: 11700,
        rhodium: 12410,
        mercury: 13546,
        tantalum: 16600,
        uranium: 18800,
        tungsten: 19300,
        gold: 19320,
        plutonium: 19840,
        platinum: 21450,
        iridium: 22420,
        osmium: 22570
    };

    /**
     * Constants for environment types
     *
     * @static
     * @constant
     * @name AXIS
     * @memberof TILES2D
     */
    var ENVIRONMENT_TYPE = {
        air: 0,
        water: 1,
        oil: 2
    };

    /**
      * The Environment object is used for set the enviroment of part or all the Word
      *
      * @class
      * @memberof TILES2D
      * @author Fabio Toste
    */

    var Environment = function () {
        /**
         *
         * @param {number} density - The density of the environment
         * @param {object} force - The x and y forces to apply in this environment
         *
         */
        function Environment() {
            var density = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
            var force = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : { x: 0, y: 0 };
            classCallCheck(this, Environment);

            /**
             * The id of the environment object, can be used for identify the instance or for indexing
             *
             * @private
             * @member {number}
             */
            this._id = 0;

            /**
             * The name of the body object, can be used for identify the instance
             *
             * @member {string}
             */
            this.name = "";

            /**
             * The type of the body object, can be used for identify the instance
             *
             * @member {string}
             */
            this.type = ENVIRONMENT_TYPE.air;

            this._force = { x: 0, y: 0 };

            this.density = density;
            this.force = force;
        }

        createClass(Environment, [{
            key: 'intersects',
            value: function intersects(rectangle) {}
        }, {
            key: 'isInside',
            value: function isInside() {}
        }, {
            key: 'update',
            value: function update() {
                var deltatime = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
            }
        }, {
            key: 'updateBodyInteration',
            value: function updateBodyInteration() {
                var body = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
                var deltatime = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
            }
        }, {
            key: 'force',
            set: function set$$1(value) {
                this._force = value;

                this._force.x *= SETTINGS.ENVIRONMENT_MULTIPLY.x;
                this._force.y *= SETTINGS.ENVIRONMENT_MULTIPLY.y;
            },
            get: function get$$1() {
                return this._force;
            }
        }]);
        return Environment;
    }();

    /**
      * The World object is the main object of TILES2D, is used to calculate all interactions and physics
      *
      * @class
      * @memberof TILES2D
      * @author Fabio Toste
    */

    var World = function () {
        /**
         *
         * @param {TILES2D.Environment} environment - The main environment of the world
         *
         */
        function World() {
            var environment = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : new Environment(MATERIAL_DENSITY.air, { x: 0, y: 9.81 });
            classCallCheck(this, World);

            this.mainEnvironment = environment;

            this.bodyList = [];
            this.bodyCount = 0;

            this.environmentList = [];
            this.environmentCount = 0;

            this.contactList = [];
            this.contactCount = 0;

            this.jointList = [];
            this.jointCount = 0;

            this.debug = true;

            this.tileList = [];

            this.contactTile = {
                X: { x: 0, y: 0 },
                Y: { x: 0, y: 0 }
            };
            this._limits = {
                x: { min: -150, max: 1900 },
                y: { min: -100, max: 1200 }
            };

            this._time = 0;
        }

        createClass(World, [{
            key: 'addEnvironment',
            value: function addEnvironment() {
                var environment = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

                if (!environment) return;

                environment._id = this.environmentCount;
                this.environmentCount = this.environmentList.push(environment);
            }
        }, {
            key: 'removeEnvironment',
            value: function removeEnvironment() {
                var environment = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

                if (!environment) return;

                var index = environment._id;
                if (index > -1 && index < this.environmentCount) {
                    environmentList.splice(index, 1);
                    this.environmentCount--;
                }
            }
        }, {
            key: 'addBody',
            value: function addBody() {
                var body = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

                if (!body) return;

                body._id = this.bodyCount;
                this.bodyCount = this.bodyList.push(body);
            }
        }, {
            key: 'removeBody',
            value: function removeBody() {
                var body = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

                if (!body) return;

                var index = body._id;
                if (index > -1 && index < this.bodyCount) {
                    this.bodyList.splice(index, 1);
                    this.bodyCount--;
                }
            }
        }, {
            key: 'setTileList',
            value: function setTileList() {
                var tilelist = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

                this.tileList = tilelist;
            }
        }, {
            key: 'beginUpdate',
            value: function beginUpdate() {
                var deltatime = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
            }
        }, {
            key: 'update',
            value: function update() {
                var deltatime = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

                var t = void 0;
                var body;
                var totalStep = Math.ceil(deltatime / SETTINGS.TIME_STEP);
                totalStep = totalStep < 1 ? 1 : totalStep;
                deltatime = deltatime > SETTINGS.TIME_STEP ? SETTINGS.TIME_STEP : deltatime;

                //debug tile clean color
                if (this.debug) {
                    for (var k in this.tileList) {
                        this.tileList[k].sprite.color = this.tileList[k].sprite._initialColor;
                    }
                }

                for (t = 0; t < totalStep; t++) {
                    var b = void 0,
                        e = void 0,
                        c = void 0,
                        o = void 0,
                        clen = void 0;

                    for (e = 0; e < this.environmentCount; e++) {
                        this.environmentList[e].update(deltatime);
                    } //Body movement and projection loop
                    for (b = 0; b < this.bodyCount; b++) {
                        body = this.bodyList[b];

                        //put old positions in the calculation variables
                        body.shape.x = body.x;
                        body.shape.y = body.y;

                        body._environment = this.mainEnvironment;
                        for (e = 0; e < this.environmentCount; e++) {
                            //to do, update body.environment;
                            this.environmentList[e].updateBodyInteration(body, deltatime);
                        }

                        //Do everything that is needed before the update
                        body.beginUpdate(deltatime);

                        //Projetcs the movement before calculations
                        this._calculateForces(body, AXIS.X, deltatime);
                        this._calculateForces(body, AXIS.Y, deltatime);

                        //Clear the contact variables
                        body.clearContacts();

                        //Validates all the collisions
                        this._keepInBounds(body, AXIS.X);
                        this._keepInBounds(body, AXIS.Y);
                    }

                    //Body collision loop
                    for (b = 0; b < this.bodyCount; b++) {
                        body = this.bodyList[b];

                        //loop through all other bodies
                        for (o = b + 1; o < this.bodyCount; o++) {
                            this._calculateBodyCollision(body, this.bodyList[o]);
                        }this._calculateTileCollision(body);

                        //Do the update of the body
                        body.update(deltatime);

                        //Do everything that is needed after the update
                        body.endUpdate(deltatime);

                        body.x = body.shape.x;
                        body.width = body.shape.width;

                        body.y = body.shape.y;
                        body.height = body.shape.height;
                    }

                    this._time += deltatime;
                }
            }
        }, {
            key: 'endUpdate',
            value: function endUpdate() {
                var deltatime = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
            }
        }, {
            key: '_calculateTileCollision',
            value: function _calculateTileCollision(b) {
                var x = void 0,
                    y = void 0,
                    p = void 0,
                    ip = void 0,
                    imax = void 0,
                    i = void 0;

                var dir = b._direction.x < 0;
                var minTileX = dir ? Math.floor((b.x + b.shape.width) / SETTINGS.TILE_SIZE) : Math.floor(b.shape.x / SETTINGS.TILE_SIZE);
                var maxTileX = dir ? Math.floor(b.shape.right / SETTINGS.TILE_SIZE) : Math.floor(b.x / SETTINGS.TILE_SIZE);
                var minTileY = Math.floor(b.y / SETTINGS.TILE_SIZE);
                var maxTileY = Math.ceil((b.y + b.shape.height) / SETTINGS.TILE_SIZE);
                imax = maxTileX - minTileX;
                var limit = null;
                p = dir ? 'left' : 'right';
                ip = dir ? 'right' : 'left';

                x = dir ? minTileX : maxTileX;
                for (i = 0; i <= imax; i++) {
                    for (y = minTileY; y < maxTileY; y++) {
                        var tile = this.tileList[x + '-' + y];
                        if (tile) {
                            if (this.debug) tile.sprite.color = "#0000FF";

                            b._contactfriction.x[b._direction.x] = tile._friction.x[-b._direction.x];
                            b._restitution.x = (b._bounciness.x[b._direction.x] + tile._bounciness.x[-b._direction.x]) / 2;
                            limit = tile.shape[p];
                            break;
                        }
                    }

                    if (limit) break;

                    x += dir ? 1 : -1;
                }

                if (limit != null) {
                    b._impulseDirection.x = b._direction.x;
                    b.shape.x = dir ? limit - b.shape.width : limit;
                    b.velocity.x *= -b._restitution.x;
                }

                dir = b._direction.y < 0;
                minTileX = Math.floor(b.x / SETTINGS.TILE_SIZE);
                maxTileX = Math.ceil((b.x + b.shape.width) / SETTINGS.TILE_SIZE);
                minTileY = dir ? Math.floor((b.y + b.shape.height) / SETTINGS.TILE_SIZE) : Math.floor(b.shape.y / SETTINGS.TILE_SIZE);
                maxTileY = dir ? Math.floor(b.shape.bottom / SETTINGS.TILE_SIZE) : Math.floor(b.y / SETTINGS.TILE_SIZE);
                imax = maxTileY - minTileY;
                p = dir ? 'top' : 'bottom';
                ip = dir ? 'bottom' : 'top';
                limit = null;

                y = dir ? minTileY : maxTileY;
                for (i = 0; i <= imax; i++) {
                    for (x = minTileX; x < maxTileX; x++) {
                        var _tile = this.tileList[x + '-' + y];
                        if (_tile) {
                            if (this.debug) _tile.sprite.color = "#FF0000";

                            b._contactfriction.y[b._direction.y] = _tile._friction.y[-b._direction.y];
                            b._restitution.y = (b._bounciness.y[b._direction.y] + _tile._bounciness.y[-b._direction.y]) / 2;
                            limit = _tile.shape[p];
                            break;
                        }
                    }

                    if (limit) break;

                    y += dir ? 1 : -1;
                }

                if (limit != null) {
                    b._impulseDirection.y = b._direction.y;
                    b.shape.y = dir ? limit - b.shape.height : limit;
                    b.velocity.y *= -b._restitution.y;
                }
            }
        }, {
            key: '_calculateBodyCollision',
            value: function _calculateBodyCollision(b1, b2) {
                var pi2 = Math.PI / 2;
                var b1_new_velocity = { x: 0, y: 0 },
                    b2_new_velocity = { x: 0, y: 0 };

                var intersectionData = b1.shape.intersection(b2.shape);

                if (intersectionData) {
                    b1_new_velocity.x = ((b1.mass - b2.mass) * b1.velocity.x + 2 * b2.mass * b2.velocity.x) / (b1.mass + b2.mass);
                    b2_new_velocity.x = (2 * b1.mass * b1.velocity.x + (b2.mass - b1.mass) * b2.velocity.x) / (b1.mass + b2.mass);

                    b1_new_velocity.y = ((b1.mass - b2.mass) * b1.velocity.y + 2 * b2.mass * b2.velocity.y) / (b1.mass + b2.mass);
                    b2_new_velocity.y = (2 * b1.mass * b1.velocity.y + (b2.mass - b1.mass) * b2.velocity.y) / (b1.mass + b2.mass);

                    b1._restitution.x = b2._restitution.x = (b1._bounciness.x[intersectionData.direction.x] + b2._bounciness.x[-intersectionData.direction.x]) / 2;
                    b1._restitution.y = b2._restitution.y = (b1._bounciness.y[intersectionData.direction.y] + b2._bounciness.y[-intersectionData.direction.y]) / 2;

                    b1.velocity.x = b1_new_velocity.x;
                    b2.velocity.x = b2_new_velocity.x;

                    b1.velocity.y = b1_new_velocity.y;
                    b2.velocity.y = b2_new_velocity.y;

                    if (b1.velocity.x > 0 && b1_new_velocity.x < 0 || b1.velocity.x < 0 && b1_new_velocity.x > 0) b1.velocity.x *= b1._restitution.x;

                    if (b2.velocity.x > 0 && b2_new_velocity.x < 0 || b2.velocity.x < 0 && b2_new_velocity.x > 0) b2.velocity.x *= b2._restitution.x;

                    if (b1.velocity.y > 0 && b1_new_velocity.y < 0 || b1.velocity.y < 0 && b1_new_velocity.y > 0) b1.velocity.y *= b1._restitution.y;

                    if (b2.velocity.y > 0 && b2_new_velocity.y < 0 || b2.velocity.y < 0 && b2_new_velocity.y > 0) b2.velocity.y *= b2._restitution.x;

                    if (intersectionData.height > intersectionData.width) {
                        b1._impulseDirection.x = intersectionData.direction.x;
                        b2._impulseDirection.x = -intersectionData.direction.x;
                        b1.shape.x += intersectionData.width * intersectionData.direction.x;
                    }

                    if (intersectionData.width > intersectionData.height) {
                        b1._impulseDirection.y = intersectionData.direction.y;
                        b2._impulseDirection.y = -intersectionData.direction.y;
                        b1.shape.y += intersectionData.height * intersectionData.direction.y;
                    }
                }
            }
        }, {
            key: '_calculateForces',
            value: function _calculateForces(b, a) {
                var deltatime = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

                var vdir = b.velocity[a] > 0 ? -1 : b.velocity[a] < 0 ? 1 : 0;
                var ia = a == AXIS.X ? AXIS.Y : AXIS.X;

                b._frictionalForce[a] = 0;
                var friction_coefficient = 0;
                if (b._impulseDirection[ia] != 0) {
                    friction_coefficient = b._contactfriction[ia]['-1'] * b._friction[ia]['-1'] + b._contactfriction[ia]['1'] * b._friction[ia]['1'];
                    b._frictionalForce[a] = friction_coefficient * b._netForce[ia] * -b.velocity[a] * -b._impulseDirection[ia];
                }

                b._environmentForce[a] = b.mass * b._environment.force[a];
                b._dragForce[a] = b._environment.density * b.dragCoefficient * b.area[a] / 2 * Math.pow(b.velocity[a], 2) * vdir;
                b._buoyantForce[a] = b._displacedVolume * b._environment.density * -b._environment.force[a];
                b._netForce[a] = b._movingForce[a] + b._movingImpulse[a] + b._environmentForce[a] + b._dragForce[a] + b._frictionalForce[a] + b._buoyantForce[a];

                b.acceleration[a] = b._netForce[a] / b.mass;
                b.velocity[a] += deltatime * b.acceleration[a];
                b.shape[a] += deltatime * b.velocity[a] * SETTINGS.PIXEL_METER_UNIT;

                b._direction[a] = b.velocity[a] > 0 ? -1 : b.velocity[a] < 0 ? 1 : 0;
            }
        }, {
            key: '_keepInBounds',
            value: function _keepInBounds(b, a) {
                if (b.shape[a] <= this._limits[a].min) {
                    b.shape[a] = this._limits[a].min;
                    b.velocity[a] = 0;
                }

                if (b.shape[a] >= this._limits[a].max) {
                    b.shape[a] = this._limits[a].max;
                    b.velocity[a] = 0;
                }
            }
        }]);
        return World;
    }();

    /**
      * The Tile object is the basic object for build a scene, is a kind of dynamic body, but much more simple
      *
      * @class
      * @memberof TILES2D
      * @author Fabio Toste
    */

    var Tile = function (_Body) {
        inherits(Tile, _Body);

        /**
         * @param {TILES2D.Sprite} sprite - The sprite to apply body transformations
         *
         */
        function Tile(sprite) {
            classCallCheck(this, Tile);

            /**
             * The variable to know if the tile can be passed through
             *
             * @private
             * @member {object}
             */
            var _this = possibleConstructorReturn(this, (Tile.__proto__ || Object.getPrototypeOf(Tile)).call(this, sprite));

            _this.passThrough = {
                top: false,
                bottom: false,
                left: false,
                right: false
            };

            _this.mass = 0;
            _this.sleeping = true;
            return _this;
        }

        return Tile;
    }(Body);

    /**
      * The Player class can be used for a playable character
      *
      * @class
      * @memberof TILES2D
      * @author Fabio Toste
    */

    var Player = function (_Body) {
        inherits(Player, _Body);

        function Player(sprite) {
            classCallCheck(this, Player);

            var _this = possibleConstructorReturn(this, (Player.__proto__ || Object.getPrototypeOf(Player)).call(this, sprite));

            _this.crouched = false;
            _this.move = { x: false, y: false };
            _this.run = false;
            _this.onEnvironment = ENVIRONMENT_TYPE.air;

            _this.crouchScale = 0.6;
            _this.walkForce = 1200;
            _this.jumpImpulse = 8000;

            _this.runMultiply = 2;
            _this.runJumpMultiply = 1;
            _this.wallJumpImpulse = 120;
            _this.forceDirection = { x: 0, y: 0 };

            _this.dragCoefficient = DRAG_COEFFICIENT.human;
            _this.mass = 80;
            _this.friction = 0.5;
            _this.bounciness = 0;
            return _this;
        }

        createClass(Player, [{
            key: 'walkMove',
            value: function walkMove(value) {
                this.move.x = value == 0 ? false : true;
                this.forceDirection.x = value;
            }
        }, {
            key: 'walkLeft',
            value: function walkLeft(value) {
                this.move.x = true;
                this.forceDirection.x = !isNaN(value) ? Math.abs(value) * -1 : -1;
            }
        }, {
            key: 'walkRight',
            value: function walkRight(value) {
                this.move.x = true;
                this.forceDirection.x = !isNaN(value) ? value : 1;
            }
        }, {
            key: 'stop',
            value: function stop() {
                this.move.x = false;
                this.forceDirection.x = 0;
            }
        }, {
            key: 'walkUp',
            value: function walkUp(value) {
                this.move.y = true;
                this.forceDirection.y = !isNaN(value) ? value * -1 : -1;
            }
        }, {
            key: 'walkDown',
            value: function walkDown(value) {
                this.move.y = true;
                this.forceDirection.y = !isNaN(value) ? value : 1;
            }
        }, {
            key: 'stopy',
            value: function stopy() {
                this.move.y = false;
                this.forceDirection.y = 0;
            }
        }, {
            key: 'jump',
            value: function jump() {
                switch (this.onEnvironment) {
                    case ENVIRONMENT_TYPE.air:
                        if (this._impulseDirection.y != 0) this.addImpulse(AXIS.Y, this.jumpImpulse * this._impulseDirection.y, 0.1);
                        break;

                    case ENVIRONMENT_TYPE.water:
                        this.applyImpulse(AXIS.Y, this.jumpImpulse * -1, 0.05);
                        break;
                }
            }
        }, {
            key: 'stopJump',
            value: function stopJump() {
                this.removeImpulses(AXIS.Y);
            }
        }, {
            key: 'crouch',
            value: function crouch() {
                this.crouched = true;
            }
        }, {
            key: 'standUp',
            value: function standUp() {
                this.crouched = false;
            }
        }, {
            key: 'startRun',
            value: function startRun() {
                this.run = true;
            }
        }, {
            key: 'stopRun',
            value: function stopRun() {
                this.run = false;
            }
        }, {
            key: 'beginUpdate',
            value: function beginUpdate(deltatime) {
                var forceMultiply = this.run ? this.runMultiply : 1;

                if (this.move.x) this.applyForce(AXIS.X, this.walkForce * forceMultiply * this.forceDirection.x);

                if (this.move.y) this.applyForce(AXIS.Y, this.walkForce * this.forceDirection.y);

                get(Player.prototype.__proto__ || Object.getPrototypeOf(Player.prototype), 'beginUpdate', this).call(this, deltatime);
            }
        }, {
            key: 'update',
            value: function update(deltatime) {
                get(Player.prototype.__proto__ || Object.getPrototypeOf(Player.prototype), 'update', this).call(this, deltatime);
            }
        }, {
            key: 'endUpdate',
            value: function endUpdate(deltatime) {
                get(Player.prototype.__proto__ || Object.getPrototypeOf(Player.prototype), 'endUpdate', this).call(this, deltatime);

                /*if (this.environment && this.environment.density == MaterialDensity.water)
                    this.onWater = true;
                else
                    this.onWater = false;*/

                //this.sprite.scaleY = (this.crouched == true) ? -this.crouchScale : (this.canIncreaseHeight == false && this.hitbox.scaleY == -this.crouchScale) ? -this.crouchScale : -1;
            }
        }]);
        return Player;
    }(Body);

    /**
      * The TileLayer is the layer object to create level from tiled
      *
      * @class
      * @memberof TILES2D
      * @author Fabio Toste
    */

    var TileLayer = function () {
        /**
         * @param {object.JSON} data - The tile data object with the level tile infomation
         *
         */
        function TileLayer() {
            var tileData = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
            classCallCheck(this, TileLayer);

            this.tileList = [];

            if (tileData) this.create(tileData);
        }

        createClass(TileLayer, [{
            key: 'create',
            value: function create(tileData) {
                for (var i = 0, len = tileData.tiles.length; i < len; i++) {
                    var t = tileData.tiles[i];

                    var color = t.friction == 1 ? "#c2c2c2" : "#d2d2d2";
                    color = t.friction == 0.1 ? "#dedaff" : color;

                    //think about other type of sprite
                    var sprite = new DomSprite(t.x * SETTINGS.TILE_SIZE, t.y * SETTINGS.TILE_SIZE, SETTINGS.TILE_SIZE, SETTINGS.TILE_SIZE, color);

                    var tile = new Tile(sprite);
                    tile.friction = t.friction;
                    tile.bounciness = t.bounciness;

                    this.tileList[t.name] = tile;
                }
            }
        }]);
        return TileLayer;
    }();

    /**
     * A Loader util class with a some math functions
     *
     * @class
     * @memberof TILES2D
     */
    var LoaderUtil = function () {
        function LoaderUtil() {
            classCallCheck(this, LoaderUtil);
        }

        createClass(LoaderUtil, null, [{
            key: 'loadJSON',
            value: function loadJSON(url, type, callback) {
                var xhr = new XMLHttpRequest();
                xhr.open('GET', url, true);

                if (type == 'json') xhr.responseType = 'json';

                if (xhr.readyState) {
                    xhr.onreadystatechange = function () {
                        if (xhr.readyState == 4) {
                            if (xhr.status == 200) callback(xhr.response);else callback(false);
                        }
                    };
                } else {
                    xhr.onload = function () {
                        if (xhr.status == 200) callback(script);else callback(false);
                    };
                }

                xhr.send();
            }
        }, {
            key: 'loadImage',
            value: function loadImage(url, callback) {
                var image = document.createElementNS('http://www.w3.org/1999/xhtml', 'img');

                image.addEventListener('load', function () {
                    callback(this);
                }, false);

                image.addEventListener('error', function (e) {
                    callback(false);
                }, false);

                image.src = url;
            }
        }]);
        return LoaderUtil;
    }();

    /**
      * The TiledLoader is used to load json and js files from tiled app
      *
      * @class
      * @memberof TILES2D
      * @author Fabio Toste
    */

    var TiledLoader = function () {
        function TiledLoader() {
            classCallCheck(this, TiledLoader);
        }

        createClass(TiledLoader, null, [{
            key: 'load',

            /**
             * @param {TILES2D.Sprite} url - The url path to the json file
             *
             */
            value: function load(datafile, imagefile, callback) {
                var datamatch = /\.(jso?n?)[?]?/ig.exec(datafile);
                if (datamatch != null && datamatch.length > 1) {
                    LoaderUtil.loadJSON(datafile, datamatch[1], function (dataResponse) {
                        dataResponse = TiledLoader.parseTiledData(dataResponse);

                        var imagemtch = /\.(gif|jpe?g|tif?f|png)[?]?/ig.exec(imagefile);
                        if (imagefile != null && imagefile.length > 1) {
                            LoaderUtil.loadImage(imagefile, function (imgResponse) {
                                dataResponse.image.src = imgResponse.src;
                                dataResponse.image.width = imgResponse.width;
                                dataResponse.image.height = imgResponse.height;

                                callback(dataResponse);
                            });
                        } else callback(dataResponse);
                    });
                } else callback(false);
            }
        }, {
            key: 'loadData',
            value: function loadData(datafile, callback) {
                var datamatch = /\.(jso?n?)[?]?/ig.exec(datafile);
                if (datamatch != null && datamatch.length > 1) {
                    LoaderUtil.loadJSON(datafile, datamatch[1], function (dataResponse) {
                        dataResponse = TiledLoader.parseTiledData(dataResponse);
                        callback(dataResponse);
                    });
                } else callback(false);
            }
        }, {
            key: 'parseTiledData',
            value: function parseTiledData(data) {
                var tileset = data.tilesets[0];
                var columns = tileset.columns;
                var tileprops = tileset.tileproperties ? tileset.tileproperties : {};
                var responseData = {
                    image: {
                        src: tileset.image,
                        width: parseInt(tileset.imagewidth),
                        height: parseInt(tileset.imageheight),
                        tile_width: parseInt(tileset.tilewidth),
                        tile_height: parseInt(tileset.tileheight)
                    },
                    tiles: []
                };

                var layer = data.layers[0];
                var w = data.width;
                var h = data.height;
                var idx = 0;

                for (var i = 0, len = layer.data.length; i < len; i++) {
                    var tile = layer.data[i];
                    if (tile != 0) {
                        var y = Math.floor(i / w);
                        var x = i % w;
                        var friction = tileprops[tile] && tileprops[tile].hasOwnProperty('friction') ? tileprops[tile].friction : 1;
                        var bounciness = tileprops[tile] && tileprops[tile].hasOwnProperty('bounciness') ? tileprops[tile].bounciness : 0;
                        var imageY = Math.floor((tile - 1) / columns);
                        var imageX = (tile - 1) % columns;

                        responseData.tiles[idx] = {
                            name: x + "-" + y,
                            x: x,
                            y: y,
                            image: {
                                x: imageX,
                                y: imageY
                            },
                            friction: parseFloat(friction),
                            bounciness: parseFloat(bounciness)
                        };

                        idx++;
                    }
                }

                return responseData;
            }
        }]);
        return TiledLoader;
    }();

    /**
     * @namespace TILES2D.core
     */

    //exports geometries

    /**
     * @author Fabio Toste
     */
    window._vendors = ['ms', 'moz', 'webkit', 'o'];
    for (var x$1 = 0; x$1 < window._vendors.length && !window.requestAnimationFrame; ++x$1) {
        window.requestAnimationFrame = window[window._vendors[x$1] + 'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[window._vendors[x$1] + 'CancelAnimationFrame'] || window[window._vendors[x$1] + 'CancelRequestAnimationFrame'];
    }

    window._tiles2dcontainer = null;
    var _requestAnimation = null;
    var _world = null;

    function create() {
        var container = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
        var world = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

        window._tiles2dcontainer = container;
        _world = world;

        console.log("tiles2D created");

        resume();
    }

    function resume() {
        if (_requestAnimation == null) {
            update();
        }
    }

    function stop() {
        if (_requestAnimation != null) {
            window.cancelAnimationFrame(_requestAnimation);
            _requestAnimation = null;
        }
    }

    function setWorld() {
        var world = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

        _world = world;
    }

    function next() {
        var deltatime = 0.016666;
        _world.update(deltatime);
    }

    function update() {
        var deltatime = 0.016666;

        InputManager.update();
        _world.update(deltatime);

        _requestAnimation = window.requestAnimationFrame(update);
    }

    exports.InputManager = InputManager;
    exports.create = create;
    exports.setWorld = setWorld;
    exports.resume = resume;
    exports.stop = stop;
    exports.update = update;
    exports.next = next;
    exports.VERSION = VERSION;
    exports.AXIS = AXIS;
    exports.SHAPES = SHAPES;
    exports.URL_FILE_EXTENSION = URL_FILE_EXTENSION;
    exports.DATA_URI = DATA_URI;
    exports.SVG_SIZE = SVG_SIZE;
    exports.ScreenConsole = ScreenConsole;
    exports.Rectangle = Rectangle;
    exports.Circle = Circle;
    exports.DomSprite = DomSprite;
    exports.Body = Body;
    exports.World = World;
    exports.Environment = Environment;
    exports.Tile = Tile;
    exports.Player = Player;
    exports.TileLayer = TileLayer;
    exports.TiledLoader = TiledLoader;
    exports.DRAG_COEFFICIENT = DRAG_COEFFICIENT;
    exports.MATERIAL_DENSITY = MATERIAL_DENSITY;
    exports.ENVIRONMENT_TYPE = ENVIRONMENT_TYPE;
    exports.KEYBOARD = KEYBOARD;
    exports.GAMEPAD = GAMEPAD;
    exports.GAMEPADID = GAMEPADID;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
