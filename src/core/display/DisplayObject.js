/**
  * The DisplayObject is the base class of any graphic instance in TILES2D
  *
  * @class
  * @memberof TILES2D
  * @author Fabio Toste
*/
export default class DisplayObject
{
    constructor()
    {
        /**
         * The id of the body object, can be used for identify the instance or for indexing
         *
         * @private
         * @member {number}
         */
        this._id = -1;

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
        this._worldCenter = {x:0, y:0};
        this._center = {x:0, y:0};
    }

    set x(value)
    {
        this._x = value;
    }

    get x()
    {
        return this._x;
    }

    set y(value)
    {
        this._y = value;
    }

    get y()
    {
        return this._y;
    }

    set width(value)
    {
        this._width = value;
    }

    get width()
    {
        return this._width;
    }

    set height(value)
    {
        this._height = value;
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

    get center()
    {
        this._center.x = this.x + (this.width / 2);
        this._center.y = this.y + (this.height / 2);

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

    draw(deltatime = 0)
    {

    }
}
