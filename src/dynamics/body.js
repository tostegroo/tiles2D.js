/**
  * The Body object is the base for all dynamics objects, including the player
  *
  * @class
  * @memberof NGINT
  * @author Fabio Toste
*/
export default class Body
{
    public var sleeping = false;

    public var canIncreaseWidth = true;
    public var canIncreaseHeight = true;
    public var originalHeight = 1;
    public var originalWidth = 1;
    public var gravitySide = 1;

    public var onMaxY = 0;
    public var onMaxX = 0;
    public var hitbox;

    //variable physics properties
    public var dragCoefficient = 0.6;
    public var mass = 70;
    public var friction = 30;
    public var bounciness = 0;
    public var groundResistanceMultiply = new Vector2(1, 6);
    public var groundResistanceDirection = new Vector2(0, 1);
    public var virtualDepth = 8;

    //auto setable physics properties
    public var weight = 0;
    public var density = 1;
    public var heightArea = 1;
    public var widthArea = 1;

    //loop physics properties
    
    public var velocity = new Vector2();
    public var acceleration = new Vector2();
    public var direction = new Vector2();
    public var volume = 1;
    public var restitution = new Vector2();
    public var displacedVolume = 0;
    public var contactPoint = new Rectangle(0, 0, 1, 0.3);

    //environment varables
    public var environment:Environment;

    //position variables
    public var position = new Vector2();
    public var lastPosition = new Vector2();
    public var currentTile = new Vector2();

    //contact treatment
    public var contactList:Vector.<Point> = new Vector.<Point>();

    //forces
    public var movingForce = new Vector2();
    public var movingImpulse = new Vector2();
    public var impulseList:Vector.<Object> = new Vector.<Object>();
    public var gravityForce = new Vector2();
    public var netForce = new Vector2();
    public var groundForce = new Vector2();
    public var dragForce = new Vector2();
    public var buoyantForce = new Vector2();

    //hit rect
    public var top = 0;
    public var bottom = 0;
    public var left = 0;
    public var right = 0;
    public var centerX = 0;
    public var centerY = 0;

    //collision limits
    public var minY = -GameData.tileMaxY;
    public var maxY = GameData.tileMaxY;
    public var minX = -GameData.tileMaxX;
    public var maxX = GameData.tileMaxX;
    public var overlap = new Rectangle(0, 0, 0, 0);

    private var pixelMetreUnit = GameData.pixelMetreUnit;

    /**
     * @param hitbox_width - The width of the body hitbox (used for calculations)
     * @param hitbox_height - The height of the body hitbox (used for calculations)
     */
    constructor(hitbox_width = 10, hitbox_height = 10)
    {
        hitbox = new Quad(hitboxWidth, hitboxHeight, 0x000000, false);
        hitbox.scaleY = -hitbox.scaleY;
        addChild(hitbox);

        originalHeight = hitboxHeight;
        originalWidth = hitboxWidth;

        volume = (hitboxWidth / pixelMetreUnit) * (hitboxHeight / pixelMetreUnit) * (virtualDepth / pixelMetreUnit);
        density = mass / volume;

        //FlashConnect.atrace(density);
        heightArea = (hitboxHeight / pixelMetreUnit) * (hitboxWidth / pixelMetreUnit);
        widthArea = (hitboxWidth / pixelMetreUnit) * (hitboxWidth / pixelMetreUnit);
    }

    applyForce(axis = "", force = 0)
    {
        if (force != 0 && (axis=="x" || axis=="y"))
        {
            movingForce[axis] += force;
        }
    }

    applyImpulse(axis = "", impulse = 0, time = 0.1, delay = 0)
    {
        impulseList.push({axis:axis, impulse:impulse, time:time, delta:0, delay:delay, delayDelta:0});
    }

    beginUpdate(deltatime = 0)
    {
    }

    update(deltatime = 0)
    {
        gravitySide = (environment.gravity.y < 0) ? -1 : 1;
    }

    endUpdate(deltatime = 0)
    {
    }
