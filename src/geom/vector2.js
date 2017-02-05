/**
 * @author Fabio Toste
 */
export default class Vector2
{
    constructor(dx = 0, dy = 0)
    {
        this.x = dx;
        this.y = dy;
    }

    initFromPoint(p)
    {
        this.x = p.x;
        this.y = p.y;
        return this;
    }

    set(x, y)
    {
		this.x = x;
		this.y = y;
		return this;
	}

	setScalar(value)
    {
		this.x = value;
		this.y = value;
		return this;
	}

	setX(x)
    {
		this.x = x;
		return this;
	}

	setY(y)
    {
		this.y = y;
		return this;
	}

    reset()
    {
        this.x = 0;
        this.y = 0;
        return this;
    }

    add(v)
    {
        this.x += v.x;
        this.y += v.y;
        return this;
    }

    subtract(v)
    {
        this.x -= v.x;
        this.y -= v.y;
        return this;
    }

    subVectors(v1, v2)
    {
        this.x = v1.x - v2.x;
		this.y = v1.y - v2.y;
		return this;
    }

    multiply(v)
    {
        this.x *= v.x;
        this.y *= v.y;
        return this;
    }

    multiplyScalar(value)
    {
        this.x *= value;
        this.y *= value;
        return this;
    }

    divideScalar(value)
    {
        this.x /= value;
        this.y /= value;
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
