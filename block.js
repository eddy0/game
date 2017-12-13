var Block = function (path) {
    var image = loadImgFromPath(path)
    var b = {
        x: 50,
        y: 150,
        image: image,
        alive: true,
        space: 10,

    }

    b.dead = function () {
        b.alive = false
    }

    var p = b

    p.moveLeft= function () {
        if (p.x > 0) {
            p.x -= p.space
            }
        }


    p.moveRight = function () {
        if (p.x + p.image.width < canvas.width) {
            p.x += p.space
        }
    }


    return b
}

// image.width
// image.height
//
// //球底部
// qq.y + qq.image.height > bl.image.height
//
// //球顶部
// qq.image.height < bl.y + bl.image.height
//
//
// qq.image.width <  bl.x + bl.image.width
//
// qq.x + qq.image.width > bl.x
