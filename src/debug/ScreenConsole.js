/**
  * The ScreenConsole object iis used to debug variables on screen
  *
  * @class
  * @memberof NGINT
  * @author Fabio Toste
*/
let screenLogElement = null

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
    static add(left = 0, top = 0, width = 200, height = 150, opacity = 0.9)
    {
        screenLogElement = document.createElement("DIV");
        screenLogElement.style.position = 'Absolute';
        screenLogElement.style.left = left + 'px';
        screenLogElement.style.top = top + 'px';
        screenLogElement.style.width = width + 'px';
        screenLogElement.style.height = height + 'px';
        screenLogElement.style.border = '1px solid #323232';
        screenLogElement.style.color = '#f2f2f2';
        screenLogElement.style.backgroundColor = '#282828';
        screenLogElement.style.padding = '10px';
        screenLogElement.style['z-index'] = 9999;

        screenLogElement.style.opacity = opacity;
        screenLogElement.style['-ms-filter'] = 'progid:DXImageTransform.Microsoft.Alpha(Opacity='+(opacity*100)+')';
        screenLogElement.style.filter = 'alpha(opacity='+(opacity*100)+')';
        screenLogElement.style['-moz-opacity'] = opacity;
        screenLogElement.style['-khtml-opacity'] = opacity;

        document.body.appendChild(screenLogElement);
    }

    static log(...args)
    {
        var text = '';
        for(let arg of args)
            text += '<div style="width:100%">' + arg + '</div>';

        screenLogElement.innerHTML = text;
    }
}
