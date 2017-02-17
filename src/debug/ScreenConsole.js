/**
  * The ScreenConsole object iis used to debug variables on screen
  *
  * @class
  * @memberof NGINT
  * @author Fabio Toste
*/
let screenElement = null

export default class ScreenConsole
{
    /**
     *
     * @param [left=0] x - The left position of the console screen
     * @param [top=0] y - The top position of the console screen
     * @param [width=10] width - The width of the console screen
     * @param [height=10] height - The height of the console screen
     *
     */
    static add(left = 0, top = 0, width = 200, height = 150)
    {
        screenElement = document.createElement("DIV");
        screenElement.style.position = 'Absolute';
        screenElement.style.left = left + 'px';
        screenElement.style.top = top + 'px';
        screenElement.style.width = width + 'px';
        screenElement.style.height = height + 'px';
        screenElement.style.border = '1px solid #000';
        screenElement.style.backgroundColor = '#fff';
        screenElement.style.padding = '10px';
        screenElement.style['z-index'] = 9999;

        document.body.appendChild(screenElement);
    }

    static log(...args)
    {
        var text = '';
        for(let arg of args)
            text += '<div style="width:100%">' + arg + '</div>';

        screenElement.innerHTML = text;
    }
}
