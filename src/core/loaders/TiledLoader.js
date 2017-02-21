import LoaderUtil from '../utils/LoaderUtil'

/**
  * The TiledLoader is used to load json and js files from tiled app
  *
  * @class
  * @memberof NGINT
  * @author Fabio Toste
*/
export default class TiledLoader
{
    /**
     * @param {NGINT.Sprite} url - The url path to the json file
     *
     */
    static loadTile(datafile, imagefile, callback)
    {
        let datamatch = /\.(jso?n?)[?]?/ig.exec(datafile);
        if(datamatch!=null && datamatch.length>1)
        {
            LoaderUtil.loadJSON(datafile, datamatch[1], function(dataResponse)
            {
                dataResponse = TiledLoader.parseTiledData(dataResponse);

                let imagemtch = /\.(gif|jpe?g|tif?f|png)[?]?/ig.exec(imagefile);
                if(imagefile!=null && imagefile.length>1)
                {
                    LoaderUtil.loadImage(imagefile, function(imgResponse)
                    {
                        callback(dataResponse, imgResponse);
                    });
                }
                else
                    callback(dataResponse, false);
            });
        }
        else
            callback(false, false);
    }

    static loadTileData(datafile, callback)
    {
        let datamatch = /\.(jso?n?)[?]?/ig.exec(datafile);
        if(datamatch!=null && datamatch.length>1)
        {
            LoaderUtil.loadJSON(datafile, datamatch[1], function(dataResponse)
            {
                dataResponse = TiledLoader.parseTiledData(dataResponse);
                callback(dataResponse);
            });
        }
        else
            callback(false);
    }

    static parseTiledData(data)
    {
        console.log(data);

        let tileset = data.tilesets[0];
        let columns = tileset.columns;
        let tileprops = tileset.tileproperties ? tileset.tileproperties : {};
        let responseData =
        {
            image: tileset.image,
            tiles: []
        };

        let layer = data.layers[0];
        let w = data.width;
        let h = data.height;
        for (let i = 0, len = layer.data.length; i < len; i++)
        {
            let tile = layer.data[i];
            if(tile!=0)
            {
                let y = Math.floor(i/w);
                let x = i%w;
                let friction = tileprops[tile]&&tileprops[tile].hasOwnProperty('friction') ? tileprops[tile].friction : 1;
                let bounciness = tileprops[tile]&&tileprops[tile].hasOwnProperty('bounciness') ? tileprops[tile].bounciness : 0;
                let imageY = Math.floor((tile-1)/columns);
                let imageX = (tile-1)%columns;

                console.log(tile, imageX, imageY);

                responseData.tiles.push(
                {
                    position: {x: x, y: y},
                    name: x+"-"+y,
                    image_position: {x: imageX, y: imageY},
                    friction: friction,
                    bounciness: bounciness
                });
            }

        }

        return responseData
    }
}
