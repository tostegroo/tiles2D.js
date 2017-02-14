import Settings from '../settings';
import { AXIS } from '../constants';

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
    constructor()
    {
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
        let totalStep = Math.ceil(deltatime / Settings.TIME_STEP);
        totalStep = (totalStep < 1) ? 1 : totalStep;
        deltatime = (deltatime > Settings.TIME_STEP) ? Settings.TIME_STEP : deltatime;

        for(t = 0; t < totalStep; t++)
        {
            let b, e, elen, blen;

            for (e = 0, elen = this.environmentList.length; e < elen; e++)
                this.environmentList[e].update(deltatime);

            //Body movement and projection loop
            for (b = 0, blen = this.bodyList.length; b < blen; b++)
            {
                let body = this.bodyList[b];
                //Do everything that is needed before the update
                body.beginUpdate(deltatime);
                //Apply all the impulses
                body.applyImpulses(deltatime);

                //Projetcs the movement before calculations
                this._projectMovement(b, deltatime);
                //Calculates all the collisions
                this._calculateCollision(b, deltatime);
                //Do the update
                body.update(deltatime);

                //Reset forces
                body.resetForces();
                //Update body bounds
                body.updateBounds();
                //Clear all finished impulses
                body.clearImpulses();

                for (e = 0, elen = this.environmentList.length; e < elen; e++)
                    this.environmentList[e].updateBodyInteration(body, deltatime);

                //Do everything that is needed after the update
                body.endUpdate(deltatime);
            }

            this._time += deltatime;
        }
    }

    _projectMovement(index = 0, deltatime = 0)
    {
        let airResistance = {x:0, y:0};
        let b = this.bodyList[index];

        b.position = {x: b.x, y: b.y};

        b.currentTile.x = Math.floor(b.left / Settings.TILE_SIZE);
        b.currentTile.y = Math.floor(b.top / Settings.TILE_SIZE);

        if(b.direction.x <= 0)
        {
            this.contactTile.X.x = Math.floor(b.frictionArea.left / Settings.TILE_SIZE);
            this.contactTile.Y.x = Math.floor((b.left - 0.1) / Settings.TILE_SIZE);
        }
        else
        {
            this.contactTile.X.x = Math.floor(b.frictionArea.right / Settings.TILE_SIZE);
            this.contactTile.Y.x = Math.floor((b.right + 0.1) / Settings.TILE_SIZE);
        }

        if(b.direction.y <= 0)
        {
            this.contactTile.Y.y = Math.floor(b.frictionArea.top / Settings.TILE_SIZE);
            this.contactTile.X.y = Math.floor((b.top - 0.1) / Settings.TILE_SIZE);
        }
        else
        {
            this.contactTile.Y.y = Math.floor(b.frictionArea.bottom / Settings.TILE_SIZE);
            this.contactTile.X.y = Math.floor((b.bottom + 0.1) / Settings.TILE_SIZE);
        }

        b.lastPosition = {x: b.position.x, y: b.position.y};

        //x axis calculations
        b.environmentForce.x = (b.mass * Settings.ENVIRONMENT_FORCE.x);

        airResistance.x = 0.5 * b.dragCoefficient * b.verticalArea * 1.2; //b.environment.density;

        console.log(b.dragCoefficient , b.verticalArea);

        let vdirection = (b.velocity.x > 0) ? 1 : (b.velocity.x < 0) ? -1 : 0;
        b.dragForce.x = -(airResistance.x * Math.pow(b.velocity.x, 2)) * vdirection;

        b.buoyantForce.x = b.displacedVolume;//b.environment.density * b.displacedVolume * b.environment.gravity.x;

        /*qd = actionLayer.tileLayer.getChildByName(contactTileX + ":" + contactTileX_Y);
        groundFriction = (qd) ? qd.friction.x : 1;
        qd = null;

        groundResistance.x = b.friction * groundFriction;
        if (b.onMaxY!=0)
        {
            if (b.groundResistanceDirection.x > 0)
            {
                b.groundForce.x = (b.velocity.x > 0) ? -groundResistance.x * b.velocity.x * b.groundResistanceMultiply.x : 0;
            }else if (b.groundResistanceDirection.x < 0)
            {
                b.groundForce.x = (b.velocity.x < 0) ? -groundResistance.x * b.velocity.x * b.groundResistanceMultiply.x : 0;
            }else
            {
                b.groundForce.x = -groundResistance.x * b.velocity.x * b.groundResistanceMultiply.x;
            }
        }else
        {
            b.groundForce.x = 0;
        }*/

        b.groundForce.x = 0;
        b.netForce.x = b.movingForce.x + b.movingImpulse.x + b.environmentForce.x + b.dragForce.x + b.groundForce.x + b.buoyantForce.x;
        b.acceleration.x = b.netForce.x / b.mass;
        b.velocity.x += deltatime * b.acceleration.x;
        b.position.x += (deltatime * b.velocity.x) * Settings.PIXEL_METER_UNIT;
    }

    _calculateCollision(index = 0, deltatime = 0)
    {
        let b = this.bodyList[index];

        b.x = b.position.x;
    }
}
