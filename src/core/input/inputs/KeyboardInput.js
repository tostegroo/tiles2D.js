import { KEYBOARD } from '../InputConstants';

/**
  * The KeyboardInput object is used to manage the keyboard key press and release
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

    normalize(key)
    {
        if(typeof(key)=='object' && key.length!=undefined)
        {
            for (let i = 0, len = key.length; i < len; i++)
                key[i] = this._getValue(key[i]);
        }
        else
            key = [this._getValue(key)];

        return key;
    }

    update(item)
    {
        let i, len;
        for(i = 0, len = item.key.length; i < len ; i++)
        {
            let char = item.key[i];
            if(this.key[char] && this.key[char].state && this.key[char].canHit)
            {
                if (item.oneHit)
                    this.key[char] = false;

                if(item.onPress)
                    item.onPress();
            }

            if(this.key[char] && !this.key[char].state)
            {
                if(item.onRelease)
                    item.onRelease();

                this.key[char] = false;
            }
        }
    }

    _getValue(value)
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
        this.key[char] = {state: true, canHit: true};
    }

    _onKeyUp(e)
    {
        let char = e.keyCode || e.which;
        this.key[char] = {state: false, canHit: false};
    }
}
