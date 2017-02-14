import KeyboardInput from './inputs/KeyboardInput';
import MouseInput from './inputs/MouseInput';

/**
  * The InputManager object is the base class of all input methods tha can be used
  *
  * @class
  * @memberof NGINT
  * @author Fabio Toste
*/
export default class InputManager
{
    /**
     */
    constructor()
    {
        this._loopID = false;
        this._inputLength = 0;

		this.inputList = [];

        this.gamepads = [];
        this.keyboard = new KeyboardInput();
        this.mouse = new MouseInput();
        //this.gamepads = new GamepadInput();
        this.touch = null;

        this.update();
    }

    addInput(name = "", input = {})
    {
        let index = this._getIndexByName(name);
        if(index==-1)
        {
            input.name = name;

            if(input.hasOwnProperty('key'))
                input.key = this.keyboard.normalize(input.key);

            this._inputLength = this.inputList.push(input);
        }
        else
            console.log("Input name ("+ input.name +") already exists");
    }

    removeInputByName(name)
    {
        let index = this._getIndexByName("name");
        if (index != -1)
            inputList.splice(index, 1);
    }

    removeInputAt(index = -1)
    {
        if (index != -1 && index > 0 && index < this._inputLength)
            inputList.splice(index, 1);
    }

    update(deltatime = 0)
    {
        var i, j, len, key, item;
        for (i = 0; i < this._inputLength; i++)
        {
            item = this.inputList[i];
            this.keyboard.update(item);
        }
    }

    _getIndexByName(name)
    {
        let index = -1;
        for (var i = 0; i < this._inputLength; i++)
        {
            if (this.inputList[i].name == name)
            {
                index = i;
                break;
            }
        }
        return index;
    }
}
