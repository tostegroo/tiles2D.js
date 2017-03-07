import Vector2 from '../geom/Vector2';

/**
 * Two Pi.
 *
 * @static
 * @constant
 * @memberof TILES2D
 * @type {number}
 */
export const PI_2 = Math.PI * 2;

/**
 * Conversion factor for converting radians to degrees.
 *
 * @static
 * @constant
 * @memberof TILES2D
 * @type {number}
 */
export const RAD_TO_DEG = 180 / Math.PI;

/**
 * Conversion factor for converting degrees to radians.
 *
 * @static
 * @constant
 * @memberof TILES2D
 * @type {number}
 */
export const DEG_TO_RAD = Math.PI / 180;

/**
 * A Math Helper class with a some math functions
 *
 * @class
 * @memberof TILES2D
 */
export default class MathUtil
{
    static analogicToDigital(v, t)
    {
        v = percentageFit(v, t, 1);
        return (v == 0) ? 0 : (v > 0) ? 1 : -1;
    }

    static percentageFit(v, from, to)
    {
        let signal = (v > 0) ? 1 : -1;
        v = Math.abs(v);
        let returnValue = v-from;
        let fitValue = to-from;
        returnValue  = (returnValue <0) ? 0 : returnValue;
        returnValue  = (returnValue > fitValue) ? fitValue  : returnValue;
        returnValue  = returnValue / fitValue;
        return returnValue * signal;
    }

    static radToDeg(radian)
    {
        return radian / Math.PI * 180;
    }

    static degToRad(degree)
    {
        return degree / 180 * Math.PI;
    }

    static ease(origin, target, speed)
    {
        return (origin - target) / speed;
    }

    static dist1D(start, end)
    {
        return Math.sqrt(Math.abs(start - end));
    }

    static dist2D(startX, startY, endX, endY)
    {
        let dirX = startX - endX;
        let dirY = startY - endY;
        return Math.sqrt(dirX * dirX + dirY * dirY);
    }

    static average(... nums)
    {
        let total = nums.length;
        let sum = 0;
        let i = 0;
        while(i < total)
        {
            sum += nums[i];
            i++;
        }
        return sum / total;
    }

    static smoothAverage(n, n2, speed = 0.5)
    {
        let sinSpeed = Math.sin(n) * (speed);
        let cosSpeed = Math.cos(n) * (speed);
        let sin = Math.sin(n2) * (1 - speed);
        let cos = Math.sin(n2) * (1 - speed);
        return Math.atan2(sinSpeed + sin, cosSpeed + cos);
    }

    static lerp(from, to, a)
    {
        if (a > 1) { return to; }
        if (a < 0) { return from; }
        return from + (to - from) * a;
    }

    static clamp(v, min, max)
    {
        return Math.max(min, Math.min(max, v));
    }

    static clampNum(v)
    {
        return clamp(v, 0, 1);
    }

    static rand(min, max)
    {
        return min + (max - min) * Math.random();
    }

    static approach(c, t, i)
    {
        i = Math.abs(i);

        if (c < t)
            return clamp(c + i, c, t);
        else if (c > t)
            return clamp(c - i, t, c);

        return t;
    }

    static isBetween(n, min, max)
    {
        return n >= min && n <= max;
    }

    static vectorRand()
    {
        return new Vector2(rand(-1, 1), rand(-1, 1));
    }

    static fit(v, vMin, vMax, outMin, outMax)
    {
        return (v - vMin) * (outMax - outMin) / (vMax - vMin) + outMin;
    }

    static toFixed(v, factor)
    {
        return Math.round(v * factor) / factor;
    }
}
