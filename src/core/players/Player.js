import { AXIS } from '../constants';
import Body from '../dynamics/Body';
import { DRAG_COEFFICIENT } from '../dynamics/dynamicConstants';
import { ENVIRONMENT_TYPE } from '../dynamics/dynamicConstants';

/**
  * The Player class can be used for a playable character
  *
  * @class
  * @memberof TILES2D
  * @author Fabio Toste
*/
export default class Player extends Body
{
    constructor(sprite)
    {
        super(sprite);

        this.crouched = false;
        this.move = {x: false, y: false};
        this.run = false;
        this.onEnvironment = ENVIRONMENT_TYPE.air;

        this.crouchScale = 0.6;
        this.walkForce = 1200;
        this.jumpImpulse = 8000;

        this.runMultiply = 2;
        this.runJumpMultiply = 1;
        this.wallJumpImpulse = 120;
        this.forceDirection = {x:0, y:0};

        this.dragCoefficient = DRAG_COEFFICIENT.human;
        this.mass = 80;
        this.friction = 0.5;
        this.bounciness = 0;
    }

    walkMove(value)
    {
        if (value == 0)
        {
            this.move.x = false;
            this.forceDirection.x = 0;
        }else
        {
            this.move.x = true;
            this.forceDirection.x = value;
        }
    }

    walkLeft()
    {
        this.move.x = true;
        this.forceDirection.x = -1;
    }

    walkRight()
    {
        this.move.x = true;
        this.forceDirection.x = 1;
    }

    stop()
    {
        this.move.x = false;
        this.forceDirection.x = 0;
    }

    walkUp()
    {
        this.move.y = true;
        this.forceDirection.y = -1;
    }

    walkDown()
    {
        this.move.y = true;
        this.forceDirection.y = 1;
    }

    stopy()
    {
        this.move.y = false;
        this.forceDirection.y = 0;
    }

    jump()
    {
        switch(this.onEnvironment)
        {
            case ENVIRONMENT_TYPE.air:
                if(this._impulseDirection.y!=0)
                    this.addImpulse(AXIS.Y, this.jumpImpulse * this._impulseDirection.y, 0.1);
                break;

            case ENVIRONMENT_TYPE.water:
                this.applyImpulse(AXIS.Y, this.jumpImpulse * -1, 0.05);
                break;
        }
    }

    stopJump()
    {
        this.removeImpulses(AXIS.Y);
    }

    crouch()
    {
        this.crouched = true;
    }

    standUp()
    {
        this.crouched = false;
    }

    startRun()
    {
        this.run = true;
    }

    stopRun()
    {
        this.run = false;
    }

    beginUpdate(deltatime)
    {
        let forceMultiply = (this.run) ? this.runMultiply : 1;

        if (this.move.x)
            this.applyForce(AXIS.X, this.walkForce * forceMultiply * this.forceDirection.x);

        if (this.move.y)
            this.applyForce(AXIS.Y, this.walkForce * this.forceDirection.y);

        super.beginUpdate(deltatime);
    }

    update(deltatime)
    {
        super.update(deltatime);
    }

    endUpdate(deltatime)
    {
        super.endUpdate(deltatime);

        /*if (this.environment && this.environment.density == MaterialDensity.water)
            this.onWater = true;
        else
            this.onWater = false;*/

        //this.sprite.scaleY = (this.crouched == true) ? -this.crouchScale : (this.canIncreaseHeight == false && this.hitbox.scaleY == -this.crouchScale) ? -this.crouchScale : -1;
    }
}
