import MathUtil from '../../utils/MathUtil';

/**
  * The GamepadInput object is used to manage the gamepad inputs
  *
  * @class
  * @memberof TILES2D
  * @author Fabio Toste
*/
export default class GamepadInput
{
    constructor()
    {
        this.getGamepads = 'getGamepads';
        this.hasGamepadSupport = window.navigator.getGamepads !== undefined;

        if(!this.hasGamepadSupport && window.navigator.webkitGetGamepads !== undefined)
        {
            this.hasGamepadSupport = true;
            this.getGamepads = 'webkitGetGamepads';
        }

        this.threshold = 0.2;
        this.onGamepadConnected = null;
        this.onGamepadDisconnected = null;
        this.axes = [0, 0, 0, 0];

        window.addEventListener("gamepadconnected", this.onConnect);
        window.addEventListener("gamepaddisconnected", this.onDisconnect);

        if(this.hasGamepadSupport)
        {
             let gp = window.navigator[this.getGamepads]();
        }
    }

    onConnect(e)
    {
        if (this.onGamepadConnected != null)
            this.onGamepadConnected(e);
    }

    onDisconnect(e)
    {
        if (this.onGamepadDisconnected != null)
            this.onGamepadDisconnected(e);
    }

    static normalize(button)
    {
        if(typeof(button)=='number' || typeof(button)=='string')
            button = [button];

        return button;
    }

    update(item)
    {
        if(this.hasGamepadSupport)
        {
            let gindex = item.gamepadIndex || 0;
            let i, len;
            for(i = 0, len = item.gamepad.length; i < len ; i++)
            {
                let bt = item.gamepad[i];
                let gp = window.navigator[this.getGamepads]()[gindex];

                if(gp!=null)
                {
                    if(typeof(bt)=='number')
                    {
                        if(gp.buttons[bt] && gp.buttons[bt].pressed==true && item.canHit)
                            this._setOnPress(item, gp.buttons[bt].value, 'pressed');

                        if(item.pressed && gp.buttons[bt] && gp.buttons[bt].pressed==false)
                            this._setOnRelease(item, gp.buttons[bt].value, 'pressed');
                    }
                    else
                    {
                        if(gp.axes && bt.hasOwnProperty('axis'))
                        {
                            if(bt.axis.length != undefined)
                            {
                                for (let i = 0; i < bt.axis.length; i++)
                                    this._setAxisValue(gp, i, bt.axis[i], item.onlyDigital);
                            }
                            else
                                this._setAxisValue(gp, 0, bt.axis, item.onlyDigital);

                            if(item.onMove)
                                item.onMove(this.axes[0], this.axes[1], this.axes[2], this.axes[3]);
                            else
                            {
                                let sameDirection = Math.sign(this.axes[0]) == Math.sign(bt.direction);
                                if(item.canHit && this.axes[0]!=0 && sameDirection)
                                    this._setOnPress(item, this.axes[0], 'moved');

                                if(item.moved && this.axes[0]==0)
                                    this._setOnRelease(item, this.axes[0], 'moved');
                            }
                        }
                    }
                }
            }
        }
    }

    _setOnPress(item, value, type)
    {
        if (item.oneHit)
            item.canHit = false;

        if(item.onPress)
            item.onPress(value);

        switch(type)
        {
            case 'pressed':
                item.pressed = true;
                break;
            case 'moved':
                item.moved = true;
                break;
            default:
                item.pressed = true;
        }
    }

    _setOnRelease(item, value, type)
    {
        if(item.onRelease)
            item.onRelease(value);

        item.canHit = true;

        switch(type)
        {
            case 'pressed':
                item.pressed = false;
                break;
            case 'moved':
                item.moved = false;
                break;
            default:
                item.pressed = false;
        }
    }

    _setAxisValue(gp, axisIndex, index, onlyDigital)
    {
        if(gp.axes[index])
        {
            if(onlyDigital)
                this.axes[axisIndex] = MathUtil.analogicToDigital(gp.axes[index], this.threshold);
            else
                this.axes[axisIndex] = MathUtil.percentageFit(gp.axes[index], this.threshold, 1);
        }
    }
}
