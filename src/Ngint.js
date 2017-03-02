/**
 * @author Fabio Toste
 */
import DomSprite from './core/display/sprites/DomSprite';
import InputManager from './core/input/InputManager';
import { KEYBOARD } from './core/input/InputConstants';
import { GAMEPAD } from './core/input/InputConstants';
import Player from './core/players/Player';
import World from './core/dynamics/World';
import Environment from './core/dynamics/Environment';
import TiledLoader from './core/loaders/TiledLoader';
import TileLayer from './core/layers/TileLayer';

import ScreenConsole from './debug/ScreenConsole';

//change to import from file
window._vendors = ['ms', 'moz', 'webkit', 'o'];
for (var x = 0; x < window._vendors.length && !window.requestAnimationFrame; ++x)
{
    window.requestAnimationFrame = window[window._vendors[x] + 'RequestAnimationFrame'];
    window.cancelAnimationFrame = window[window._vendors[x] + 'CancelAnimationFrame'] || window[window._vendors[x] + 'CancelRequestAnimationFrame'];
}

window._ngintcontainer = null;

export class Ngint
{
    constructor(container = null)
    {
        this._requestAnimation = false;
        window._ngintcontainer = container;

        //let floorSprite = new DomSprite(0, 800, 1920, 80, "#dedada");
        //document.body.appendChild(floorSprite.domElement);

        let domSprite = new DomSprite(80, 20, 50, 80, "#000");
        let player = new Player(domSprite);
        player.name = "p1";

        let domSprite2 = new DomSprite(130, 20, 50, 80, "#990000");
        let player2 = new Player(domSprite2);
        player2.name = "p2";
        player2.mass = 80;

        //this.world = new World(new Environment(1.2, {x: 0, y: 0}));
        this.world = new World();
        this.world.addBody(player);
        //this.world.addBody(player2);

        TiledLoader.loadTile('./assets/tiles.json', './assets/tiles.png', function(data)
        {
            let tilelayer = new TileLayer(data);
            this.world.setTileList(tilelayer.tileList);
        }.bind(this));

        //InputManager.addInput("ns", {keyboard:[KEYBOARD.D], onPress: this.next.bind(this), oneHit: false});

        InputManager.addInput(
            "right",
            {
                keyboard: [KEYBOARD.RIGHT],
                gamepad: 17,
                onPress: player.walkRight.bind(player),
                onRelease: player.stop.bind(player)
            }
        );

        InputManager.addInput(
            "left",
            {
                keyboard: [KEYBOARD.LEFT],
                gamepad: 18,
                onPress: player.walkLeft.bind(player),
                onRelease: player.stop.bind(player)
            }
        );

        //InputManager.addInput("crouch", { keyboard:[KEYBOARD.DOWN], onPress: player.crouch.bind(player), onRelease: player.standUp.bind(player)});
        InputManager.addInput(
            "jump",
            {
                keyboard: KEYBOARD.SPACE,
                gamepad: GAMEPAD.A,
                onPress: player.jump.bind(player),
                onRelease: player.stopJump.bind(player),
                oneHit: true
            }
        );

        //InputManager.addInput("up", {keyboard:[KEYBOARD.UP], onPress: player.walkUp.bind(player), onRelease: player.stopy.bind(player)});
        //InputManager.addInput("down", {keyboard:[KEYBOARD.DOWN], onPress: player.walkDown.bind(player), onRelease: player.stopy.bind(player)});

        ScreenConsole.add(1920-300, 0, 300, 150);
        this.update();

        console.log("Ngint created");
    }

    stop()
    {
        if(this._requestAnimation)
        {
            window.cancelAnimationFrame(this._requestAnimation);
            this._requestAnimation = null;
        }
    }

    next()
    {
        let deltatime = 0.016666;
        this.world.update(deltatime);
    }

    update()
    {
        let deltatime = 0.016666;

        InputManager.update();
        this.world.update(deltatime);

        this._requestAnimation = window.requestAnimationFrame(this.update.bind(this));
    }
}
