import SETTINGS from '../settings';
import { AXIS } from '../constants';
import { MATERIAL_DENSITY } from './dynamicConstants';
import Environment from './Environment';

/**
  * The World object is the main object of NGINT, is used to calculate all interactions and physics
  *
  * @class
  * @memberof NGINT
  * @author Fabio Toste
*/
export default class World
{
    /**
     *
     * @param {NGINT.Environment} environment - The main environment of the world
     *
     */
    constructor(environment = new Environment(MATERIAL_DENSITY.air, {x:0, y:9.81}))
    {
        this.mainEnvironment = environment;

        this.bodyList = [];
        this.bodyCount = 0;

        this.environmentList = [];
        this.environmentCount = 0;

        this._b = null;

        this.contactList = [];
        this.contactCount = 0;

        this.jointList = [];
        this.jointCount = 0;

        this.contactTile =
        {
            X: {x: 0, y:0},
            Y: {x: 0, y:0}
        };

        this._time = 0;
    }

    addEnvironment(environment = false)
    {
        if(!environment)
            return

        this.environmentCount = this.environmentList.push(environment);
    }

    removeEnvironment(environment = false)
    {
        if(!environment)
            return

        let index = this.environmentList.indexOf(environment);
        if (index != -1)
        {
            environmentList.splice(index, 1);
            this.environmentCount--;
        }
    }

    addBody(body = false)
    {
        if(!body)
            return

        body._prev = null;
        body._next = this._b;
        if(this._b!=null)
            this._b._prev = body;

        this._b = body;

        this.bodyCount = this.bodyList.push(body);
    }

    removeBody(body = false)
    {
        if(!body)
            return

        let index = this.bodyList.indexOf(body);
        if (index != -1)
        {
            this.bodyList.splice(index, 1);
            this.bodyCount--;
        }
    }

    beginUpdate(deltatime = 0)
    {

    }

    update(deltatime = 0)
    {
        let t;
        var body;
        let totalStep = Math.ceil(deltatime / SETTINGS.TIME_STEP);
        totalStep = (totalStep < 1) ? 1 : totalStep;
        deltatime = (deltatime > SETTINGS.TIME_STEP) ? SETTINGS.TIME_STEP : deltatime;

        for(t = 0; t < totalStep; t++)
        {
            let b, e;

            for (e = 0; e < this.environmentCount; e++)
                this.environmentList[e].update(deltatime);

            //Body movement and projection loop
            for (b = 0; b < this.bodyCount; b++)
            {
                body = this.bodyList[b];

                body._environment = this.mainEnvironment;
                for (e = 0; e < this.environmentCount; e++)
                {
                    //to do, update body.environment;
                    this.environmentList[e].updateBodyInteration(body, deltatime);
                }

                //Do everything that is needed before the update
                body.beginUpdate(deltatime);

                //Projetcs the movement before calculations
                this._updateForces(body, deltatime);
            }

            //Body collision loop
            for (b = 0; b < this.bodyCount; b++)
            {
                body = this.bodyList[b];

                //Calculates all the collisions
                this._validateCollisions(body, AXIS.X);
                this._validateCollisions(body, AXIS.Y);

                //Do the update
                body.update(deltatime);

                //Do everything that is needed after the update
                body.endUpdate(deltatime);
            }

            this._time += deltatime;
        }
    }

    endUpdate(deltatime = 0)
    {

    }

    _updateForces(body, deltatime = 0)
    {
        body._position = {x: body.x, y: body.y};

        body._currentTile.x = Math.floor(body.left / SETTINGS.TILE_SIZE);
        body._currentTile.y = Math.floor(body.top / SETTINGS.TILE_SIZE);

        this._upadteContactTiles(body);

        body._lastPosition = {x: body._position.x, y: body._position.y};

        this._calculateForces(body, AXIS.X, deltatime);
        this._calculateForces(body, AXIS.Y, deltatime);
    }

    _calculateForces(body, axis, deltatime = 0)
    {
        let vdir = (body.velocity[axis] > 0) ? -1 : (body.velocity[axis] < 0) ? 1 : 0;
        let i_axis = axis==AXIS.X ? AXIS.Y : AXIS.X;

        body._frictionalForce[axis] = 0;
        if(body._impulseDirection[i_axis]!=0)
        {
            //to do friction calculation (cbody friction * body friction);
            let friction_coefficient = 0.3 * body._friction[i_axis][body._impulseDirection[i_axis]];
            body._frictionalForce[axis] = friction_coefficient * body._netForce[i_axis] * -body.velocity[axis] * -body._impulseDirection[i_axis];
        }

        body._environmentForce[axis] = (body.mass * body._environment.force[axis]);
        body._dragForce[axis] = ((body._environment.density * body.dragCoefficient * body.area[axis]) / 2) * Math.pow(body.velocity[axis], 2) * vdir;
        body._buoyantForce[axis] = body._displacedVolume * body._environment.density * -body._environment.force[axis];
        body._netForce[axis] = body._movingForce[axis] + body._movingImpulse[axis] + body._environmentForce[axis] + body._dragForce[axis] + body._frictionalForce[axis] + body._buoyantForce[axis];

        body.acceleration[axis] = body._netForce[axis] / body.mass;
        body.velocity[axis] += deltatime * body.acceleration[axis];
        body._position[axis] += (deltatime * body.velocity[axis]) * SETTINGS.PIXEL_METER_UNIT;
    }

    _validateCollisions(body, axis)
    {
        let min = {x:50, y:100}
        let max = {x:1800, y:800}
        let collider_bounciness = 0;

        body._direction[axis] = body._position[axis] - body[axis];
        let vdir = (body._direction[axis] > 0) ? -1 : (body._direction[axis] < 0) ? 1 : 0;

        body._impulseDirection[axis] = 0;

        if(body._position[axis] < min[axis])
        {
            body._impulseDirection[axis] = 1;
            body._position[axis] = min[axis];

            body._restitution[axis] = (collider_bounciness + body._bounciness[axis]['1']) / 2;
            body.velocity[axis] *= body._restitution[axis] * -vdir;
        }

        if(body._position[axis] > max[axis])
        {
            body._impulseDirection[axis] = -1;
            body._position[axis] = max[axis];

            body._restitution[axis] = (collider_bounciness + body._bounciness[axis]['-1']) / 2;
            body.velocity[axis] *= body._restitution[axis] * vdir;
        }

        body[axis] = body._position[axis];
    }

    _upadteContactTiles(body)
    {
        if(body._direction.x <= 0)
        {
            this.contactTile.X.x = Math.floor(body.frictionArea.left / SETTINGS.TILE_SIZE);
            this.contactTile.Y.x = Math.floor((body.left - 0.1) / SETTINGS.TILE_SIZE);
        }
        else
        {
            this.contactTile.X.x = Math.floor(body.frictionArea.right / SETTINGS.TILE_SIZE);
            this.contactTile.Y.x = Math.floor((body.right + 0.1) / SETTINGS.TILE_SIZE);
        }

        if(body._direction.y <= 0)
        {
            this.contactTile.Y.y = Math.floor(body.frictionArea.top / SETTINGS.TILE_SIZE);
            this.contactTile.X.y = Math.floor((body.top - 0.1) / SETTINGS.TILE_SIZE);
        }
        else
        {
            this.contactTile.Y.y = Math.floor(body.frictionArea.bottom / SETTINGS.TILE_SIZE);
            this.contactTile.X.y = Math.floor((body.bottom + 0.1) / SETTINGS.TILE_SIZE);
        }
    }
}
