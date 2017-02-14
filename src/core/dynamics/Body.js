import Vector2 from '../geom/Vector2';
import Rectangle from '../geom/shapes/Rectangle';
import Settings from '../settings';
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

        this.onMax =
        {
            x: 0,
            y: 0
        }

        /**
         * Sets the state of the body, used for skip some calculations if it'is "sleeping"
         *
         * @member {boolean}
         * @default false
         */
        this.sleeping = false;
        this.increase =
        {
            width: true,
            height: true
        }
        this.contactPoint = {x:1, y:0.3};

        this.x = 0;
        this.y = 0;
        this.top = 0;
        this.bottom = 0;
        this.left = 0;
        this.right = 0;
        this.center = {x:0, y:0};
        this.frictionLimits = {left:{min:0, max:0.3}, right:{min:0, max:0.3}, top:{min:1, max:1}, bottom:{min:1, max:1}};

        this.environment = null;
        this.environmentForceDirection = {x:1, y:1};

        this.hitbox = null;

        //Calculated physics properties
        /**
         * The weight of the body (set by calculation)
         *
         * @private
         * @default 0
         */
        this._sprite = null;
        this._weight = 0;
        this._density = 1;
        this._volume = 1;
        this._verticalArea: 1,
        this._horizontalArea: 1;
        this._mass = 70;
        this._size =
        {
            pixels:
            {
                width: 1,
                height: 1,
                depth: 1
            },
            meters:
            {
                width: 1,
                height: 1,
                depth: 1
            },
            ininital:
            {
                width: 1,
                height: 1,
                depth: 1
            }
        }

        this.dragCoefficient = 0.6;
        this.friction = {x:30, y:30};
        this.bounciness = {x:0, y:0};

        this.resistanceMultiply = {x:1, y:6};
        this.resistanceDirection = {x:0, y:1};

        /**
         * The variable to know if the tile is grabable or not
         *
         * @private
         * @member {boolean}
         */
        this.grabbable = false;

        //Calculation physics properties
        this._velocity = {x:0, y:0};
        this._acceleration = {x:0, y:0};
        this._restitution = {x:0, y:0};
        this._displacedVolume = 0;
        this._overlapRectangle = new Rectangle(0, 0, 0, 0);

        //Position variables for calculation
        this._position = {x:0, y:0};
        this._direction = {x:0, y:0};
        this._lastPosition = {x:0, y:0};
        this._currentTile = {x:0, y:0};

        //forces
        this._movingForce = {x:0, y:0};
        this._movingImpulse = {x:0, y:0};

        this._environmentForce = {x:0, y:0};
        this._netForce = {x:0, y:0};
        this._groundForce = {x:0, y:0};
        this._dragForce = {x:0, y:0};
        this._buoyantForce = {x:0, y:0};

        //collision limits
        this.limits =
        {
            left: -Settings.BOUNDS.left,
            right: -Settings.BOUNDS.right,
            top: -Settings.BOUNDS.top,
            bottom: -Settings.BOUNDS.bottom
        };

        /**
         * The array list of impulses to appply to this body
         *
         * @private
         * @member {array}
         */
        this._impulseList = [];

        /**
         * The array list of bodies in contact with this one
         *
         * @private
         * @member {array}
         */
        this._contactList = [];

        this.sprite = sprite;
        updateBounds();
    }

    set sprite(value)
    {
        this._sprite = value;

        this.width = 10;
        this.height = 10;
        this.depth = 8;

        if(this.hitbox == null)
            this.hitbox = new Rectangle(0, 0, this.width, this.height);
    }

    get sprite()
    {
        return this._sprite;
    }

    set mass(value)
    {
        this._mass = value;

        updatePhysicalProperties();
    }

    get mass()
    {
        return this._mass;
    }

    set volume(value)
    {
        this._size.meters.depth = value / (this._size.meters.width * this._size.meters.height);

        updatePhysicalProperties();
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

    set weight(value)
    {
        this._weight = value;
        this._mass = this._weight / settings.ENVIRONMENT_FORCE.y;
    }

    get weight()
    {
        return this._weight;
    }

    set verticalArea(value)
    {
        this._verticalArea = value;
    }

    get verticalArea()
    {
        return this._verticalArea;
    }

    set horizontalArea(value)
    {
        this._horizontalArea = value;
    }

    get horizontalArea()
    {
        return this._horizontalArea;
    }

    set width(value)
    {
        this._size.pixels.width = value;
        this._size.initial.width = value;
        this._size.meters.width = value / settings.PIXEL_METER_UNIT;

        updatePhysicalProperties();
    }

    get width()
    {
        return this._size.pixels.width;
    }

    set height(value)
    {
        this._size.pixels.height = value;
        this._size.initial.height = value;
        this._size.meters.height = value / settings.PIXEL_METER_UNIT;

        updatePhysicalProperties();
    }

    get height()
    {
        return this._size.pixels.height;
    }

    set depth(value)
    {
        this._size.pixels.depth = value;
        this._size.initial.depth = value;
        this._size.meters.depth = value / settings.PIXEL_METER_UNIT;

        updatePhysicalProperties();
    }

    get depth()
    {
        return this._size.pixels.depth;
    }

    resetForces()
    {
        this._movingImpulse = {x:0, y:0};
        this._movingForce = {x:0, y:0};
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
            left: {min: this.top + (this.height * frictionLimits.left.min), max: this.top + (this.height * frictionLimits.left.max)},
            right: {min: this.top + (this.height * frictionLimits.right.min), max: this.top + (this.height * frictionLimits.right.max)},
            top: {min: this.left + (this.width * frictionLimits.top.min), max: this.left + (this.width * frictionLimits.top.max)},
            bottom: {min: this.left + (this.width * frictionLimits.bottom.min), max: this.left + (this.width * frictionLimits.bottom.max)},
        }
        return this;
    }

    updatePhysicalProperties()
    {
        this._volume = this._size.meters.width * this._size.meters.height * this._size.meters.depth;
        this._density = this._mass / this._volume;
        this._weight = this._mass * settings.ENVIRONMENT_FORCE.y;
        this._verticalArea = this._size.meters.width * this._size.meters.depth;
        this._horizontalArea = this._size.meters.height * this._size.meters.depth;
        return this;
    }

    applyForce(axis = "", force = 0)
    {
        if (force != 0 && (axis===AXIS.x || axis===AXIS.y))
            this._movingForce[axis] += force;

        return this;
    }

    addImpulse(axis = "", impulse = 0, time = 0.1, delay = 0)
    {
        if(axis===AXIS.x || axis===AXIS.y)
            this._impulseList.push({axis:axis, impulse:impulse, time:time, delta:0, delay:delay, delayDelta:0});

        return this;
    }

    applyImpulses(deltatime)
    {
        let i, ilen;
        for (i = 0, ilen = this._impulseList.length; i < ilen; i++)
        {
            this._impulseList[i].delayDelta += deltatime;
            if (this._impulseList[i].impulse != 0 && this._impulseList[i].delayDelta >= this._impulseList[i].delay)
                this.movingImpulse[this._impulseList[i].axis] += this._impulseList[i].impulse;
        }

        return this;
    }

    clearImpulses()
    {
        let i, ilen;
        for (i = 0, ilen = this._impulseList.length; i < ilen; i++)
        {
            //this._impulseList[i].delayDelta += deltatime;
            if (this._impulseList[i].delta >= this._impulseList[i].time)
                this._impulseList.splice(i, 1);
        }

        return this;
    }

    beginUpdate(deltatime = 0)
    {

    }

    update(deltatime = 0)
    {

    }

    endUpdate(deltatime = 0)
    {

    }
