import SETTINGS from '../settings';
import { ENVIRONMENT_TYPE } from './dynamicConstants';
/**
  * The Environment object is used for set the enviroment of part or all the Word
  *
  * @class
  * @memberof NGINT
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
        this._force = {x:0, y:0};

        this.type = ENVIRONMENT_TYPE.air;
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
