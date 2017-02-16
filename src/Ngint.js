/**
 * @author Fabio Toste
 */
import DomSprite from './core/display/sprites/DomSprite';
import InputManager from './core/input/InputManager';
import { KEYBOARD } from './core/input/InputConstants';
import Player from './core/dynamics/Player';
import World from './core/dynamics/World';
import Environment from './core/dynamics/Environment';


//change to import from file
var vendors = ['ms', 'moz', 'webkit', 'o'];
for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x)
{
    window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
    window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] || window[vendors[x] + 'CancelRequestAnimationFrame'];
}

export class Ngint
{
    constructor()
    {
        this._loopID = false;

        let floorSprite = new DomSprite(0, 800, 1920, 80, "#dedada");
        document.body.appendChild(floorSprite.domElement);

        let domSprite = new DomSprite(80, 150, 50, 80, "#000");
        let player = new Player(domSprite);

        //this.world = new World(new Environment(1.2, {x: 0, y: 0}));

        this.world = new World();
        this.world.addBody(player);

        InputManager.addInput("right", {keyboard:[KEYBOARD.D, KEYBOARD.RIGHT], onPress: player.walkRight.bind(player), onRelease: player.stop.bind(player)});
        InputManager.addInput("left", {keyboard:[KEYBOARD.A, KEYBOARD.LEFT], onPress: player.walkLeft.bind(player), onRelease: player.stop.bind(player)});
        InputManager.addInput("crouch", { keyboard:[KEYBOARD.DOWN, KEYBOARD.S], onPress: player.crouch.bind(player), onRelease: player.standUp.bind(player)});
        InputManager.addInput("jump", { keyboard:KEYBOARD.SPACE, onPress: player.jump.bind(player), onRelease: player.stopJump.bind(player), oneHit: true});

        //InputManager.addInput("up", {key:[KEYBOARD.W, KEYBOARD.UP], onPress: player.walkUp.bind(player), onRelease: player.stopy.bind(player)});
        //InputManager.addInput("down", {key:[KEYBOARD.S, KEYBOARD.DOWN], onPress: player.walkDown.bind(player), onRelease: player.stopy.bind(player)});

        document.body.appendChild(domSprite.domElement);

        console.log("Ngint created");

        this.update();
    }

    stop()
    {
        if(this._loopID)
        {
            window.cancelAnimationFrame(this._loopID);
            this._loopID = false;
        }
    }

    update()
    {
        let deltatime = 0.016666;

        InputManager.update();

        if(this.world)
            this.world.update(deltatime);

        this._loopID = window.requestAnimationFrame(this.update.bind(this));
    }
}
