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
            X: {: 0, y:0},
            Y: {x: 0, y:0}
        };

        this._time = 0;
    }

    addEnvironment(environment = false)
    {
        if(environment)
            environmentList.push(environment);
    }

    removeEnvironment(environment = false)
    {
        if(environment)
        {
            let index = environmentList.indexOf(environment);
            if (index != -1)
                environmentList.splice(index, 1);
        }
    }

    addBody(body = false)
    {
        if(body)
            bodyList.push(body);
    }

    removeBody(body = false)
    {
        if(body)
        {
            let index = bodyList.indexOf(body);
            if(index != -1)
                bodyList.splice(index, 1);
        }
    }

    update(deltatime = 0)
    {
        let b, e, t, elen, blen;
        let totalStep = Math.ceil(deltatime / Settings.TIME_STEP);
        totalStep = (totalStep < 1) ? 1 : totalStep;
        deltatime = (deltatime > Settings.TIME_STEP) ? Settings.TIME_STEP : deltatime;

        let body = null;

        for(t = 0; t < totalStep; t++)
        {
            for (e = 0, elen = environmentList.length; e < elen; e++)
                this.environmentList[e].update(deltatime);

            //Body movement and projection loop
            for (b = 0, blen = bodyList.length; b < blen; b++)
            {
                body = b[b];

                //Do everything that is needed before the update
                body.beginUpdate(deltatime);
                //Apply all the impulses
                body.applyImpulse(deltatime);

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

                for (e = 0, elen = environmentList.length; e < elen; e++)
                    environmentList[e].updateBodyInteration(body, deltatime);

                //Do everything that is needed after the update
                body.endUpdate(deltatime);
            }

            this._time += deltatime;
        }
    }

    _projectMovement(index = 0, deltatime = 0)
    {
        b = bodyList[index];

        b.position = {x: b.x, y: b.y};

        if(b.direction.x <= 0)
        {
            this.contactTile.X.x = Math.floor(b.frictionArea.left / settings.TILE_SIZE);
            this.contactTile.Y.x = Math.floor((b.left - 0.1) / settings.TILE_SIZE);
        }
        else
        {
            this.contactTile.X.x = Math.floor(b.frictionArea.right / settings.TILE_SIZE);
            this.contactTile.Y.x = Math.floor((b.right + 0.1) / settings.TILE_SIZE);
        }


        b.lastPosition = {x: b.position.x, y: b.position.y};
    }

    _calculateCollision(index = 0, deltatime = 0)
    {

    }
}
