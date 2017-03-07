/**
 * String of the current PIXI version.
 *
 * @static
 * @constant
 * @memberof TILES2D
 * @name VERSION
 * @type {string}
 */
export const VERSION = '0.0.1';

/**
 * Constants that identify axis, mainly to prevent `instanceof` calls.
 *
 * @static
 * @constant
 * @name AXIS
 * @memberof TILES2D
 * @type {object}
 * @property {number} X the x axis
 * @property {number} Y the y axis
 */
export const AXIS =
{
    X: "x",
    Y: "y"
};

/**
 * Constants that identify shapes, mainly to prevent `instanceof` calls.
 *
 * @static
 * @constant
 * @name SHAPES
 * @memberof TILES2D
 * @type {object}
 * @property {number} POLY Polygon
 * @property {number} RECT Rectangle
 * @property {number} CIRC Circle
 * @property {number} ELIP Ellipse
 * @property {number} RREC Rounded Rectangle
 */
export const SHAPES =
{
    POLY: 0,
    RECT: 1,
    CIRC: 2,
    ELIP: 3,
    RREC: 4,
};

/**
 * Regexp for image type by extension.
 *
 * @static
 * @constant
 * @memberof TILES2D
 * @type {RegExp|string}
 * @example `image.png`
 */
export const URL_FILE_EXTENSION = /\.(\w{3,4})(?:$|\?|#)/i;

/**
 * Regexp for data URI.
 * Based on: {@link https://github.com/ragingwind/data-uri-regex}
 *
 * @static
 * @constant
 * @name DATA_URI
 * @memberof TILES2D
 * @type {RegExp|string}
 * @example data:image/png;base64
 */
export const DATA_URI = /^\s*data:(?:([\w-]+)\/([\w+.-]+))?(?:;(charset=[\w-]+|base64))?,(.*)/i;

/**
 * Regexp for SVG size.
 *
 * @static
 * @constant
 * @name SVG_SIZE
 * @memberof TILES2D
 * @type {RegExp|string}
 * @example &lt;svg width="100" height="100"&gt;&lt;/svg&gt;
 */
export const SVG_SIZE = /<svg[^>]*(?:\s(width|height)=('|")(\d*(?:\.\d+)?)(?:px)?('|"))[^>]*(?:\s(width|height)=('|")(\d*(?:\.\d+)?)(?:px)?('|"))[^>]*>/i; // eslint-disable-line max-len
