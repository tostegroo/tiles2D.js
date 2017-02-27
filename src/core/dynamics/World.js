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

        this.debug = true;

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

        //debug tile clean color
        if(this.debug)
        {
            for(let k in this.tileList)
                this.tileList[k].sprite.color = this.tileList[k].sprite._initialColor;
        }

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
                body.shape.x = body.x;
                body.shape.y = body.y;

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

                //Clear the contact variables
                body.clearContacts();

                //Validates all the collisions
                this._keepInBounds(body, AXIS.X);
                this._keepInBounds(body, AXIS.Y);

                this._calculateTileCollision(body);
            }

            //Body collision loop
            for (b = 0; b < this.bodyCount; b++)
            {
                body = this.bodyList[b];

                //loop through all other bodies
                for (o = b + 1; o < this.bodyCount; o++)
                    this._calculateBodyCollision(body, this.bodyList[o]);

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

    endUpdate(deltatime = 0){}

    _calculateTileCollision(b)
    {
        let x, y, p, ip, imax, i;

        let dir = b._direction.x < 0;
        let minTileX = (dir) ? Math.floor((b.x + b.shape.width) / SETTINGS.TILE_SIZE) : Math.floor(b.shape.x / SETTINGS.TILE_SIZE);
        let maxTileX = (dir) ? Math.floor(b.shape.right / SETTINGS.TILE_SIZE) : Math.floor(b.x / SETTINGS.TILE_SIZE);
        let minTileY = Math.floor(b.y / SETTINGS.TILE_SIZE);
        let maxTileY = Math.ceil((b.y + b.shape.height) / SETTINGS.TILE_SIZE);
        imax = (maxTileX - minTileX);
        let limit = null;
        p = (dir) ? 'left' : 'right';
        ip = (dir) ? 'right' : 'left';

        x = dir ? minTileX : maxTileX;
        for (i = 0; i <= imax; i++)
        {
            for (y = minTileY; y < maxTileY; y++)
            {
                let tile = this.tileList[x+'-'+y];
                if(tile)
                {
                    if(this.debug)
                        tile.sprite.color = "#0000FF";

                    b._contactfriction.x[b._direction.x] = tile._friction.x[-b._direction.x];
                    b._restitution.x = (b._bounciness.x[b._direction.x] + tile._bounciness.x[-b._direction.x]) / 2;
                    limit = tile.shape[p];
                    break;
                }
            }

            if(limit)
                break;

            x += dir ? 1 : -1;
        }

        if(limit!=null)
        {
            b._impulseDirection.x = b._direction.x;
            b.shape.x = dir ? limit - b.shape.width : limit;
            b.velocity.x *= -b._restitution.x;
        }

        dir = b._direction.y < 0;
        minTileX = Math.floor(b.x / SETTINGS.TILE_SIZE);
        maxTileX = Math.ceil((b.x + b.shape.width) / SETTINGS.TILE_SIZE);
        minTileY = (dir) ? Math.floor((b.y + b.shape.height) / SETTINGS.TILE_SIZE) : Math.floor(b.shape.y / SETTINGS.TILE_SIZE);
        maxTileY = (dir) ? Math.floor(b.shape.bottom / SETTINGS.TILE_SIZE) : Math.floor(b.y / SETTINGS.TILE_SIZE);
        imax = (maxTileY - minTileY);
        p = (dir) ? 'top' : 'bottom';
        ip = (dir) ? 'bottom' : 'top';
        limit = null;

        y = dir ? minTileY : maxTileY;
        for (i = 0; i <= imax; i++)
        {
            for (x = minTileX; x < maxTileX; x++)
            {
                let tile = this.tileList[x+'-'+y];
                if(tile)
                {
                    if(this.debug)
                        tile.sprite.color = "#FF0000";

                    b._contactfriction.y[b._direction.y] = tile._friction.y[-b._direction.y];
                    b._restitution.y = (b._bounciness.y[b._direction.y] + tile._bounciness.y[-b._direction.y]) / 2;
                    limit = tile.shape[p];
                    break;
                }
            }

            if(limit)
                break;

            y += dir ? 1 : -1;
        }

        if(limit!=null)
        {
            b._impulseDirection.y = b._direction.y;
            b.shape.y = dir ? limit - b.shape.height : limit;
            b.velocity.y *= -b._restitution.y;
        }
    }

    _calculateBodyCollision(b1, b2)
    {
        let pi2 = Math.PI/2;
        let b1_new_velocity = {x: 0, y: 0},
            b2_new_velocity = {x: 0, y: 0};

        let intersectionData = b1.shape.intersection(b2.shape);

        if(intersectionData)
        {
            b1_new_velocity.x = ((b1.mass - b2.mass) * b1.velocity.x + (2 * b2.mass) * b2.velocity.x) / (b1.mass + b2.mass);
            b2_new_velocity.x = ((2 * b1.mass) * b1.velocity.x + (b2.mass - b1.mass) * b2.velocity.x) / (b1.mass + b2.mass);

            b1_new_velocity.y = ((b1.mass - b2.mass) * b1.velocity.y + (2 * b2.mass) * b2.velocity.y) / (b1.mass + b2.mass);
            b2_new_velocity.y = ((2 * b1.mass) * b1.velocity.y + (b2.mass - b1.mass) * b2.velocity.y) / (b1.mass + b2.mass);

            b1._restitution.x = b2._restitution.x = (b1._bounciness.x[intersectionData.direction.x] + b2._bounciness.x[-intersectionData.direction.x]) / 2;
            b1._restitution.y = b2._restitution.y = (b1._bounciness.y[intersectionData.direction.y] + b2._bounciness.y[-intersectionData.direction.y]) / 2;

            b1.velocity.x = b1_new_velocity.x;
            b2.velocity.x = b2_new_velocity.x;

            b1.velocity.y = b1_new_velocity.y;
            b2.velocity.y = b2_new_velocity.y;

            if((b1.velocity.x > 0 && b1_new_velocity.x < 0) || (b1.velocity.x < 0 && b1_new_velocity.x > 0))
                b1.velocity.x *= b1._restitution.x;

            if((b2.velocity.x > 0 && b2_new_velocity.x < 0) || (b2.velocity.x < 0 && b2_new_velocity.x > 0))
                b2.velocity.x *= b2._restitution.x;

            if((b1.velocity.y > 0 && b1_new_velocity.y < 0) || (b1.velocity.y < 0 && b1_new_velocity.y > 0))
                b1.velocity.y *= b1._restitution.y;

            if((b2.velocity.y > 0 && b2_new_velocity.y < 0) || (b2.velocity.y < 0 && b2_new_velocity.y > 0))
                b2.velocity.y *= b2._restitution.x;

            if(intersectionData.height > intersectionData.width)
            {
                b1._impulseDirection.x = intersectionData.direction.x;
                b2._impulseDirection.x = -intersectionData.direction.x;
                b1.shape.x += intersectionData.width * intersectionData.direction.x;
            }

            if(intersectionData.width > intersectionData.height)
            {
                b1._impulseDirection.y = intersectionData.direction.y;
                b2._impulseDirection.y = -intersectionData.direction.y;
                b1.shape.y += intersectionData.height * intersectionData.direction.y;
            }
        }
    }

    _calculateForces(b, a, deltatime = 0)
    {
        let vdir = (b.velocity[a] > 0) ? -1 : (b.velocity[a] < 0) ? 1 : 0;
        let ia = a==AXIS.X ? AXIS.Y : AXIS.X;

        b._frictionalForce[a] = 0;
        let friction_coefficient = 0;
        if(b._impulseDirection[ia]!=0)
        {
            friction_coefficient = (b._contactfriction[ia]['-1'] * b._friction[ia]['-1']) + (b._contactfriction[ia]['1'] * b._friction[ia]['1']);
            b._frictionalForce[a] = friction_coefficient * b._netForce[ia] * -b.velocity[a] * -b._impulseDirection[ia];
        }

        b._environmentForce[a] = (b.mass * b._environment.force[a]);
        b._dragForce[a] = ((b._environment.density * b.dragCoefficient * b.area[a]) / 2) * Math.pow(b.velocity[a], 2) * vdir;
        b._buoyantForce[a] = b._displacedVolume * b._environment.density * -b._environment.force[a];
        b._netForce[a] = b._movingForce[a] + b._movingImpulse[a] + b._environmentForce[a] + b._dragForce[a] + b._frictionalForce[a] + b._buoyantForce[a];

        b.acceleration[a] = b._netForce[a] / b.mass;
        b.velocity[a] += deltatime * b.acceleration[a];
        b.shape[a] += (deltatime * b.velocity[a]) * SETTINGS.PIXEL_METER_UNIT;

        if(a=='y')
        {
            ScreenConsole.log(
                "f_c: "+ friction_coefficient,
                "f_f: "+ b._frictionalForce[a],
                "n_f: "+ b._netForce[ia],
                "vlc: "+ -b.velocity[a],
                "imp: "+ -b._impulseDirection[ia],
                "c_l: "+ b._contactfriction[ia]['1'],
                "c_r: "+ b._contactfriction[ia]['-1']
            )
        }

        b._direction[a] = b.velocity[a] > 0 ? -1 : b.velocity[a] < 0 ? 1 : 0;
    }

    _keepInBounds(b, a)
    {
        if(b.shape[a] <= this._limits[a].min)
        {
            b.shape[a] = this._limits[a].min;
            b.velocity[a] = 0;
        }

        if(b.shape[a] >= this._limits[a].max)
        {
            b.shape[a] = this._limits[a].max;
            b.velocity[a] = 0;
        }
    }
}
