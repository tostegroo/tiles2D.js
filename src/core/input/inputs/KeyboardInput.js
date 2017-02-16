import { KEYBOARD } from '../InputConstants';

/**
  * The KeyboardInput is used to manage the keyboard events
  *
  * @class
  * @memberof NGINT
  * @author Fabio Toste
*/
export default class KeyboardInput
{
    constructor()
    {
        this.key = [];

        document.body.addEventListener("keydown", this._onKeyDown.bind(this));
        document.body.addEventListener("keyup", this._onKeyUp.bind(this));
    }

    update(item)
    {
        let i, len;
        for(i = 0, len = item.keyboard.length; i < len ; i++)
        {
            let char = item.keyboard[i];

            if(this.key[char] && this.key[char].state && item.canHit)
            {
                if (item.oneHit)
                {
                    item.canHit = false;
                    this.key[char] = false;
                }

                if(item.onPress)
                    item.onPress();
            }

            if(this.key[char] && !this.key[char].state)
            {
                if(item.onRelease)
                    item.onRelease();

                item.canHit = true;
                this.key[char] = false;
            }
        }
    }

    static normalize(key)
    {
        if(typeof(key)=='object' && key.length!=undefined)
        {
            for (let i = 0, len = key.length; i < len; i++)
                key[i] = KeyboardInput.getValue(key[i]);
        }
        else
            key = [KeyboardInput.getValue(key)];

        return key;
    }

    static getValue(value)
    {
        if(typeof(value)=='string')
            value = KEYBOARD[value.toUpperCase()];
        else if(typeof(value)=='number')
            value = value;
        else
            value = -1;

        return value;
    }

    _onKeyDown(e)
    {
        let char = e.keyCode || e.which;
        this.key[char] = {state: true};
    }

    _onKeyUp(e)
    {
        let char = e.keyCode || e.which;
        this.key[char] = {state: false};
    }
}
