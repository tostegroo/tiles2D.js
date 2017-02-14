import Body from './Body';

/**
  * The Tile object is the basic object for build a scene, is a kind of dynamic body, but much more simple
  *
  * @class
  * @memberof NGINT
  * @author Fabio Toste
*/
export default class Tile extends Body
{
    /**
     * @param {NGINT.Sprite} sprite - The sprite to apply body transformations
     *
     */
    constructor(sprite)
    {
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

        this.resistanceMultiply = {x:0, y:0};
        this.resistanceDirection = {x:0, y:0};
        this.environmentForceDirection = {x:0, y:0};
        this.mass = 0;
        this.sleeping = true;

        this.sprite = sprite;
        updateBounds();
    }
}
