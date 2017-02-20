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
         * The id of the body object, can be used for identify the instance or for indexing
         *
         * @private
         * @member {number}
         */
        this._id = 0;

        /**
         * The name of the body object, can be used for identify the instance
         *
         * @member {string}
         */
        this.name = "";

        /**
         * The type of the body object, can be used for identify the instance
         *
         * @member {string}
         */
        this.type = "";

        /**
         * The variable to know if the tile is grabable or not
         *
         * @private
         * @member {boolean}
         */
        this.grabbable = false;

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

        this.frictionLimits = {left:{min:0, max:0.3}, right:{min:0, max:0.3}, top:{min:0, max:1}, bottom:{min:0, max:1}};

        this.dragCoefficient = 1.0;

        this.static = false;

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
        this._friction = {x: {'1':0, '-1':0}, y: {'1':0, '-1':0}};
        this._contactfriction = {x: {'1':0, '-1':0}, y: {'1':0, '-1':0}};
        this._bounciness = {x: {'1':0, '-1':0}, y: {'1':0, '-1':0}};

        //physics properties
        this.velocity = new Vector2(0, 0);
        this.acceleration = {x:0, y:0};

        //variables for calculation
        this._environment = false;
        this._displacedVolume = 0;
        this._bounds = {left:0, right:0, top:0, bottom:0};
        this._center = {x:0, y: 0};
        this._restitution = {x:0, y:0};
        this._position = {x:0, y:0};
        this._direction = {x:0, y:0};
        this._currentTile = {x:0, y:0};
        this._environmentForce = {x:0, y:0};
        this._netForce = {x:0, y:0};
        this._frictionalForce = {x:0, y:0};
        this._dragForce = {x:0, y:0};
        this._buoyantForce = {x:0, y:0};
        this._movingForce = {x:0, y:0};
        this._movingImpulse = {x:0, y:0};
        this._canScale =
        {
            left: true,
            right: true,
            top: true,
            bottom: true
        }
        this._impulseDirection =
        {
            x: 0,
            y: 0
        }

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
            this._friction = {x: {'1': value, '-1': value}, y: {'1': value, '-1': value}};
        else if(typeof(value)=='object')
            this._friction = {x: {'1': value.left, '-1': value.right}, y: {'1': value.top, '-1': value.bottom}};
        else
            this._friction = this._friction;
    }

    get friction()
    {
        return {
            left: this._friction.x['1'],
            right: this._friction.x['-1'],
            top: this._friction.y['1'],
            bottom: this._friction.y['-1'],
        };
    }

    set bounciness(value)
    {
        if(typeof(value)=='number')
            this._bounciness = {x: {'1': value, '-1': value}, y: {'1': value, '-1': value}};
        else if(typeof(value)=='object')
            this._bounciness = {x: {'1': value.left, '-1': value.right}, y: {'1': value.top, '-1': value.bottom}};
        else
            this._bounciness = this._bounciness;
    }

    get bounciness()
    {
        return {
            left: this._bounciness.x['1'],
            right: this._bounciness.x['-1'],
            top: this._bounciness.y['1'],
            bottom: this._bounciness.y['-1'],
        };
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

    /*set density(value)
    {
        this._density = value;
        this._mass = this._volume * this._density;
    }*/

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

    _updateBounds()
    {
        this._bounds =
        {
            top: this._position.y - this.height,
            bottom: this._position.y,
            left: this._position.x,
            right: this._position.x + this.width,
        }
        this._center = {x: this._position.x + (this.width / 2), y: this._position.y - (this.height / 2)};
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

    overlaps(body)
    {
        let overlaps_x = this._bounds.left < body._bounds.right && this._bounds.right > body._bounds.left;
        let overlaps_y = this._bounds.top < body._bounds.bottom && this._bounds.bottom > body._bounds.top;

        let value_x = (overlaps_y) ? Math.max(0, Math.min(this._bounds.right, body._bounds.right) - Math.max(this._bounds.left, body._bounds.left)) : 0;
        let value_y = (overlaps_x) ? Math.max(0, Math.min(this._bounds.bottom, body._bounds.bottom) - Math.max(this._bounds.top, body._bounds.top)) : 0;

        let dx = this._center.x - body._center.x;
        let direction_x = (dx > 0) ? 1 : -1;

        let dy = this._center.y - body._center.y;
        let direction_y = (dy > 0) ? 1 : -1;

        let angle = Math.atan2(dy, dx);

        return {
            overlap: {x: overlaps_x, y: overlaps_y},
            area: {x: value_x / this.width, y: value_y / this.height},
            value: {x: value_x, y: value_y},
            angle: angle,
            direction: {x: direction_x, y: direction_y}
        };
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
            this._movingForce[axis] += force;

        return this;
    }

    clearForces()
    {
        this._movingForce = {x:0, y:0};
        return this;
    }

    addImpulse(axis = "", force = 0, time = 0.1, delay = 0)
    {
        if(axis===AXIS.X || axis===AXIS.Y)
            this._impulseList.push({axis:axis, force:force, time:delay+time, delay:delay, _dt:0});

        return this;
    }

    removeImpulses(axis = "")
    {
        if(axis===AXIS.X || axis===AXIS.Y)
        {
            this._movingImpulse[axis] = 0;

            let i;
            for (i = 0; i < this._impulseList.length; i++)
            {
                if(this._impulseList[i].axis==axis)
                    this._impulseList.splice(i, 1);
            }
        }
        return this;
    }

    applyImpulses(deltatime = 0)
    {
        let i, ilen;
        for (i = 0, ilen = this._impulseList.length; i < ilen; i++)
        {
            this._impulseList[i]._dt += deltatime;
            if (this._impulseList[i].force != 0 && this._impulseList[i]._dt >= this._impulseList[i].delay)
                this._movingImpulse[this._impulseList[i].axis] += this._impulseList[i].force;
        }

        return this;
    }

    clearImpulses()
    {
        this._movingImpulse = {x:0, y:0};

        let i;
        for (i = 0; i < this._impulseList.length; i++)
        {
            if (this._impulseList[i]._dt >= this._impulseList[i].time)
                this._impulseList.splice(i, 1);
        }
        return this;
    }

    beginUpdate(deltatime = 0)
    {
        //Reset all the impulse directions
        this._impulseDirection.x = 0;
        this._impulseDirection.y = 0;

        //Apply all the impulses
        this.applyImpulses(deltatime);
    }

    update(deltatime = 0)
    {
        if(this._sprite)
            this._sprite.update(deltatime);
    }

    endUpdate(deltatime = 0)
    {
        //Clear forces
        this.clearForces();
        //Clear all finished impulses
        this.clearImpulses();
        //Update body bounds
        this.updateBounds();
    }
}
