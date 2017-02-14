import DisplayObject from './DisplayObject';

/**
  * The Sprite object is the base class of any graphic instance in NGINT
  *
  * @class
  * @memberof NGINT
  * @author Fabio Toste
*/
export default class Sprite extends DisplayObject
{
    /**
     *
     * @param [x=0] x - The x position of the sprite
     * @param [y=0] y - The y position of the sprite
     * @param [width=10] width - The width of the sprite
     * @param [height=10] height - The height of the sprite
     * @param [color='#000'] color - The color of the sprite
     *
     */
    constructor(x = 0 , y = 0, width = 10, height = 10, color = '#000', alpha = 1)
    {
        super(x, y, width, height, color, alpha);
    }

    update(deltatime = 0)
    {
        
    }
}
