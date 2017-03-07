import SETTINGS from '../settings';
import { ENVIRONMENT_TYPE } from './dynamicConstants';
/**
  * The Environment object is used for set the enviroment of part or all the Word
  *
  * @class
  * @memberof TILES2D
  * @author Fabio Toste
*/
export default class Environment
{
    /**
     *
     * @param {number} density - The density of the environment
     * @param {object} force - The x and y forces to apply in this environment
     *
     */
    constructor(density = 1, force = {x:0, y:0})
    {
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

        this._force = {x:0, y:0};

        this.density = density;
		this.force = force;
    }

    set force(value)
    {
        this._force = value;

        this._force.x *= SETTINGS.ENVIRONMENT_MULTIPLY.x;
        this._force.y *= SETTINGS.ENVIRONMENT_MULTIPLY.y;
    }

    get force()
    {
        return this._force;
    }

    intersects(rectangle)
    {

    }

    isInside()
    {

    }

    update(deltatime = 0){}
    updateBodyInteration(body = false, deltatime = 0){}
}
