import Vector2 from '../geom/Vector2';
import Rectangle from '../geom/shapes/Rectangle';
import SETTINGS from '../settings';
import { AXIS } from '../constants';

/**
  * The Body object is the base for all dynamics objects, including the player, npcs, and tiles
  *
  * @class
  * @memberof NGINT
  * @author Fabio Toste
*/
export default class Body
{
    /**
     *
     * @param {NGINT.Sprite} sprite - The sprite to apply body transformations
     *
     */
    constructor(sprite)
    {
        /**
         * The id of the body object, can be used for identify the instance
         *
         * @private
         * @member {number}
         */
        this.id = 0;

        /**
         * The name of the body object, can be used for identify the instance
         *
         * @private
         * @member {string}
         */
        this.name = "";

        /**
         * The type of the body object, can be used for identify the instance
         *
         * @private
         * @member {string}
         */
        this.type = "";

        /**
         * Sets the state of the body, used for skip some calculations if it'is "sleeping"
         *
         * @member {boolean}
         * @default false
         */
        this.sleeping = false;

        this._x = 0;
        this._y = 0;

        this.top = 0;
        this.bottom = 0;
        this.left = 0;
        this.right = 0;
        this.center = {x:0, y:0};

        this.frictionLimits = {left:{min:0, max:0.3}, right:{min:0, max:0.3}, top:{min:1, max:1}, bottom:{min:1, max:1}};

        this.dragCoefficient = 1.0;

        //this.environmentForceDirection = {x:1, y:1};
        //Calculated physics properties
        /**
         * The weight of the body (set by calculation)
         *
         * @private
         * @default 0
         */
        this._sprite = null;
        this._density = 1;
        this._volume = 1;
        this._area = {x:0, y:0};
        this._mass = 70;
        this._size =
        {
            pixels: {width: 1,height: 1,depth: 1},
            meters: {width: 1, height: 1, depth: 1},
            initial: {width: 1, height: 1, depth: 1}
        }
        this._friction = {left:0, right:0, top:0, bottom:0};
        this._bounciness = {left:0, right:0, top:0, bottom:0};

        /**
         * The variable to know if the tile is grabable or not
         *
         * @private
         * @member {boolean}
         */
        this.grabbable = false;

        //physics properties
        this.velocity = {x:0, y:0};
        this.acceleration = {x:0, y:0};
        this.restitution = {x:0, y:0};
        this.displacedVolume = 0;
        this.movingForce = {x:0, y:0};
        this.movingImpulse = {x:0, y:0};


        //variables for calculation
        this._environment = false;
        this._position = {x:0, y:0};
        this._direction = {x:0, y:0};
        this._lastPosition = {x:0, y:0};
        this._currentTile = {x:0, y:0};
        this._environmentForce = {x:0, y:0};
        this._netForce = {x:0, y:0};
        this._groundForce = {x:0, y:0};
        this._dragForce = {x:0, y:0};
        this._buoyantForce = {x:0, y:0};
        this._canScale =
        {
            x: true,
            y: true
        }
        this._onMax =
        {
            x: 0,
            y: 0
        }

        //collision limits
        this.limits =
        {
            left: -SETTINGS.BOUNDS.left,
            right: -SETTINGS.BOUNDS.right,
            top: -SETTINGS.BOUNDS.top,
            bottom: -SETTINGS.BOUNDS.bottom
        };

        /**
         * The array list of impulses to appply to this body
         *
         * @private
         * @member {array}
         */
        this.impulseList = [];

        /**
         * The array list of bodies in contact with this one
         *
         * @private
         * @member {array}
         */
        this._contactList = [];

        this.sprite = sprite;
        this.updatePhysicalProperties();
        this.updateBounds();
    }

    set x(value)
    {
        this._x = value;
        this._sprite.x = value;
    }

    get x()
    {
        return this._x;
    }

    set y(value)
    {
        this._y = value;
        this._sprite.y = value;
    }

    get y()
    {
        return this._y;
    }

    set width(value)
    {
        this._size.pixels.width = value;
        this._size.initial.width = value;
        this._size.meters.width = value / SETTINGS.PIXEL_METER_UNIT;
        this.updatePhysicalProperties();

        this._sprite.width = value;
    }

    get width()
    {
        return this._size.pixels.width;
    }

    set height(value)
    {
        this._size.pixels.height = value;
        this._size.initial.height = value;
        this._size.meters.height = value / SETTINGS.PIXEL_METER_UNIT;
        this.updatePhysicalProperties();

        this._sprite.height = value;
    }

    get height()
    {
        return this._size.pixels.height;
    }

    set depth(value)
    {
        this._size.pixels.depth = value;
        this._size.initial.depth = value;
        this._size.meters.depth = value / SETTINGS.PIXEL_METER_UNIT;
        this.updatePhysicalProperties();
    }

    get depth()
    {
        return this._size.pixels.depth;
    }

    set sprite(value)
    {
        this._sprite = value;

        this.width = this._sprite.width;
        this.height = this._sprite.height;
        this.depth = this._sprite.width;

        this.x = this._sprite.x;
        this.y = this._sprite.y;
    }

    get sprite()
    {
        return this._sprite;
    }

    set friction(value)
    {
        if(typeof(value)=='number')
            this._friction = {left:value, right:value, top:value, bottom:value};
        else
            this._friction = value;
    }

    get friction()
    {
        return this._friction;
    }

    set bounciness(value)
    {
        if(typeof(value)=='number')
            this._bounciness = {left:value, right:value, top:value, bottom:value};
        else
            this._bounciness = value;
    }

    get bounciness()
    {
        return this._bounciness;
    }

    set mass(value)
    {
        this._mass = value;
        this.updatePhysicalProperties();
    }

    get mass()
    {
        return this._mass;
    }

    set volume(value)
    {
        this._size.meters.depth = value / (this._size.meters.width * this._size.meters.height);
        this.updatePhysicalProperties();
    }

    get volume()
    {
        return this._volume;
    }

    set density(value)
    {
        this._density = value;
        this._mass = this._volume * this._density;
    }

    get density()
    {
        return this._density;
    }

    set area(value)
    {
        if(typeof(value)=='number')
            this._area = {x:value, y:value};
        else
            this._area = value;
    }

    get area()
    {
        return this._area;
    }

    resetForces()
    {
        this.movingImpulse = {x:0, y:0};
        this.movingForce = {x:0, y:0};
        return this;
    }

    updateBounds()
    {
        this.top = this.y - this.height;
        this.bottom = this.y;
        this.left = this.x;
        this.right = this.x + this.width;
        this.center = {x: this.x + (this.width / 2), y: this.y - (this.height / 2)};
        this.frictionArea =
        {
            left: {min: this.top + (this.height * this.frictionLimits.left.min), max: this.top + (this.height * this.frictionLimits.left.max)},
            right: {min: this.top + (this.height * this.frictionLimits.right.min), max: this.top + (this.height * this.frictionLimits.right.max)},
            top: {min: this.left + (this.width * this.frictionLimits.top.min), max: this.left + (this.width * this.frictionLimits.top.max)},
            bottom: {min: this.left + (this.width * this.frictionLimits.bottom.min), max: this.left + (this.width * this.frictionLimits.bottom.max)},
        }
        return this;
    }

    updatePhysicalProperties()
    {
        this._volume = this._size.meters.width * this._size.meters.height * this._size.meters.depth;
        this._density = this._mass / this._volume;
        this._area.x = this._size.meters.height * this._size.meters.depth;
        this._area.y = this._size.meters.width * this._size.meters.depth;
        return this;
    }

    applyForce(axis = "", force = 0)
    {
        if (force != 0 && (axis===AXIS.X || axis===AXIS.Y))
            this.movingForce[axis] += force;

        return this;
    }

    addImpulse(axis = "", impulse = 0, time = 0.1, delay = 0)
    {
        if(axis===AXIS.X || axis===AXIS.Y)
            this.impulseList.push({axis:axis, impulse:impulse, time:time, delta:0, delay:delay, delayDelta:0});

        return this;
    }

    applyImpulses(deltatime = 0)
    {
        let i, ilen;
        for (i = 0, ilen = this.impulseList.length; i < ilen; i++)
        {
            this.impulseList[i].delayDelta += deltatime;
            if (this.impulseList[i].impulse != 0 && this.impulseList[i].delayDelta >= this.impulseList[i].delay)
                this.movingImpulse[this.impulseList[i].axis] += this.impulseList[i].impulse;
        }

        return this;
    }

    clearImpulses(deltatime = 0)
    {
        let i;
        for (i = 0; i < this.impulseList.length; i++)
        {
            this.impulseList[i].delta += deltatime;
            if (this.impulseList[i].delta >= this.impulseList[i].time)
                this.impulseList.splice(i, 1);
        }

        return this;
    }

    beginUpdate(deltatime = 0)
    {

    }

    update(deltatime = 0)
    {
        if(this._sprite)
            this._sprite.update(deltatime);
    }

    endUpdate(deltatime = 0)
    {

    }
}
