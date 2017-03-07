/**
 * @author Fabio Toste
 */
import InputManager from './core/input/InputManager';

window._vendors = ['ms', 'moz', 'webkit', 'o'];
for (var x = 0; x < window._vendors.length && !window.requestAnimationFrame; ++x)
{
    window.requestAnimationFrame = window[window._vendors[x] + 'RequestAnimationFrame'];
    window.cancelAnimationFrame = window[window._vendors[x] + 'CancelAnimationFrame'] || window[window._vendors[x] + 'CancelRequestAnimationFrame'];
}

window._tiles2dcontainer = null;
var _requestAnimation = null;
var _world = null;

function create(container = null, world = null)
{
    window._tiles2dcontainer = container;
    _world = world;

    console.log("tiles2D created");

    resume();
}

function resume()
{
    if(_requestAnimation==null)
    {
        update();
    }
}

function stop()
{
    if(_requestAnimation!=null)
    {
        window.cancelAnimationFrame(_requestAnimation);
        _requestAnimation = null;
    }
}

function setWorld(world = null)
{
    _world = world;
}

function next()
{
    let deltatime = 0.016666;
    _world.update(deltatime);
}

function update()
{
    let deltatime = 0.016666;

    InputManager.update();
    _world.update(deltatime);

    _requestAnimation = window.requestAnimationFrame(update);
}

//export constants
export * from './core/constants';

//export settings
export * from './core/settings';

//export debug tools
export * from './debug/debug';

//export core
export * from './core/core';

//export main functions
export {
    InputManager,
    create,
    setWorld,
    resume,
    stop,
    update,
    next
};
