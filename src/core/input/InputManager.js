import KeyboardInput from './inputs/KeyboardInput';
import MouseInput from './inputs/MouseInput';
import GamepadInput from './inputs/MouseInput';
import TouchInput from './inputs/MouseInput';

/**
  * The InputManager object is the base class of all input methods tha can be used
  *
  * @class
  * @memberof NGINT
  * @author Fabio Toste
*/
let inputLength = 0;
let inputList = [];
let keyboard = false;
let mouse = false;
let gamepads = false;
let touch = false;

export default class InputManager
{
    static addInput(name = "", inputs = {})
    {
        let index = InputManager.getIndexByName(name);
        if(index==-1)
        {
            inputs.name = name;
            inputs.canHit = true;

            if(inputs.keyboard)
            {
                if(!keyboard)
                    keyboard = new KeyboardInput();

                inputs.keyboard = KeyboardInput.normalize(inputs.keyboard);
            }

            inputLength = inputList.push(inputs);
        }
        else
            console.log("Input name ("+ inputs.name +") already exists");
    }

    static removeInputByName(name)
    {
        let index = InputManager.getIndexByName("name");
        if (index != -1)
            inputList.splice(index, 1);
    }

    static removeInputAt(index = -1)
    {
        if (index != -1 && index > 0 && index < inputLength)
            inputList.splice(index, 1);
    }

    static update()
    {
        var i, item;
        for (i = 0; i < inputLength; i++)
        {
            item = inputList[i];

            if(keyboard && item.keyboard)
                keyboard.update(item);
        }
    }

    static getIndexByName(name)
    {
        let index = -1;
        for (var i = 0; i < inputLength; i++)
        {
            if (inputList[i].name == name)
            {
                index = i;
                break;
            }
        }
        return index;
    }
}
