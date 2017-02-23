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

        this.contactList = [];
        this.contactCount = 0;

        this.jointList = [];
        this.jointCount = 0;

        this.tileList = [];

        this.contactTile =
        {
            X: {x: 0, y:0},
            Y: {x: 0, y:0}
        };
        this._limits =
        {
            x: {min: -150, max: 1900},
            y: {min: -100, max: 1200}
        }

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

    setTileList(tilelist = [])
    {
        this.tileList = tilelist;
    }

    beginUpdate(deltatime = 0){}

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

                //put old positions in the calculation variables
                body._x = body.x;
                body._y = body.y;

                body._environment = this.mainEnvironment;
                for (e = 0; e < this.environmentCount; e++)
                {
                    //to do, update body.environment;
                    this.environmentList[e].updateBodyInteration(body, deltatime);
                }

                //Do everything that is needed before the update
                body.beginUpdate(deltatime);

                //Projetcs the movement before calculations
                this._calculateForces(body, AXIS.X, deltatime);
                this._calculateForces(body, AXIS.Y, deltatime);

                //Validates all the collisions
                this._keepInBounds(body, AXIS.X);
                this._keepInBounds(body, AXIS.Y);

                //Update body bounds
                body._updateBounds();
            }

            //Body collision loop
            for (b = 0; b < this.bodyCount; b++)
            {
                body = this.bodyList[b];

                //loop through all other bodies
                //for (o = b + 1; o < this.bodyCount; o++)
                    //this._isOverlapping(body, this.bodyList[o]);

                //Do the update of the body
                body.update(deltatime);

                //Do everything that is needed after the update
                body.endUpdate(deltatime);
            }

            this._time += deltatime;
        }
    }

    endUpdate(deltatime = 0){}

    _isOverlapping(b1, b2)
    {
        let pi2 = Math.PI/2;
        let b1_new_velocity = {x: 0, y: 0},
            b2_new_velocity = {x: 0, y: 0},
            restitution = {x: 0, y: 0};

        let overlap = b1.overlaps(b2);

        if(overlap.overlap.x && overlap.overlap.y)
        {
            b1_new_velocity.x = ((b1.mass - b2.mass) * b1.velocity.x + (2 * b2.mass) * b2.velocity.x) / (b1.mass + b2.mass);
            b2_new_velocity.x = ((2 * b1.mass) * b1.velocity.x + (b2.mass - b1.mass) * b2.velocity.x) / (b1.mass + b2.mass);

            b1_new_velocity.y = ((b1.mass - b2.mass) * b1.velocity.y + (2 * b2.mass) * b2.velocity.y) / (b1.mass + b2.mass);
            b2_new_velocity.y = ((2 * b1.mass) * b1.velocity.y + (b2.mass - b1.mass) * b2.velocity.y) / (b1.mass + b2.mass);

            restitution.x = b1._bounciness.x[overlap.direction.x] + b2._bounciness.x[-overlap.direction.x];
            restitution.y = b1._bounciness.y[overlap.direction.y] + b2._bounciness.y[-overlap.direction.y];

            b1.velocity.x = b1_new_velocity.x;
            b2.velocity.x = b2_new_velocity.x;

            b1.velocity.y = b1_new_velocity.y;
            b2.velocity.y = b2_new_velocity.y;

            if((b1.velocity.x > 0 && b1_new_velocity.x < 0) || (b1.velocity.x < 0 && b1_new_velocity.x > 0))
                b1.velocity.x *= restitution.x;

            if((b2.velocity.x > 0 && b2_new_velocity.x < 0) || (b2.velocity.x < 0 && b2_new_velocity.x > 0))
                b2.velocity.x *= restitution.x;

            if((b1.velocity.y > 0 && b1_new_velocity.y < 0) || (b1.velocity.y < 0 && b1_new_velocity.y > 0))
                b1.velocity.y *= restitution.y;

            if((b2.velocity.y > 0 && b2_new_velocity.y < 0) || (b2.velocity.y < 0 && b2_new_velocity.y > 0))
                b2.velocity.y *= restitution.y;
        }

        if(overlap.value.y > overlap.value.x)
        {
            b1._impulseDirection.y = overlap.direction.x;
            b2._impulseDirection.y = -overlap.direction.x;
            b1._x += overlap.value.x * overlap.direction.x;
        }

        if(overlap.value.x > overlap.value.y)
        {
            b1._impulseDirection.x = overlap.direction.y;
            b2._impulseDirection.x = -overlap.direction.y;
            b1._y += overlap.value.y * overlap.direction.y;
        }

        ScreenConsole.log(
            "cos: "+overlap.overlap.x,
            "sin: "+overlap.overlap.y
        );
    }

    _calculateForces(b, a, deltatime = 0)
    {
        let vdir = (b.velocity[a] > 0) ? -1 : (b.velocity[a] < 0) ? 1 : 0;
        let ia = a==AXIS.X ? AXIS.Y : AXIS.X;

        b._frictionalForce[a] = 0;
        if(b._impulseDirection[ia]!=0)
        {
            //to do friction calculation (cb friction * b friction);
            let friction_coefficient = b._contactfriction[ia][b._impulseDirection[ia]] * b._friction[ia][b._impulseDirection[ia]];
            friction_coefficient += b._contactfriction[ia][b._impulseDirection[a]] * b._friction[ia][b._impulseDirection[a]];

            b._frictionalForce[a] = 0;//friction_coefficient * b._netForce[ia] * -b.velocity[a] * -b._impulseDirection[ia];
        }

        b._environmentForce[a] = (b.mass * b._environment.force[a]);
        b._dragForce[a] = ((b._environment.density * b.dragCoefficient * b.area[a]) / 2) * Math.pow(b.velocity[a], 2) * vdir;
        b._buoyantForce[a] = b._displacedVolume * b._environment.density * -b._environment.force[a];
        b._netForce[a] = b._movingForce[a] + b._movingImpulse[a] + b._environmentForce[a] + b._dragForce[a] + b._frictionalForce[a] + b._buoyantForce[a];

        b.acceleration[a] = b._netForce[a] / b.mass;
        b.velocity[a] += deltatime * b.acceleration[a];
        b['_'+a] += (deltatime * b.velocity[a]) * SETTINGS.PIXEL_METER_UNIT;

        //console.log(b['_'+a]);

        b._direction[a] = ((b['_'+a] - b[a]) > 0) ? -1 : ((b['_'+a] - b[a]) < 0) ? 1 : 0;
    }

    _keepInBounds(b, a)
    {
        let collider_bounciness = 0;

        if(b['_'+a] <= this._limits[a].min)
        {
            b._impulseDirection[a] = 1;
            b['_'+a] = this._limits[a].min;
            b.velocity[a] = 0;

            //b._restitution[a] = (collider_bounciness + b._bounciness[a]['1']) / 2;
            //b.velocity[a] *= b._restitution[a] * -b._direction[a];
        }

        if(b['_'+a] >= this._limits[a].max)
        {
            b._impulseDirection[a] = -1;
            b['_'+a] = this._limits[a].max;
            b.velocity[a] = 0;

            //b._restitution[a] = (collider_bounciness + b._bounciness[a]['-1']) / 2;
            //b.velocity[a] *= b._restitution[a] * b._direction[a];
        }

        b[a] = b['_'+a];
    }
}
