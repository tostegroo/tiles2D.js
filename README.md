Tiles2D.js — A 2D game "physics" engine
=============

The aim of this project is to create a 2d "engine" for platform games that uses other 2d/3d graphics libraries like pixi.js and three.js for render

### Why do not use box2d instead?

Ok, box2d is amazing, I know that. But can be a overhead if you need something more simple and that's the main objective of tiles2D,
create a simple physics for 2d games, getting the max of performance of the browser.

Tiles2D uses 2 types of "bodies" to calculate collisions.

One: - like box2d - This type of body is a kind of float body, that needs to be calculated in all frames keeping in view all other bodies.

Second:  Tiles2D has a special type of body, the "Tile", with this kind of body the engine can calculate collisions much faster,
tiles have always the same width and height, so It can get the positions of the tiles using much less interactions per body.

Also It will implement a environment model to make ease to make vibrant and dynamic worlds for any game.

### What is the stage of development?

The tiles2D is a very young project, It's currently on pre-alpha stage and needs a lot of work to jump to beta, that's why I need some help.

### Setup and Documentation ###

Tiles2D is on very early stage of development, so there is no release for the main public, only source code for developers
but as soon as It became more complete and playable I will update this section with links for download

### Contribute ###

Want to be part of the tiles2D.js project? Great! All are welcome! We will get there quicker
together :) Whether you find a bug, have a great feature request or you fancy owning a task
from the road map above feel free to get in touch.

Make sure to read the [Contributing Guide](https://github.com/tostegroo/tiles2D.js/blob/master/CONTRIBUTING.md)
before submitting changes.

### Current features ###

- Basic Dom-Sprite for debug
- Collisions only calculated on Rectangles
- Support for Keyboard and Gamepad
- Basic API (similar to the flash display list API)
- Tiled files loader (data only)

### Basic Usage Example ###

You can see a basic usage example file on eg/html/index.html

### How to build ###

This project uses grunt, babel, rollup

If you don't already have Node.js and NPM, go install them. Then, in the folder where you have cloned
the repository, install the build dependencies using npm:

```
$> npm install
```

Then, to build the source for test, run:

```
$> grunt dev
```

This will create a non-minified version at `dist/tiles2D.js`

To build a minified at `dist/tiles2D.min.js` and a non-minified version at `dist/tiles2D.js` you need to run:

```
$> grunt dist
```

### How to generate the documentation ###

It is not implemented yet, but as soon as tiles2D became more usable It will have a documentation to build.


## Licence
The MIT License (MIT)

Copyright (c) 2017 Fabio Toste

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
