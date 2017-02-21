/**
 * A Loader util class with a some math functions
 *
 * @class
 * @memberof NGINT
 */
export default class LoaderUtil
{
    static loadJSON(url, type, callback)
    {
        let xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);

        if(type=='json')
            xhr.responseType = 'json';

        if(xhr.readyState)
        {
            xhr.onreadystatechange = function()
            {
                if(xhr.readyState==4)
                {
                    if(xhr.status == 200)
                        callback(xhr.response);
                    else
                        callback(false);
                }
            }
        }
        else
        {
            xhr.onload = function()
            {
                if(xhr.status == 200)
                    callback(script);
                else
                    callback(false);
            };
        }

        xhr.send();
    }

    static loadImage(url, callback)
    {
        var image = document.createElementNS('http://www.w3.org/1999/xhtml', 'img');

		image.addEventListener('load', function()
        {
            callback(this);
		}, false);

		image.addEventListener('error', function(e)
        {
            callback(false);
		}, false);

		image.src = url;
    }
}
