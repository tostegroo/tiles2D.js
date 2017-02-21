/**
 * @namespace NGINT.settings
 */
export default
{
    /**
     * Default Environment force to use in environments
     *
     * @static
     * @memberof NGINT.settings
     * @type {object}
     * @default Object {x: 0, y: 0}
     */
    ENVIRONMENT_MULTIPLY:
    {
        x: 1,
        y: 2.2
    },

    /**
     * The unit used for convert meters to pixels
     *
     * @static
     * @memberof NGINT.settings
     * @type {number}
     * @default 70
     */
    PIXEL_METER_UNIT: 70,

    /**
     * The size of the tiles (used by all tiles in the NGINT)
     *
     * @static
     * @memberof NGINT.settings
     * @type {number}
     * @default 50
     */
    TILE_SIZE: 32,

    /**
     * The time step to calculate the physics
     *
     * @static
     * @memberof NGINT.settings
     * @type {number}
     * @default 1 / 60
     */
    TIME_STEP: 1 / 30,

    /**
     * The bounds to compute interactions and physics
     *
     * @static
     * @memberof NGINT.settings
     * @type {object}
     * @default {x: 0, y: 0 width: 100000, height: 100000}
     */
    BOUNDS:
    {
        left: -1000,
        right: 1000,
        top: -1000,
        botom: 1000
    },

    /**
     * The variable to set the state (Paused/Running) of the engine
     *
     * @static
     * @memberof NGINT.settings
     * @type {boolean}
     * @default false
     */
    PAUSED: false
}
