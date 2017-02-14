/**
  * The DisplayObject is the base class of any graphic instance in NGINT
  *
  * @class
  * @memberof NGINT
  * @author Fabio Toste
*/
export default class DisplayObject
{
    /**
     *
     * @param [x=0] x - The x position
     * @param [y=0] y - The y position
     * @param [width=10] width - The width
     * @param [height=10] height - The height
     * @param [color='#000'] color - The color
     *
     */
    constructor()
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

        this._parent = null;
        this._x = 0;
        this._y = 0;
        this._width = 0;
        this._height = 0;
        this._rotation = 0;
        this._rotationX = 0;
        this._rotationY = 0;
        this._scale = 0;
        this._scaleX = 0;
        this._scaleY = 0;
        this._pivotX = 0.5;
        this._pivotY = 0.5;
        this._color = '';
        this._visible = true;
        this._alpha = 1;
        this._parent = null;
        this._mouseX = 0;
        this._mouseY = 0;
        this._bounds =
        {
            top: 0,
            bottom: 0,
            left: 0,
            right: 0
        }
        this._worldCenter = {x:0, y:0};
        this._center = {x:0, y:0};
    }

    set x(value)
    {
        this._x = value;
        this.updateBounds();
    }

    get x()
    {
        return this._x;
    }

    set y(value)
    {
        this._y = value;
        this.updateBounds();
    }

    get y()
    {
        return this._y;
    }

    set width(value)
    {
        this._width = value;
        this.updateBounds();
    }

    get width()
    {
        return this._width;
    }

    set height(value)
    {
        this._height = value;
        this.updateBounds();
    }

    get height()
    {
        return this._height;
    }

    set color(value)
    {
        this._color = value;
    }

    get color()
    {
        return this._color;
    }

    set alpha(value)
    {
        this._alpha = value;
    }

    get alpha()
    {
        return this._alpha;
    }

    get bounds()
    {
        return this._bounds;
    }

    get center()
    {
        return this._center;
    }

    get worldCenter()
    {
        return this._worldCenter;
    }

    get localPosition()
    {
        return {x: this.x, y: this.y};
    }

    get globalPosition()
    {
        if(this._parent!=null)
            return {x: this._parent.x + this.x, y: this._parent.y + this.y};
        else
            this.localPosition();
    }
    
    hitTestObject(displayObject = null)
    {

    }

    hitTestPoint(x = 0, y = 0)
    {

    }

    updateBounds()
    {
        this._bounds.top = this.y - this.height;
        this._bounds.bottom = this.y;
        this._bounds.left = this.x;
        this._bounds.right = this.x + this.width;
        this._worldCenter = {x: this.x + (this.width / 2), y: this.y - (this.height / 2)};
        this._center = {x: this.width / 2, y: this.height / 2};
    }

    update(deltatime = 0)
    {

    }
}
