import SETTINGS from '../settings';
import { AXIS } from '../constants';
import { MATERIAL_DENSITY } from './dynamicConstants';
import Environment from './Environment';

import ScreenConsole from '../../debug/ScreenConsole'

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

        environment._id = this.environmentCount;
        this.environmentCount = this.environmentList.push(environment);
    }

    removeEnvironment(environment = false)
    {
        if(!environment)
            return

        let index = environment._id;
        if (index>0 && index<this.environmentCount)
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

        body._id = this.bodyCount;
        this.bodyCount = this.bodyList.push(body);
    }

    removeBody(body = false)
    {
        if(!body)
            return

        let index = body._id;
        if (index>0 && index<this.bodyCount)
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
            let b, e, c, o, clen;

            for (e = 0; e < this.environmentCount; e++)
                this.environmentList[e].update(deltatime);

            //Body movement and projection loop
            for (b = 0; b < this.bodyCount; b++)
            {
                body = this.bodyList[b];
                body._limits = {x: {min: 50, max: 1800}, y: {min: 100, max: 800}};

                body._environment = this.mainEnvironment;
                for (e = 0; e < this.environmentCount; e++)
                {
                    //to do, update body.environment;
                    this.environmentList[e].updateBodyInteration(body, deltatime);
                }

                //to do
                //loop through the body's contact list
                /*for (c = 0, clen = body._contactList; c < clen; c++)
                {

                }*/

                //Do everything that is needed before the update
                body.beginUpdate(deltatime);

                //Projetcs the movement before calculations
                this._updateForces(body, deltatime);

                //Update body bounds
                body._updateBounds();
            }

            //Body collision loop
            for (b = 0; b < this.bodyCount; b++)
            {
                body = this.bodyList[b];

                //loop through all other bodies
                if(b==0)
                {
                    for (o = 0; o < this.bodyCount; o++)
                    {
                        let ob = this.bodyList[o];
                        if(b!=o)
                            this._isOverlapping(body, ob);
                    }
                }

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

    _isOverlapping(b1, b2)
    {
        let a, b, ab, bb

        let overlapX = b1._bounds.left < b2._bounds.right && b1._bounds.right > b2._bounds.left;
        let overlapY = b1._bounds.top < b2._bounds.bottom && b1._bounds.bottom > b2._bounds.top;

        if(overlapY)
        {
            if(b1.velocity.x > 0)
            {
                ab = b1.right;
                a = b1._bounds.right;
                bb = b2.left;
                b = b2._bounds.left;

                if(overlapX && a>b)
                {
                    b1._limits.x.max = b - b1.width;
                }
            }
            else if(b1.velocity.x < 0)
            {
                ab = b1.left;
                a = b1._bounds.left;
                bb = b2.right;
                b = b2._bounds.right;

                if(overlapX && a<b)
                {
                    b1._limits.x.min = b;
                }
            }

            ScreenConsole.log(b2._bounds.left, b2._bounds.right, b1.velocity.x, "a:"+a, "ab:"+ab, "b:"+b, "bb:"+bb, "posX:"+b1._limits.x.max)
        }

        if(overlapX)
        {
            if(b1.velocity.y > 0)
            {
                ab = b1.bottom;
                a = b1._bounds.bottom;
                bb = b2.top;
                b = b2._bounds.top;

                if(overlapY && a>b)
                {
                    //b1._limits.y.max = b;
                }
            }
            else if(b1.velocity.y < 0)
            {
                ab = b1.top;
                a = b1._bounds.top;
                bb = b2.bottom;
                b = b2._bounds.bottom;

                if(overlapY && a<b)
                {
                    //b1._limits.x.min = b + b1.height;
                }
            }
        }
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
        let collider_bounciness = 0;
        let vdir = (body._direction[axis] > 0) ? -1 : (body._direction[axis] < 0) ? 1 : 0;

        body._direction[axis] = body._position[axis] - body[axis];
        body._impulseDirection[axis] = 0;

        if(body._position[axis] < body._limits[axis].min)
        {
            body._impulseDirection[axis] = 1;
            body._position[axis] = body._limits[axis].min;

            body._restitution[axis] = (collider_bounciness + body._bounciness[axis]['1']) / 2;
            body.velocity[axis] *= body._restitution[axis] * -vdir;
        }

        if(body._position[axis] > body._limits[axis].max)
        {
            body._impulseDirection[axis] = -1;
            body._position[axis] =body._limits[axis].max;

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
