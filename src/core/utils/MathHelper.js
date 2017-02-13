/**
 * @author Fabio Toste
 */
import Vector2 from '../geom/vector2';

export default class MathHelper
{
    static analogicToDigital(value, tolerance)
    {
        value = percentageFit(value, tolerance, 1);
        return (value == 0) ? 0 : (value > 0) ? 1 : -1;
    }

    static percentageFit(value, from, to)
    {
        let signal = (value > 0) ? 1 : -1;
        value = Math.abs(value);
        let returnValue = value-from;
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

    static dist1D(startPosition, endPosition)
    {
        return Math.sqrt(Math.abs(startPosition - endPosition));
    }

    static dist2D(startPositionX, startPositionY, endPositionX, endPositionY)
    {
        let dirX = startPositionX - endPositionX;
        let dirY = startPositionY - endPositionY;
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

    static smoothAverage(number, number2, speed = 0.5)
    {
        let sinSpeed = Math.sin(number) * (speed);
        let cosSpeed = Math.cos(number) * (speed);
        let sin = Math.sin(number2) * (1 - speed);
        let cos = Math.sin(number2) * (1 - speed);
        return Math.atan2(sinSpeed + sin, cosSpeed + cos);
    }

    static lerp(delta, from, to)
    {
        if (delta > 1) { return to; }
        if (delta < 0) { return from; }
        return from + (to - from) * delta;
    }

    static clamp(value, min, max)
    {
        return Math.max(min, Math.min(max, value));
    }

    static clampNum(value)
    {
        return clamp(value, 0, 1);
    }

    static rand(min, max)
    {
        return min + (max - min) * Math.random();
    }

    static approach(current, target, increment)
    {
        increment = Math.abs(increment);
        if (current < target)
        {
            return clamp(current + increment, current, target);
        }
        else if (current > target)
        {
            return clamp(current - increment, target, current);
        }
        return target;
    }

    static isBetween(number, min, max)
    {
        return number >= min && number <= max;
    }

    static vectorRand()
    {
        return new Vector2(rand(-1, 1), rand(-1, 1));
    }

    static fit(value, valueMin, valueMax, outMin, outMax)
    {
        return (value - valueMin) * (outMax - outMin) / (valueMax - valueMin) + outMin;
    }

    static toFixed(value, factor)
    {
        return Math.round(value * factor) / factor;
    }
}
