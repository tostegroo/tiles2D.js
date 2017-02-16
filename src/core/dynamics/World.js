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
     */
    constructor(environment = new Environment(MATERIAL_DENSITY.air, {x:0, y:9.81}))
    {
        this.mainEnvironment = environment;
        this.bodyList = [];
		this.environmentList = [];

        this.contactTile =
        {
            X: {x: 0, y:0},
            Y: {x: 0, y:0}
        };

        this._time = 0;
    }

    addEnvironment(environment = false)
    {
        if(environment)
            this.environmentList.push(environment);
    }

    removeEnvironment(environment = false)
    {
        if(environment)
        {
            let index = this.environmentList.indexOf(environment);
            if (index != -1)
                this.environmentList.splice(index, 1);
        }
    }

    addBody(body = false)
    {
        if(body)
            this.bodyList.push(body);
    }

    removeBody(body = false)
    {
        if(body)
        {
            let index = this.bodyList.indexOf(body);
            if(index != -1)
                this.bodyList.splice(index, 1);
        }
    }

    update(deltatime = 0)
    {
        let t;
        let totalStep = Math.ceil(deltatime / SETTINGS.TIME_STEP);
        totalStep = (totalStep < 1) ? 1 : totalStep;
        deltatime = (deltatime > SETTINGS.TIME_STEP) ? SETTINGS.TIME_STEP : deltatime;

        for(t = 0; t < totalStep; t++)
        {
            let b, e, elen, blen;

            for (e = 0, elen = this.environmentList.length; e < elen; e++)
                this.environmentList[e].update(deltatime);

            //Body movement and projection loop
            for (b = 0, blen = this.bodyList.length; b < blen; b++)
            {
                let body = this.bodyList[b];

                body._environment = this.mainEnvironment;

                for (e = 0, elen = this.environmentList.length; e < elen; e++)
                {
                    //to do, update body.environment;
                    this.environmentList[e].updateBodyInteration(body, deltatime);
                }

                //Do everything that is needed before the update
                body.beginUpdate(deltatime);
                //Apply all the impulses
                body.applyImpulses(deltatime);

                //Projetcs the movement before calculations
                this._projectMovement(body, deltatime);
                //Calculates all the collisions
                this._calculateCollisions(body, AXIS.X);
                this._calculateCollisions(body, AXIS.Y);

                //Do the update
                body.update(deltatime);

                //Clear forces
                body.clearForces();
                //Clear all finished impulses
                body.clearImpulses();
                //Update body bounds
                body.updateBounds();

                //Do everything that is needed after the update
                body.endUpdate(deltatime);
            }

            this._time += deltatime;
        }
    }

    _projectMovement(body, deltatime = 0)
    {
        let vdir

        body._position = {x: body.x, y: body.y};

        body._currentTile.x = Math.floor(body.left / SETTINGS.TILE_SIZE);
        body._currentTile.y = Math.floor(body.top / SETTINGS.TILE_SIZE);

        this._upadteContactTiles(body);

        body._lastPosition = {x: body._position.x, y: body._position.y};

        this._calculateForces(body, AXIS.X, deltatime);
        this._calculateForces(body, AXIS.Y, deltatime);
    }

    _calculateCollisions(body, axis)
    {
        let min = {x:0, y:0}
        let max = {x:1920, y:800}

        body._over[axis] = 0;
        if(body._position[axis] < min[axis])
        {
            body._over[axis] = 1;
            body._position[axis] = min[axis];
        }

        if(body._position[axis] > max[axis])
        {
            body._over[axis] = -1;
            body._position[axis] = max[axis];
        }

        body[axis] = body._position[axis];
    }

    _calculateForces(body, axis, deltatime = 0)
    {
        let vdir = (body.velocity[axis] > 0) ? -1 : (body.velocity[axis] < 0) ? 1 : 0;
        let i_axis = axis==AXIS.X ? AXIS.Y : AXIS.X;
        let tileFriction = 5.0;
        let bodyFriction = body.friction.bottom;

        body._direction[axis] = body._position[axis] - body[axis];

        body._environmentForce[axis] = (body.mass * body._environment.force[axis]);
        body._dragForce[axis] = ((body._environment.density * body.dragCoefficient * body.area[axis]) / 2) * Math.pow(body.velocity[axis], 2) * vdir;
        body._buoyantForce[axis] = body.displacedVolume * body._environment.density * -body._environment.force[axis];

        if(body._over[i_axis]!=0)
        {
            //to do ground forces calculation
            let tileFriction = 5.0;
            let bodyFriction = body.friction.bottom;

            body._groundForce[axis] = -(bodyFriction * tileFriction) * body.velocity[axis];
        }

        body._netForce[axis] = body._movingForce[axis] + body._movingImpulse[axis] + body._environmentForce[axis] + body._dragForce[axis] + body._groundForce[axis] + body._buoyantForce[axis];
        body.acceleration[axis] = body._netForce[axis] / body.mass;
        body.velocity[axis] += deltatime * body.acceleration[axis];
        body._position[axis] += (deltatime * body.velocity[axis]) * SETTINGS.PIXEL_METER_UNIT;
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
