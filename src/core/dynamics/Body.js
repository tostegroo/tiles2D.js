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
     * @param hitbox_width - The width of the body hitbox (used for calculations)
     * @param hitbox_height - The height of the body hitbox (used for calculations)
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

        this.gravityDirection = {x:1, y:1};
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
        this.friction = 30;
        this.bounciness = 0;
        this.groundResistanceMultiply = {x:1, y:6};
        this.groundResistanceDirection = {x:0, y:1};

        //Calculation physics properties
        this._velocity = {x:0, y:0};
        this._acceleration = {x:0, y:0};
        this._direction = {x:0, y:0};
        this._restitution = {x:0, y:0};
        this._displacedVolume = 0;
        this._contactPoint = new Rectangle(0, 0, 1, 0.3);
        this._overlapRectangle = new Rectangle(0, 0, 0, 0);

        //Position variables
        this._position = new {x:0, y:0};
        this._lastPosition = new {x:0, y:0};
        this._currentTile = new {x:0, y:0};

        //forces
        this._movingForce = new {x:0, y:0};
        this._movingImpulse = new {x:0, y:0};

        this._gravityForce = new {x:0, y:0};
        this._netForce = new {x:0, y:0};
        this._groundForce = new {x:0, y:0};
        this._dragForce = new {x:0, y:0};
        this._buoyantForce = new {x:0, y:0};

        //collision limits
        this.limits =
        {
            minX: -Settings.BOUNDS.minX,
            maxX: -Settings.BOUNDS.maxX,
            minY: -Settings.BOUNDS.minY,
            maxY: -Settings.BOUNDS.maxY
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
        this.contactList = [];

        this.sprite = sprite;
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
        this._mass = this._weight / settings.GRAVITY.y;
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
    }

    updatePhysicalProperties()
    {
        this._volume = this._size.meters.width * this._size.meters.height * this._size.meters.depth;
        this._density = this._mass / this._volume;
        this._weight = this._mass * settings.GRAVITY.y;
        this._verticalArea = this._size.meters.width * this._size.meters.depth;
        this._horizontalArea = this._size.meters.height * this._size.meters.depth;
    }

    applyForce(axis = "", force = 0)
    {
        if (force != 0 && (axis===AXIS.x || axis===AXIS.y))
            this._movingForce[axis] += force;
    }

    addImpulse(axis = "", impulse = 0, time = 0.1, delay = 0)
    {
        if(axis===AXIS.x || axis===AXIS.y)
            this._impulseList.push({axis:axis, impulse:impulse, time:time, delta:0, delay:delay, delayDelta:0});
    }

    applyImpulses(deltatime)
    {
        let i, ilen;
        for (i = 0, ilen = this.impulseList.length; i < ilen; i++)
        {
            this.impulseList[i].delayDelta += deltatime;
            if (this.impulseList[i].impulse != 0 && this.impulseList[i].delayDelta >= this.impulseList[i].delay)
                this.movingImpulse[this.impulseList[i].axis] += this.impulseList[i].impulse;
        }
    }

    clearImpulses()
    {
        let i, ilen;
        for (i = 0, ilen = this.impulseList.length; i < ilen; i++)
        {
            //this.impulseList[i].delayDelta += deltatime;
            if (this.impulseList[i].delta >= this.impulseList[i].time)
                this.impulseList.splice(i, 1);
        }
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
