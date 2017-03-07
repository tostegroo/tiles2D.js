/**
  * The MouseInput object is used to manage the mouse events
  *
  * @class
  * @memberof TILES2D
  * @author Fabio Toste
*/
export default class MouseInput
{
    constructor()
    {
        this.button = [];
        this.wheel = 0;
        this.axis = [];

        document.addEventListener("mousewheel", this.onWheel, false);
        document.addEventListener("DOMMouseScroll", this.onWheel, false);
    }

    update(item)
    {

    }

    onWheel(e)
    {
        var e = window.event || e;
	    this.wheel = Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail)));
    }
}
