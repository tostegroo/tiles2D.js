import Body from './Body';
import { AXIS } from '../constants';
import { DRAG_COEFFICIENT } from './dynamicConstants';

/**
  * The Player class can be used for a playable character
  *
  * @class
  * @memberof NGINT
  * @author Fabio Toste
*/
export default class Player extends Body
{
    constructor(sprite)
    {
        super(sprite);

        this.crouched = false;
        this.move = false;
        this.run = false;
        this.onWater = false;

        this.movey = false;

        this.crouchScale = 0.6;
        this.walkForce = 800;
        this.jumpImpulse = 2600;
        this.runMultiply = 2;
        this.runJumpMultiply = 1;
        this.wallJumpImpulse = 120;
        this.forceDirection = {x:0, y:0};

        this.dragCoefficient = DRAG_COEFFICIENT.human;
        this.mass = 80;
        this.friction = 30.0;
        this.bounciness = 0;
    }

    walkMove(value)
    {
        if (value == 0)
        {
            this.move = false;
            this.forceDirection.x = 0;
        }else
        {
            this.move = true;
            this.forceDirection.x = value;
        }
    }

    walkLeft()
    {
        this.move = true;
        this.forceDirection.x = -1;
    }

    walkRight()
    {
        this.move = true;
        this.forceDirection.x = 1;
    }

    stop()
    {
        this.move = false;
        this.forceDirection.x = 0;
    }

    walkUp()
    {
        this.movey = true;
        this.forceDirection.y = -1;
    }

    walkDown()
    {
        this.movey = true;
        this.forceDirection.y = 1;
    }

    stopy()
    {
        this.movey = false;
        this.forceDirection.y = 0;
    }

    jump()
    {
        /*if (this.onWater==false)
        {
            if (onMaxX!=0)
            {
                if (onMaxY!=0)
                {
                    this.applyImpulse("y", jumpImpulse * -gravitySide, 0.1);
                }else
                {
                    this.applyImpulse("x", -wallJumpImpulse * onMaxX, 0.1);
                    this.applyImpulse("y", jumpImpulse * -gravitySide, 0.1);
                }
            }else
            {
                if (onMaxY!=0)
                {
                    var jumpForce:Number = (run == true) ? jumpImpulse * runJumpMultiply * -gravitySide: jumpImpulse * onMaxY;
                    this.applyImpulse("y", jumpForce, 0.1);
                }
            }
        }else
        {
            this.applyImpulse("y", jumpImpulse * -gravitySide, 0.05);
        }*/

        this.addImpulse(AXIS.Y, this.jumpImpulse * -1, 0.05);
    }

    stopJump()
    {
        this.applyForce(AXIS.Y, this.jumpImpulse * 1);
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
        super.beginUpdate(deltatime);

        if (this.move)
        {
            let forceMultiply = (this.run) ? this.runMultiply : 1;
            this.applyForce(AXIS.X, this.walkForce * forceMultiply * this.forceDirection.x);
        }

        //if (this.movey)
            //this.applyForce(AXIS.Y, this.walkForce * this.forceDirection.y);
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
