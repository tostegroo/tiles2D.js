/**
 * The Vector2 object represents a location in a two-dimensional coordinate system,
 * where x represents the horizontal axis and y represents the vertical axis.
 *
 * @class
 * @memberof NGINT
 * @author Fabio Toste
 */
export default class Vector2
{
    /**
     * @param {number} [x = 0] - position of the vector on the x axis
     * @param {number} [y = 0] - position of the vector on the y axis
     */
    constructor(x = 0, y = 0)
    {
        /**
         * @member {number}
         * @default 0
         */
        this._x = 0;

        /**
         * @member {number}
         * @default 0
         */
         this._y = 0;

        this.x = x;
        this.y = y;
    }

    /**
     * Creates a clone of this vector
     *
     * @return {NGINT.Vector2} a copy of the vector
     */
    clone()
    {
        return new Vector2(this.x, this.y);
    }

    /**
     * Copies x and y from the given vector
     *
     * @param {NGINT.Vector2} v - The vector to copy.
     */
    copy(v)
    {
        this.set(v.x, v.y);
    }

    /**
     * Returns true if the given vector is equal to this vector
     *
     * @param {NGINT.Vector2} v - The vector to check
     *
     * @returns {boolean} Whether the given vector equal to this vector
     */
    equals(v)
    {
        return (v.x === this.x) && (v.y === this.y);
    }

    /**
     * Sets the vector to a new x and y position.
     * If y is omitted, both x and y will be set to x.
     *
     * @param {number} [x=0] - position of the vector on the x axis
     * @param {number} [y=0] - position of the vector on the y axis
     */
    set(x, y)
    {
        this.x = x || 0;
        this.y = y || ((y !== 0) ? this.x : 0);
    }

    /**
     * Returns the x position of the vector
     *
     * @returns {number} The vector x position
     */
    get x()
    {
        return this._x;
    }

    /**
     * Sets the vector to a new x position.
     *
     * @param {number} [x=0] - position of the vector on the x axis
     */
    set x(x = 0)
    {
        this._x = x;
    }

    /**
     * Returns the y position of the vector
     *
     * @returns {number} The vector y position
     */
    get y()
    {
        return this._y;
    }

    /**
     * Sets the vector to a new y position.
     *
     * @param {number} [y=0] - position of the vector on the y axis
     */
    set y(y = 0)
    {
        this._y = y;
    }

    /**
     * Sets the vector x and y positions to zero
     *
     * @return {NGINT.Vector2} this vector for chaining
     */
    zero()
    {
        this.x = 0;
        this.y = 0;
        return this;
    }

    /**
     * Adds to the vector the x and y position of a given vector
     *
     * @param {NGINT.Vector2} v - The vector to add
     *
     * @return {NGINT.Vector2} this vector for chaining
     */
    add(v)
    {
        this.x += v.x;
        this.y += v.y;
        return this;
    }

    /**
     * Adds to the vector x and y position a given scalar number
     *
     * @param {number} n - The number to add
     *
     * @return {NGINT.Vector2} this vector for chaining
     */
    addScalar(n)
    {
        this.x += n;
        this.y += n;
        return this;
    }

    /**
     * Subtracts from the vector the x and y position of a given vector
     *
     * @param {NGINT.Vector2} v - The vector to subtract
     *
     * @return {NGINT.Vector2} this vector for chaining
     */
    subtract(v)
    {
        this.x -= v.x;
        this.y -= v.y;
        return this;
    }

    /**
     * Subtracts from the vector x and y position a given scalar number
     *
     * @param {number} n - The number to subtract
     *
     * @return {NGINT.Vector2} this vector for chaining
     */
    subtractScalar(n)
    {
        this.x -= n;
        this.y -= n;
        return this;
    }

    /**
     * Multiplies to the vector the x and y position of a given vector
     *
     * @param {NGINT.Vector2} v - The vector to multiply
     *
     * @return {NGINT.Vector2} this vector for chaining
     */
    multiply(v)
    {
        this.x *= v.x;
        this.y *= v.y;
        return this;
    }

    /**
     * Multiplies to the vector x and y position a given scalar number
     *
     * @param {number} n - The number to multiply
     *
     * @return {NGINT.Vector2} this vector for chaining
     */
    multiplyScalar(n)
    {
        this.x *= n;
        this.y *= n;
        return this;
    }

    /**
     * Divides the vector for the x and y position of a given vector
     *
     * @param {NGINT.Vector2} v - The vector to divide
     *
     * @return {NGINT.Vector2} this vector for chaining
     */
    divide(v)
    {
        this.x /= v.x;
        this.y /= v.y;
        return this;
    }

    /**
     * Divides the vector for the x and y position of a given scalar number
     *
     * @param {number} n - The number to divide
     *
     * @return {NGINT.Vector2} this vector for chaining
     */
    divideScalar(n)
    {
        this.x /= n;
        this.y /= n;
        return this;
    }

    /**
     * Clamps this vector's length to given min and max values
     *
     * @param {NGINT.Vector2} vmin - the min (vector2) value to clamp
     * @param {NGINT.Vector2} vmax - the max (vector2) value to clamp
     *
     * @return {NGINT.Vector2} this vector for chaining
     */
    clamp(vmin, vmax)
    {
		this.x = Math.max(vmin.x, Math.min(vmax.x, this.x));
		this.y = Math.max(vmin.y, Math.min(vmax.y, this.y));
		return this;
    }

    /**
     * Floors the x and y positions of the vector
     *
     * @return {NGINT.Vector2} this vector for chaining
     */
    floor()
    {
		this.x = Math.floor(this.x);
		this.y = Math.floor(this.y);
		return this;
	}

    /**
     * Ceils the x and y positions of the vector
     *
     * @return {NGINT.Vector2} this vector for chaining
     */
	ceil()
    {
		this.x = Math.ceil(this.x);
		this.y = Math.ceil(this.y);
		return this;
	}

    /**
     * Rounds the x and y positions of the vector
     *
     * @return {NGINT.Vector2} this vector for chaining
     */
	round()
    {
		this.x = Math.round(this.x);
		this.y = Math.round(this.y);
		return this;
	}

    /**
     * Makes the x and y positions of the vector negative
     *
     * @return {NGINT.Vector2} this vector for chaining
     */
	negate()
    {
		this.x = -this.x;
		this.y = -this.y;
		return this;
	}

    /**
     * Gives to a given vector the x and y positions of this vector
     *
     * @param {NGINT.Vector2} v - The vector to give the positions
     *
     * @return {NGINT.Vector2} this vector for chaining
     */
    equals(v)
    {
        v.x = this.x;
        v.y = this.y;
        return this;
    }

    /**
     * Sets the angle of the vector
     *
     * @param {number} n - The angle (radians) to set
     *
     * @return {NGINT.Vector2} this vector for chaining
     */
    set angle(n = 0)
    {
        let length = Math.sqrt(this.x * this.x + this.y * this.y);
        this.x = Math.cos(n)* length;
        this.y = Math.sin(n) * length;
        return this;
    }

    /**
     * Gets the angle of the vector
     *
     * @return {number} the angle of the vector in radians
     */
    get angle()
    {
        return Math.atan2(this.y, this.x);
    }


    /**
     * Sets the angle of the vector
     *
     * @param {number} n - The angle (degrees) to set
     *
     * @return {NGINT.Vector2} this vector for chaining
     */
    set angleDeg(n = 0)
    {
        n *= 0.0174532925;
        angle(n);
        return this;
    }

    /**
     * Gets the angle of the vector
     *
     * @return {number} the angle of the vector in degrees
     */
    get angleDeg()
    {
        return (Math.atan2(this.y, this.x) * 57.2957);
    }

    /**
     * Rotates the angle by a given radian angle
     *
     * @param {number} n - The angle (radians) to rotate
     *
     * @return {NGINT.Vector2} this vector for chaining
     */
    rotate(n = 0)
    {
        let angle = angle();
        let length = Math.sqrt(this.x * this.x + this.y * this.y);
        this.x = Math.cos(n + angle) * length;
        this.y = Math.sin(n + angle) * length;
        return this;
    }

    /**
     * Rotates the angle by a given degree angle
     *
     * @param {number} n - The angle (degrees) to rotate
     *
     * @return {NGINT.Vector2} this vector for chaining
     */
    rotateDeg(n)
    {
        n *= 0.0174532925;
        rotate(n);
        return this;
    }

    /**
     * Normalizes the vector ()
     *
     * @param {number} n - A scale value to normalize (defaults to 1.0)
     *
     * @return {NGINT.Vector2} this vector for chaining
     */
    normalize(n = 1.0)
    {
        let length = Math.sqrt(this.x * this.x + this.y * this.y);
        this.x = (this.x / length) * n;
        this.y = (this.y / length) * n;
        return this;
    }

    /**
     * Sets the length of the vector
     *
     * @param {number} n - The new length of the vector
     *
     * @return {NGINT.Vector2} this vector for chaining
     */
    set length(n)
    {
        normalize(1);
        this.x *= n;
        this.y *= n;
        return this;
    }

    /**
     * Gets the length of the vector
     *
     * @return {number} the length of the vector
     */
    get length()
    {
        return (Math.sqrt(this.x * this.x + this.y * this.y));
    }

    /**
     * Makes a dot product operation between this vector and a given vector
     *
     * @param {NGINT.Vector2} v - The vector to make the dot operation
     *
     * @return {number} the result of dot operation
     */
    dot(v)
    {
        return (this.x * v.x + this.y * v.y);
    }

    /**
     * Calculates the distance between this vector and a given vector
     *
     * @param {NGINT.Vector2} v - The vector calculate the distance to
     *
     * @return {number} the distance between the vectors
     */
    distance(v)
    {
        return Math.sqrt(distanceSquared(v));
    }

    /**
     * Calculates the squared distance between this vector and a given vector
     *
     * @param {NGINT.Vector2} v - The vector calculate the squared distance to
     *
     * @return {number} the squared distance between the vectors
     */
    distanceSquared(v)
    {
        var dx = this.x - v.x, dy = this.y - v.y;
        return dx * dx + dy * dy;
    }

    /**
     * Makes a linear interpolation between this vector and a given vector
     *
     * @param {NGINT.Vector2} v - The vector to lerp to
     * @param {number} a - The amount to interpolate between the vectors
     *
     * @return {NGINT.Vector2} this vector for chaining
     */
    lerp(v, a)
    {
        this.x += (v.x - this.x) * a;
		this.y += (v.y - this.y) * a;
		return this;
    }

    /**
     * Offsets this vector x and y positions by the given dx and dy values
     *
     * @param {number} dx - The offset value for x position
     * @param {number} dy - The offset value for y position
     *
     * @return {NGINT.Vector2} this vector for chaining
     */
    offset(dx = 0, dy = 0)
    {
        this.x += dx;
		this.y += dy;
        return this;
    }

    /**
     * Makes this vector looks to the position of a given vector
     *
     * @param {NGINT.Vector2} v - The vector to look at
     *
     * @return {NGINT.Vector2} this vector for chaining
     */
    lookAt(v)
    {
        let vector = new Vector2(v.x - x, v.y - y);
        angle(vector.angle());
        return this;
    }
}
