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
     * @param {number} [x=0] - position of the vector on the x axis
     * @param {number} [y=0] - position of the vector on the y axis
     */
    constructor(x = 0, y = 0)
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
        return this.x;
    }

    /**
     * Sets the vector to a new x position.
     *
     * @param {number} [x=0] - position of the vector on the x axis
     */
    set x(x = 0)
    {
        this.x = x;
    }

    /**
     * Returns the y position of the vector
     *
     * @returns {number} The vector y position
     */
    get y()
    {
        return this.y;
    }

    /**
     * Sets the vector to a new y position.
     *
     * @param {number} [y=0] - position of the vector on the y axis
     */
    set y(y = 0)
    {
        this.y = y;
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
     * @return {NGINT.Vector2} this vector for chaining
     */
    divideScalar(n)
    {
        this.x /= n;
        this.y /= n;
        return this;
    }

    clamp(min, max)
    {
		this.x = Math.max(min.x, Math.min(max.x, this.x));
		this.y = Math.max(min.y, Math.min(max.y, this.y));
		return this;
    }

    floor()
    {
		this.x = Math.floor(this.x);
		this.y = Math.floor(this.y);
		return this;
	}

	ceil()
    {
		this.x = Math.ceil(this.x);
		this.y = Math.ceil(this.y);
		return this;
	}

	round()
    {
		this.x = Math.round(this.x);
		this.y = Math.round(this.y);
		return this;
	}

    roundToZero()
    {
		this.x = (this.x < 0) ? Math.ceil(this.x) : Math.floor(this.x);
		this.y = (this.y < 0) ? Math.ceil(this.y) : Math.floor(this.y);
		return this;
	}

	negate()
    {
		this.x = -this.x;
		this.y = -this.y;
		return this;
	}

    give(v)
    {
        v.x = this.x;
        v.y = this.y;
        return this;
    }

    copy(v)
    {
        this.x = v.x;
        this.y = v.y;
        return this;
    }

    setAngle(n = 0)
    {
        let length = Math.sqrt(this.x * this.x + this.y * this.y);
        this.x = Math.cos(n)* length;
        this.y = Math.sin(n) * length;
        return this;
    }

    setAngleDeg(n = 0)
    {
        n *= 0.0174532925;
        let length = Math.sqrt(this.x * this.x + this.y * this.y);
        this.x = Math.cos(n)* length;
        this.y = Math.sin(n) * length;
        return this;
    }

    rotateBy(n)
    {
        let angle = getAngle();
        let length = Math.sqrt(this.x * this.x + this.y * this.y);
        this.x = Math.cos(n + angle) * length;
        this.y = Math.sin(n + angle) * length;
        return this;
    }

    rotateByDeg(n)
    {
        n *= 0.0174532925;
        rotateBy(n);
        return this;
    }

    normalize(n = 1.0)
    {
        let length = Math.sqrt(this.x * this.x + this.y * this.y);
        this.x = (this.x / length) * n;
        this.y = (this.y / length) * n;
        return this;
    }

    length()
    {
        return (Math.sqrt(this.x * this.x + this.y * this.y));
    }

    setLength(newlength)
    {
        normalize(1);
        this.x *= newlength;
        this.y *= newlength;
        return this;
    }

    getAngle()
    {
        return Math.atan2(this.y, this.x);
    }

    getAngleDeg()
    {
        return (Math.atan2(this.y, this.x) * 57.2957);
    }

    dot(v)
    {
        return (this.x * v.x + this.y * v.y);
    }

    clone()
    {
        return new Vector2(this.x, this.y);
    }

    distanceTo(v)
    {
        return Math.sqrt(distanceToSquared(v));
    }

    distanceToSquared(v)
    {
        var dx = this.x - v.x, dy = this.y - v.y;
        return dx * dx + dy * dy;
    }

    equals(v)
    {
        return ((v.x === this.x) && (v.y === this.y));
    }

    lerp(v, aplha)
    {
        this.x += (v.x - this.x) * alpha;
		this.y += (v.y - this.y) * alpha;
		return this;
    }

    lerpVectors(v1, v2, alpha)
    {
        return this.subVectors(v2, v1).multiplyScalar(alpha).add(v1);
    }

    offset(dx = 0, dy = 0)
    {
        this.x += dx;
		this.y += dy;
        return this;
    }

    zero()
    {
        this.x = 0;
        this.y = 0;
        return this;
    }

    lookAt(v)
    {
        let vToTarget = new Vector2(v.x - x, v.y - y);
        setAngle(vToTarget.getAngle());
        return this;
    }

    minus(v)
    {
        return new Vector2(this.x -= v.x, this.y -= v.y);
    }

    times(value)
    {
        return new Vector2(this.x * value, this.y * value);
    }

    plus(v)
    {
        return new Vector2(this.x += v.x, this.y += v.y);
    }
}
