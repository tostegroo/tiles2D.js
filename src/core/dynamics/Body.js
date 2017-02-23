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
    constructor(sprite, shape = new Rectangle())
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

        this.static = false;

        this.automaticPropertiesUpdate = false;

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

        this.dragCoefficient = 1.0;

        //Calculated physics properties
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
        this._frictionArea = {left:{top:0, bottom:0}, right:{top:0, bottom:0}, top:{left:0, right:0}, bottom:{left:0, right:0}};
        this._friction = {x: {'1':0, '-1':0}, y: {'1':0, '-1':0}};
        this._contactfriction = {x: {'1':0, '-1':0}, y: {'1':0, '-1':0}};

        /**
         * The bounciness of the body
         *
         * @private
         * @member {object}
         */
        this._bounciness = {x: {'1':0, '-1':0}, y: {'1':0, '-1':0}};

        //physics properties
        this.velocity = new Vector2(0, 0);
        this.acceleration = {x:0, y:0};

        //variables for calculation
        this._environment = false;
        this._displacedVolume = 0;
        this._environmentForce = {x:0, y:0};
        this._netForce = {x:0, y:0};
        this._frictionalForce = {x:0, y:0};
        this._dragForce = {x:0, y:0};
        this._buoyantForce = {x:0, y:0};
        this._movingForce = {x:0, y:0};
        this._movingImpulse = {x:0, y:0};
        this._direction = {x:0, y:0};
        this._maxScale = {left: 1, right: 1, top: 1, bottom: 1};
        this._impulseDirection = {x: 0, y: 0};

        /**
         * The array list of impulses to apply to this body
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

        this.shape = shape;
        this.sprite = sprite;
    }

    set x(value)
    {
        //this.shape.x = value;
        this._sprite.x = value;
    }

    get x()
    {
        return this._sprite.x;
    }

    set y(value)
    {
        //this.shape.y = value;
        this._sprite.y = value;
    }

    get y()
    {
        return this._sprite.y;
    }

    set width(value)
    {
        this._size.pixels.width = value;
        this._size.initial.width = value;
        this._size.meters.width = value / SETTINGS.PIXEL_METER_UNIT;
        this._area.y = this._size.meters.width * this._size.meters.depth;
        this._volume = this._size.meters.width * this._size.meters.height * this._size.meters.depth;

        this.shape.width = value;
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
        this._area.x = this._size.meters.height * this._size.meters.depth;
        this._volume = this._size.meters.width * this._size.meters.height * this._size.meters.depth;

        this.shape.height = value;
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
        this._area.x = this._size.meters.height * this._size.meters.depth;
        this._area.y = this._size.meters.width * this._size.meters.depth;
        this._volume = this._size.meters.width * this._size.meters.height * this._size.meters.depth;
    }

    get depth()
    {
        return this._size.pixels.depth;
    }

    set frictionArea(value)
    {
        if(typeof(value)=='number')
            this._frictionArea = {left:{top:0, bottom:value}, right:{top:0, bottom:value}, top:{left:0, right:value}, bottom:{left:0, right:value}};
        else if(typeof(value)=='object')
        {
            if(value.hasOwnProperty('left'))
            {
                if(typeof(value.left)=='number')
                {
                    this._frictionArea.left.top = value.left;
                    this._frictionArea.left.bottom = value.left;
                }
                else if(typeof(value)=='object')
                    this._frictionArea.left = value.left;
            }

            this._frictionArea = {x: {'1': value.left, '-1': value.right}, y: {'1': value.top, '-1': value.bottom}};
        }
        else
            this._frictionArea = this._frictionArea;
    }

    get frictionArea()
    {
        return {
            left:
            {
                top: this.y + (this.height * this._frictionArea.left.top),
                bottom: this.y + (this.height * this._frictionArea.left.bottom)
            },
            right:
            {
                top: this.y + (this.height * this._frictionArea.right.top),
                bottom: this.y + (this.height * this._frictionArea.right.bottom)
            },
            top:
            {
                left: this.x + (this.width * this._frictionArea.top.left),
                right: this.x + (this.width * this._frictionArea.top.right)
            },
            bottom:
            {
                left: this.x + (this.width * this._frictionArea.bottom.left),
                right: this.x + (this.width * this._frictionArea.bottom.right)
            }
        }
    }

    set sprite(value)
    {
        this._sprite = value;

        this.width = this._sprite.width;
        this.height = this._sprite.height;
        this.depth = this._sprite.width;

        this.shape.x = this._sprite.x;
        this.shape.y = this._sprite.y;
    }

    get sprite()
    {
        return this._sprite;
    }

    set friction(value)
    {
        if(typeof(value)=='number')
        {
            value = Math.min(Math.max(value, 0), 1);

            this._friction.x['1'] = value;
            this._friction.x['-1'] = value;
            this._friction.y['1'] = value;
            this._friction.y['-1'] = value;
        }
        else if(typeof(value)=='object')
        {
            if(value.hasOwnProperty('left'))
            {
                value.left = Math.min(Math.max(value.left, 0), 1);
                this._friction.x['1'] = value.left;
            }

            if(value.hasOwnProperty('right'))
            {
                value.right = Math.min(Math.max(value.right, 0), 1);
                this._friction.x['-1'] = value.right;
            }

            if(value.hasOwnProperty('top'))
            {
                value.top = Math.min(Math.max(value.top, 0), 1);
                this._friction.y['1'] = value.top;
            }

            if(value.hasOwnProperty('bottom'))
            {
                value.bottom = Math.min(Math.max(value.bottom, 0), 1);
                this._friction.y['-1'] = value.bottom;
            }
        }
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
        {
            value = Math.min(Math.max(value, 0), 1);

            this._bounciness.x['1'] = value;
            this._bounciness.x['-1'] = value;
            this._bounciness.y['1'] = value;
            this._bounciness.y['-1'] = value;
        }
        else if(typeof(value)=='object')
        {
            if(value.hasOwnProperty('left'))
            {
                value.left = Math.min(Math.max(value.left, 0), 1);
                this._bounciness.x['1'] = value.left;
            }

            if(value.hasOwnProperty('right'))
            {
                value.right = Math.min(Math.max(value.right, 0), 1);
                this._bounciness.x['-1'] = value.right;
            }

            if(value.hasOwnProperty('top'))
            {
                value.top = Math.min(Math.max(value.top, 0), 1);
                this._bounciness.y['1'] = value.top;
            }

            if(value.hasOwnProperty('bottom'))
            {
                value.bottom = Math.min(Math.max(value.bottom, 0), 1);
                this._bounciness.y['-1'] = value.bottom;
            }
        }
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

        if(this.automaticPropertiesUpdate)
            this._density = this._mass / this._volume;
    }

    get mass()
    {
        return this._mass;
    }

    set volume(value)
    {
        this._size.meters.depth = value / (this._size.meters.width * this._size.meters.height);

        if(this.automaticPropertiesUpdate)
            this._density = this._mass / this._volume;
    }

    get volume()
    {
        return this._volume;
    }

    set density(value)
    {
        this._density = value;

        if(this.automaticPropertiesUpdate)
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
            this._sprite.draw(deltatime);
    }

    endUpdate(deltatime = 0)
    {
        //Clear forces
        this.clearForces();

        //Clear all finished impulses
        this.clearImpulses();
    }
}
