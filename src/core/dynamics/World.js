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
                body.beginUpdate(deltatime);
                body.applyImpulse(deltatime);

                this._projectMovement(b, deltatime);
                this._calculateCollision(b, deltatime);
                body.update(deltatime);

                //Reset forces
                body.resetForces();

                //Update dimensions properties
                body.top = body.y - body.hitbox.height;
                body.bottom = body.y;
                body.centerY = body.y - (body.hitbox.height / 2);
                body.left = body.x;
                body.right = b1.x + b1.hitbox.width;
                b1.centerX = b1.x + (b1.hitbox.width / 2);

                body.clearImpulses();

                for (e = 0, elen = environmentList.length; e < elen; e++)
                    environmentList[e].updateBodyInteration(body, deltatime);

                body.endUpdate(deltatime);
            }

            this._time += deltatime;
        }
    }
}
