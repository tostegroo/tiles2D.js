import { SHAPES } from '../../constants';
import { AXIS } from '../../constants';

/**
 * Rectangle object is an area defined by its position, as indicated by its top-left corner
 * point (x, y) and by its width and its height.
 *
 * @class
 * @memberof NGINT
 */
export default class Rectangle
{
    /**
     * @param {number} [x = 0] - The X coordinate of the upper-left corner of the rectangle
     * @param {number} [y = 0] - The Y coordinate of the upper-left corner of the rectangle
     * @param {number} [width = 0] - The overall width of this rectangle
     * @param {number} [height = 0] - The overall height of this rectangle
     */
    constructor(x = 0, y = 0, width = 0, height = 0)
    {
        /**
         * @member {number}
         * @default 0
         */
        this.x = x;

        /**
         * @member {number}
         * @default 0
         */
        this.y = y;

        /**
         * @member {number}
         * @default 0
         */
        this.width = width;

        /**
         * @member {number}
         * @default 0
         */
        this.height = height;

        /**
         * The type of the object, mainly used to avoid `instanceof` checks
         *
         * @member {number}
         * @readOnly
         * @default NGINT.SHAPES.RECT
         * @see NGINT.SHAPES
         */
        this.type = SHAPES.RECT;


        /**
         * The bounds object to return in some loop cases
         *
         * @private
         * @member {object.JSON}
         * @readOnly
         * @default 0
         */
        this._bounds =
        {
            top: this.top,
            bottom: this.bottom,
            left: this.left,
            right: this.right,
            center: {x: this.x + (this.width / 2), y: this.y - (this.height / 2)}
        }

        /**
         * The intersection object to return in some loop cases
         *
         * @private
         * @member {object.JSON}
         * @readOnly
         * @default 0
         */
        this._intersection =
        {
            x: 0,
            y: 0,
            width: 0,
            height: 0,
            angle: 0,
            direction: {x:0 , y:0}
        }
    }

    /**
     * returns the center of the rectangle
     *
     * @member {number}
     */
    get center()
    {
        this._bounds.center.x = this.x + (this.width / 2);
        this._bounds.center.y = this.y + (this.height / 2);

        return this._bounds.center;
    }

    /**
     * returns the left edge of the rectangle
     *
     * @member {number}
     */
    get left()
    {
        return this.x;
    }

    /**
     * returns the right edge of the rectangle
     *
     * @member {number}
     */
    get right()
    {
        return this.x + this.width;
    }

    /**
     * returns the top edge of the rectangle
     *
     * @member {number}
     */
    get top()
    {
        return this.y;
    }

    /**
     * returns the bottom edge of the rectangle
     *
     * @member {number}
     */
    get bottom()
    {
        return this.y + this.height;
    }

    /**
     * returns the the bounds information about the rectangle
     *
     */
    get bounds()
    {
        this._bounds.top = this.top;
        this._bounds.bottom = this.bottom;
        this._bounds.left = this.left;
        this._bounds.right = this.right;
        this._bounds.center.x = this.x + (this.width / 2);
        this._bounds.center.y = this.y + (this.height / 2);

        return this._bounds;
    }

    /**
     * A constant zero rectangle.
     *
     * @static
     * @constant
     */
    static get zero()
    {
        return new Rectangle(0, 0, 0, 0);
    }

    /**
     * Creates a clone of this Rectangle
     *
     * @return {NGINT.Rectangle} a copy of the rectangle
     */
    clone()
    {
        return new Rectangle(this.x, this.y, this.width, this.height);
    }

    /**
     * Copies another rectangle to this one.
     *
     * @param {NGINT.Rectangle} rectangle - The rectangle to copy.
     * @return {NGINT.Rectangle} Returns itself.
     */
    copy(rectangle)
    {
        this.x = rectangle.x;
        this.y = rectangle.y;
        this.width = rectangle.width;
        this.height = rectangle.height;

        return this;
    }

    /**
     * Checks whether the x and y coordinates given are contained within this Rectangle
     *
     * @param {number} x - The X coordinate of the point to test
     * @param {number} y - The Y coordinate of the point to test
     * @return {boolean} Whether the x/y coordinates are within this Rectangle
     */
    contains(x, y)
    {
        if (this.width <= 0 || this.height <= 0)
            return false;

        if (x >= this.x && x < this.x + this.width)
        {
            if (y >= this.y && y < this.y + this.height)
                return true;
        }

        return false;
    }

    /**
     * Pads the rectangle making it grow in all directions.
     *
     * @param {number} paddingX - The horizontal padding amount.
     * @param {number} paddingY - The vertical padding amount.
     */
    pad(paddingX, paddingY)
    {
        paddingX = paddingX || 0;
        paddingY = paddingY || ((paddingY !== 0) ? paddingX : 0);

        this.x -= paddingX;
        this.y -= paddingY;

        this.width += paddingX * 2;
        this.height += paddingY * 2;
    }

    /**
     * Fits this rectangle around the passed one.
     *
     * @param {NGINT.Rectangle} rectangle - The rectangle to fit.
     */
    fit(rectangle)
    {
        if (this.x < rectangle.x)
        {
            this.width += this.x;
            if (this.width < 0)
                this.width = 0;

            this.x = rectangle.x;
        }

        if (this.y < rectangle.y)
        {
            this.height += this.y;
            if (this.height < 0)
                this.height = 0;

            this.y = rectangle.y;
        }

        if (this.x + this.width > rectangle.x + rectangle.width)
        {
            this.width = rectangle.width - this.x;
            if (this.width < 0)
                this.width = 0;
        }

        if (this.y + this.height > rectangle.y + rectangle.height)
        {
            this.height = rectangle.height - this.y;
            if (this.height < 0)
                this.height = 0;
        }
    }

    /**
     * Enlarges this rectangle to include the passed rectangle.
     *
     * @param {NGINT.Rectangle} rectangle - The rectangle to include.
     */
    enlarge(rectangle)
    {
        const x1 = Math.min(this.x, rectangle.x);
        const x2 = Math.max(this.x + this.width, rectangle.x + rectangle.width);
        const y1 = Math.min(this.y, rectangle.y);
        const y2 = Math.max(this.y + this.height, rectangle.y + rectangle.height);

        this.x = x1;
        this.width = x2 - x1;
        this.y = y1;
        this.height = y2 - y1;
    }

    /**
     * Checks if a shape intersects with this rectangle.
     *
     * @param {NGINT.Rectangle|NGINT.Circle} shape - The shape to compares.
     * @param {NGINT.AXIS} axis - Optional axis, if you wanna know the intersection in one axis only.
     */
    intersects(shape, axis = "")
    {
        let intersects = false;

        if(axis==AXIS.X)
            intersects = this.left < shape.right && this.right > shape.left;
        else if(axis==AXIS.Y)
            intersects = this.top < shape.bottom && this.bottom > shape.top;
        else
            intersects = this.left < shape.right && this.right > shape.left && this.top < shape.bottom && this.bottom > shape.top;

        return intersects;
    }

    /**
     * Checks if a shape intersects with this rectangle.
     *
     * @param {NGINT.Rectangle|NGINT.Circle} shape - The shape to compares.
     */
    intersection(shape)
    {
        let returnIntersection = false;

        if(this.intersects(shape))
        {
            this._intersection.x = Math.max(this.left, shape.left);
            this._intersection.y = Math.max(this.top, shape.top);
            this._intersection.width = Math.max(0, Math.min(this.right, shape.right) - Math.max(this.left, shape.left));
            this._intersection.height = Math.max(0, Math.min(this.bottom, shape.bottom) - Math.max(this.top, shape.top));

            let dx = this.center.x - shape.center.x;
            this._intersection.direction.x = (dx > 0) ? 1 : -1;

            let dy = this.center.y - shape.center.y;
            this._intersection.direction.y = (dy > 0) ? 1 : -1;

            this._intersection.angle = Math.atan2(dy, dx);

            returnIntersection = this._intersection;
        }

        return returnIntersection;
    }
}
