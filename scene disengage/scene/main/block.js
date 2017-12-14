// [0,0,1]
var Block = function (position, tag) {
    var p = position
    // var image = loadImgFromPath(path)
    var b = {
        x: p[0],
        y: p[1],
        image: tag,  //<img src....>
        alive: p[2] || 1,
    }



    b.dead = function () {
        b.alive -= 1
        if (b.alive < 1) {
            b.alive =false
        }
    }

    return b
}
