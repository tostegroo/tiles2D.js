/**
 * @namespace TILES2D.core
 */

//exports geometries
export { default as Rectangle } from './geom/shapes/Rectangle';
export { default as Circle } from './geom/shapes/Circle';

//exports sprites
export { default as DomSprite } from './display/sprites/DomSprite';

//exports dynamics
export { default as Body } from './dynamics/Body';
export { default as World } from './dynamics/World';
export { default as Environment } from './dynamics/Environment';
export { default as Tile } from './dynamics/Tile';
export * from './dynamics/dynamicConstants';

//exports players
export { default as Player } from './players/Player';

//exports layers
export { default as TileLayer } from './layers/TileLayer';

//exports loaders
export { default as TiledLoader } from './loaders/TiledLoader';

//exports inputs
export *  from './input/inputConstants';
