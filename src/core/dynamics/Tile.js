/**
  * The Tile object is the basic object for build a scene, is a kind of dynamic body, but much more simple
  *
  * @class
  * @memberof NGINT
  * @author Fabio Toste
*/
export default class Tile
{
    /**
     */
    constructor(sprite)
    {
        /**
         * The id of the tile object, can be used for identify the instance
         *
         * @public
         * @member {number}
         */
        this.id = 0;

        /**
         * The name of the tile object, can be used for identify the instance
         *
         * @public
         * @member {string}
         */
        this.name = "";

        /**
         * The type of the tile object, can be used for identify the instance
         *
         * @public
         * @member {string}
         */
        this.type = "";

        /**
         * The bounciness of the tile in both x and y axis
         *
         * @private
         * @member {object}
         */
        this.bounciness = {x:0, y:0};

        /**
         * The friction of the tile in both x and y axis
         *
         * @private
         * @member {object}
         */
		this.friction = {x:20, y:20};

        /**
         * The variable to know if the tile is grabable or not
         *
         * @private
         * @member {boolean}
         */
        this.grabbable = false;

        /**
         * The variable to know if the tile can be passed through
         *
         * @private
         * @member {object}
         */
        this.passThrough =
        {
            top: false,
            bottom: false,
            left: false,
            right: false
        }

        /**
         * The Sprite used to display the tile on screen
         *
         * @private
         * @member {NGINT.Sprite}
         */
        this._sprite = null;

        this.sprite = sprite;
    }

    set sprite(value)
    {
        this._sprite = value;
    }

    get sprite()
    {
        return this._sprite;
    }


}
