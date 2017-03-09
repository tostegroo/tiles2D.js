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

        window.addEventListener("gamepadconnected", this.onConnect);
        window.addEventListener("gamepaddisconnected", this.onDisconnect);

        if(this.hasGamepadSupport)
        {
            let gp = window.navigator[this.getGamepads]();
            console.log(gp);
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
            let gindex = 0;
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
                        {
                            if (item.oneHit)
                                item.canHit = false;

                            if(item.onPress)
                                item.onPress(gp.buttons[bt].value);

                            item.pressed = true;
                        }

                        if(item.pressed && gp.buttons[bt] && gp.buttons[bt].pressed==false)
                        {
                            if(item.onRelease)
                                item.onRelease(gp.buttons[bt].value);

                            item.canHit = true;
                            item.pressed = false;
                        }
                    }
                    else
                    {
                        if(gp.axes)
                        {
                            console.log(bt);

                            if(item.onMove)
                                item.onMove(gp.axes[0]);
                        }
                    }
                }
            }
        }
    }
}
