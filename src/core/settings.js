/**
 * @namespace NGINT.settings
 */
export default
{
    /**
     * Gravity tunning for better physics
     *
     * @static
     * @memberof NGINT.settings
     * @type {NGINT.Vector2}
     * @default Vector2(1, 2.2)
     */
    GRAVITY_TUNNING:
    {
        x: 1,
        y: 2.2
    },

    /**
     * Default Gravity to use in environments
     *
     * @static
     * @memberof NGINT.settings
     * @type {object}
     * @default Vector2(0, 9.81)
     */
    GRAVITY:
    {
        x: 0 * GRAVITY_TUNNING.x,
        y: 9.81 * GRAVITY_TUNNING.y
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
    TILE_SIZE: 50,

    /**
     * The time step to calculate the physics
     *
     * @static
     * @memberof NGINT.settings
     * @type {number}
     * @default 1 / 60
     */
    TIME_STEP: 1 / 60,

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
        minX: -1000,
        maxX: 1000,
        minY: -1000,
        maxY: 1000
    },

    /**
     * The variable to set the state (Paused/Running) of the engine
     *
     * @static
     * @memberof NGINT.settings
     * @type {boolean}
     * @default false
     */
    PAUSED = false;
};
